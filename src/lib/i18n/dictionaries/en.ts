export type TranslationDict = {
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    error: string;
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
  };
  skillsMarketplace: {
    title: string;
    description: string;
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
  },
  skillsMarketplace: {
    title: "Skills Marketplace",
    description: "Discover, install, and enable gateway skills in a wider workspace.",
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
  },
};
