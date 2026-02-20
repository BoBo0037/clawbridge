# ClawBridge Dashboard (OpenClaw Skill)

![ClawBridge](https://img.shields.io/badge/OpenClaw-Compatible-blue) ![License](https://img.shields.io/badge/license-MIT-green)

**Mobile-First Monitoring for Autonomous Agents.**
ClawBridge turns your OpenClaw agent into a pocket-sized companion. View real-time thoughts, track token costs, and manage missions from anywhere.

## ✨ Features
*   **Live Activity Feed**: Watch your agent "think" and execute tools in real-time.
*   **Memory Timeline**: Browse your agent's daily logs and long-term memory.
*   **Token Economics**: Track daily/monthly LLM costs and usage trends.
*   **Mission Control**: View and trigger cron jobs manually.
*   **Zero-Config Remote**: Instant Cloudflare Tunnel integration for secure public access.

## 🚀 Installation

### Option A: The "Agent Handover" (Recommended)
Just ask your OpenClaw agent:
> "Install ClawBridge for me."

Your agent will download the code. Then, **you** finish the security setup in your terminal:
```bash
cd skills/clawbridge-dashboard
./install.sh
```

### Option B: Manual One-Liner
Run this on your OpenClaw server (Ubuntu/Debian):
```bash
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard skills/clawbridge-dashboard && \
cd skills/clawbridge-dashboard && \
npm install --production && \
./install.sh
```

## 🔐 Configuration (Zero-Config)
We believe in "Ghost Mode" security.
*   **No Domain Input**: The dashboard never asks for or stores your domain name.
*   **Token Only**: You only provide the Cloudflare Tunnel Token during install.
*   **Access Key**: A random secret key is generated for you.

**To access remotely:**
1.  Map a domain (e.g. `dash.yoursite.com`) to your tunnel in Cloudflare Zero Trust.
2.  Visit `https://dash.yoursite.com/?key=<YOUR_SECRET_KEY>`.

## 📱 Mobile App (PWA)
1.  Open the dashboard in Safari (iOS) or Chrome (Android).
2.  Tap "Share" -> "Add to Home Screen".
3.  Launch it like a native app (full screen, no browser bar).

## 🛠️ Tech Stack
*   **Backend**: Node.js (Express, WS)
*   **Frontend**: Vanilla JS (Zero build step, ultra-lightweight)
*   **Tunnel**: Cloudflared

---
*Part of the DreamWing OpenClaw Ecosystem.*
