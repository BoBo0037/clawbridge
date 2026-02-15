# ClawBridge Dashboard 📱

ClawBridge is a lightweight, self-hosted dashboard designed to monitor and control your Clawdbot/Agent instance from anywhere.

It provides real-time system stats (CPU/RAM/Tasks), Cron job management, Token usage analytics, and a secure Cloudflare Tunnel for remote access.

**Live URL**: [Your Custom Domain] (e.g., `https://clawlink.geofast.app` - *Note: Domain name may vary based on configuration*)

## Features

-   📊 **System Status**: Real-time CPU, Memory, and Active Task monitoring.
-   🎮 **Mission Control**: View, monitor, and manually trigger Cron jobs.
-   💰 **Token Economy**: Track daily token usage, costs, and model breakdowns.
-   🛡️ **Secure Tunnel**: Auto-managed Cloudflare Tunnel for safe remote access.
-   🔐 **Magic Link**: Secure token-based authentication (no passwords needed).

## Installation

1.  Clone this repo into your Clawdbot workspace:
    ```bash
    cd /root/clawd/skills
    git clone ... clawbridge-dashboard
    cd clawbridge-dashboard
    npm install
    ```

2.  Configure `.env`:
    ```ini
    ACCESS_KEY=your_secret_key
    TUNNEL_TOKEN=your_cloudflare_tunnel_token
    ```

3.  Run via Systemd (Recommended):
    ```bash
    # Copy service files
    cp clawbridge-dashboard.service /etc/systemd/system/
    cp clawbridge-tunnel.service /etc/systemd/system/

    # Enable & Start
    systemctl enable --now clawbridge-dashboard
    systemctl enable --now clawbridge-tunnel
    ```

## Development

-   **Backend**: Node.js + Express (port 3000).
-   **Frontend**: Plain HTML/JS (no build step required).
-   **Tunnel**: Cloudflared binary (auto-downloaded).

## License

MIT
