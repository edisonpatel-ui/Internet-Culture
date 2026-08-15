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
  const [confirming, setConfirming] = useState(false);

  const revised = draftPackageToPresentationArticle(session.revisedDraft);
  const alreadyPublished = session.status === "published";

  function onPublish() {
    setError(null);
    setPublishedHref(null);
    startTransition(async () => {
      const result = await publishFromEditAction(session.id);
      setConfirming(false);
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
            href={experimentalPaths.edits}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            ← Back to Edits
          </Link>
        </div>
      </div>

      <EncyclopediaArticleView article={revised} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {publishedHref || alreadyPublished ? (
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-500/90">
                Published
              </p>
              <h2 className="text-lg font-semibold text-zinc-50">
                Edit completed successfully
              </h2>
              <p className="text-sm text-zinc-500">
                {publishedHref
                  ? "Published to the live encyclopedia."
                  : "This edit is already published."}
              </p>
              <div className="flex flex-wrap gap-3">
                {(publishedHref || alreadyPublished) && (
                  <Link
                    href={
                      publishedHref ??
                      getDetailHref(
                        session.revisedDraft.category,
                        session.revisedDraft.slugSuggestion,
                      )
                    }
                    className="inline-flex rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40"
                  >
                    Open live article
                  </Link>
                )}
                <Link
                  href={experimentalPaths.edits}
                  className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
                >
                  Back to Edits
                </Link>
                <Link
                  href={experimentalPaths.create}
                  className="rounded-md border border-zinc-800 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300"
                >
                  Back to Prompt
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-zinc-50">Publish</h2>
              <p className="text-sm text-zinc-500">
                Publishing writes the article into the live encyclopedia.
              </p>
              {confirming ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-amber-200/90">
                    Publish this article? This can&apos;t be undone.
                  </span>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={onPublish}
                    className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-40"
                  >
                    {pending ? "Publishing…" : "Yes, publish"}
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setConfirming(false)}
                    className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => setConfirming(true)}
                  className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-900/40 disabled:opacity-40"
                >
                  Publish
                </button>
              )}
            </div>
          )}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
