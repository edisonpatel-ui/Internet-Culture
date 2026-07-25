"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { EditSession } from "@/lib/admin/editorialOs";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { publishFromEditAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import { getDetailHref } from "@/lib/utils";

export function EditRevisionView({ session }: { session: EditSession }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [publishedHref, setPublishedHref] = useState<string | null>(null);

  const revised = draftPackageToPresentationArticle(session.revisedDraft);
  const alreadyPublished = session.status === "published";

  function onPublish() {
    setError(null);
    setPublishedHref(null);
    startTransition(async () => {
      const result = await publishFromEditAction(session.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const href = getDetailHref(result.category, result.slug);
      setPublishedHref(href);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-amber-500/90">
              Updated preview
            </p>
            <h1 className="mt-1 text-xl font-semibold text-zinc-50">
              {session.revisedDraft.title}
            </h1>
            {session.editorComment ? (
              <p className="mt-1 text-sm text-zinc-500">
                Edit: “{session.editorComment}”
              </p>
            ) : (
              <p className="mt-1 text-sm text-zinc-500">
                Ready to publish — no AI revision requested.
              </p>
            )}
          </div>
          <Link
            href={experimentalPaths.draft(session.draftId)}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← Back to draft
          </Link>
        </div>
      </div>

      <EncyclopediaArticleView article={revised} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {publishedHref ? (
            <div className="space-y-3">
              <p className="text-sm text-emerald-400/90">
                Published to the live encyclopedia.
              </p>
              <Link
                href={publishedHref}
                className="inline-flex rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40"
              >
                Open live article
              </Link>
            </div>
          ) : (
            <button
              type="button"
              disabled={pending || alreadyPublished}
              onClick={onPublish}
              className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-40"
            >
              {pending
                ? "Publishing…"
                : alreadyPublished
                  ? "Already published"
                  : "Publish"}
            </button>
          )}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
