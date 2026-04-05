const fs = require('fs');

const extendedType = `skillsMarketplace: {
    title: string;
    description: string;
    refresh: string;
    contextNotice: string;
    agentContext: string;
    noAgent: string;
    accessModeSelected: string;
    accessModePrefix: string;
    noAgentsAvailable: string;
    focusChat: string;
    settings: string;
    searchPlaceholder: string;
    successHint: string;
    loading: string;
    featuredShelf: string;
    featuredBadge: string;
    installsCount: string;
    poweredBy: string;
    noMatching: string;
    actions: {
      installSkill: string;
      installDeps: string;
      enableGateway: string;
      openSettings: string;
      disableForAgent: string;
      enableForAgent: string;
      removeForAll: string;
      details: string;
      manageSettings: string;
      homepage: string;
    };
    statusDocs: {
      enabled: string;
      disabled: string;
      removeWarning: string;
    };
    detail: {
      title: string;
      rating: string;
      installs: string;
      source: string;
      capabilities: string;
      setupNotes: string;
      installNotice: string;
      footerNote: string;
    };
    filters: {
      claw3d: string;
      all: string;
      featured: string;
      installed: string;
      setupRequired: string;
      builtIn: string;
      workspace: string;
      extra: string;
      other: string;
    };
    readiness: {
      ready: string;
      needsSetup: string;
      unavailable: string;
      disabledGlobally: string;
    };
  };`;

const extendedEn = `skillsMarketplace: {
    title: "Skills Marketplace",
    description: "Browse gateway skills like a curated plugin store.",
    refresh: "Refresh",
    contextNotice: "Packaged skill installs target the selected agent workspace. Global setup actions still affect the whole gateway. Agent access controls below apply only to the selected agent.",
    agentContext: "Agent context",
    noAgent: "No agent selected",
    accessModeSelected: "Selected skills",
    accessModePrefix: "Access mode:",
    noAgentsAvailable: "No agents available",
    focusChat: "Focus chat",
    settings: "Settings",
    searchPlaceholder: "Search skills, categories, or sources",
    successHint: "Check the \`CLAW3D\` filter below to find the installed skill quickly.",
    loading: "Loading marketplace inventory...",
    featuredShelf: "Featured shelf",
    featuredBadge: "Featured",
    installsCount: "installs",
    poweredBy: "Powered by",
    noMatching: "No matching skills found for this gateway.",
    actions: {
      installSkill: "Install skill",
      installDeps: "Install deps",
      enableGateway: "Enable gateway",
      openSettings: "Open settings",
      disableForAgent: "Disable for agent",
      enableForAgent: "Enable for agent",
      removeForAll: "Remove for all agents",
      details: "Details",
      manageSettings: "Manage in settings",
      homepage: "Homepage",
    },
    statusDocs: {
      enabled: "This skill is currently enabled for the selected agent.",
      disabled: "This skill is currently disabled for the selected agent.",
      removeWarning: "Removing from the gateway deletes the installed skill for every agent.",
    },
    detail: {
      title: "Skill detail",
      rating: "Rating",
      installs: "Installs",
      source: "Source",
      capabilities: "Capabilities",
      setupNotes: "Setup notes",
      installNotice: "Packaged installs land in the selected workspace. Gateway setup changes still apply to every agent, and agent enablement depends on the selected agent's allowlist.",
      footerNote: "\`Enable/Disable for agent\` only changes access for the selected agent. \`Remove for all agents\` deletes the installed skill from the gateway workspace.",
    },
    filters: {
      claw3d: "Claw3D",
      all: "All",
      featured: "Featured",
      installed: "Installed",
      setupRequired: "Needs setup",
      builtIn: "Built-in",
      workspace: "Workspace",
      extra: "Community",
      other: "Other",
    },
    readiness: {
      ready: "Ready",
      needsSetup: "Needs setup",
      unavailable: "Unavailable",
      disabledGlobally: "Disabled globally",
    },
  },`;

const extendedZh = `skillsMarketplace: {
    title: "技能市场",
    description: "像插件商店一样浏览网关技能。",
    refresh: "刷新",
    contextNotice: "打包技能的安装仅针对当前选择的智能体。全局的安装操作仍应用于整个网关。下方的访问控制仅对当前智能体有效。",
    agentContext: "当前智能体",
    noAgent: "未选择智能体",
    accessModeSelected: "已选技能",
    accessModePrefix: "访问模式:",
    noAgentsAvailable: "无可用智能体",
    focusChat: "切换至聊天",
    settings: "设置",
    searchPlaceholder: "搜索技能、类别或来源",
    successHint: "查看下方的 \`CLAW3D\` 列表以快速找到刚安装的技能。",
    loading: "正在加载市场库存...",
    featuredShelf: "精选",
    featuredBadge: "精选",
    installsCount: "次安装",
    poweredBy: "技术支持:",
    noMatching: "未找到匹配此网关的技能。",
    actions: {
      installSkill: "安装技能",
      installDeps: "安装依赖",
      enableGateway: "启用网关",
      openSettings: "打开设置",
      disableForAgent: "对智能体禁用",
      enableForAgent: "对智能体启用",
      removeForAll: "为所有智能体移除",
      details: "详细信息",
      manageSettings: "在设置中管理",
      homepage: "主页",
    },
    statusDocs: {
      enabled: "当前智能体已启用此技能。",
      disabled: "当前智能体未启用此技能。",
      removeWarning: "从网关中移除会删除所有智能体对该技能的访问。",
    },
    detail: {
      title: "技能详情",
      rating: "评分",
      installs: "安装量",
      source: "来源",
      capabilities: "能力",
      setupNotes: "安装说明",
      installNotice: "打包技能将安装在当前环境。全局设置更改将影响所有智能体，且智能体的使用权限取决于各自的白名单。",
      footerNote: "\`对智能体启用/禁用\` 仅改变当前智能体的访问权限。\`为所有智能体移除\` 将从整个网关应用中删除该技能。",
    },
    filters: {
      claw3d: "Claw3D",
      all: "全部",
      featured: "精选",
      installed: "已安装",
      setupRequired: "需配置",
      builtIn: "内置",
      workspace: "工作区",
      extra: "社区",
      other: "其他",
    },
    readiness: {
      ready: "已就绪",
      needsSetup: "需配置",
      unavailable: "不可用",
      disabledGlobally: "全局已禁用",
    },
  },`;

const enFile = 'src/lib/i18n/dictionaries/en.ts';
const zhFile = 'src/lib/i18n/dictionaries/zh.ts';

let enText = fs.readFileSync(enFile, 'utf8');
let zhText = fs.readFileSync(zhFile, 'utf8');

enText = enText.replace(/skillsMarketplace:\s*\{\s*title:\s*string;\s*description:\s*string;\s*};/g, extendedType);
zhText = zhText.replace(/skillsMarketplace:\s*\{\s*title:\s*string;\s*description:\s*string;\s*};/g, extendedType);

enText = enText.replace(/skillsMarketplace:\s*\{\s*title:[^]*?description:\s*[^]*?\},/g, extendedEn);
zhText = zhText.replace(/skillsMarketplace:\s*\{\s*title:[^]*?description:\s*[^]*?\},/g, extendedZh);

fs.writeFileSync(enFile, enText);
fs.writeFileSync(zhFile, zhText);

console.log('Skills Marketplace Dict Updated');
