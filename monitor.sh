#!/bin/bash

# Monitoring and maintenance script for Portal da Classe Política

show_help() {
    echo "Portal da Classe Política - Monitoring & Maintenance"
    echo ""
    echo "Usage: ./monitor.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  status      Show application status"
    echo "  logs        Show recent logs"
    echo "  health      Perform health check"
    echo "  memory      Show memory usage"
    echo "  processes   Show all PM2 processes"
    echo "  cleanup     Clean old logs and backups"
    echo "  monitor     Start real-time monitoring"
    echo "  help        Show this help message"
}

show_status() {
    echo "📊 Application Status"
    echo "===================="
    pm2 status
    echo ""
    echo "🌐 Network Status"
    echo "=================="
    netstat -tlnp | grep :3000 || echo "Port 3000 not listening"
    echo ""
    echo "💾 Disk Usage"
    echo "============="
    df -h . | tail -1
}

show_logs() {
    echo "📋 Recent Logs (last 50 lines)"
    echo "==============================="
    pm2 logs portal-front --lines 50
}

health_check() {
    echo "🔍 Performing Health Check"
    echo "=========================="
    ./health-check.sh
}

show_memory() {
    echo "💾 Memory Usage"
    echo "==============="
    pm2 show portal-front | grep -E "(memory usage|cpu usage|uptime|restarts)"
    echo ""
    echo "System Memory:"
    free -h
}

show_processes() {
    echo "🏃 All PM2 Processes"
    echo "===================="
    pm2 list
    echo ""
    echo "Process Tree:"
    pm2 prettylist
}

cleanup() {
    echo "🧹 Cleaning up old files..."
    
    # Clean old logs (keep last 7 days)
    find logs/ -name "*.log" -mtime +7 -delete 2>/dev/null || echo "No old logs to clean"
    
    # Clean old backups (keep last 5)
    ls -dt backup_* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null || echo "No old backups to clean"
    
    # Clean PM2 old logs
    pm2 flush
    
    echo "✅ Cleanup completed"
}

monitor() {
    echo "📈 Starting real-time monitoring (Press Ctrl+C to exit)"
    echo "======================================================="
    pm2 monit
}

# Main script logic
case "$1" in
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    health)
        health_check
        ;;
    memory)
        show_memory
        ;;
    processes)
        show_processes
        ;;
    cleanup)
        cleanup
        ;;
    monitor)
        monitor
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        if [ $# -eq 0 ]; then
            show_help
        else
            echo "Unknown command: $1"
            echo "Use './monitor.sh help' for available commands"
            exit 1
        fi
        ;;
esac