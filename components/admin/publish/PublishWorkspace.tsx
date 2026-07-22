"use client";

import { useState } from "react";
import Link from "next/link";
import type { ApprovedDraft } from "@/lib/ai/packages";
import type { PublishPrepResult } from "@/lib/admin/publish";
import { preparePublishExport } from "@/lib/admin/publish";

interface PublishWorkspaceProps {
  approvedDrafts: ApprovedDraft[];
}

/**
 * Publish preparation — export candidates for human lib/content commits.
 * Never writes files or deploys.
 */
export function PublishWorkspace({ approvedDrafts }: PublishWorkspaceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    approvedDrafts[0]?.id ?? null,
  );
  const selected = approvedDrafts.find((d) => d.id === selectedId) ?? null;
  const prep: PublishPrepResult | null = selected
    ? preparePublishExport(selected)
    : null;

  if (approvedDrafts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 px-6 py-12 text-center">
        <p className="text-sm text-zinc-400">No approved drafts yet.</p>
        <p className="mt-2 text-xs text-zinc-600">
          Approve an article from Article Preview first.
        </p>
        <p className="mt-4 text-xs">
          <Link href="/drafts" className="text-zinc-300 underline">
            Go to Drafts
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
        {approvedDrafts.map((d) => (
          <li key={d.id}>
            <button
              type="button"
              onClick={() => setSelectedId(d.id)}
              className={`flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between ${
                selectedId === d.id ? "bg-zinc-900/60" : ""
              }`}
            >
              <div>
                <p className="font-medium text-zinc-100">
                  {d.draftPackage.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {d.id} · {d.draftPackage.category} · /
                  {d.draftPackage.slugSuggestion}
                </p>
              </div>
              <span className="text-xs text-emerald-400/90">Approved</span>
            </button>
          </li>
        ))}
      </ul>

      {prep && selected && (
        <section className="rounded-lg border border-zinc-700 bg-zinc-950 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Publish preparation
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Content entry candidate for{" "}
            <strong className="font-medium text-zinc-300">
              {selected.draftPackage.title}
            </strong>
            . Does not write{" "}
            <code className="text-zinc-300">lib/content</code>, commit, or
            deploy. Human merges after{" "}
            <code className="text-zinc-300">npm run validate</code>.
          </p>
          <p className="mt-2 text-xs">
            <Link
              href={`/article-preview/${selected.draftPackageId}`}
              className="text-zinc-300 underline hover:text-white"
            >
              Re-open article preview
            </Link>
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-amber-200/80">
            {prep.validationHints.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <pre className="mt-3 max-h-96 overflow-auto rounded-md border border-zinc-800 bg-zinc-900 p-3 text-[11px] leading-relaxed text-zinc-300">
            {prep.previewTypeScriptSnippet}
          </pre>
        </section>
      )}
    </div>
  );
}
