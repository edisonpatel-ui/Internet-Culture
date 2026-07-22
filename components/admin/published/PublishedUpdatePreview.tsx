"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ArticleUpdateSession } from "@/lib/admin/articleUpdate/store";
import { draftPackageToPresentationArticle } from "@/lib/admin/draftGeneration/presentationArticle";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { applyPublishedUpdateAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function PublishedUpdatePreview({
  session,
}: {
  session: ArticleUpdateSession;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const article = draftPackageToPresentationArticle(session.proposedDraft);

  function onApprove() {
    setError(null);
    startTransition(async () => {
      const result = await applyPublishedUpdateAction(session.id);
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
          <button
            type="button"
            disabled={pending || session.status === "applied"}
            onClick={onApprove}
            className="rounded-md border border-emerald-700/60 bg-emerald-950/40 px-4 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-950/70 disabled:opacity-40"
          >
            {pending ? "Publishing…" : "Approve Publish"}
          </button>
          {error && <p className="w-full text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
