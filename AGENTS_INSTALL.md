# ClawBridge Agent Installation Protocol (v2.6.3+)

Use this guide when the user asks to "Install ClawBridge" via OpenClaw.
Target OS: Linux (Ubuntu/Debian/CentOS).

## 1. Quick Install (Default Flow)

When asked to install, execute the following immediately without asking questions:

```bash
# 1. Clone & Install
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard skills/clawbridge-dashboard
cd skills/clawbridge-dashboard
npm install --production
chmod +x install.sh

# 2. Run in Quick Mode (Auto-generates Temporary URL)
./install.sh --quick
```

**Output Handling**:
Capture the output. Look for `🌐 Temporary Magic Link: ...`.
Reply to the user:

"✅ **安装成功！**

您的临时访问链接（Magic Link）：
<Paste the Temporary Magic Link here>

⚠️ **注意**：这是一个临时链接，重启服务后会失效。
如果您希望配置**永久固定域名**，请前往 [Cloudflare Zero Trust](https://one.dash.cloudflare.com) > Access > Tunnels 创建隧道，并将 Token 发送给我。"

## 2. Permanent Config (Token Flow)

When the user provides a Cloudflare Tunnel Token (starts with `ey...`), execute:

```bash
cd skills/clawbridge-dashboard
./install.sh --token=<PASTE_TOKEN_HERE>
```

**Reply**:
"✅ **永久隧道已配置！**
服务已重启。请使用您在 Cloudflare 后台绑定的域名访问（记得加上之前的 `?key=...` 参数）。"

## 3. Recovery (Regenerate Link)

If the user says "链接失效了" or "Link expired" or "重连", execute:

```bash
# Restart to get a new Quick Tunnel URL
systemctl --user restart clawbridge
# Wait 5s for tunnel to establish
sleep 5
cat skills/clawbridge-dashboard/.quick_tunnel_url
```

**Reply**:
"已为您生成新的临时链接：
<Paste new URL>/?key=<Read from .env ACCESS_KEY>"
