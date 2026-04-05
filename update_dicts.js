const fs = require('fs');

const agentSettingsExtraEn = `
  agentSettings: {
    title: "Agent Settings",
    description: "Detailed system configurations.",
    capabilities: {
      runCommands: "Run Commands",
      runCommandsOff: "Off",
      runCommandsAsk: "Ask",
      runCommandsAuto: "Auto",
      webAccess: "Web Access",
      webAccessDesc: "Allow fetching generic web pages",
      fileTools: "File Tools",
      fileToolsDesc: "Allow reading and writing files",
      browserAutomation: "Browser Automation",
      comingSoon: "Coming soon",
      saving: "Saving...",
      saved: "Saved!",
      couldNotSave: "Could not save.",
      retry: "Retry",
    },
    cron: {
      title: "Cron Automations",
      create: "Create new",
      loading: "Loading automations...",
      noAutomations: "No crons configured.",
      disabled: "Disabled",
      frequency: "Frequency",
      task: "Task",
      less: "Less details",
      more: "More details",
      heartbeatsTitle: "Heartbeat Loop",
      heartbeatsComingSoon: "Continuous autonomous operations coming soon.",
    },
    advanced: {
      dangerZone: "Danger Zone",
      warningContext: "Destructive actions.",
      openFullControlUi: "Open File UI",
      linkUnavailable: "Link Unavailable",
      deleteAgentDesc: "Permanently delete this agent.",
      deleteAgentBtn: "Delete Agent",
      systemAgentTitle: "System Agent",
      systemAgentDesc: "Special system-level operations.",
    },
    cronComposer: {
      title: "Create Cron Automation",
      close: "Close",
      step1Desc: "Step 1: Choose a task",
      step2Desc: "Step 2: Configure details",
      automationName: "Automation Name",
      task: "Prompt / Task",
      step3Desc: "Step 3: Set schedule",
      scheduleType: "Schedule Type",
      every: "Every",
      oneTime: "One-time",
      unit: "Unit",
      minutes: "Minutes",
      hours: "Hours",
      days: "Days",
      timeOfDay: "Time of day",
      timezone: "Timezone",
      runAt: "Run at",
      step4Desc: "Step 4: Review",
      untitled: "Untitled Task",
      noTask: "No task defined",
      schedule: "Schedule",
      stepOf: "Step {0} of {1}",
      back: "Back",
      next: "Next",
      create: "Create Automation",
    },
  },`;

const agentSettingsExtraZh = `
  agentSettings: {
    title: "智能体设置",
    description: "详细系统配置。",
    capabilities: {
      runCommands: "运行命令",
      runCommandsOff: "关闭",
      runCommandsAsk: "询问",
      runCommandsAuto: "自动",
      webAccess: "网络访问",
      webAccessDesc: "允许获取通用网页内容",
      fileTools: "文件工具",
      fileToolsDesc: "允许读写文件",
      browserAutomation: "浏览器自动化",
      comingSoon: "敬请期待",
      saving: "保存中...",
      saved: "已保存！",
      couldNotSave: "无法保存。",
      retry: "重试",
    },
    cron: {
      title: "定时自动化",
      create: "创建新的",
      loading: "加载自动化配置中...",
      noAutomations: "未配置任何定时任务。",
      disabled: "已禁用",
      frequency: "频率",
      task: "任务",
      less: "收起详情",
      more: "查看详情",
      heartbeatsTitle: "心跳循环",
      heartbeatsComingSoon: "持续自主运行功能即将推出。",
    },
    advanced: {
      dangerZone: "危险区域",
      warningContext: "破坏性操作。",
      openFullControlUi: "打开文件 UI",
      linkUnavailable: "链接不可用",
      deleteAgentDesc: "永久删除此智能体。",
      deleteAgentBtn: "删除智能体",
      systemAgentTitle: "系统智能体",
      systemAgentDesc: "特殊的系统级操作。",
    },
    cronComposer: {
      title: "创建定时自动化",
      close: "关闭",
      step1Desc: "步骤 1: 选择任务",
      step2Desc: "步骤 2: 配置详细信息",
      automationName: "自动化名称",
      task: "提示词 / 任务",
      step3Desc: "步骤 3: 设置执行计划",
      scheduleType: "计划类型",
      every: "每",
      oneTime: "一次性",
      unit: "单位",
      minutes: "分钟",
      hours: "小时",
      days: "天",
      timeOfDay: "执行时间",
      timezone: "时区",
      runAt: "运行时间",
      step4Desc: "步骤 4: 检查",
      untitled: "未命名的任务",
      noTask: "未定义任何任务",
      schedule: "执行计划",
      stepOf: "第 {0} 步，共 {1} 步",
      back: "返回",
      next: "下一步",
      create: "创建自动化",
    },
  },`;

const enFile = 'src/lib/i18n/dictionaries/en.ts';
const zhFile = 'src/lib/i18n/dictionaries/zh.ts';

let enText = fs.readFileSync(enFile, 'utf8');
let zhText = fs.readFileSync(zhFile, 'utf8');

if (!enText.substring(enText.indexOf('export const en')).includes('agentSettings: {')) {
  enText = enText.replace(/export const en: TranslationDict = \{/, 'export const en: TranslationDict = {\n' + agentSettingsExtraEn);
}

if (!zhText.substring(zhText.indexOf('export const zh')).includes('agentSettings: {')) {
  zhText = zhText.replace(/export const zh: TranslationDict = \{/, 'export const zh: TranslationDict = {\n' + agentSettingsExtraZh);
}

fs.writeFileSync(enFile, enText);
fs.writeFileSync(zhFile, zhText);

console.log('Update finished');
