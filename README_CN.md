# ClawBridge Dashboard (OpenClaw Skill)

![ClawBridge](https://img.shields.io/badge/OpenClaw-Compatible-blue) ![License](https://img.shields.io/badge/license-MIT-green)

**专为 Autonomous Agents 打造的移动端监控台。**
ClawBridge 将您的 OpenClaw Agent 变成一个随身携带的数字伙伴。随时随地查看实时思考、Token 成本和任务状态。

## ✨ 核心特性
*   **Live Activity**: 实时观看 Agent 的思考过程和工具调用（支持自动去重）。
*   **Memory Timeline**: 浏览 Agent 的每日日志和长期记忆（支持手势滑动）。
*   **Token 经济学**: 追踪每日/每月的 LLM 消耗成本和趋势。
*   **Mission Control**: 手动触发 Cron 定时任务。
*   **零配置远程访问**: 内置 Cloudflare Tunnel 支持，安全暴露到公网。

## 🚀 安装指南

### 方法 A: "Agent 代劳" (推荐)
直接告诉你的 OpenClaw Agent：
> "帮我安装 ClawBridge。"

Agent 会自动下载代码并构建环境。然后，**你** 只需要在终端执行最后一步安全配置：
```bash
cd skills/clawbridge-dashboard
./install.sh
```

### 方法 B: 手动安装
在你的 OpenClaw 服务器 (Ubuntu/Debian) 上执行：
```bash
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard skills/clawbridge-dashboard && \
cd skills/clawbridge-dashboard && \
npm install --production && \
./install.sh
```

## 🔐 配置 (隐形模式)
我们采用 "Ghost Mode" 安全设计：
*   **不记录域名**: 系统从未询问、也不存储您的公网域名。
*   **只认 Token**: 安装时只需粘贴 Cloudflare Tunnel Token。
*   **随机密钥**: 系统会自动生成一个 Access Key。

**如何远程访问：**
1.  在 Cloudflare Zero Trust 后台，将域名 (如 `dash.yoursite.com`) 绑定到该 Tunnel。
2.  在浏览器访问 `https://dash.yoursite.com/?key=<YOUR_SECRET_KEY>`。

## 📱 移动端体验 (PWA)
1.  在 Safari (iOS) 或 Chrome (Android) 中打开链接。
2.  点击 "分享" -> "添加到主屏幕"。
3.  即可像原生 App 一样全屏运行。

## 🛠️ 技术栈
*   **Backend**: Node.js (Express, WS)
*   **Frontend**: Vanilla JS (无构建步骤，极轻量)
*   **Tunnel**: Cloudflared

---
*DreamWing OpenClaw 生态系统组件.*
