#!/bin/bash

# Fast deployment script for Portal da Classe Política
# This script prioritizes speed over safety (no backup/rollback)

echo "⚡ Starting fast deployment process..."

# Check if PM2 process exists
PM2_RUNNING=$(pm2 list | grep "portal-front" | wc -l)

echo "🧹 Cleaning up..."
rm -rf .next

echo "📥 Installing dependencies (production only)..."
npm ci --only=production

echo "🔨 Building application..."
NODE_ENV=production npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
  echo "❌ Build failed: .next directory not found"
  exit 1
fi

echo "✅ Build completed successfully"

# Create logs directory
mkdir -p logs

if [ "$PM2_RUNNING" -gt 0 ]; then
  echo "🔄 Reloading PM2..."
  pm2 reload portal-front
else
  echo "🚀 Starting PM2..."
  pm2 start ecosystem.config.js
fi

# Quick health check
echo "🔍 Quick health check..."
sleep 3

if curl -f -s --max-time 5 http://localhost:3000 > /dev/null; then
  echo "✅ Application is responding"
else
  echo "⚠️  Application may not be ready yet (check with: npm run health-check)"
fi

pm2 save
pm2 status

echo "⚡ Fast deployment completed!"