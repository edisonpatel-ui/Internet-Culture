"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  applyMaintenanceReportAction,
  discardMaintenanceReportAction,
} from "@/lib/admin/maintenance/actions";
import type { MaintenanceRefreshReport } from "@/lib/admin/maintenance/types";

export function RefreshReportView({
  report,
}: {
  report: MaintenanceRefreshReport;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/maintenance"
          className="text-xs text-zinc-500 hover:text-zinc-300"
        >
          ← Maintenance Center
        </Link>
        <span className="rounded-md border border-amber-800/50 bg-amber-950/30 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-200/90">
          Experimental · {report.status}
        </span>
      </div>

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">
          Refresh report
        </h1>
        <p className="mt-2 text-sm text-zinc-400">{report.scopeLabel}</p>
        {report.promptInterpretation && (
          <p className="mt-1 text-xs text-zinc-500">
            {report.promptInterpretation}
          </p>
        )}
        <p className="mt-3 text-sm text-zinc-300">
          Updated: {report.updatedCount} articles
          <span className="text-zinc-500">
            {" "}
            ({report.targetCount} targeted, {report.unchangedCount} unchanged)
          </span>
        </p>
      </header>

      {error && (
        <p className="mb-4 text-sm text-red-400">{error}</p>
      )}
      {message && (
        <p className="mb-4 text-sm text-emerald-400/90">{message}</p>
      )}

      <section className="mb-8 rounded-lg border border-zinc-800 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">
          Largest relevance changes
        </h2>
        {report.largestRelevanceChanges.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No material relevance changes.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {report.largestRelevanceChanges.map((c) => (
              <li
                key={c.slug}
                className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
              >
                <span className="font-medium text-zinc-200">{c.title}</span>
                <span className="font-mono text-zinc-400">
                  {c.from} → {c.to}
                  <span
                    className={
                      c.delta < 0 ? " text-rose-400" : " text-emerald-400"
                    }
                  >
                    {" "}
                    ({c.delta > 0 ? "+" : ""}
                    {c.delta})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8 rounded-lg border border-zinc-800 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">
          Largest trending changes
        </h2>
        {report.largestTrendingChanges.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">No material trending changes.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {report.largestTrendingChanges.map((c) => (
              <li
                key={c.slug}
                className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
              >
                <span className="font-medium text-zinc-200">{c.title}</span>
                <span className="font-mono text-zinc-400">
                  {c.from} → {c.to}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8 rounded-lg border border-amber-900/40 bg-amber-950/10 p-5">
        <h2 className="text-sm font-semibold text-amber-100">
          Needs Editorial Review
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Includes Current Relevance / Trending Unknown (insufficient live
          evidence). Those articles are excluded from homepage Trending until
          reviewed.
        </p>
        {report.manualReviewSlugs.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500">None flagged.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {report.changes
              .filter((c) => c.needsManualReview)
              .map((c) => (
                <li key={c.slug} className="text-sm">
                  <p className="font-medium text-zinc-200">
                    {c.title}{" "}
                    <span className="font-mono text-xs text-zinc-500">
                      {c.slug}
                    </span>
                    {c.after.dynamicMetadata.currentRelevance === "unknown" ||
                    c.after.dynamicMetadata.trendingScore === "unknown" ? (
                      <span className="ml-2 rounded border border-amber-800/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-amber-200/90">
                        Unknown
                      </span>
                    ) : null}
                  </p>
                  <ul className="mt-1 list-inside list-disc text-xs text-zinc-500">
                    {c.reviewReasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        )}
      </section>

      <section className="mb-8 rounded-lg border border-zinc-800 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">Notes</h2>
        <ul className="mt-2 list-inside list-disc text-xs text-zinc-500">
          {report.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-zinc-800 pt-6">
        {report.status === "proposed" && (
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
                  setMessage(
                    `Applied ${result.appliedCount} file(s). Review the diff, then commit and deploy when ready — nothing was pushed.`,
                  );
                  router.refresh();
                });
              }}
              className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-50"
            >
              {pending ? "Applying…" : "Apply to content files"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                setError(null);
                startTransition(async () => {
                  const result = await discardMaintenanceReportAction(report.id);
                  if (!result.ok) {
                    setError(result.error);
                    return;
                  }
                  router.push("/admin/maintenance");
                });
              }}
              className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
            >
              Discard report
            </button>
          </>
        )}
        {report.status === "applied" && (
          <p className="text-sm text-zinc-400">
            Applied {report.appliedCount ?? 0} file(s)
            {report.appliedAt
              ? ` at ${new Date(report.appliedAt).toLocaleString()}`
              : ""}
            . Commit and deploy separately when you are ready.
          </p>
        )}
      </div>
    </div>
  );
}
