#!/bin/bash
# run_dashboard.sh - Keep ClawBridge Alive
DIR="/root/clawd/skills/clawbridge-dashboard"
LOG_FILE="$DIR/logs/dashboard.log"

mkdir -p "$DIR/logs"

while true; do
    echo "[$(date)] 🚀 Starting ClawBridge Dashboard..." >> "$LOG_FILE"
    cd "$DIR"
    /root/.nvm/versions/node/v22.22.0/bin/node index.js >> "$LOG_FILE" 2>&1
    echo "[$(date)] ⚠️ Crashed! Restarting in 5s..." >> "$LOG_FILE"
    sleep 5
done
