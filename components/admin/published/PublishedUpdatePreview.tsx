"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ArticleUpdateSession } from "@/lib/admin/articleUpdate/store";
import type { PresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { applyPublishedUpdateAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function PublishedUpdatePreview({
  session,
  article,
}: {
  session: ArticleUpdateSession;
  article: PresentationArticle;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  function onApprove() {
    setError(null);
    startTransition(async () => {
      const result = await applyPublishedUpdateAction(session.id);
      setConfirming(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(experimentalPaths.publishedArticle(session.slug));
      router.refresh();
    });
  }

  return (
    <div>
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            Update preview
          </p>
          <h1 className="mt-1 text-xl font-semibold text-zinc-50">
            {session.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Request: “{session.request}”
          </p>
          {session.usedRealGeneration === false && (
            <p className="mt-3 rounded-md border border-red-800/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              AI generation wasn&apos;t available for this request (missing/failed
              Groq or Tavily), so nothing was actually changed below — this is
              the article exactly as it already is live. Try again once
              generation is available rather than approving this.
            </p>
          )}
          {session.diffs.filter((d) => d.changed).length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-amber-200/80">
              {session.diffs
                .filter((d) => d.changed)
                .slice(0, 8)
                .map((d) => (
                  <li key={d.field}>Changed: {d.label}</li>
                ))}
            </ul>
          )}
          {session.usedRealGeneration !== false &&
            session.diffs.filter((d) => d.changed).length === 0 && (
              <p className="mt-3 rounded-md border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400">
                No changes were made — the AI didn&apos;t find anything to update
                for this request. Try rephrasing it more specifically.
              </p>
            )}
        </div>
      </div>

      <EncyclopediaArticleView article={article} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex max-w-5xl flex-wrap gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href={experimentalPaths.publishedArticle(session.slug)}
            className="rounded-md border border-zinc-600 px-4 py-2.5 text-sm text-zinc-200 hover:bg-zinc-900"
          >
            Back
          </Link>
          {confirming ? (
            <>
              <span className="text-sm text-amber-200/90">
                Publish this update? This can&apos;t be undone.
              </span>
              <button
                type="button"
                disabled={pending}
                onClick={onApprove}
                className="rounded-md border border-emerald-700/60 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-950/70 disabled:opacity-40"
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
            </>
          ) : (
            <button
              type="button"
              disabled={pending || session.status === "applied"}
              onClick={() => setConfirming(true)}
              className="rounded-md border border-emerald-700/60 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-950/70 disabled:opacity-40"
            >
              Approve Publish
            </button>
          )}
          {error && <p className="w-full text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
