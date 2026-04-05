export type TranslationDict = {
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    error: string;
    enabled: string;
    disabled: string;
    on: string;
    off: string;
    clear: string;
    label: string;
    secondsAbbr: string;
    minutesAbbr: string;
    hoursAbbr: string;
    notAvailable: string;
    unknown: string;
  };
  hqSidebar: {
    collapseHq: string;
    openHq: string;
    marketplace: string;
    analytics: string;
    headquarters: string;
    analyticsDesc: string;
    hqDesc: string;
    addAgent: string;
    buildCompany: string;
    backToHq: string;
    tabs: {
      inbox: string;
      history: string;
      playbooks: string;
      analytics: string;
    };
  };
  onboarding: {
    title: string;
    back: string;
    next: string;
    enterOffice: string;
    connectFirst: string;
    steps: {
      welcome: { title: string; desc: string };
      prerequisites: { title: string; desc: string };
      connect: { title: string; desc: string };
      agents: { title: string; desc: string };
      company: { title: string; desc: string };
      complete: { title: string; desc: string };
    };
    welcomeTitle: string;
    welcomeDesc: string;
    welcomeSubDesc: string;
    features: {
      watch: { title: string; desc: string };
      manage: { title: string; desc: string };
      chat: { title: string; desc: string };
      build: { title: string; desc: string };
    };
  };
  agentEditor: {
    title: string;
    description: string;
    previous: string;
    next: string;
    deleteAgent: string;
    deleteAgentDesc: string;
    fileEditor: string;
    fileEditorDesc: string;
    connectToEdit: string;
    sections: {
      identity: { label: string; hint: string };
      avatar: { label: string; hint: string };
      soul: { label: string; hint: string };
      agents: { label: string; hint: string };
      user: { label: string; hint: string };
      tools: { label: string; hint: string };
      memory: { label: string; hint: string };
      heartbeat: { label: string; hint: string };
    };
    ariaLabel: string;
    closeAriaLabel: string;
  };
  skillsMarketplace: {
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
    searchAriaLabel: string;
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
  };
  eventConsole: {
    title: string;
    agents: string;
    events: string;
    copyJson: string;
    copied: string;
    copyFailed: string;
    downloadJson: string;
    clear: string;
    expand: string;
    minimize: string;
    searchPlaceholder: string;
    liveState: string;
    rawEvents: string;
    noEvents: string;
    noMatch: string;
    reset: string;
    liveStateNoMatch: string;
  };
  settingsPanel: {
    header: string;
    headerDesc: string;
    studioTitle: string;
    studioTitleDesc: string;
    ready: string;
    loading: string;
    gateway: string;
    gatewayDesc: string;
    noUrl: string;
    disconnectDesc: string;
    disconnectBtn: string;
    remoteOffice: string;
    remoteOfficeDesc: string;
    showSecondOffice: string;
    remoteOfficeHint: string;
    tokenSet: string;
    noToken: string;
    sourceType: string;
    sourceTypeDesc: string;
    sources: {
      presence: string;
      gateway: string;
    };
    label: string;
    presenceUrl: string;
    presenceUrlDesc: string;
    optionalToken: string;
    enterToken: string;
    tokenPlaceholder: string;
    gatewayUrl: string;
    gatewayUrlDesc: string;
    sharedToken: string;
    sharedTokenDesc: string;
    onboarding: string;
    onboardingDesc: string;
    launchWizard: string;
    voiceReplies: string;
    voiceRepliesDesc: string;
    voice: string;
    voiceDesc: string;
    speed: string;
    speedDesc: string;
    slower: string;
    faster: string;
    officeTitleLabel: string;
    officeTitlePlaceholder: string;
    officeTitleFootnote: string;
    remoteOfficeLabel: string;
    remoteOfficeLabelPlaceholder: string;
    presenceUrlPlaceholder: string;
  };

  agentSettings: {
    title: string;
    description: string;
    capabilities: {
      runCommands: string;
      runCommandsOff: string;
      runCommandsAsk: string;
      runCommandsAuto: string;
      webAccess: string;
      webAccessDesc: string;
      fileTools: string;
      fileToolsDesc: string;
      browserAutomation: string;
      comingSoon: string;
      saving: string;
      saved: string;
      couldNotSave: string;
      retry: string;
    };
    cron: {
      title: string;
      create: string;
      loading: string;
      noAutomations: string;
      disabled: string;
      frequency: string;
      task: string;
      less: string;
      more: string;
      heartbeatsTitle: string;
      heartbeatsComingSoon: string;
    };
    advanced: {
      dangerZone: string;
      warningContext: string;
      openFullControlUi: string;
      linkUnavailable: string;
      deleteAgentDesc: string;
      deleteAgentBtn: string;
      systemAgentTitle: string;
      systemAgentDesc: string;
    };
    cronComposer: {
      title: string;
      close: string;
      step1Desc: string;
      step2Desc: string;
      automationName: string;
      task: string;
      step3Desc: string;
      scheduleType: string;
      every: string;
      oneTime: string;
      unit: string;
      minutes: string;
      hours: string;
      days: string;
      timeOfDay: string;
      timezone: string;
      runAt: string;
      step4Desc: string;
      untitled: string;
      noTask: string;
      schedule: string;
      stepOf: string;
      back: string;
      next: string;
      create: string;
    };
  };

  agentChat: {
    execApproval: {
      title: string;
      allowOnce: string;
      allowAlways: string;
      deny: string;
      hostLabel: string;
      expiresLabel: string;
      cwdLabel: string;
      allowOnceAria: string;
      allowAlwaysAria: string;
      denyAria: string;
    };
    thinking: string;
    thinkingInternal: string;
    intros: string[];
    emptyStateHint: string;
    historyLimit: string;
    you: string;
    loadMore: string;
    jumpToLatest: string;
    chooseModel: string;
    selectReasoningEffort: string;
    showToolCalls: string;
    showThinkingTraces: string;
    queued: string;
    removeQueuedMessage: string;
    stopping: string;
    stop: string;
    send: string;
    typeMessagePlaceholder: string;
  };
  gatewayConnect: {
    localFoundConnecting: string;
    remoteConnecting: string;
    noLocalFound: string;
    notConnected: string;
    connectingBtn: string;
    connectBtn: string;
    upstreamUrl: string;
    gatewayUrlPlaceholder: string;
    usingTailscale: string;
    urlFormat: string;
    upstreamToken: string;
    gatewayTokenPlaceholder: string;
    hideToken: string;
    showToken: string;
    ifFirstAttempt: string;
    remoteGateway: string;
    remoteGatewayDesc: string;
    runLocally: string;
    runLocallyDesc: string;
    useTokenFrom: string;
    useLocalDefaults: string;
    copyCommandLabel: string;
    copyCommandTitle: string;
    copied: string;
    copyFailed: string;
    sourceCheckoutPrefix: string;
    connectingStatus: string;
  };
  analytics: {
    title: string;
    description: string;
    start: string;
    end: string;
    lastRefresh: string;
    noSnapshot: string;
    refresh: string;
    budgetThreshold: string;
    openCalendarAriaLabel: string;
    totals: {
      spendLabel: string;
      spendHint: string;
      tokensLabel: string;
      tokensHint: string;
      successRateLabel: string;
      successRateHint: string;
      runtimeLabel: string;
      runtimeHint: string;
    };
    budgetLimits: string;
    dailyUsd: string;
    noLimit: string;
    monthlyUsd: string;
    perAgentUsd: string;
    softLimit: string;
    alertThreshold: string;
    dailyCost: string;
    loading: string;
    noData: string;
    costBreakdown: string;
    input: string;
    output: string;
    cacheRead: string;
    cacheWrite: string;
    topAgents: string;
    modelBreakdown: string;
    performance: {
      title: string;
      approvalsLabel: string;
      approvalsHint: string;
      interventionLabel: string;
      interventionHint: string;
      toolCallsLabel: string;
      toolCallsHint: string;
      completedRunsLabel: string;
      completedRunsHint: string;
      runs: string;
      success: string;
      avgRuntime: string;
      noData: string;
    };
  };
  skills: {
    title: string;
    systemTitle: string;
    agentAccessHint: string;
    selectedOnlyHint: string;
    systemAffectsAllHint: string;
    searchPlaceholder: string;
    loading: string;
    noMatching: string;
    needsSetupCount: string;
    setupBtn: string;
    configureBtn: string;
    openSystemSetupBtn: string;
    working: string;
    enableGlobally: string;
    disableGlobally: string;
    removeForAll: string;
    removeConfirm: string;
    setApiKey: string;
    saveApiKey: string;
    filters: {
      all: string;
      ready: string;
      setupRequired: string;
      notSupported: string;
      unavailable: string;
      disabledGlobally: string;
    };
    status: {
      ready: string;
      setupRequired: string;
      notSupported: string;
      unavailable: string;
      disabledGlobally: string;
    };
    hints: {
      blockedPolicy: string;
      requiresOs: string;
      disabledGlobally: string;
      requiresSetup: string;
      unavailableSystem: string;
    };
  };
  history: {
    title: string;
    description: string;
    agent: string;
    allAgents: string;
    trigger: string;
    allTriggers: string;
    triggers: {
      user: string;
      heartbeat: string;
      cron: string;
    };
    noRecords: string;
    started: string;
    duration: string;
    outcome: string;
    running: string;
    error: string;
    completed: string;
    sRunning: string;
  };
  inbox: {
    title: string;
    description: string;
    noAgents: string;
    noOutput: string;
    new: string;
    time: {
      justNow: string;
      mAgo: string;
      hAgo: string;
      dAgo: string;
    };
  };
  playbooks: {
    title: string;
    description: string;
    refresh: string;
    activeJobs: string;
    loading: string;
    noJobs: string;
    nextRun: string;
    lastRun: string;
    running: string;
    runNow: string;
    deleting: string;
    delete: string;
    automatedStandup: string;
    standupDesc: string;
    startNow: string;
    enableScheduled: string;
    cronExpr: string;
    timezone: string;
    secondsPerSpeaker: string;
    autoOpenBoard: string;
    enableJira: string;
    jiraBaseUrl: string;
    jiraEmail: string;
    jiraApiToken: string;
    jiraApiTokenStored: string;
    jiraProjectKey: string;
    jiraJql: string;
    savingStandupSettings: string;
    saveStandupSettings: string;
    manualBoardInput: string;
    agent: string;
    selectAgent: string;
    jiraAssigneeHint: string;
    currentTask: string;
    blockers: string;
    manualNote: string;
    saveManualNotes: string;
    meetingPhase: string;
    participants: string;
    currentSpeaker: string;
    waiting: string;
    templates: string;
    nameOverride: string;
    creatingPlaybook: string;
    launchPlaybook: string;
    unknown: string;
    templateList: {
      dailyBriefing: { name: string; description: string; message: string; };
      nightlyReview: { name: string; description: string; message: string; };
      hourlyHealth: { name: string; description: string; message: string; };
      weeklyReport: { name: string; description: string; message: string; };
      continuousMonitor: { name: string; description: string; message: string; };
    };
  };
  connectStep: {
    connected: string;
    connectedDesc: string;
    notConnected: string;
    gatewayUrl: string;
    gatewayToken: string;
    hideToken: string;
    showToken: string;
    connectingBtn: string;
    connectBtn: string;
    hints: {
      localLabel: string;
      localDesc: string;
      tailscaleLabel: string;
      tailscaleDesc: string;
      sshLabel: string;
      sshDesc: string;
    };
  };
};

export const en: TranslationDict = {
  common: {
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    error: "Error",
    enabled: "Enabled",
    disabled: "Disabled",
    on: "On",
    off: "Off",
    clear: "Clear",
    label: "Label",
    secondsAbbr: "s",
    minutesAbbr: "m",
    hoursAbbr: "h",
    notAvailable: "n/a",
    unknown: "Unknown",
  },
  hqSidebar: {
    collapseHq: "COLLAPSE HQ",
    openHq: "OPEN HQ",
    marketplace: "MARKETPLACE",
    analytics: "ANALYTICS",
    headquarters: "HEADQUARTERS",
    analyticsDesc: "Cost, budgets, and performance intelligence.",
    hqDesc: "Monitor outputs, runs, and schedules.",
    addAgent: "Add Agent",
    buildCompany: "Build Company",
    backToHq: "Back To HQ",
    tabs: {
      inbox: "Inbox",
      history: "History",
      playbooks: "Playbooks",
      analytics: "Analytics",
    },
  },
  onboarding: {
    title: "Onboarding",
    back: "Back",
    next: "Next",
    enterOffice: "Enter Office",
    connectFirst: "Connect first",
    steps: {
      welcome: { title: "Welcome to Claw3D", desc: "Your AI office in 3D" },
      prerequisites: { title: "Before You Start", desc: "What you'll need" },
      connect: { title: "Connect Your Gateway", desc: "Link to your OpenClaw instance" },
      agents: { title: "Your Agents", desc: "Meet your AI team" },
      company: { title: "Build Your Company", desc: "Generate your org structure" },
      complete: { title: "You're All Set", desc: "Start exploring" },
    },
    welcomeTitle: "Welcome",
    welcomeDesc: "Claw3D turns your AI automation into a visual workplace — an office where your OpenClaw agents collaborate, code, test, and execute tasks in a shared 3D environment.",
    welcomeSubDesc: "This wizard will help you connect to your OpenClaw gateway and get started in about two minutes.",
    features: {
      watch: { title: "Watch agents work", desc: "See your AI agents in real time in a shared 3D office" },
      manage: { title: "Manage your fleet", desc: "Create, configure, and monitor agents from one place" },
      chat: { title: "Chat and approve", desc: "Talk to agents, approve exec commands, review their work" },
      build: { title: "Build your office", desc: "Customize rooms, desks, and the whole office layout" },
    },
  },
  agentEditor: {
    title: "Agent editor",
    description: "Edit avatar and agent brain settings from the office.",
    previous: "Previous",
    next: "Next",
    deleteAgent: "Delete Agent",
    deleteAgentDesc: "Remove this agent from Claw3D and OpenClaw.",
    fileEditor: "Agent file editor",
    fileEditorDesc: "Edit one agent file at a time and save it through the gateway.",
    connectToEdit: "Connect to a gateway to edit brain files.",
    sections: {
      identity: { label: "Identity", hint: "Basic agent profile" },
      avatar: { label: "Avatar", hint: "Office appearance" },
      soul: { label: "Soul", hint: "Core personality" },
      agents: { label: "Agents", hint: "Sub-agent configuration" },
      user: { label: "User", hint: "Human operator data" },
      tools: { label: "Tools", hint: "Tool definitions" },
      memory: { label: "Memory", hint: "Knowledge structure" },
      heartbeat: { label: "Heartbeat", hint: "Internal state loop" },
    },
    ariaLabel: "Edit {0}",
    closeAriaLabel: "Close agent editor",
  },
  skillsMarketplace: {
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
    searchAriaLabel: "Search marketplace skills",

    successHint: "Check the `CLAW3D` filter below to find the installed skill quickly.",
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
      footerNote: "`Enable/Disable for agent` only changes access for the selected agent. `Remove for all agents` deletes the installed skill from the gateway workspace.",
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
  },
  eventConsole: {
    title: "OpenClaw Event Console",
    agents: "agents",
    events: "events",
    copyJson: "Copy JSON",
    copied: "Copied",
    copyFailed: "Copy Failed",
    downloadJson: "Download JSON",
    clear: "Clear",
    expand: "Expand",
    minimize: "Minimize",
    searchPlaceholder: "Search logs, payloads, thinking, user text.",
    liveState: "Live OpenClaw State",
    rawEvents: "Raw OpenClaw Gateway Events",
    noEvents: "No OpenClaw gateway events received yet.",
    noMatch: "No OpenClaw events match the current search.",
    reset: "Reset",
    liveStateNoMatch: "Live OpenClaw state does not match the current search.",
  },
  settingsPanel: {
    header: "STUDIO SETTINGS",
    headerDesc: "Customize the office banner and spoken replies across the app.",
    studioTitle: "Studio title",
    studioTitleDesc: "Customize the banner shown at the top of the office.",
    ready: "Ready",
    loading: "Loading",
    gateway: "Gateway",
    gatewayDesc: "Current studio connection and endpoint details.",
    noUrl: "No gateway URL configured.",
    disconnectDesc: "Disconnecting returns you to the gateway connect screen.",
    disconnectBtn: "Disconnect gateway",
    remoteOffice: "Remote office",
    remoteOfficeDesc: "Attach a second read-only office from either another Claw3D or a remote OpenClaw gateway.",
    showSecondOffice: "Show second office",
    remoteOfficeHint: "Remote agents stay visible but non-interactive.",
    tokenSet: "Token set",
    noToken: "No token",
    sourceType: "Source type",
    sourceTypeDesc: "Use a presence endpoint when the other machine runs Claw3D. Use gateway mode when the other machine only runs OpenClaw.",
    sources: {
      presence: "Remote Claw3D presence endpoint",
      gateway: "Remote OpenClaw gateway",
    },
    label: "Label",
    presenceUrl: "Presence URL",
    presenceUrlDesc: "Studio polls this endpoint server-side when the other machine is also running Claw3D.",
    optionalToken: "Optional token",
    enterToken: "Enter token",
    tokenPlaceholder: "Token configured. Enter a new one to replace it.",
    gatewayUrl: "Gateway URL",
    gatewayUrlDesc: "Claw3D connects from the browser directly to the remote OpenClaw gateway and derives a read-only presence snapshot.",
    sharedToken: "Shared gateway token",
    sharedTokenDesc: "Optional. Browser-based remote presence and messaging can work without it when the remote gateway already allows your Control UI origin.",
    onboarding: "Onboarding",
    onboardingDesc: "Re-open the onboarding wizard to test the new-user flow.",
    launchWizard: "Launch wizard",
    voiceReplies: "Voice replies",
    voiceRepliesDesc: "Play finalized assistant replies with a natural voice.",
    voice: "Voice",
    voiceDesc: "Choose the voice used for spoken agent replies.",
    speed: "Speed",
    speedDesc: "Adjust how fast the selected voice speaks.",
    slower: "Slower",
    faster: "Faster",
    officeTitleLabel: "Studio title",
    officeTitlePlaceholder: "Luke Headquarters",
    officeTitleFootnote: "Used in the office scene header.",
    remoteOfficeLabel: "Label",
    remoteOfficeLabelPlaceholder: "Remote Office",
    presenceUrlPlaceholder: "https://other-office.example.com/api/office/presence",
  },

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
  },

  agentChat: {
    execApproval: {
      title: "Execution Approval",
      allowOnce: "Allow Once",
      allowAlways: "Allow Always",
      deny: "Deny",
      hostLabel: "Host",
      expiresLabel: "Expires",
      cwdLabel: "CWD",
      allowOnceAria: "Allow once for exec approval {0}",
      allowAlwaysAria: "Always allow for exec approval {0}",
      denyAria: "Deny exec approval {0}",
    },
    thinking: "Thinking...",
    thinkingInternal: "{0} (internal)",
    intros: [
      "How can I help you today?",
      "What should we accomplish today?",
      "Ready when you are. What do you want to tackle?",
      "What are we working on today?",
      "I'm here and ready. What's the plan?",
    ],
    emptyStateHint: "Try describing a task, bug, or question to get started.",
    historyLimit: "Showing most recent {0} messages (limit {1})",
    you: "You",
    loadMore: "Load more",
    jumpToLatest: "Jump to latest",
    chooseModel: "Choose Model",
    selectReasoningEffort: "Reasoning Effort",
    showToolCalls: "Show tool calls",
    showThinkingTraces: "Show thinking traces",
    queued: "Queued",
    removeQueuedMessage: "Remove queued message",
    stopping: "Stopping...",
    stop: "Stop",
    send: "Send",
    typeMessagePlaceholder: "Message agent...",
  },
  gatewayConnect: {
    localFoundConnecting: "Local gateway found, connecting...",
    remoteConnecting: "Connecting to remote gateway...",
    noLocalFound: "No local gateway found.",
    notConnected: "Not connected",
    connectingBtn: "Connecting...",
    connectBtn: "Connect",
    upstreamUrl: "Gateway URL",
    gatewayUrlPlaceholder: "e.g. wss://gateway.example.com",
    usingTailscale: "Using Tailscale? Ensure magic DNS is enabled.",
    urlFormat: "Ensure protocol (ws:// or wss://) is provided.",
    upstreamToken: "Gateway Token",
    gatewayTokenPlaceholder: "Enter token...",
    hideToken: "Hide token",
    showToken: "Show token",
    ifFirstAttempt: "If this is your first attempt, make sure the gateway is running.",
    remoteGateway: "Remote Gateway",
    remoteGatewayDesc: "Connect to a remote OpenClaw instance.",
    runLocally: "Run Locally",
    runLocallyDesc: "Run OpenClaw natively on this machine.",
    useTokenFrom: "Use token from your configuration",
    useLocalDefaults: "Use local defaults",
    copyCommandLabel: "Copy local gateway command",
    copyCommandTitle: "Copy command",
    copied: "Copied",
    copyFailed: "Could not copy command.",
    sourceCheckoutPrefix: "In a source checkout, use {0}.",
    connectingStatus: "Connecting...",
  },
  analytics: {
    title: "Analytics",
    description: "Cost, budget, and performance data across all agents.",
    start: "Start Date",
    end: "End Date",
    lastRefresh: "Last refreshed: {0}",
    noSnapshot: "No snapshot available",
    refresh: "Refresh Dashboard",
    budgetThreshold: "Budget Alert Threshold",
    openCalendarAriaLabel: "Open {0} calendar",
    totals: {
      spendLabel: "Total Spend",
      spendHint: "Total API cost across all models",
      tokensLabel: "Total Tokens",
      tokensHint: "Input, output, and cached tokens",
      successRateLabel: "Success Rate",
      successRateHint: "Percentage of jobs completed without errors",
      runtimeLabel: "Total Runtime",
      runtimeHint: "Cumulative execution time for all jobs",
    },
    budgetLimits: "Budget & Limits",
    dailyUsd: "Daily USD Limit",
    noLimit: "No Limit",
    monthlyUsd: "Monthly USD Limit",
    perAgentUsd: "Per-Agent USD Limit (Daily)",
    softLimit: "Soft Limit",
    alertThreshold: "Alert Threshold",
    dailyCost: "Daily Cost (Last 30 Days)",
    loading: "Loading analytics data...",
    noData: "No data available in this timeframe",
    costBreakdown: "Cost Breakdown",
    input: "Input",
    output: "Output",
    cacheRead: "Cache Read",
    cacheWrite: "Cache Write",
    topAgents: "Top Agents by Spend",
    modelBreakdown: "Usage by Model",
    performance: {
      title: "Performance Metrics",
      approvalsLabel: "Approvals Required",
      approvalsHint: "Wait operations requiring human approval",
      interventionLabel: "Human Interventions",
      interventionHint: "Manual resets or corrections",
      toolCallsLabel: "Tool Calls",
      toolCallsHint: "Total tools invoked during execution",
      completedRunsLabel: "Completed Runs",
      completedRunsHint: "Number of successfully completed job runs",
      runs: "Runs",
      success: "Success",
      avgRuntime: "Avg. Runtime",
      noData: "No performance data available",
    },
  },
  skills: {
    title: "Skills",
    systemTitle: "System skill setup",
    agentAccessHint: "Skill access controls apply to this agent.",
    selectedOnlyHint: "This agent is using selected skills only.",
    systemAffectsAllHint: "Changes affect all agents on this gateway.",
    searchPlaceholder: "Search skills",
    loading: "Loading skills...",
    noMatching: "No matching skills.",
    needsSetupCount: "Needs setup ({0})",
    setupBtn: "Set up",
    configureBtn: "Configure",
    openSystemSetupBtn: "Open System Setup",
    working: "Working...",
    enableGlobally: "Enable globally",
    disableGlobally: "Disable globally",
    removeForAll: "Remove for all agents",
    removeConfirm: "Remove {0} from the gateway for all agents?",
    setApiKey: "Set {0}",
    saveApiKey: "Save {0}",
    filters: {
      all: "All",
      ready: "Ready",
      setupRequired: "Setup required",
      notSupported: "Not supported",
      unavailable: "Unavailable",
      disabledGlobally: "Disabled globally",
    },
    status: {
      ready: "Ready",
      setupRequired: "Setup required",
      notSupported: "Not supported",
      unavailable: "Unavailable",
      disabledGlobally: "Disabled globally",
    },
    hints: {
      blockedPolicy: "Blocked by bundled skills policy.",
      requiresOs: "Requires OS: {0}",
      disabledGlobally: "Disabled globally. Enable it in System setup.",
      requiresSetup: "Requires setup in System setup.",
      unavailableSystem: "Unavailable on this system.",
    },
  },
  history: {
    title: "Office History",
    description: "Audit log of all agent runs, tasks, and system events.",
    agent: "Agent",
    allAgents: "All Agents",
    trigger: "Trigger",
    allTriggers: "All Triggers",
    triggers: {
      user: "User",
      heartbeat: "Heartbeat",
      cron: "Cron",
    },
    noRecords: "No history records found matching criteria.",
    started: "Started",
    duration: "Duration",
    outcome: "Outcome",
    running: "Running",
    error: "Error",
    completed: "Completed",
    sRunning: "Running ({0}s)",
  },
  inbox: {
    title: "Inbox",
    description: "Notifications, approval requests, and immediate actions.",
    noAgents: "No agents configured",
    noOutput: "No messages to display",
    new: "New",
    time: {
      justNow: "Just now",
      mAgo: "{0}m ago",
      hAgo: "{0}h ago",
      dAgo: "{0}d ago",
    },
  },
  playbooks: {
    title: "Playbooks",
    description: "Pre-configured workflows and scheduled automations.",
    refresh: "Refresh list",
    activeJobs: "Active Jobs",
    loading: "Loading playbooks...",
    noJobs: "No active jobs",
    nextRun: "Next Run",
    lastRun: "Last Run",
    running: "Running",
    runNow: "Run Now",
    deleting: "Deleting...",
    delete: "Delete",
    automatedStandup: "Automated Standup",
    standupDesc: "Daily standup meeting simulation",
    startNow: "Start Now",
    enableScheduled: "Enable Scheduled Run",
    cronExpr: "Cron Expression",
    timezone: "Timezone",
    secondsPerSpeaker: "Seconds Per Speaker",
    autoOpenBoard: "Auto-open Jira board",
    enableJira: "Enable Jira Integration",
    jiraBaseUrl: "Jira Base URL",
    jiraEmail: "Jira Email",
    jiraApiToken: "Jira API Token",
    jiraApiTokenStored: "Token securely stored",
    jiraProjectKey: "Jira Project Key",
    jiraJql: "JQL Filter (Optional)",
    savingStandupSettings: "Saving...",
    saveStandupSettings: "Save Settings",
    manualBoardInput: "Manual Board Setup",
    agent: "Agent Selection",
    selectAgent: "Select an agent...",
    jiraAssigneeHint: "(Matches Jira assignee)",
    currentTask: "Current Task",
    blockers: "Blockers",
    manualNote: "Additional Notes",
    saveManualNotes: "Save Board",
    meetingPhase: "Meeting Phase",
    participants: "Participants",
    currentSpeaker: "Current Speaker",
    waiting: "Waiting for next speaker...",
    templates: "Playbook Templates",
    nameOverride: "Name override (Optional)",
    creatingPlaybook: "Creating...",
    launchPlaybook: "Launch playbook",
    unknown: "Unknown",
    templateList: {
      dailyBriefing: {
        name: "Daily Morning Briefing",
        description: "Every day at 9am. Summarize priorities, blockers, and what changed overnight.",
        message: "Create a concise morning briefing for headquarters. Summarize current priorities, blocked work, recent notable changes, and the next recommended actions.",
      },
      nightlyReview: {
        name: "Nightly Code Review Digest",
        description: "Every night at midnight. Review the day and summarize risky changes or regressions.",
        message: "Review the latest work available to you and produce a digest of risky changes, unresolved questions, and follow-up recommendations for the team.",
      },
      hourlyHealth: {
        name: "Hourly Health Check",
        description: "Every 60 minutes. Report runtime health, failures, and anything that needs intervention.",
        message: "Run a health check. Summarize your current status, errors, blocked tasks, pending approvals, and whether a human needs to step in.",
      },
      weeklyReport: {
        name: "Weekly Progress Report",
        description: "Every Monday at 8am. Roll up wins, unfinished work, and next steps.",
        message: "Write a weekly progress report for headquarters. Include completed work, unfinished work, risks, and the most important next steps.",
      },
      continuousMonitor: {
        name: "Continuous Monitor",
        description: "Every 15 minutes. Watch for drift, silent failures, or anything unusual.",
        message: "Monitor your current context and report only if you detect unusual behavior, blocked progress, repeated failures, or opportunities that need attention.",
      },
    },
  },
  connectStep: {
    connected: "Connected",
    connectedDesc: "Gateway authenticated successfully.",
    notConnected: "Not connected",
    gatewayUrl: "Gateway URL",
    gatewayToken: "Gateway Token",
    hideToken: "Hide token",
    showToken: "Show token",
    connectingBtn: "Connecting...",
    connectBtn: "Connect",
    hints: {
      localLabel: "Local?",
      localDesc: "Use ws://localhost:18789",
      tailscaleLabel: "Tailscale?",
      tailscaleDesc: "Use wss://your-host.ts.net",
      sshLabel: "SSH tunnel?",
      sshDesc: "Forward port 18789 and use localhost",
    },
  },
};
