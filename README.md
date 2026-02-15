# ClawBridge Dashboard 🌉

**🇺🇸 English** | [🇨🇳 中文](./README_CN.md)

**ClawBridge** (formerly ClawLink) is a lightweight, real-time mission control center designed for **Clawdbot** and **OpenClaw** agents.

It provides a mobile-friendly interface to monitor your AI agent's "brain" (thinking process), "hands" (tool execution), "wallet" (token usage), and "schedule" (cron jobs) form anywhere via a secure Cloudflare Tunnel.

## ✨ Features

*   **👁️ The All-Seeing Eye**: Real-time feed of AI thoughts (`🧠`), tools (`🔧`), and file changes (`📄`).
*   **💰 Token Economy**: Track daily costs and model usage breakdown.
*   **🎮 Mission Control**: Monitor and trigger Cron jobs.
*   **🛡️ Enterprise Stability**: Systemd auto-healing and secure Magic Link access.

---

## 🛠️ Installation

### 1. Clone & Install
```bash
cd /root/clawd/skills
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard.git clawbridge-dashboard
cd clawbridge-dashboard
npm install
```

### 2. Configuration
Create a `.env` file:

```ini
# 1. Set a strong password (Magic Link Key)
ACCESS_KEY=your_secret_password_here

# 2. Add your Cloudflare Tunnel Token
TUNNEL_TOKEN=eyJhIjoi...

# 3. Use Systemd (Recommended)
ENABLE_EMBEDDED_TUNNEL=false
```

### 3. Deploy via Systemd
(See repo files `clawbridge-dashboard.service` for templates)

```bash
systemctl enable --now clawbridge-dashboard
systemctl enable --now clawbridge-tunnel
```

---

## 🌐 Domain Setup & Usage

### Option A: Bring Your Own Domain (Recommended)
1.  Go to **Cloudflare Zero Trust Dashboard** -> **Networks** -> **Tunnels**.
2.  Select your tunnel and click **Configure**.
3.  Add a **Public Hostname** (e.g., `ops.your-domain.com`) pointing to `http://localhost:3000`.

### Option B: Use ClawBridge Deck (Invite Only)
If you don't have a domain, we provide free subdomains under `deck.clawbridge.app` for community members.
*   **Format**: `https://<your-id>.deck.clawbridge.app`
*   **How to get**: Currently manually provisioned. Please [Open an Issue](https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard/issues) to request a slot.

### Accessing the Dashboard
Once configured, visit your URL with the key you set in `.env`:

**URL**: `https://<your-domain>/?key=<ACCESS_KEY>`

*Example*: `https://ops.example.com/?key=my-secret-password`

---

## 📄 License
MIT License. Created by [DreamWing](https://github.com/dreamwing).
