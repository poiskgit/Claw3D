const fs = require('fs');
const file = 'src/features/office/components/panels/SkillsMarketplacePanel.tsx';
let text = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!text.includes('useTranslation')) {
  text = text.replace(/import \{ useMemo, useState \} from "react";/, 'import { useMemo, useState } from "react";\nimport { useTranslation } from "@/lib/i18n/useTranslation";');
}

// 2. Add `const { t } = useTranslation();`
if (!text.includes('const { t } = useTranslation();')) {
  text = text.replace(/(export function SkillsMarketplacePanel[\s\S]*?\{)/, '$1\n  const { t } = useTranslation();');
}

// 3. Replace definitions outside component
// We can just replace the definition to use a function
text = text.replace(/const FILTER_LABELS: Record<MarketplaceFilter, string> = \{[\s\S]*?\};\n/, '');
text = text.replace(/const READINESS_LABELS = \{[\s\S]*?\} as const;\n/, '');

const newLabels = `
const getFilterLabel = (t: any, id: string) => {
  const map: Record<string, string> = {
    claw3d: t("skillsMarketplace.filters.claw3d"),
    all: t("skillsMarketplace.filters.all"),
    featured: t("skillsMarketplace.filters.featured"),
    installed: t("skillsMarketplace.filters.installed"),
    "setup-required": t("skillsMarketplace.filters.setupRequired"),
    "built-in": t("skillsMarketplace.filters.builtIn"),
    workspace: t("skillsMarketplace.filters.workspace"),
    extra: t("skillsMarketplace.filters.extra"),
    other: t("skillsMarketplace.filters.other"),
  };
  return map[id] || id;
};

const getReadinessLabel = (t: any, id: string) => {
  const map: Record<string, string> = {
    ready: t("skillsMarketplace.readiness.ready"),
    "needs-setup": t("skillsMarketplace.readiness.needsSetup"),
    unavailable: t("skillsMarketplace.readiness.unavailable"),
    "disabled-globally": t("skillsMarketplace.readiness.disabledGlobally"),
  };
  return map[id] || id;
};

`;

text = text.replace(/type MarketplaceFilter = "all" \| SkillMarketplaceCollectionId;\n/, 'type MarketplaceFilter = "all" | SkillMarketplaceCollectionId;\n' + newLabels);


// Replace FILTER_LABELS[filterId]
text = text.replace(/FILTER_LABELS\[(filterId)\]/g, 'getFilterLabel(t, $1)');

// Replace READINESS_LABELS[entry.readiness]
text = text.replace(/READINESS_LABELS\[([a-zA-Z.]+)\]/g, 'getReadinessLabel(t, $1)');

// Replace Strings rendered!

const replacements = [
  ['Skills Marketplace', '{t("skillsMarketplace.title")}'],
  ['Browse gateway skills like a curated plugin store.', '{t("skillsMarketplace.description")}'],
  ['Refresh', '{t("skillsMarketplace.refresh")}'],
  ['Packaged skill installs target the selected agent workspace. Global setup actions still affect\\n          the whole gateway. Agent access controls below apply only to the selected agent.', '{t("skillsMarketplace.contextNotice")}'],
  ['Agent context', '{t("skillsMarketplace.agentContext")}'],
  ['No agent selected', '{t("skillsMarketplace.noAgent")}'],
  ['Access mode: {accessMode === "selected" ? "Selected skills" : accessMode}', '{t("skillsMarketplace.accessModePrefix")} {accessMode === "selected" ? t("skillsMarketplace.accessModeSelected") : accessMode}'],
  ['No agents available', '{t("skillsMarketplace.noAgentsAvailable")}'],
  ['Focus chat', '{t("skillsMarketplace.focusChat")}'],
  ['Settings', '{t("skillsMarketplace.settings")}'],
  ['placeholder="Search skills, categories, or sources"', 'placeholder={t("skillsMarketplace.searchPlaceholder")}'],
  ['Check the `CLAW3D` filter below to find the installed skill quickly.', '{t("skillsMarketplace.successHint")}'],
  ['Loading marketplace inventory...', '{t("skillsMarketplace.loading")}'],
  ['Featured shelf', '{t("skillsMarketplace.featuredShelf")}'],
  ['{entry.metadata.editorBadge ?? "Featured"}', '{entry.metadata.editorBadge ?? t("skillsMarketplace.featuredBadge")}'],
  ['{formatInstalls(entry.metadata.installs)} installs', '{formatInstalls(entry.metadata.installs)} {t("skillsMarketplace.installsCount")}'],
  ['Powered by{" "}', '{t("skillsMarketplace.poweredBy")} '],
  ['No matching skills found for this gateway.', '{t("skillsMarketplace.noMatching")}'],
  ['label: "Install skill"', 'label: t("skillsMarketplace.actions.installSkill")'],
  ['label: "Install deps"', 'label: t("skillsMarketplace.actions.installDeps")'],
  ['label: "Enable gateway"', 'label: t("skillsMarketplace.actions.enableGateway")'],
  ['label: "Open settings"', 'label: t("skillsMarketplace.actions.openSettings")'],
  ['{isEnabledForAgent ? "Disable for agent" : "Enable for agent"}', '{isEnabledForAgent ? t("skillsMarketplace.actions.disableForAgent") : t("skillsMarketplace.actions.enableForAgent")}'],
  ['Remove for all agents', '{t("skillsMarketplace.actions.removeForAll")}'],
  ['Details', '{t("skillsMarketplace.actions.details")}'],
  ['This skill is currently enabled for the selected agent.', '{t("skillsMarketplace.statusDocs.enabled")}'],
  ['This skill is currently disabled for the selected agent.', '{t("skillsMarketplace.statusDocs.disabled")}'],
  ['Removing from the gateway deletes the installed skill for every agent.', '{t("skillsMarketplace.statusDocs.removeWarning")}'],
  ['Skill detail', '{t("skillsMarketplace.detail.title")}'],
  ['Rating', '{t("skillsMarketplace.detail.rating")}'],
  ['Installs', '{t("skillsMarketplace.detail.installs")}'],
  ['Source', '{t("skillsMarketplace.detail.source")}'],
  ['Capabilities', '{t("skillsMarketplace.detail.capabilities")}'],
  ['Setup notes', '{t("skillsMarketplace.detail.setupNotes")}'],
  ['Packaged installs land in the selected workspace. Gateway setup changes still apply to every\\n              agent, and agent enablement depends on the selected agent&apos;s allowlist.', '{t("skillsMarketplace.detail.installNotice")}'],
  ['Install skill', '{t("skillsMarketplace.actions.installSkill")}'],
  ['Install dependencies', '{t("skillsMarketplace.actions.installDeps")}'],
  ['Enable for gateway', '{t("skillsMarketplace.actions.enableGateway")}'],
  ['Manage in settings', '{t("skillsMarketplace.actions.manageSettings")}'],
  ['Homepage', '{t("skillsMarketplace.actions.homepage")}'],
  ['`Enable/Disable for agent` only changes access for the selected agent. `Remove for all agents`\\n              deletes the installed skill from the gateway workspace.', '{t("skillsMarketplace.detail.footerNote")}']
];

let replacedText = text;
for (const [search, replace] of replacements) {
  // Be careful with newlines in search strings
  const searchRegex = new RegExp(search.replace(/[.*+?^$\\{\\}\\[\\]|\\\\]/g, "\\\\$&").replace(/\\n\\s*/g, '\\\\s+'), 'g');
  replacedText = replacedText.replace(searchRegex, replace);
}

// Wait! React rendering `Packaged skill installs target the selected agent workspace. Global setup actions still affect the whole gateway. Agent access controls below apply only to the selected agent.`
// It spans across lines!
// I'll replace it specifically.
replacedText = replacedText.replace(
  /Packaged skill installs target the selected agent workspace\. Global setup actions still affect\s*the whole gateway\. Agent access controls below apply only to the selected agent\./,
  '{t("skillsMarketplace.contextNotice")}'
);
replacedText = replacedText.replace(
  /Packaged installs land in the selected workspace\. Gateway setup changes still apply to every\s*agent, and agent enablement depends on the selected agent&apos;s allowlist\./,
  '{t("skillsMarketplace.detail.installNotice")}'
);
replacedText = replacedText.replace(
  /`Enable\/Disable for agent` only changes access for the selected agent\. `Remove for all agents`\s*deletes the installed skill from the gateway workspace\./,
  '{t("skillsMarketplace.detail.footerNote")}'
);


fs.writeFileSync(file, replacedText);
console.log('UI Updated');
