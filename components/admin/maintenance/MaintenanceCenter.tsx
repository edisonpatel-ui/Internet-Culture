"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  refreshByPromptAction,
  refreshCategoryAction,
  refreshEntireEncyclopediaAction,
  refreshSelectedAction,
} from "@/lib/admin/maintenance/actions";
import type { MaintenanceCategoryFilter } from "@/lib/admin/maintenance/types";

const CATEGORIES: { id: MaintenanceCategoryFilter; label: string }[] = [
  { id: "meme", label: "Memes" },
  { id: "slang", label: "Slang" },
  { id: "event", label: "Events" },
  { id: "creator", label: "People" },
  { id: "trend", label: "Trends" },
];

type ReportSummary = {
  id: string;
  createdAt: string;
  status: string;
  scopeLabel: string;
  targetCount: number;
  updatedCount: number;
  manualReviewSlugs: string[];
};

export function MaintenanceCenter({
  recentReports,
}: {
  recentReports: ReportSummary[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState("");

  function go(result: { ok: true; reportId: string } | { ok: false; error: string }) {
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/admin/maintenance/${result.reportId}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
          Experimental
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
          Maintenance Center
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Refresh dynamic metadata from live internet evidence (Wikipedia
          pageviews, news, Reddit, Trends RSS, optional YouTube API). Historical
          prose stays untouched. Visitors never wait on AI.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          Flow:{" "}
          <span className="text-zinc-300">Propose → Review report → Apply</span>
          . Nothing commits or deploys automatically.
        </p>
      </header>

      {error && (
        <p className="mb-6 rounded-md border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">
          Refresh Entire Encyclopedia
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Propose dynamic updates for every published entry.
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              go(await refreshEntireEncyclopediaAction());
            });
          }}
          className="mt-4 rounded-md border border-amber-700/50 bg-amber-950/40 px-4 py-2.5 text-sm font-medium text-amber-100 hover:bg-amber-900/40 disabled:opacity-50"
        >
          {pending ? "Working…" : "Refresh Entire Encyclopedia"}
        </button>
      </section>

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">Refresh Categories</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Propose updates for one category at a time.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              disabled={pending}
              onClick={() => {
                setError(null);
                startTransition(async () => {
                  go(await refreshCategoryAction(cat.id));
                });
              }}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-500 disabled:opacity-50"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">
          Refresh Selected Articles
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Comma- or newline-separated slugs.
        </p>
        <textarea
          value={selectedSlugs}
          onChange={(e) => setSelectedSlugs(e.target.value)}
          rows={3}
          placeholder="chicken-jockey&#10;italian-brainrot&#10;salt-bae"
          className="mt-3 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
        />
        <button
          type="button"
          disabled={pending || !selectedSlugs.trim()}
          onClick={() => {
            setError(null);
            const slugs = selectedSlugs
              .split(/[\s,]+/)
              .map((s) => s.trim())
              .filter(Boolean);
            startTransition(async () => {
              go(await refreshSelectedAction(slugs));
            });
          }}
          className="mt-3 rounded-md border border-zinc-600 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
        >
          Refresh Selected
        </button>
      </section>

      <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
        <h2 className="text-sm font-semibold text-zinc-100">Refresh by Prompt</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Examples: “Refresh all relevance scores.” · “Update every meme.” ·
          “Refresh AI-related articles.” · “Refresh everything reviewed over 90
          days ago.”
        </p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="Refresh everything reviewed over 90 days ago."
          className="mt-3 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
        />
        <button
          type="button"
          disabled={pending || !prompt.trim()}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              go(await refreshByPromptAction(prompt));
            });
          }}
          className="mt-3 rounded-md border border-sky-700/50 bg-sky-950/40 px-4 py-2 text-sm font-medium text-sky-100 hover:bg-sky-900/40 disabled:opacity-50"
        >
          Run Prompt Refresh
        </button>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-100">
          Recent reports
        </h2>
        {recentReports.length === 0 ? (
          <p className="text-sm text-zinc-500">No refresh reports yet.</p>
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
                      {new Date(r.createdAt).toLocaleString()} · {r.status} ·{" "}
                      {r.updatedCount}/{r.targetCount} changed
                      {r.manualReviewSlugs.length > 0
                        ? ` · ${r.manualReviewSlugs.length} need review`
                        : ""}
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
