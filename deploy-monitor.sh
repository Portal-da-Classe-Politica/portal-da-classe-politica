#!/bin/bash

# Script para monitorar deploys em background

show_help() {
    echo "Deploy Monitor - Monitor background deployments"
    echo ""
    echo "Usage: ./deploy-monitor.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  status      Show current deployment status"
    echo "  logs        Show deployment logs"
    echo "  list        List all deployments"
    echo "  follow      Follow current deployment in real-time"
    echo "  cleanup     Clean old deployment logs"
    echo "  help        Show this help message"
}

get_latest_deploy() {
    ls -t deploy_*.status 2>/dev/null | head -1 | sed 's/\.status$//'
}

show_status() {
    local latest_deploy=$(get_latest_deploy)
    
    if [ -z "$latest_deploy" ]; then
        echo "❌ No deployments found"
        return 1
    fi
    
    local status_file="${latest_deploy}.status"
    local log_file="${latest_deploy}.log"
    
    echo "📊 Latest Deployment: $latest_deploy"
    echo "========================="
    
    if [ -f "$status_file" ]; then
        local status=$(cat "$status_file")
        echo "Status: $status"
        
        case "$status" in
            "RUNNING")
                echo "🔄 Deployment is in progress"
                ;;
            "SUCCESS")
                echo "✅ Deployment completed successfully"
                ;;
            "FAILED")
                echo "❌ Deployment failed"
                ;;
            *)
                echo "❓ Unknown status"
                ;;
        esac
    else
        echo "❌ Status file not found"
    fi
    
    echo ""
    echo "📋 Recent Log Entries:"
    echo "--------------------"
    if [ -f "$log_file" ]; then
        tail -10 "$log_file"
    else
        echo "No log file found"
    fi
}

show_logs() {
    local latest_deploy=$(get_latest_deploy)
    
    if [ -z "$latest_deploy" ]; then
        echo "❌ No deployments found"
        return 1
    fi
    
    local log_file="${latest_deploy}.log"
    
    if [ -f "$log_file" ]; then
        echo "📋 Deployment Log: $latest_deploy"
        echo "================================="
        cat "$log_file"
    else
        echo "❌ Log file not found: $log_file"
    fi
}

list_deployments() {
    echo "📋 All Deployments"
    echo "=================="
    
    local found=0
    for status_file in deploy_*.status; do
        if [ -f "$status_file" ]; then
            found=1
            local deploy_id=$(basename "$status_file" .status)
            local status=$(cat "$status_file" 2>/dev/null || echo "UNKNOWN")
            local log_file="${deploy_id}.log"
            local size=""
            
            if [ -f "$log_file" ]; then
                size=" ($(du -h "$log_file" 2>/dev/null | cut -f1))"
            fi
            
            echo "$deploy_id: $status$size"
        fi
    done
    
    if [ $found -eq 0 ]; then
        echo "No deployments found"
    fi
}

follow_deployment() {
    local latest_deploy=$(get_latest_deploy)
    
    if [ -z "$latest_deploy" ]; then
        echo "❌ No deployments found"
        return 1
    fi
    
    local status_file="${latest_deploy}.status"
    local log_file="${latest_deploy}.log"
    
    echo "📺 Following Deployment: $latest_deploy"
    echo "======================================="
    echo "Press Ctrl+C to exit"
    echo ""
    
    # Follow log file if it exists
    if [ -f "$log_file" ]; then
        tail -f "$log_file" &
        TAIL_PID=$!
    fi
    
    # Monitor status changes
    local last_status=""
    while [ -f "$status_file" ]; do
        local current_status=$(cat "$status_file" 2>/dev/null || echo "UNKNOWN")
        
        if [ "$current_status" != "$last_status" ]; then
            echo ""
            echo "🔄 Status changed to: $current_status"
            last_status="$current_status"
            
            if [ "$current_status" = "SUCCESS" ] || [ "$current_status" = "FAILED" ]; then
                echo "🏁 Deployment finished with status: $current_status"
                break
            fi
        fi
        
        sleep 5
    done
    
    # Cleanup tail process
    if [ ! -z "$TAIL_PID" ]; then
        kill $TAIL_PID 2>/dev/null
    fi
}

cleanup_deployments() {
    echo "🧹 Cleaning up old deployments..."
    
    local count=0
    
    # Keep last 5 deployments, remove older ones
    local deployments=($(ls -t deploy_*.status 2>/dev/null))
    
    if [ ${#deployments[@]} -gt 5 ]; then
        echo "Found ${#deployments[@]} deployments, keeping latest 5"
        
        for ((i=5; i<${#deployments[@]}; i++)); do
            local deploy_id=$(basename "${deployments[i]}" .status)
            rm -f "${deploy_id}.status" "${deploy_id}.log"
            echo "Removed: $deploy_id"
            ((count++))
        done
    fi
    
    echo "✅ Cleaned up $count old deployments"
}

# Main script logic
case "$1" in
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    list)
        list_deployments
        ;;
    follow)
        follow_deployment
        ;;
    cleanup)
        cleanup_deployments
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        if [ $# -eq 0 ]; then
            show_status
        else
            echo "Unknown command: $1"
            echo "Use './deploy-monitor.sh help' for available commands"
            exit 1
        fi
        ;;
esac