"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { DraftPackage } from "@/lib/ai/packages";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import {
  sendDraftToEditsAction,
  deleteDraftAction,
} from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function DraftArticleView({ draft }: { draft: DraftPackage }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const article = draftPackageToPresentationArticle(draft);

  function onSendToEdits() {
    setError(null);
    startTransition(async () => {
      const result = await sendDraftToEditsAction(draft.id, comment);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(experimentalPaths.edit(result.editId));
    });
  }

  function onDelete() {
    if (!window.confirm("Delete this unpublished draft?")) return;
    setError(null);
    startTransition(async () => {
      const result = await deleteDraftAction(draft.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(experimentalPaths.drafts);
    });
  }

  return (
    <div>
      <div className="border-b border-zinc-800/80 bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-md border border-amber-800/50 bg-amber-950/30 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-amber-100/90">
            Unpublished Draft
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
          <h2 className="text-lg font-semibold text-white">Editor</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Optional revision notes. Leave blank to send for publish review
            without changes.
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Expand the history section. · Rewrite the introduction. · Add more sources. · Make the tone more neutral."
            className="mt-4 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={pending}
              onClick={onSendToEdits}
              className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
            >
              {pending ? "Working…" : "Send to Edits"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={onDelete}
              className="rounded-md border border-red-900/60 px-4 py-2.5 text-sm font-medium text-red-200/90 hover:bg-red-950/40 disabled:opacity-50"
            >
              Delete Draft
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
