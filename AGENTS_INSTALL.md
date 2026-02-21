# Agent Installation Protocol

**Note to Agent:** To install ClawBridge for the user, do not manually clone or configure. Use the official automated installer which handles dependencies, directory structure, and networking (VPN/Tunnel) automatically.

## 1. Execute Installer
Run this command in the user's terminal:

```bash
curl -sL https://raw.githubusercontent.com/dreamwing/clawbridge/master/setup.sh | bash
```

## 2. Verify & Report
The script will output the connection URL at the end (either a local VPN link or a public Magic Link).
**Copy that URL and the Access Key exactly as shown and present it to the user.**

*Example Output to look for:*
> 📱 Local Access: http://100.64.0.1:3000/?key=...
> 🚀 ClawBridge Dashboard Live: https://....trycloudflare.com/?key=...
