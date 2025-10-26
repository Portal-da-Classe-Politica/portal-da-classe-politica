#!/bin/bash

# Debug script for deployment issues
# Use this when deploy.sh hangs or fails

echo "🔍 Deployment Debug Tool"
echo "======================="

echo "📊 System Information"
echo "-------------------"
echo "Date: $(date)"
echo "User: $(whoami)"
echo "PWD: $(pwd)"
echo "Node: $(node --version 2>/dev/null || echo 'Not found')"
echo "NPM: $(npm --version 2>/dev/null || echo 'Not found')"
echo "PM2: $(pm2 --version 2>/dev/null || echo 'Not found')"
echo ""

echo "💾 Disk Space"
echo "------------"
df -h . | head -2
echo ""

echo "🏃 Running Processes"
echo "------------------"
echo "PM2 processes:"
pm2 list 2>/dev/null || echo "PM2 not running or not found"
echo ""

echo "Node processes:"
ps aux | grep node | grep -v grep | head -5
echo ""

echo "📁 Current Directory Contents"
echo "----------------------------"
ls -la | head -10
echo ""

if [ -d ".next" ]; then
  echo "✅ .next directory exists"
  echo "Size: $(du -sh .next 2>/dev/null | cut -f1)"
else
  echo "❌ .next directory not found"
fi
echo ""

if [ -d "node_modules" ]; then
  echo "✅ node_modules directory exists"
  echo "Size: $(du -sh node_modules 2>/dev/null | cut -f1)"
else
  echo "❌ node_modules directory not found"
fi
echo ""

echo "📋 Recent Backup Directories"
echo "---------------------------"
ls -la | grep backup_ | tail -5 || echo "No backup directories found"
echo ""

echo "🌐 Network Check"
echo "---------------"
echo "Port 3000 status:"
netstat -tlnp 2>/dev/null | grep :3000 || echo "Port 3000 not listening"
echo ""

echo "Application response test:"
if curl -f -s --max-time 5 http://localhost:3000 > /dev/null; then
  echo "✅ Application responding on localhost:3000"
else
  echo "❌ Application not responding on localhost:3000"
fi
echo ""

echo "📋 Recent Logs"
echo "-------------"
if [ -d "logs" ]; then
  echo "Log files:"
  ls -la logs/
  echo ""
  echo "Last 10 lines of combined.log:"
  tail -10 logs/combined.log 2>/dev/null || echo "No combined.log found"
else
  echo "No logs directory found"
fi
echo ""

echo "🔧 NPM Configuration"
echo "------------------"
echo "NPM cache: $(npm config get cache)"
echo "NPM registry: $(npm config get registry)"
echo "NPM prefix: $(npm config get prefix)"
echo ""

echo "📦 Package.json Scripts"
echo "----------------------"
if [ -f "package.json" ]; then
  echo "Available scripts:"
  grep -A 20 '"scripts"' package.json | head -20
else
  echo "❌ package.json not found"
fi
echo ""

echo "🎯 Recommendations"
echo "-----------------"

if [ ! -d ".next" ] && [ ! -d "node_modules" ]; then
  echo "🔧 Try: npm ci && npm run build"
elif [ ! -d ".next" ]; then
  echo "🔧 Try: npm run build"
fi

if ! pm2 list &>/dev/null; then
  echo "🔧 PM2 not running. Try: npm install -g pm2"
fi

if ! curl -f -s --max-time 5 http://localhost:3000 > /dev/null; then
  echo "🔧 Application not responding. Check PM2 logs: pm2 logs portal-front"
fi

echo ""
echo "🚀 Quick Fix Commands"
echo "--------------------"
echo "1. Clean restart:     pm2 delete portal-front && npm run deploy:fast"
echo "2. Check PM2 logs:    pm2 logs portal-front"
echo "3. Manual health:     curl http://localhost:3000"
echo "4. Clean node_modules: rm -rf node_modules && npm ci"
echo "5. Check disk space:  df -h"
echo ""
echo "Debug completed!"