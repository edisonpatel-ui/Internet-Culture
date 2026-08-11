"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { DraftPackage } from "@/lib/ai/packages";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import {
  sendDraftToEditsAction,
  publishDraftAction,
  deleteDraftAction,
} from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function DraftArticleView({ draft }: { draft: DraftPackage }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [editPending, startEditTransition] = useTransition();
  const [publishPending, startPublishTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [justUpdated, setJustUpdated] = useState<string | null>(null);
  const article = draftPackageToPresentationArticle(draft);

  function onContinue() {
    setError(null);
    setJustUpdated(null);
    startEditTransition(async () => {
      const result = await sendDraftToEditsAction(draft.id, comment);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      // Draft is saved back with status "draft" — refresh this page to show
      // the updated content, so the editor can keep revising as many times
      // as needed before publishing.
      setComment("");
      setJustUpdated(result.changeSummary);
      router.refresh();
    });
  }

  function onPublish() {
    setError(null);
    startPublishTransition(async () => {
      const result = await publishDraftAction(draft.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      // Page re-fetches and shows the "already published" state with a
      // link to the live article.
      router.refresh();
    });
  }

  function onDelete() {
    if (!window.confirm(`Delete "${draft.title}"? This can't be undone.`)) {
      return;
    }
    setError(null);
    startDeleteTransition(async () => {
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
            Draft preview
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              disabled={deletePending}
              onClick={onDelete}
              className="text-xs text-red-500/80 transition-colors hover:text-red-400 disabled:opacity-50"
            >
              {deletePending ? "Deleting…" : "Delete draft"}
            </button>
            <Link
              href={experimentalPaths.drafts}
              className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
            >
              All drafts
            </Link>
          </div>
        </div>
      </div>

      <EncyclopediaArticleView article={article} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-zinc-50">AI Edit</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Give instructions for a revision, or leave blank and just
            Publish. You can edit as many times as you want before
            publishing — each edit saves back here.
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Optional: expand history, clarify the lead, add sources…"
            className="mt-4 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={editPending || !comment.trim()}
              onClick={onContinue}
              className="rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
            >
              {editPending ? "Revising…" : "Apply Edit"}
            </button>
            <button
              type="button"
              disabled={publishPending}
              onClick={onPublish}
              className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-50"
            >
              {publishPending ? "Publishing…" : "Publish"}
            </button>
            {justUpdated && !editPending && (
              <span
                className={
                  justUpdated.startsWith("⚠️")
                    ? "text-sm text-amber-400"
                    : "text-sm text-emerald-400"
                }
              >
                {justUpdated}
              </span>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
