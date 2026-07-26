"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  applyMaintenanceReportAction,
  discardMaintenanceReportAction,
} from "@/lib/admin/maintenance/actions";
import type {
  MaintenanceApplyArticleResult,
  MaintenanceEntryChange,
  MaintenanceRefreshReport,
} from "@/lib/admin/maintenance/types";

function outcomeLabel(outcome: MaintenanceEntryChange["outcome"]): string {
  switch (outcome) {
    case "updated":
      return "Updated";
    case "no_changes":
      return "No changes required";
    case "unknown":
      return "Unknown";
    case "failed":
      return "Failed";
    case "skipped":
      return "Skipped";
    default:
      return "Unknown";
  }
}

function applyLabel(result: MaintenanceApplyArticleResult["result"]): string {
  switch (result) {
    case "updated":
      return "Updated";
    case "no_changes_required":
      return "No changes required";
    case "skipped":
      return "Skipped";
    case "unknown":
      return "Unknown";
    case "failed":
      return "Failed";
    default:
      return "Unknown";
  }
}

function ScoreDelta({
  label,
  from,
  to,
}: {
  label: string;
  from: number | null | undefined;
  to: number | null | undefined | "unknown";
}) {
  const fromText = from == null ? "—" : String(from);
  const toText =
    to === "unknown" ? "Unknown" : to == null ? "—" : String(to);
  return (
    <p className="font-mono text-xs text-zinc-400">
      <span className="text-zinc-500">{label}</span>
      <br />
      {fromText} → {toText}
    </p>
  );
}

function ScoreReasonRow({
  label,
  from,
  to,
  reason,
}: {
  label: string;
  from: number;
  to: number | "unknown";
  reason?: string;
}) {
  return (
    <div className="space-y-1">
      <ScoreDelta label={label} from={from} to={to} />
      {reason ? (
        <p className="text-xs leading-relaxed text-zinc-400">{reason}</p>
      ) : null}
    </div>
  );
}

function ChangeCard({ change }: { change: MaintenanceEntryChange }) {
  const reasons = change.scoreReasons ?? change.after?.dynamicMetadata?.scoreReasons;
  const relevanceTo =
    change.afterCurrentRelevance === "unknown"
      ? ("unknown" as const)
      : change.afterScores.relevance;

  return (
    <article className="border-b border-zinc-800 py-5 last:border-b-0">
      <h3 className="text-sm font-semibold text-zinc-100">{change.title}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        {outcomeLabel(change.outcome)}
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <ScoreReasonRow
          label="Current Popularity"
          from={change.beforeScores.relevance}
          to={relevanceTo}
          reason={reasons?.relevance}
        />
        <ScoreReasonRow
          label="Influence"
          from={change.beforeScores.influence}
          to={change.afterScores.influence}
          reason={reasons?.influence}
        />
        <ScoreReasonRow
          label="Brainrot"
          from={change.beforeScores.brainrot}
          to={change.afterScores.brainrot}
          reason={reasons?.brainrot}
        />
        <ScoreReasonRow
          label="Cringe"
          from={change.beforeScores.cringe}
          to={change.afterScores.cringe}
          reason={reasons?.cringe}
        />
        <ScoreDelta
          label="Trending"
          from={change.beforeTrendingScore ?? change.beforeScores.relevance}
          to={
            change.afterTrendingScore == null &&
            change.after?.dynamicMetadata?.trendingScore === "unknown"
              ? "unknown"
              : (change.afterTrendingScore ?? change.afterScores.relevance)
          }
        />
      </div>
      {!reasons?.relevance && (
        <p className="mt-3 text-sm text-zinc-300">
          <span className="text-zinc-500">Reason</span>
          <br />
          {change.outcomeReason}
        </p>
      )}
    </article>
  );
}

function ApplyResultCard({
  result,
}: {
  result: MaintenanceApplyArticleResult;
}) {
  return (
    <article className="border-b border-zinc-800 py-5 last:border-b-0">
      <h3 className="text-sm font-semibold text-zinc-100">{result.title}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        {applyLabel(result.result)}
      </p>
      {result.relevance && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ScoreDelta
            label="Current Popularity"
            from={result.relevance.from}
            to={result.relevance.to}
          />
          {result.trending && (
            <ScoreDelta
              label="Trending"
              from={result.trending.from}
              to={result.trending.to}
            />
          )}
        </div>
      )}
      <p className="mt-3 text-sm text-zinc-300">
        <span className="text-zinc-500">Reason</span>
        <br />
        {result.reason}
      </p>
    </article>
  );
}

export function RefreshReportView({
  report,
}: {
  report: MaintenanceRefreshReport;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showUnchanged, setShowUnchanged] = useState(false);

  const jobStatus = report.jobStatus ?? "success";
  const changes = report.changes ?? [];
  const applyResults = report.applyResults;

  const changed = changes.filter((c) => c.outcome !== "no_changes");
  const unchanged = changes.filter((c) => c.outcome === "no_changes");

  const canApply =
    report.status === "proposed" &&
    (jobStatus === "success" || jobStatus === "stopped") &&
    changed.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/maintenance"
          className="text-xs text-zinc-500 hover:text-zinc-300"
        >
          ← Maintenance
        </Link>
        <span className="rounded-md border border-amber-800/50 bg-amber-950/30 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-200/90">
          Experimental · {jobStatus}
        </span>
      </div>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          {jobStatus === "stopped" ? "Refresh stopped" : "Refresh complete"}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">{report.scopeLabel}</p>
        {report.stoppedMessage && (
          <pre className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">
            {report.stoppedMessage}
          </pre>
        )}
        <p className="mt-3 text-sm text-zinc-300">
          {report.updatedCount} articles updated
          {report.unknownCount ? ` · ${report.unknownCount} unknown` : ""}
          {report.failedCount ? ` · ${report.failedCount} failed` : ""}
        </p>
      </header>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {message && (
        <p className="mb-4 text-sm text-emerald-400/90">{message}</p>
      )}

      {applyResults && applyResults.length > 0 ? (
        <section className="mb-8 rounded-lg border border-zinc-800 p-5">
          <h2 className="text-sm font-semibold text-zinc-100">Apply results</h2>
          <div className="mt-2">
            {applyResults
              .filter((r) => r.result !== "no_changes_required")
              .map((r) => (
                <ApplyResultCard key={r.slug} result={r} />
              ))}
          </div>
        </section>
      ) : changed.length === 0 ? (
        <section className="mb-8 rounded-lg border border-zinc-800 p-5">
          <p className="text-sm text-zinc-300">No articles required updating.</p>
        </section>
      ) : (
        <section className="mb-8 rounded-lg border border-zinc-800 p-5">
          <h2 className="text-sm font-semibold text-zinc-100">
            Preview changes
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Review before Apply. Only listed articles need a decision.
          </p>
          <div className="mt-2">
            {changed.map((c) => (
              <ChangeCard key={c.slug} change={c} />
            ))}
          </div>
        </section>
      )}

      {unchanged.length > 0 && (
        <section className="mb-8">
          <button
            type="button"
            onClick={() => setShowUnchanged((v) => !v)}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            {showUnchanged ? "Hide" : "Show"} unchanged ({unchanged.length})
          </button>
          {showUnchanged && (
            <div className="mt-3 rounded-lg border border-zinc-900 p-5">
              {unchanged.map((c) => (
                <ChangeCard key={c.slug} change={c} />
              ))}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
        {canApply && (
          <>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setError(null);
                setMessage(null);
                startTransition(async () => {
                  const result = await applyMaintenanceReportAction(report.id);
                  if (!result.ok) {
                    setError(result.error);
                    return;
                  }
                  setMessage("Applied. Commit and deploy when ready.");
                  router.refresh();
                });
              }}
              className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-50"
            >
              {pending ? "Applying…" : "Apply"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                startTransition(async () => {
                  await discardMaintenanceReportAction(report.id);
                  router.push("/admin/maintenance");
                });
              }}
              className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
            >
              Discard
            </button>
          </>
        )}
        {report.status === "applied" && (
          <p className="text-sm text-zinc-400">Done. Deploy separately when ready.</p>
        )}
      </div>
    </div>
  );
}
