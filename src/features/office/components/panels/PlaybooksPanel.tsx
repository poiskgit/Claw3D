"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";

import type { AgentState } from "@/features/agents/state/store";
import type { OfficeStandupController } from "@/features/office/hooks/useOfficeStandupController";
import {
  createCronJob,
  formatCronSchedule,
  listCronJobs,
  removeCronJob,
  runCronJobNow,
  sortCronJobsByUpdatedAt,
  type CronJobCreateInput,
  type CronJobSummary,
} from "@/lib/cron/types";
import type { GatewayClient, GatewayStatus } from "@/lib/gateway/GatewayClient";
import { isGatewayDisconnectLikeError } from "@/lib/gateway/GatewayClient";

type TemplateDefinition = {
  id: string;
  name: string;
  description: string;
  buildInput: (agent: AgentState, customName: string, t: any) => CronJobCreateInput;
};

const PLAYBOOK_TEMPLATES: TemplateDefinition[] = [
  {
    id: "dailyBriefing",
    name: "Daily Morning Briefing",
    description: "Every day at 9am. Summarize priorities, blockers, and what changed overnight.",
    buildInput: (agent, customName, t) => ({
      name: customName || t("playbooks.templateList.dailyBriefing.name"),
      agentId: agent.agentId,
      sessionKey: agent.sessionKey,
      enabled: true,
      schedule: { kind: "cron", expr: "0 9 * * *" },
      sessionTarget: "main",
      wakeMode: "now",
      payload: {
        kind: "agentTurn",
        message: t("playbooks.templateList.dailyBriefing.message"),
        thinking: "high",
      },
    }),
  },
  {
    id: "nightlyReview",
    name: "Nightly Code Review Digest",
    description: "Every night at midnight. Review the day and summarize risky changes or regressions.",
    buildInput: (agent, customName, t) => ({
      name: customName || t("playbooks.templateList.nightlyReview.name"),
      agentId: agent.agentId,
      sessionKey: agent.sessionKey,
      enabled: true,
      schedule: { kind: "cron", expr: "0 0 * * *" },
      sessionTarget: "main",
      wakeMode: "now",
      payload: {
        kind: "agentTurn",
        message: t("playbooks.templateList.nightlyReview.message"),
        thinking: "high",
      },
    }),
  },
  {
    id: "hourlyHealth",
    name: "Hourly Health Check",
    description: "Every 60 minutes. Report runtime health, failures, and anything that needs intervention.",
    buildInput: (agent, customName, t) => ({
      name: customName || t("playbooks.templateList.hourlyHealth.name"),
      agentId: agent.agentId,
      sessionKey: agent.sessionKey,
      enabled: true,
      schedule: { kind: "every", everyMs: 60 * 60 * 1000 },
      sessionTarget: "main",
      wakeMode: "now",
      payload: {
        kind: "agentTurn",
        message: t("playbooks.templateList.hourlyHealth.message"),
        thinking: "medium",
      },
    }),
  },
  {
    id: "weeklyReport",
    name: "Weekly Progress Report",
    description: "Every Monday at 8am. Roll up wins, unfinished work, and next steps.",
    buildInput: (agent, customName, t) => ({
      name: customName || t("playbooks.templateList.weeklyReport.name"),
      agentId: agent.agentId,
      sessionKey: agent.sessionKey,
      enabled: true,
      schedule: { kind: "cron", expr: "0 8 * * 1" },
      sessionTarget: "main",
      wakeMode: "now",
      payload: {
        kind: "agentTurn",
        message: t("playbooks.templateList.weeklyReport.message"),
        thinking: "high",
      },
    }),
  },
  {
    id: "continuousMonitor",
    name: "Continuous Monitor",
    description: "Every 15 minutes. Watch for drift, silent failures, or anything unusual.",
    buildInput: (agent, customName, t) => ({
      name: customName || t("playbooks.templateList.continuousMonitor.name"),
      agentId: agent.agentId,
      sessionKey: agent.sessionKey,
      enabled: true,
      schedule: { kind: "every", everyMs: 15 * 60 * 1000 },
      sessionTarget: "main",
      wakeMode: "now",
      payload: {
        kind: "agentTurn",
        message: t("playbooks.templateList.continuousMonitor.message"),
        thinking: "medium",
      },
    }),
  },
];

const formatRelativeDateTime = (timestampMs: number | undefined, t: any) => {
  if (!timestampMs || !Number.isFinite(timestampMs)) return t("playbooks.unknown");
  return new Date(timestampMs).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function PlaybooksPanel({
  client,
  status,
  cronEnabled = true,
  agents,
  standup,
}: {
  client: GatewayClient;
  status: GatewayStatus;
  cronEnabled?: boolean;
  agents: AgentState[];
  standup: OfficeStandupController;
}) {
  const [jobs, setJobs] = useState<CronJobSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [nameOverride, setNameOverride] = useState("");
  const [createBusy, setCreateBusy] = useState(false);
  const [runBusyJobId, setRunBusyJobId] = useState<string | null>(null);
  const [deleteBusyJobId, setDeleteBusyJobId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const agentById = useMemo(
    () => new Map(agents.map((agent) => [agent.agentId, agent])),
    [agents]
  );

  const activeTemplate = useMemo(
    () => PLAYBOOK_TEMPLATES.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId]
  );
  const [standupAgentId, setStandupAgentId] = useState("");
  const [standupCronExpr, setStandupCronExpr] = useState("0 9 * * 1-5");
  const [standupTimezone, setStandupTimezone] = useState("UTC");
  const [standupSpeakerSeconds, setStandupSpeakerSeconds] = useState("8");
  const [standupAutoOpenBoard, setStandupAutoOpenBoard] = useState(true);
  const [standupScheduleEnabled, setStandupScheduleEnabled] = useState(false);
  const [jiraEnabled, setJiraEnabled] = useState(false);
  const [jiraBaseUrl, setJiraBaseUrl] = useState("");
  const [jiraEmail, setJiraEmail] = useState("");
  const [jiraApiToken, setJiraApiToken] = useState("");
  const [jiraApiTokenConfigured, setJiraApiTokenConfigured] = useState(false);
  const [jiraProjectKey, setJiraProjectKey] = useState("");
  const [jiraJql, setJiraJql] = useState("");
  const [manualTask, setManualTask] = useState("");
  const [manualBlockers, setManualBlockers] = useState("");
  const [manualNote, setManualNote] = useState("");
  const [manualJiraAssignee, setManualJiraAssignee] = useState("");

  useEffect(() => {
    if (!standup.config) return;
    setStandupScheduleEnabled(standup.config.schedule.enabled);
    setStandupCronExpr(standup.config.schedule.cronExpr);
    setStandupTimezone(standup.config.schedule.timezone);
    setStandupSpeakerSeconds(String(standup.config.schedule.speakerSeconds));
    setStandupAutoOpenBoard(standup.config.schedule.autoOpenBoard);
    setJiraEnabled(standup.config.jira.enabled);
    setJiraBaseUrl(standup.config.jira.baseUrl);
    setJiraEmail(standup.config.jira.email);
    setJiraApiToken(standup.config.jira.apiToken);
    setJiraApiTokenConfigured(standup.config.jira.apiTokenConfigured);
    setJiraProjectKey(standup.config.jira.projectKey);
    setJiraJql(standup.config.jira.jql);
  }, [standup.config]);

  useEffect(() => {
    if (standupAgentId || agents.length === 0) return;
    setStandupAgentId(agents[0]?.agentId ?? "");
  }, [agents, standupAgentId]);

  useEffect(() => {
    if (!standup.config || !standupAgentId) return;
    const manual = standup.config.manualByAgentId[standupAgentId];
    setManualTask(manual?.currentTask ?? "");
    setManualBlockers(manual?.blockers ?? "");
    setManualNote(manual?.note ?? "");
    setManualJiraAssignee(manual?.jiraAssignee ?? "");
  }, [standup.config, standupAgentId]);

  const loadJobs = useCallback(async () => {
    if (!cronEnabled || status !== "connected") {
      setJobs([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await listCronJobs(client, { includeDisabled: true });
      setJobs(sortCronJobsByUpdatedAt(result.jobs));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load playbooks.";
      setError(message);
      if (!isGatewayDisconnectLikeError(err)) {
        console.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [client, cronEnabled, status]);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  const handleCreate = useCallback(async () => {
    if (!cronEnabled) {
      setError("This runtime does not expose scheduled playbooks.");
      return;
    }
    if (!activeTemplate) return;
    const agent = agentById.get(selectedAgentId);
    if (!agent) {
      setError("Pick an agent before launching a playbook.");
      return;
    }

    setCreateBusy(true);
    setError(null);
    setActionMessage(null);
    try {
      await createCronJob(client, activeTemplate.buildInput(agent, nameOverride.trim(), t));
      setActionMessage(`Created "${nameOverride.trim() || t(`playbooks.templateList.${activeTemplate.id as any}.name` as any)}".`);
      setSelectedTemplateId(null);
      setSelectedAgentId("");
      setNameOverride("");
      await loadJobs();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create playbook.";
      setError(message);
    } finally {
      setCreateBusy(false);
    }
  }, [activeTemplate, agentById, client, cronEnabled, loadJobs, nameOverride, selectedAgentId]);

  const handleRunNow = useCallback(
    async (jobId: string) => {
      if (!cronEnabled) {
        setError("This runtime does not expose scheduled playbooks.");
        return;
      }
      setRunBusyJobId(jobId);
      setError(null);
      setActionMessage(null);
      try {
        const result = await runCronJobNow(client, jobId);
        setActionMessage(result.ok ? "Playbook triggered." : "Playbook trigger failed.");
        await loadJobs();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to run playbook.");
      } finally {
        setRunBusyJobId(null);
      }
    },
    [client, cronEnabled, loadJobs]
  );

  const handleDelete = useCallback(
    async (jobId: string) => {
      if (!cronEnabled) {
        setError("This runtime does not expose scheduled playbooks.");
        return;
      }
      setDeleteBusyJobId(jobId);
      setError(null);
      setActionMessage(null);
      try {
        const result = await removeCronJob(client, jobId);
        setActionMessage(result.ok && result.removed ? "Playbook removed." : "Playbook was not removed.");
        await loadJobs();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete playbook.");
      } finally {
        setDeleteBusyJobId(null);
      }
    },
    [client, cronEnabled, loadJobs]
  );

  const handleSaveStandupConfig = useCallback(async () => {
    setError(null);
    setActionMessage(null);
    try {
      await standup.saveConfig({
        schedule: {
          enabled: standupScheduleEnabled,
          cronExpr: standupCronExpr.trim() || "0 9 * * 1-5",
          timezone: standupTimezone.trim() || "UTC",
          speakerSeconds: Number(standupSpeakerSeconds) || 8,
          autoOpenBoard: standupAutoOpenBoard,
        },
        jira: {
          enabled: jiraEnabled,
          baseUrl: jiraBaseUrl.trim(),
          email: jiraEmail.trim(),
          apiToken: jiraApiToken.trim(),
          projectKey: jiraProjectKey.trim().toUpperCase(),
          jql: jiraJql.trim(),
        },
      });
      setActionMessage("Standup settings saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save standup settings.");
    }
  }, [
    jiraApiToken,
    jiraBaseUrl,
    jiraEmail,
    jiraEnabled,
    jiraJql,
    jiraProjectKey,
    standup,
    standupAutoOpenBoard,
    standupCronExpr,
    standupScheduleEnabled,
    standupSpeakerSeconds,
    standupTimezone,
  ]);

  const handleSaveManualNotes = useCallback(async () => {
    if (!standupAgentId) {
      setError("Pick an agent before saving standup notes.");
      return;
    }
    setError(null);
    setActionMessage(null);
    try {
      await standup.updateManualEntry(standupAgentId, {
        jiraAssignee: manualJiraAssignee.trim() || null,
        currentTask: manualTask.trim(),
        blockers: manualBlockers.trim(),
        note: manualNote.trim(),
      });
      setActionMessage("Standup notes saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save standup notes.");
    }
  }, [
    manualBlockers,
    manualJiraAssignee,
    manualNote,
    manualTask,
    standup,
    standupAgentId,
  ]);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="border-b border-cyan-500/10 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
              {t("playbooks.title")}
            </div>
            <div className="mt-1 font-mono text-[11px] text-white/40">
              {t("playbooks.description")}
            </div>
          </div>
          <button
            type="button"
            onClick={() => void loadJobs()}
            disabled={!cronEnabled}
            className="rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-100"
          >
            {t("playbooks.refresh")}
          </button>
        </div>
        {!cronEnabled ? (
          <div className="mt-2 font-mono text-[11px] text-white/35">
            This runtime does not expose scheduled playbooks.
          </div>
        ) : null}
        {error ? <div className="mt-2 font-mono text-[11px] text-rose-300">{error}</div> : null}
        {actionMessage ? (
          <div className="mt-2 font-mono text-[11px] text-emerald-300">{actionMessage}</div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="border-b border-cyan-500/10 px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            {t("playbooks.activeJobs")}
          </div>
          <div className="mt-3 space-y-2">
            {loading ? (
              <div className="font-mono text-[11px] text-white/40">{t("playbooks.loading")}</div>
            ) : jobs.length === 0 ? (
              <div className="font-mono text-[11px] text-white/35">{t("playbooks.noJobs")}</div>
            ) : (
              jobs.map((job) => {
                const agentName = agentById.get(job.agentId ?? "")?.name || job.agentId || "Unknown";
                return (
                  <div
                    key={job.id}
                    className="rounded border border-white/8 bg-white/[0.03] px-3 py-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                          {job.name}
                        </div>
                        <div className="mt-1 font-mono text-[11px] text-white/45">{agentName}</div>
                      </div>
                      <div className="shrink-0 rounded border border-cyan-500/20 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-200">
                        {job.state.lastStatus ?? "ready"}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 font-mono text-[11px] text-white/65">
                      <div>{formatCronSchedule(job.schedule)}</div>
                      <div>{t("playbooks.nextRun")}: {formatRelativeDateTime(job.state.nextRunAtMs, t)}</div>
                      <div>{t("playbooks.lastRun")}: {formatRelativeDateTime(job.state.lastRunAtMs, t)}</div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => void handleRunNow(job.id)}
                        disabled={runBusyJobId === job.id || deleteBusyJobId === job.id}
                        className="rounded border border-amber-500/25 bg-amber-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-amber-200 transition-colors hover:border-amber-400/50 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {runBusyJobId === job.id ? t("playbooks.running") : t("playbooks.runNow")}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(job.id)}
                        disabled={deleteBusyJobId === job.id || runBusyJobId === job.id}
                        className="rounded border border-rose-500/25 bg-rose-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-rose-200 transition-colors hover:border-rose-400/50 hover:text-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deleteBusyJobId === job.id ? t("playbooks.deleting") : t("playbooks.delete")}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="rounded border border-emerald-500/15 bg-emerald-500/[0.05] px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/85">
                  {t("playbooks.automatedStandup")}
                </div>
                <div className="mt-1 font-mono text-[11px] leading-5 text-white/50">
                  {t("playbooks.standupDesc")}
                </div>
              </div>
              <button
                type="button"
                onClick={() => void standup.startMeeting("manual")}
                className="rounded border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-100 transition-colors hover:border-emerald-400/50 hover:text-white"
              >
                {t("playbooks.startNow")}
              </button>
            </div>

            <div className="mt-3 grid gap-3">
              <label className="flex items-center gap-2 font-mono text-[11px] text-white/75">
                <input
                  type="checkbox"
                  checked={standupScheduleEnabled}
                  onChange={(event) => setStandupScheduleEnabled(event.target.checked)}
                />
                {t("playbooks.enableScheduled")}
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.cronExpr")}
                </span>
                <input
                  value={standupCronExpr}
                  onChange={(event) => setStandupCronExpr(event.target.value)}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.timezone")}
                </span>
                <input
                  value={standupTimezone}
                  onChange={(event) => setStandupTimezone(event.target.value)}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.secondsPerSpeaker")}
                </span>
                <input
                  value={standupSpeakerSeconds}
                  onChange={(event) => setStandupSpeakerSeconds(event.target.value)}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <label className="flex items-center gap-2 font-mono text-[11px] text-white/75">
                <input
                  type="checkbox"
                  checked={standupAutoOpenBoard}
                  onChange={(event) => setStandupAutoOpenBoard(event.target.checked)}
                />
                {t("playbooks.autoOpenBoard")}
              </label>

              <label className="flex items-center gap-2 font-mono text-[11px] text-white/75">
                <input
                  type="checkbox"
                  checked={jiraEnabled}
                  onChange={(event) => setJiraEnabled(event.target.checked)}
                />
                {t("playbooks.enableJira")}
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.jiraBaseUrl")}
                </span>
                <input
                  value={jiraBaseUrl}
                  onChange={(event) => setJiraBaseUrl(event.target.value)}
                  placeholder="https://company.atlassian.net"
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none placeholder:text-white/20"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.jiraEmail")}
                </span>
                <input
                  value={jiraEmail}
                  onChange={(event) => setJiraEmail(event.target.value)}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.jiraApiToken")}
                </span>
                <input
                  type="password"
                  value={jiraApiToken}
                  onChange={(event) => {
                    setJiraApiToken(event.target.value);
                    setJiraApiTokenConfigured(event.target.value.trim().length > 0);
                  }}
                  placeholder={
                    jiraApiTokenConfigured ? t("playbooks.jiraApiTokenStored") : ""
                  }
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
                {jiraApiTokenConfigured ? (
                  <span className="text-[10px] text-white/45">
                    {t("playbooks.jiraApiTokenStored")}
                  </span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.jiraProjectKey")}
                </span>
                <input
                  value={jiraProjectKey}
                  onChange={(event) => setJiraProjectKey(event.target.value)}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {t("playbooks.jiraJql")}
                </span>
                <textarea
                  value={jiraJql}
                  onChange={(event) => setJiraJql(event.target.value)}
                  rows={3}
                  className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                />
              </label>

              <button
                type="button"
                onClick={() => void handleSaveStandupConfig()}
                disabled={standup.saving}
                className="rounded border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-100 transition-colors hover:border-emerald-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {standup.saving ? t("playbooks.savingStandupSettings") : t("playbooks.saveStandupSettings")}
              </button>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                {t("playbooks.manualBoardInput")}
              </div>
              <div className="mt-3 grid gap-3">
                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {t("playbooks.agent")}
                  </span>
                  <select
                    value={standupAgentId}
                    onChange={(event) => setStandupAgentId(event.target.value)}
                    className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                  >
                    <option value="">{t("playbooks.selectAgent")}</option>
                    {agents.map((agent) => (
                      <option key={agent.agentId} value={agent.agentId}>
                        {agent.name || agent.agentId}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {t("playbooks.jiraAssigneeHint")}
                  </span>
                  <input
                    value={manualJiraAssignee}
                    onChange={(event) => setManualJiraAssignee(event.target.value)}
                    className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {t("playbooks.currentTask")}
                  </span>
                  <input
                    value={manualTask}
                    onChange={(event) => setManualTask(event.target.value)}
                    className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {t("playbooks.blockers")}
                  </span>
                  <textarea
                    value={manualBlockers}
                    onChange={(event) => setManualBlockers(event.target.value)}
                    rows={3}
                    className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    {t("playbooks.manualNote")}
                  </span>
                  <textarea
                    value={manualNote}
                    onChange={(event) => setManualNote(event.target.value)}
                    rows={4}
                    className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => void handleSaveManualNotes()}
                  className="rounded border border-cyan-500/25 bg-cyan-500/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:border-cyan-400/50 hover:text-white"
                >
                  {t("playbooks.saveManualNotes")}
                </button>
              </div>
            </div>

            {standup.meeting ? (
              <div className="mt-4 rounded border border-white/8 bg-white/[0.03] px-3 py-3 font-mono text-[11px] text-white/65">
                <div>{t("playbooks.meetingPhase")}: {standup.meeting.phase}</div>
                <div>{t("playbooks.participants")}: {standup.meeting.participantOrder.length}</div>
                <div>
                  {t("playbooks.currentSpeaker")}: {standup.meeting.currentSpeakerAgentId ?? t("playbooks.waiting")}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            {t("playbooks.templates")}
          </div>
          <div className="mt-3 space-y-2">
            {PLAYBOOK_TEMPLATES.map((template) => {
              const isSelected = template.id === selectedTemplateId;
              return (
                <div
                  key={template.id}
                  className={`rounded border px-3 py-3 transition-colors ${
                    isSelected
                      ? "border-cyan-400/30 bg-cyan-500/[0.06]"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTemplateId((current) =>
                          current === template.id ? null : template.id
                        );
                        setError(null);
                        setActionMessage(null);
                      }}
                      className="w-full text-left"
                    >
                      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                        {t(`playbooks.templateList.${template.id as any}.name` as any)}
                      </div>
                      <div className="mt-1 font-mono text-[11px] leading-5 text-white/50">
                        {t(`playbooks.templateList.${template.id as any}.description` as any)}
                      </div>
                    </button>

                  {isSelected ? (
                    <div className="mt-3 space-y-3 border-t border-cyan-500/10 pt-3">
                      <label className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                          {t("playbooks.agent")}
                        </span>
                        <select
                          value={selectedAgentId}
                          onChange={(event) => setSelectedAgentId(event.target.value)}
                          className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none"
                        >
                          <option value="">{t("playbooks.selectAgent")}</option>
                          {agents.map((agent) => (
                            <option key={agent.agentId} value={agent.agentId}>
                              {agent.name || agent.agentId}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                          {t("playbooks.nameOverride")}
                        </span>
                        <input
                          value={nameOverride}
                          onChange={(event) => setNameOverride(event.target.value)}
                          placeholder={t(`playbooks.templateList.${template.id as any}.name` as any)}
                          className="rounded border border-white/10 bg-black/50 px-2 py-2 font-mono text-[11px] text-white/80 outline-none placeholder:text-white/20"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => void handleCreate()}
                        disabled={createBusy}
                        className="w-full rounded border border-cyan-500/25 bg-cyan-500/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100 transition-colors hover:border-cyan-400/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {createBusy ? t("playbooks.creatingPlaybook") : t("playbooks.launchPlaybook")}
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
