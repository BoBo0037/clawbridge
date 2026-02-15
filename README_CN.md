# ClawBridge 仪表盘 🌉

[🇺🇸 English](./README.md) | **🇨🇳 中文**

**ClawBridge** (原名 ClawLink) 是一个专为 **Clawdbot** 和 **OpenClaw** 智能体设计的轻量级、实时任务控制中心。

它提供了一个适配移动端的界面，让您可以通过安全的 Cloudflare 隧道，随时随地监控 AI Agent 的“大脑”（思考过程）、“双手”（工具执行）、“钱包”（Token 消耗）以及“日程表”（Cron 任务）。

## ✨ 核心功能

### 👁️ 全知之眼 (实时动态流)
- **读心术**: 实时显示 Agent 正在思考的内容 (`🧠 Thinking...`)。
- **工具监控**: 看到正在执行的具体命令 (`🔧 grep`, `🔧 web_search`)。
- **文件审计**: 当文件被创建 (`📄`) 或修改 (`📝`) 时立即通知。
- **进程雷达**: 自动检测后台运行的脚本 (`📜`) 和高 CPU 占用进程 (`⚡`)。
- **持久化历史**: 自动保存活动日志，刷新页面或重启后依然可回溯历史操作。

### 💰 代币经济 (Token Economy)
- **成本追踪**: 实时计算 Input/Output Token 数量及预估美元成本。
- **趋势图表**: 可视化展示过去 7 天的 AI 支出趋势。
- **模型透视**: 自动统计不同模型 (Gemini, Claude, DeepSeek) 的消耗占比。
- **交互详情**: 点击柱状图即可查看当天的详细账单。

### 🎮 任务控制 (Mission Control)
- **实时状态**: 查看所有 Clawdbot 定时任务的健康状况 (红/绿灯)。
- **运行预测**: 精确倒计时显示下一次运行时间 (例如: `🔜 14:05 (in 45m)`)。
- **手动触发**: 支持一键强制运行某个任务，无需敲命令行。
- **规则展示**: 直观显示 Cron 表达式 (如 `5 */2 * * *`)。

### 🛡️ 企业级稳定性
- **安全访问**: Magic Link 魔法链接认证 (无密码，基于密钥)，防止未授权访问。
- **自动愈合**: 双 Systemd 服务守护，确保 Dashboard 和隧道进程崩溃后 5秒内自动重启。
- **零配置隧道**: 内置 Cloudflare Tunnel 管理，无需额外部署穿透工具。

---

## 🛠️ 安装指南

### 1. 克隆与安装
将此仓库克隆到您的 Clawdbot `skills` 目录下：

```bash
cd /root/clawd/skills
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard.git clawbridge-dashboard
cd clawbridge-dashboard
npm install
```

### 2. 配置文件
在项目根目录创建 `.env` 文件：

```ini
# 访问密钥 (Magic Link Key, 例如 ?key=mysecret)
ACCESS_KEY=your_secret_key_here

# Cloudflare Tunnel Token (从 Cloudflare Zero Trust 后台获取)
TUNNEL_TOKEN=eyJhIjoi...

# 设置为 false 以使用 Systemd 托管隧道 (推荐)
ENABLE_EMBEDDED_TUNNEL=false
```

### 3. 部署服务 (推荐 Systemd)
使用 Systemd 确保服务永久在线。

**A. Dashboard 服务 (`/etc/systemd/system/clawbridge-dashboard.service`)**
```ini
[Unit]
Description=ClawBridge Dashboard Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/clawd/skills/clawbridge-dashboard
ExecStart=/root/.nvm/versions/node/v22.22.0/bin/node index.js
EnvironmentFile=/root/clawd/skills/clawbridge-dashboard/.env
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

**B. 隧道服务 (`/etc/systemd/system/clawbridge-tunnel.service`)**
```ini
[Unit]
Description=ClawBridge Tunnel (Cloudflared)
After=network.target

[Service]
Type=simple
User=root
# 注意：请确保 cloudflared 二进制文件有执行权限
ExecStart=/root/clawd/skills/clawbridge-dashboard/cloudflared tunnel run --token <YOUR_TOKEN_HERE>
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

**C. 启动服务**
```bash
systemctl daemon-reload
systemctl enable --now clawbridge-dashboard
systemctl enable --now clawbridge-tunnel
```

---

## 📱 使用方法

通过您的 Cloudflare Tunnel 域名访问，并带上 `key` 参数：

**URL**: `https://<user-id>.deck.clawbridge.app/?key=<ACCESS_KEY>`

示例: `https://captain.deck.clawbridge.app/?key=claw2026`

- **首次访问**: 系统会自动将 Key 存入浏览器 LocalStorage。
- **后续访问**: 直接访问域名即可，无需每次都输入 Key。

---

## 🏗️ 架构说明

- **后端**: Node.js + Express (监听 3000 端口)。
    - 监控 `ps` 进程列表。
    - 解析 Clawdbot 的 `sessions.json` 和 `.jsonl` 日志。
    - 数据持久化存储在 `public/*.json`。
- **前端**: 原生 HTML/JS/CSS (单文件结构)。
    - 响应式设计，完美适配手机/飞书浏览器。
    - 采用轮询机制获取实时数据。
- **隧道**: `cloudflared` (Linux amd64)。

## 📄 许可证

MIT License. Created by [DreamWing](https://github.com/dreamwing).
