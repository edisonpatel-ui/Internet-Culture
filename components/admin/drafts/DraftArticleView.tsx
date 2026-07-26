"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { DraftPackage } from "@/lib/ai/packages";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { sendDraftToEditsAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function DraftArticleView({ draft }: { draft: DraftPackage }) {
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successEditId, setSuccessEditId] = useState<string | null>(null);
  const article = draftPackageToPresentationArticle(draft);

  function onContinue() {
    setError(null);
    setSuccessEditId(null);
    startTransition(async () => {
      const result = await sendDraftToEditsAction(draft.id, comment);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSuccessEditId(result.editId);
    });
  }

  if (successEditId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-500/90">
          Edit ready
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-50">
          {comment.trim()
            ? "Edit completed successfully"
            : "Ready to review and publish"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Review the updated draft, then publish from the Edit page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={experimentalPaths.edit(successEditId)}
            className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-white"
          >
            Review Changes
          </Link>
          <Link
            href={experimentalPaths.edit(successEditId)}
            className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40"
          >
            Publish
          </Link>
          <Link
            href={experimentalPaths.drafts}
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
          >
            Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div>
      <div className="border-b border-zinc-800/80 bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-md border border-amber-800/50 bg-amber-950/30 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-100/90">
            Draft preview
          </span>
          <Link
            href={experimentalPaths.drafts}
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            All drafts
          </Link>
        </div>
      </div>

      <EncyclopediaArticleView article={article} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-zinc-50">AI Edit</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Optional instructions for an AI revision. Leave blank to continue
            straight to Edit → Publish.
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Optional: expand history, clarify the lead, add sources…"
            className="mt-4 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />
          <div className="mt-4">
            <button
              type="button"
              disabled={pending}
              onClick={onContinue}
              className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
            >
              {pending
                ? "Working…"
                : comment.trim()
                  ? "Generate Updated Draft"
                  : "Continue to Edit"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
