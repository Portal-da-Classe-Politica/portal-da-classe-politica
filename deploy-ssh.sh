#!/bin/bash

# SSH-optimized deployment script for Portal da Classe Política
# This script is designed to run efficiently over SSH connections

echo "🚀 Starting SSH-optimized deployment..."

# Set deployment ID and logging
DEPLOY_ID="deploy_$(date +%Y%m%d_%H%M%S)"
DEPLOY_LOG="${DEPLOY_ID}.log"
DEPLOY_STATUS="${DEPLOY_ID}.status"

# Initialize status
echo "INITIALIZING" > "$DEPLOY_STATUS"

# Function to update status and log
update_status() {
  local status="$1"
  local message="$2"
  echo "$status" > "$DEPLOY_STATUS"
  echo "[$(date)] $message" | tee -a "$DEPLOY_LOG"
}

# Function to send keep-alive signals
keep_alive() {
  while [ -f "$DEPLOY_STATUS" ] && [ "$(cat "$DEPLOY_STATUS")" = "RUNNING" ]; do
    echo "[$(date)] ⏱️  Deploy in progress..." | tee -a "$DEPLOY_LOG"
    sleep 45
  done &
}

# Trap to cleanup on exit
cleanup() {
  local exit_code=$?
  if [ $exit_code -eq 0 ]; then
    update_status "SUCCESS" "✅ Deployment completed successfully"
  else
    update_status "FAILED" "❌ Deployment failed with exit code: $exit_code"
  fi
  
  # Stop keep-alive
  jobs -p | xargs -r kill 2>/dev/null
  exit $exit_code
}

trap cleanup EXIT

# Start deployment
update_status "RUNNING" "🚀 Starting deployment process"

# Start keep-alive in background
keep_alive

# Quick pre-flight checks
update_status "RUNNING" "🔍 Pre-flight checks"

if ! command -v node &> /dev/null; then
  update_status "FAILED" "❌ Node.js not found"
  exit 1
fi

if ! command -v npm &> /dev/null; then
  update_status "FAILED" "❌ NPM not found"
  exit 1
fi

# Check disk space (need at least 1GB)
AVAILABLE_KB=$(df . | awk 'NR==2 {print $4}')
if [ "$AVAILABLE_KB" -lt 1048576 ]; then
  update_status "FAILED" "❌ Insufficient disk space (need at least 1GB)"
  exit 1
fi

# Check if PM2 process exists
PM2_RUNNING=$(pm2 list 2>/dev/null | grep "portal-front" | wc -l)
update_status "RUNNING" "📊 PM2 processes found: $PM2_RUNNING"

# Fast backup (only .next, skip node_modules)
if [ -d ".next" ]; then
  update_status "RUNNING" "📦 Creating fast backup"
  BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
  mkdir -p "$BACKUP_DIR"
  cp -r .next "$BACKUP_DIR/" || {
    update_status "FAILED" "❌ Backup failed"
    exit 1
  }
  update_status "RUNNING" "✅ Backup created: $BACKUP_DIR"
fi

# Clean and install (production only for speed)
update_status "RUNNING" "🧹 Cleaning previous build"
rm -rf .next

update_status "RUNNING" "📥 Installing dependencies (production only)"
if ! timeout 300 npm ci --only=production --silent; then
  update_status "FAILED" "❌ Dependencies installation failed or timed out"
  exit 1
fi

# Build with timeout and progress indicator
update_status "RUNNING" "🔨 Building application"
if ! timeout 180 npm run build --silent; then
  update_status "FAILED" "❌ Build failed or timed out"
  
  # Attempt restore if backup exists
  if [ -d "$BACKUP_DIR/.next" ]; then
    update_status "RUNNING" "🔄 Restoring backup"
    mv "$BACKUP_DIR/.next" .
    update_status "FAILED" "❌ Build failed, backup restored"
  fi
  exit 1
fi

# Verify build
if [ ! -d ".next" ]; then
  update_status "FAILED" "❌ Build verification failed"
  exit 1
fi

update_status "RUNNING" "✅ Build completed successfully"

# Create logs directory
mkdir -p logs

# PM2 operations
if [ "$PM2_RUNNING" -gt 0 ]; then
  update_status "RUNNING" "🔄 Performing zero-downtime reload"
  
  if ! pm2 reload ecosystem.config.js --silent; then
    update_status "FAILED" "❌ PM2 reload failed"
    exit 1
  fi
  
  # Brief wait for reload
  sleep 3
else
  update_status "RUNNING" "🚀 Starting PM2 for first time"
  
  if ! pm2 start ecosystem.config.js --silent; then
    update_status "FAILED" "❌ PM2 start failed"
    exit 1
  fi
  
  sleep 5
fi

# Quick health check (don't wait too long)
update_status "RUNNING" "🔍 Health check"
for i in {1..10}; do
  if curl -f -s --max-time 3 http://localhost:3000 > /dev/null 2>&1; then
    update_status "RUNNING" "✅ Application is healthy"
    break
  fi
  
  if [ $i -eq 10 ]; then
    update_status "FAILED" "❌ Health check failed after 10 attempts"
    
    # Attempt rollback if backup exists
    if [ -d "$BACKUP_DIR/.next" ]; then
      update_status "RUNNING" "🔄 Attempting rollback"
      pm2 stop portal-front --silent
      rm -rf .next
      mv "$BACKUP_DIR/.next" .
      pm2 start ecosystem.config.js --silent
      sleep 3
      
      if curl -f -s --max-time 3 http://localhost:3000 > /dev/null 2>&1; then
        update_status "SUCCESS" "✅ Rollback successful"
      else
        update_status "FAILED" "❌ Rollback also failed"
        exit 1
      fi
    else
      exit 1
    fi
  fi
  
  sleep 2
done

# Clean up backup on success
if [ -d "$BACKUP_DIR" ]; then
  rm -rf "$BACKUP_DIR"
  update_status "RUNNING" "🧹 Backup cleaned up"
fi

# Save PM2 configuration
pm2 save --silent

update_status "RUNNING" "📊 Final status check"
pm2 status | tee -a "$DEPLOY_LOG"

# Success will be handled by cleanup trap
update_status "RUNNING" "🎉 Deployment process completed"