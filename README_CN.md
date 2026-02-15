# ClawBridge 仪表盘 🌉

[🇺🇸 English](./README.md) | **🇨🇳 中文**

**ClawBridge** (原名 ClawLink) 是一个专为 **Clawdbot** 和 **OpenClaw** 智能体设计的轻量级、实时任务控制中心。

## ✨ 核心功能
*   **👁️ 全知之眼**: 实时监控 AI 思考 (`🧠`)、工具调用 (`🔧`) 和文件变动 (`📄`)。
*   **💰 代币经济**: 每日 Token 消耗与成本趋势图。
*   **🎮 任务控制**: Cron 定时任务的健康状态与手动触发。
*   **🛡️ 稳定安全**: Systemd 守护与 Magic Link 认证。

---

## 🛠️ 安装指南

### 1. 克隆与安装
```bash
cd /root/clawd/skills
git clone https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard.git clawbridge-dashboard
cd clawbridge-dashboard
npm install
```

### 2. 配置文件 (`.env`)
```ini
# 1. 设置访问密钥 (魔法链接密码)
ACCESS_KEY=your_secret_password_here

# 2. 填入 Cloudflare Tunnel Token
TUNNEL_TOKEN=eyJhIjoi...

# 3. 推荐设置
ENABLE_EMBEDDED_TUNNEL=false
```

### 3. 启动服务
(请参考仓库中的 `.service` 文件配置 Systemd)

---

## 🌐 域名配置与访问

### 方案 A：使用自有域名 (推荐)
1.  登录 **Cloudflare Zero Trust** 后台。
2.  找到您的 Tunnel，点击 **Configure** -> **Public Hostname**。
3.  添加一个域名 (如 `ops.your-domain.com`)，指向 `http://localhost:3000`。

### 方案 B：申请 ClawBridge Deck (邀请制)
如果您没有域名，我们可以提供免费的 `deck.clawbridge.app` 子域名。
*   **格式**: `https://<您的ID>.deck.clawbridge.app`
*   **申请方式**: 目前仅限人工发放。请在 GitHub [提交 Issue](https://github.com/dreamwing/clawbridge-openclaw-mobile-dashboard/issues) 联系管理员。

### 访问仪表盘
配置完成后，使用您设置的 Key 访问：

**URL**: `https://<您的域名>/?key=<ACCESS_KEY>`

*示例*: `https://ops.example.com/?key=my-secret-password`

---

## 📄 许可证
MIT License. Created by [DreamWing](https://github.com/dreamwing).
