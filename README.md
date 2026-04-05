[English](README.en.md)

# Claw3D

为 AI Agent 打造的 3D 工作空间。

> 非官方项目：Claw3D 是一个独立的社区项目，不隶属于 OpenClaw 团队，也不受其支持或维护。OpenClaw 是一个独立项目，本仓库不是官​​方的 OpenClaw 仓库。

Claw3D 将 AI 自动化转变为一个可视化的工作场所，Agent 在共享的 3D 环境中协作、评审代码、运行测试、训练技能以及执行任务。

由 LukeTheDev 构建并维护。在 X 上关注：[@iamlukethedev](https://x.com/iamlukethedev)。

你可以把它想象成：

你的 AI 团队的办公室。

## 你可以用 Claw3D 做什么

• 实时观察 AI Agent 的工作
• 运行连接到 GitHub 和 Jira 的 Agent 站会
• 在办公室内评审 Pull Request
• 监控 QA 流水线和日志
• 在健身房 (Gym) 训练 Agent 以开发新技能
• 使用清洁工 (Janitor) 系统重置会话并清理上下文

不再是通过仪表盘和日志来管理自动化……

而是漫步在你的 AI 工作空间中。

[愿景](VISION.md) · [架构](ARCHITECTURE.md) · [贡献](CONTRIBUTING.md) · [安全](SECURITY.md)

## Claw3D 是什么

OpenClaw 是智能和任务执行层。

Claw3D 是可视化和交互层。

实际上，该应用为你提供了：

- 一个实时的 `/office` 复古办公室环境，Agent 以工人的形象在共享的 3D 世界中移动
- 一个 `/office/builder` 界面，用于编辑和发布办公室布局
- 一个 Gateway 优先的架构，将 Agent 状态保留在 OpenClaw 中，而 Studio 存储本地 UI 偏好

本仓库不构建或修改 OpenClaw 运行时本身。它是连接到现有 OpenClaw Gateway 的前端和代理层。

## 为什么存在

AI 系统变得越来越强大，但它们的工作通常仍然隐藏在日志、终端输出和仪表盘之后。

Claw3D 的存在是为了让 Agent 系统可见：

- 实时检查 Agent 正在做什么
- 在一处监控运行、审批、历史和活动
- 通过聊天和沉浸式 UI 界面与 Agent 交互
- 迈向一个通过空间、运动和存在感来理解 AI 系统的世界

有关项目的更广泛方向，请参见 [`VISION.md`](VISION.md)。

## 现状

目前的方案已经包含了一个实质性的 Claw3D 界面：

- 队列管理和 Agent 聊天，运行时更新从 Gateway 流式传输。
- Agent 创建、设置、会话控制、审批以及由 Gateway 支持的配置编辑。
- 一个带有办公桌、房间、导航、动画和事件驱动活动提示的 3D 复古办公室。
- 用于站会、GitHub 评审流程、分析和系统监控的沉浸式操作空间。
- 用于 Gateway 连接详细信息、关注 Agent 偏好、办公桌分配、办公室状态及相关 UI 设置的本地 Studio 持久化。
- 一个自定义的同源 WebSocket 代理，使浏览器与 Studio 通信，Studio 与上游 OpenClaw Gateway 通信。

## 快速开始

要求：

- 推荐 Node.js 20+。
- 推荐 npm 10+。
- 一个运行中的 OpenClaw 安装，具有可访问的 Gateway URL 和 Token。

前提条件：

- Claw3D 不会为你安装、构建或运行 OpenClaw。
- 在启动 Claw3D 之前，请确保你的 OpenClaw Gateway 已经在运行，并且你知道想要 Studio 使用的 Gateway URL 和 Token。
- 本仓库仅包含 UI 和 Studio/代理层。
- 如果你需要完整的跨机器设置指南（OpenClaw + Tailscale + Claw3D），请遵循 [`TUTORIAL.md`](TUTORIAL.md)。

从源码运行：

```bash
git clone <你的公开仓库URL> claw3d
cd claw3d
npm install
cp .env.example .env
npm run dev
```

然后打开 `http://localhost:3000` 并在 Studio 中配置 Gateway URL 和 Token。

对于同一台机器上的本地 Gateway，通常的上游 URL 为：

```text
ws://localhost:18789
```

## 连接方式

Claw3D 使用两个独立的网络跳跃：

1. 浏览器 -> Studio：通过 HTTP 和 `/api/gateway/ws` 处的同源 WebSocket。
2. Studio -> OpenClaw Gateway：通过 Studio 服务器打开的第二个 WebSocket。

这意味着 `ws://localhost:18789` 始终指代从 Studio 主机可访问的 Gateway，而不一定是浏览器设备可访问的。

这种设计将 Gateway 设置持久化在 Studio 主机上，并允许 Studio 在服务端打开上游连接。目前的 UI 仍会在运行时将配置的上游 URL/Token 加载到浏览器内存中，因此请将浏览器视为活动信任边界的一部分。

## 常见设置

### Gateway 本地，Studio 本地

1. 使用 `npm run dev` 启动 Studio。
2. 打开 `http://localhost:3000`。
3. 使用 `ws://localhost:18789` 以及你的 OpenClaw Gateway Token。

### Gateway 远程，Studio 本地

使用你的机器可以到达的任何 Gateway URL。

推荐使用 Tailscale：

1. 在 Gateway 主机上，运行 `tailscale serve --yes --bg --https 443 http://127.0.0.1:18789`。
2. 在 Studio 中，使用 `wss://<gateway-host>.ts.net`。

使用 SSH 的替代方案：

1. 运行 `ssh -L 18789:127.0.0.1:18789 user@<gateway-host>`。
2. 在 Studio 中，使用 `ws://localhost:18789`。

### Studio 远程，Gateway 远程

1. 在远程主机上运行 Studio。
2. 在私有网络或通过 Tailscale 暴露 Studio。
3. 如果 Studio 绑定到公共主机，请设置 `STUDIO_ACCESS_TOKEN`。
4. 在 Studio 内部配置 Gateway URL 和 Token。

## 技术栈

- Main Web Application：Next.js App Router, React 和 TypeScript。
- Studio-side WebSocket Proxy：自定义 Node 服务器。
- 3D Office Experience：Three.js, React Three Fiber 和 Drei。
- Office/Viewer-builder workflows：Phaser。
- 测试：Vitest（单元测试）和 Playwright（端到端覆盖）。

## 配置

重要的运行时路径：

- OpenClaw 配置：`~/.openclaw/openclaw.json`
- Studio 设置：`~/.openclaw/claw3d/settings.json`

常见环境变量：

- `HOST` and `PORT` 控制 Studio 服务器的绑定地址和端口。
- `STUDIO_ACCESS_TOKEN` 在绑定到公共主机时保护 Studio。
- `NEXT_PUBLIC_GATEWAY_URL` 在 Studio 设置为空时提供默认的上游 Gateway URL。**注意：** 这是一个构建时变量——更改需要 `npm run build` 才能生效。
- `CLAW3D_GATEWAY_URL` and `CLAW3D_GATEWAY_TOKEN` 提供 `NEXT_PUBLIC_GATEWAY_URL` 的运行时替代方案，无需重新构建即可在服务器重启时生效。当 `openclaw.json` 不存在时，这些也用作回退。
- `OPENCLAW_STATE_DIR` and `OPENCLAW_CONFIG_PATH` 覆盖默认的 OpenClaw 路径。
- `OPENCLAW_GATEWAY_SSH_TARGET` 等支持需要时通过 SSH 进行高级 Gateway 主机操作。
- `ELEVENLABS_API_KEY` 等启用语音回复集成。

有关完整的本地开发模板，请参见 [`.env.example`](.env.example)。

## 脚本

- `npm run dev`：启动 Studio 开发服务器。
- `npm run build`：构建生产环境 Next.js 应用。
- `npm run start`：启动生产环境服务器。
- `npm run lint`：运行 ESLint。
- `npm run typecheck`：运行 TypeScript 类型检查。
- `npm run test`：使用 Vitest 运行单元测试。
- `npm run e2e`：运行 Playwright 测试。
- `npm run studio:setup`：准备常见的本地 Studio 前提条件。
- `npm run smoke:dev-server`：运行基本的开发服务器冒烟测试。

## 文档

- [`VISION.md`](VISION.md)：项目方向和长期准则。
- [`ARCHITECTURE.md`](ARCHITECTURE.md)：系统边界、数据流和主要权衡。
- [`TUTORIAL.md`](TUTORIAL.md)：OpenClaw + Tailscale + Claw3D 的详细分步设置。
- [`MULTI_AGENT_BETA.md`](MULTI_AGENT_BETA.md)：远程办公室测试版设置、连接模式和限制。
- [`CODE_DOCUMENTATION.md`](CODE_DOCUMENTATION.md)：实际代码图、扩展点和贡献者入职顺序。
- [`CONTRIBUTING.md`](CONTRIBUTING.md)：本地工作流、测试和 PR 预期。
- [`SUPPORT.md`](SUPPORT.md)：寻求帮助的地方及如何路由报告。
- [`ROADMAP.md`](ROADMAP.md)：近期优先事项和对贡献者友好的工作领域。
- [`docs/pi-chat-streaming.md`](docs/pi-chat-streaming.md)：Gateway 运行时流式传输和转录渲染。
- [`docs/permissions-sandboxing.md`](docs/permissions-sandboxing.md)：Studio 权限和 OpenClaw 行为。

## 当前限制

- 沉浸式复古办公室 (`/office`) 和 Phaser 构建器 (`/office/builder`) 是相关但仍然独立的栈。
- 应用将 Gateway 密钥保留在浏览器持久存储之外，但目前的连接流程仍会在运行时将上游 URL/Token 加载到浏览器内存中。
- `SOUNDCLAW` 的本地 Spotify 身份验证目前仅存储访问令牌。尚未实现刷新令牌处理，因此在令牌过期后可能需要重复本地 Spotify 身份验证。

## 故障排除

如果 UI 加载但连接失败，问题通常出在 Studio -> Gateway 端：

- 在 Studio 设置中确认上游 URL 和 Token。
- `EPROTO` 或 `wrong version number` 通常意味着对非 TLS 端点使用了 `wss://`。
- `401 Studio access token required` 通常意味着启用了 `STUDIO_ACCESS_TOKEN` 且请求缺少预期的 `studio_access` cookie。
- 常见的代理错误代码包括 `studio.gateway_url_missing`, `studio.gateway_token_missing`, `studio.upstream_error` 和 `studio.upstream_closed`。

市场技能安装现在使用 Gateway 原生工作区流程，不需要在用户机器上启用 SSH。

### 本地主机上的 Spotify 身份验证

如果你正在本地测试 `SOUNDCLAW` 点唱机，且 Spotify OAuth 不接受你的 `localhost` 回调，请使用 `ngrok` 回调桥接：

1. 保持 Claw3D 在本地运行（`http://localhost:3000`）。
2. 为本地 Studio 服务器启动 `ngrok`，例如 `ngrok http 3000`。
3. 在点唱机设置 UI 中，将你的公共 `ngrok` URL 粘贴到 `ngrok Public URL` 字段中。
4. 在 Spotify 开发人员仪表板中，将 `https://<your-ngrok-host>/spotify/callback` 注册为重定向 URI。
5. 从点唱机面板完成 Spotify 登录。

工作原理：

- 主 Claw3D 应用留在 `localhost`，因此你的普通本地办公室状态和 Agent 状态保持不变。
- Spotify 重定向到 `ngrok` 回调 URL。
- 回调页面将授权码传递回打开的本地 Claw3D window。

当前本地限制：

- 由于目前仅存储 Spotify 访问令牌，在本地开发过程中该令牌过期时，你可能需要重复 `ngrok` 身份验证流程。

如果你通过 SSH 使用其他高级 Gateway 主机操作：

- macOS：启用“系统设置” -> “通用” -> “共享” -> “远程登录”，并确保允许目标用户。
- Windows：启用“OpenSSH Server”可选功能，启动 `sshd` 服务，并在防火墙中允许它。
- Linux：确保 `sshd` 已安装、运行且可从 Studio 机器访问。

对于首次 SSH 连接，Claw3D 默认使用 `StrictHostKeyChecking=accept-new`，以便自动信任新主机密钥。如果你需要更严格的行为，请设置 `OPENCLAW_GATEWAY_SSH_STRICT_HOST_KEY_CHECKING=yes`。

## 贡献

保持 Pull Request 聚焦，在打开 PR 之前运行 `npm run lint`, `npm run typecheck` 和 `npm run test` ，并在行为或架构发生变化时更新文档。

## AI 编辑准则

如果你使用 Cursor 或其他 AI 辅助工作流，请审阅 [`.cursor/rules/claw3d-project-guardrails.mdc`](.cursor/rules/claw3d-project-guardrails.mdc) 中提交的项目准则。

该准则文件捕获了此仓库的共享编辑预期，包括 Claw3D 与 OpenClaw 的边界、代码放置约定、Office 栈区别以及文档/测试更新预期。

社区期望见 [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)。安全报告说明见 [`SECURITY.md`](SECURITY.md)。
