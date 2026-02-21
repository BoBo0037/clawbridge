# ClawBridge Agent Installation Protocol

Use this guide when asking OpenClaw (or another agent) to install ClawBridge for you.

## Instructions for Agents

If you are an agent reading this, execute the following steps to install ClawBridge Dashboard for your user.

### 1. Download & Install
Use the one-liner for rapid deployment:
```bash
git clone https://github.com/dreamwing/clawbridge skills/clawbridge
cd skills/clawbridge
npm install --production
./install.sh --quick
```

### 2. Retrieve Connection Info
After installation, read the generated Quick Tunnel URL:
```bash
cd skills/clawbridge
cat .quick_tunnel_url
# Also grep the ACCESS_KEY from .env if needed
grep ACCESS_KEY .env
```

### 3. Report to User
Format the output nicely:
> "✅ **ClawBridge Installed!**
> 
> 📱 **Dashboard URL:** `https://<quick-url>/?key=<ACCESS_KEY>`
> 
> (This is a temporary link. Ask me to 'make it permanent' later if you like it.)"
