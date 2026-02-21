# ClawBridge Dashboard (OpenClaw Skill)

![ClawBridge](https://img.shields.io/badge/OpenClaw-Compatible-blue) ![License](https://img.shields.io/badge/license-MIT-green)

**Mobile-First Monitoring for Autonomous Agents.**
ClawBridge turns your OpenClaw agent into a pocket-sized companion. View real-time thoughts, track token costs, and manage missions from anywhere.

<div align="center">
  <img src="public/app-icon.png" width="100" alt="ClawBridge Logo" />
  <h1>ClawBridge Dashboard</h1>
  <p><strong>Mobile-First Mission Control for OpenClaw Agents.</strong></p>

  <a href="https://clawbridge.app">
    <img src="https://img.shields.io/badge/Website-clawbridge.app-blue?style=for-the-badge" alt="Website" />
  </a>
  <a href="https://github.com/openclaw/openclaw">
    <img src="https://img.shields.io/badge/OpenClaw-Compatible-success?style=for-the-badge" alt="OpenClaw" />
  </a>
  
  <br/><br/>
  [ <a href="README.md">English</a> | <a href="README_CN.md">简体中文</a> ]
</div>

---

**ClawBridge** turns your OpenClaw agent into a pocket-sized companion. Monitor real-time thoughts, track token costs, and manage missions from anywhere—securely and instantly.

## ✨ Key Features

*   **🧠 Live Activity Feed**: Watch your agent "think" and execute tools in real-time. Features intelligent parallel logging (no missed background tasks) and deduplication.
*   **💰 Token Economy**: Track daily/monthly LLM costs and usage trends. Know exactly where your money goes.
*   **📜 Memory Timeline**: Browse your agent's daily logs and long-term memory evolution.
*   **🚀 Mission Control**: View status of Cron jobs and manually trigger scripts from your phone.
*   **⚡ Zero-Friction Install**: 
    *   **Auto-Port**: Automatically finds an available port if 3000 is busy.
    *   **Smart Networking**: Auto-detects **Tailscale/WireGuard** for direct secure access.
    *   **Quick Tunnel**: If no VPN is found, auto-generates a temporary public URL via Cloudflare (Zero Config).

## 🚀 Installation

### Option A: The "Agent Handover" (Recommended)
Just ask your OpenClaw agent:
> "Install ClawBridge for me."

Your agent will download the code. Then, **you** finish the security setup in your terminal:
```bash
cd skills/clawbridge
./install.sh
```

### Option B: Manual One-Liner
Run this on your OpenClaw server (Ubuntu/Debian):
```bash
git clone https://github.com/dreamwing/clawbridge skills/clawbridge && \
cd skills/clawbridge && \
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
*   **Backend**: Node.js (Express, WebSocket) - Lightweight sidecar process.
*   **Frontend**: Vanilla JS - Zero build step, instant load.
*   **Tunnel**: Cloudflared

---
*Part of the DreamWing OpenClaw Ecosystem.*
