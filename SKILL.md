# ClawBridge Dashboard Skill

ClawBridge is a mobile-first dashboard for OpenClaw/Clawdbot agents. It provides a real-time view of agent activities, resource usage, and cost tracking, accessible from any device via a secure Magic Link or Cloudflare Tunnel.

## Features
- **Real-time Logs**: Watch your agent "think" and execute commands live.
- **System Monitoring**: CPU, Memory, and Disk usage at a glance.
- **Cost Tracking**: Detailed token usage and cost estimation for 340+ models.
- **Mission Control**: View and trigger OpenClaw cron jobs manually.
- **Mobile First**: PWA support for a native app-like experience on iOS/Android.

## Requirements
- OpenClaw v2.0+
- Node.js v18+
- (Optional) Cloudflared for remote access

## Setup

1. **Install Dependencies**:
   ```bash
   npm install --production
   ```

2. **Configuration**:
   Copy `.env.example` to `.env` and set your secrets:
   ```bash
   cp .env.example .env
   nano .env
   ```
   *   `PORT`: Dashboard port (default: 3000)
   *   `ACCESS_KEY`: A secure random string for authentication.
   *   `TUNNEL_TOKEN`: (Optional) Cloudflare Tunnel token for public access.

3. **Run**:
   ```bash
   node index.js
   ```
   Or use the provided systemd service file for background execution.

## Usage
Open the dashboard URL in your browser. Append `?key=YOUR_ACCESS_KEY` to the URL for automatic login, or enter the key when prompted.

## Security
- The dashboard is protected by a simple Magic Link / Access Key mechanism.
- Data is stored locally in `data/`. No external telemetry.
