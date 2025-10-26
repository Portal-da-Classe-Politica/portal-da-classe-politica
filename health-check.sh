#!/bin/bash

# Health check script for Portal da Classe Política
# This script checks if the application is running and responding

echo "🔍 Checking application health..."

# Check if PM2 process is running
PM2_STATUS=$(pm2 list | grep "portal-front" | grep "online" | wc -l)

if [ "$PM2_STATUS" -eq 0 ]; then
    echo "❌ PM2 process is not running"
    exit 1
fi

echo "✅ PM2 process is running"

# Check if application is responding on port 3000
if curl -f -s --max-time 10 http://localhost:3000 > /dev/null; then
    echo "✅ Application is responding on port 3000"
    
    # Get response time
    RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' http://localhost:3000)
    echo "⏱️  Response time: ${RESPONSE_TIME}s"
    
    # Check memory usage
    echo "💾 Memory usage:"
    pm2 show portal-front | grep -E "(memory usage|cpu usage)"
    
    echo "🎉 Application is healthy!"
    exit 0
else
    echo "❌ Application is not responding on port 3000"
    echo "📊 PM2 Status:"
    pm2 status
    echo "📋 Recent logs:"
    pm2 logs portal-front --lines 10
    exit 1
fi