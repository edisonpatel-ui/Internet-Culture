"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  startCategoryRefreshAction,
  stepCategoryRefreshAction,
  stopCategoryRefreshAction,
} from "@/lib/admin/maintenance/actions";
import { MaintenanceArticleSearch } from "./MaintenanceArticleSearch";
import {
  CATEGORY_LABELS,
  ESTIMATED_SECONDS_PER_ARTICLE,
  type MaintenanceCategoryFilter,
  type MaintenanceJobProgress,
} from "@/lib/admin/maintenance/types";
import type { CategoryResumeState } from "@/lib/admin/maintenance/progressStore";

const CATEGORIES: MaintenanceCategoryFilter[] = [
  "meme",
  "slang",
  "creator",
  "event",
  "trend",
];

type ReportSummary = {
  id: string;
  createdAt: string;
  status: string;
  jobStatus?: string;
  scopeLabel: string;
  targetCount: number;
  updatedCount: number;
  unchangedCount?: number;
  failedCount?: number;
};

function formatEta(totalArticles: number): string {
  const seconds = totalArticles * ESTIMATED_SECONDS_PER_ARTICLE;
  if (seconds < 60) return `~${seconds}s`;
  return `~${Math.ceil(seconds / 60)} min`;
}

function ProviderChecks({
  providers,
}: {
  providers: MaintenanceJobProgress["providers"];
}) {
  return (
    <ul className="mt-2 space-y-1 text-xs text-zinc-400">
      {providers.map((p) => (
        <li key={p.id} className="flex items-center gap-2">
          <span
            className={
              p.status === "ok"
                ? "text-emerald-400"
                : p.status === "failed"
                  ? "text-rose-400"
                  : "text-zinc-600"
            }
            aria-hidden
          >
            {p.status === "ok" ? "✓" : p.status === "failed" ? "✗" : "·"}
          </span>
          <span>{p.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function MaintenanceCenter({
  recentReports,
  categoryCounts,
  resumeByCategory,
}: {
  recentReports: ReportSummary[];
  categoryCounts: Record<MaintenanceCategoryFilter, number>;
  resumeByCategory: Partial<
    Record<MaintenanceCategoryFilter, CategoryResumeState | null>
  >;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<MaintenanceJobProgress | null>(null);
  const [busy, setBusy] = useState(false);
  const stopRef = useRef(false);

  async function runCategory(
    category: MaintenanceCategoryFilter,
    resume: boolean,
  ) {
    setError(null);
    setDoneMessage(null);
    stopRef.current = false;
    setBusy(true);
    setProgress(null);

    try {
      const started = await startCategoryRefreshAction(category, { resume });
      if (!started.ok) {
        setError(started.error);
        setBusy(false);
        return;
      }

      let current = started.progress;
      setProgress(current);

      if (current.status !== "running") {
        setBusy(false);
        finishNavigate(current);
        return;
      }

      while (current.status === "running") {
        if (stopRef.current) {
          await stopCategoryRefreshAction(current.jobId);
        }
        const stepped = await stepCategoryRefreshAction(current.jobId);
        if (!stepped.ok) {
          setError(stepped.error);
          setProgress((prev) =>
            prev
              ? { ...prev, status: "failed", error: stepped.error }
              : prev,
          );
          setBusy(false);
          return;
        }
        current = stepped.progress;
        setProgress(current);
      }

      setBusy(false);
      finishNavigate(current);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Refresh failed.");
      setBusy(false);
    }
  }

  function finishNavigate(current: MaintenanceJobProgress) {
    if (current.stoppedMessage) {
      setDoneMessage(current.stoppedMessage);
      if (current.reportId) {
        router.push(`/admin/maintenance/${current.reportId}`);
      }
      return;
    }
    if (current.noMaterialChanges || !current.reportId) {
      setDoneMessage(
        `No articles required updating.\n\n${current.processedCount ?? 0} article(s) checked.`,
      );
      router.refresh();
      return;
    }
    router.push(`/admin/maintenance/${current.reportId}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Experimental
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Maintenance
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Refresh → Preview → Apply → Done. One category at a time. The live
          site only changes after you Apply (and deploy).
        </p>
      </header>

      {error && (
        <p className="mb-6 rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      {doneMessage && !busy && (
        <pre className="mb-6 whitespace-pre-wrap rounded-md border border-zinc-800 bg-zinc-950/60 px-3 py-3 text-sm text-zinc-300">
          {doneMessage}
        </pre>
      )}

      {progress && busy && (
        <section className="mb-8 rounded-lg border border-amber-900/40 bg-amber-950/20 p-5">
          <h2 className="text-sm font-semibold text-amber-100">
            Refreshing {progress.scopeLabel}
          </h2>
          <p className="mt-2 font-mono text-sm text-zinc-200">
            Article {Math.min(progress.currentIndex + 1, progress.total)} /{" "}
            {progress.total}
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            Current:{" "}
            <span className="text-zinc-100">
              {progress.currentTitle ?? "Starting…"}
            </span>
          </p>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Providers
            </p>
            <ProviderChecks providers={progress.providers} />
          </div>
          <button
            type="button"
            disabled={progress.status !== "running"}
            onClick={() => {
              stopRef.current = true;
              void stopCategoryRefreshAction(progress.jobId);
            }}
            className="mt-4 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
          >
            Stop Refresh
          </button>
        </section>
      )}

      <MaintenanceArticleSearch />

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">
          Refresh category
        </h2>
        <ul className="mt-4 space-y-3">
          {CATEGORIES.map((id) => {
            const count = categoryCounts[id] ?? 0;
            const resume = resumeByCategory[id];
            const remaining =
              resume?.lastCompletedSlug != null
                ? Math.max(0, count - (resume.completedCount ?? 0))
                : null;
            return (
              <li
                key={id}
                className="rounded-md border border-zinc-800 bg-zinc-900/40 px-3 py-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {CATEGORY_LABELS[id]}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {count} articles · ETA {formatEta(count)}
                    </p>
                    {resume?.lastCompletedSlug && remaining != null && remaining > 0 && (
                      <p className="mt-1 text-xs text-amber-200/80">
                        Resume available — ~{remaining} left after{" "}
                        {resume.lastCompletedSlug}
                        {resume.updatedAt
                          ? ` · ${new Date(resume.updatedAt).toLocaleString()}`
                          : ""}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {resume?.lastCompletedSlug && remaining != null && remaining > 0 ? (
                      <>
                        <button
                          type="button"
                          disabled={busy || count === 0}
                          onClick={() => void runCategory(id, true)}
                          className="rounded-md border border-zinc-600 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
                        >
                          Resume
                        </button>
                        <button
                          type="button"
                          disabled={busy || count === 0}
                          onClick={() => void runCategory(id, false)}
                          className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900 disabled:opacity-50"
                        >
                          Restart from beginning
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        disabled={busy || count === 0}
                        onClick={() => void runCategory(id, true)}
                        className="rounded-md border border-zinc-600 bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
                      >
                        {busy ? "Working…" : "Refresh"}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-100">
          Recent reports
        </h2>
        {recentReports.length === 0 ? (
          <p className="text-sm text-zinc-500">No reports yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
            {recentReports.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/maintenance/${r.id}`}
                  className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {r.scopeLabel}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(r.createdAt).toLocaleString()} ·{" "}
                      {(r.jobStatus ?? "success").toUpperCase()} ·{" "}
                      {r.updatedCount} updated
                    </p>
                  </div>
                  <span className="text-xs text-amber-300/80">Open</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
