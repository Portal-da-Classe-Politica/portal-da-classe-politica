#!/bin/bash

# Zero-Downtime Deployment script for Portal da Classe Política
# This script should be run on the server

echo "🚀 Starting zero-downtime deployment process..."

# Function to check if app is running
check_app_health() {
  local retries=0
  local max_retries=30
  
  while [ $retries -lt $max_retries ]; do
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
      echo "✅ Application is healthy"
      return 0
    fi
    echo "⏳ Waiting for application to be ready... ($((retries + 1))/$max_retries)"
    sleep 2
    retries=$((retries + 1))
  done
  
  echo "❌ Application health check failed"
  return 1
}

# Check if PM2 process exists
PM2_RUNNING=$(pm2 list | grep "portal-front" | wc -l)

# Create backup directory with timestamp
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
if [ -d ".next" ]; then
  echo "📦 Creating backup of current build..."
  mkdir -p "$BACKUP_DIR"
  
  # Backup .next directory (fast)
  echo "   Backing up .next directory..."
  cp -r .next "$BACKUP_DIR/" || {
    echo "❌ Failed to backup .next directory"
    exit 1
  }
  
  # Skip node_modules backup as it's too large and can be reinstalled
  echo "   Skipping node_modules backup (will reinstall if needed)"
  echo "✅ Backup created successfully"
else
  echo "ℹ️  No existing build found, skipping backup"
fi

# Install dependencies
echo "📥 Installing dependencies..."
echo "   This may take a few minutes..."

# Use timeout to prevent hanging
timeout 600 npm ci || {
  echo "❌ Dependencies installation timed out or failed"
  exit 1
}

echo "✅ Dependencies installed successfully"

# Build application
echo "🔨 Building application..."
echo "   Compiling Next.js production build..."

# Use timeout for build as well
timeout 300 npm run build || {
  echo "❌ Build process timed out or failed"
  exit 1
}

# Check if build was successful
if [ ! -d ".next" ]; then
  echo "❌ Build failed: .next directory not found"
  
  # Restore backup if exists
  if [ -d "$BACKUP_DIR/.next" ]; then
    echo "🔄 Restoring backup..."
    rm -rf .next
    mv "$BACKUP_DIR/.next" .
    echo "✅ Backup restored successfully"
  fi
  
  exit 1
fi

echo "✅ Build completed successfully"

# Create logs directory
mkdir -p logs

if [ "$PM2_RUNNING" -gt 0 ]; then
  echo "🔄 Performing zero-downtime reload..."
  echo "   Current PM2 status:"
  pm2 status
  
  # Reload the application (zero-downtime)
  echo "   Reloading PM2 processes..."
  pm2 reload ecosystem.config.js || {
    echo "❌ PM2 reload failed"
    exit 1
  }
  
  # Wait a moment for the reload to take effect
  echo "   Waiting for reload to complete..."
  sleep 5
  
  # Check application health
  if check_app_health; then
    echo "✅ Zero-downtime deployment completed successfully"
    
    # Clean up backup
    if [ -d "$BACKUP_DIR" ]; then
      echo "🧹 Cleaning up backup..."
      rm -rf "$BACKUP_DIR"
    fi
  else
    echo "❌ Health check failed after reload, attempting rollback..."
    
    # Restore backup if health check fails
    if [ -d "$BACKUP_DIR/.next" ]; then
      echo "🔄 Rolling back to previous version..."
      pm2 stop portal-front
      rm -rf .next
      mv "$BACKUP_DIR/.next" .
      echo "✅ Previous build restored"
      pm2 start ecosystem.config.js
      
      if check_app_health; then
        echo "✅ Rollback successful"
      else
        echo "❌ Rollback failed - manual intervention required"
        exit 1
      fi
    else
      echo "❌ No backup available for rollback"
      exit 1
    fi
  fi
else
  echo "🆕 Starting application for the first time..."
  pm2 start ecosystem.config.js
  
  if check_app_health; then
    echo "✅ Application started successfully"
  else
    echo "❌ Application failed to start"
    exit 1
  fi
fi

# Save PM2 configuration
pm2 save

echo "📊 PM2 Status:"
pm2 status

echo "🎉 Deployment process completed!"