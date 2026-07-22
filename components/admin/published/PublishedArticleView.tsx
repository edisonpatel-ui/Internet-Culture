"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { BaseEntry } from "@/types";
import { entryToPresentationArticle } from "@/lib/admin/editorialOs/entryToPresentation";
import { EncyclopediaArticleView } from "@/components/admin/shared/EncyclopediaArticleView";
import { createPublishedUpdateAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function PublishedArticleView({ entry }: { entry: BaseEntry }) {
  const router = useRouter();
  const [request, setRequest] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const article = entryToPresentationArticle(entry);

  function onGenerateUpdate() {
    setError(null);
    startTransition(async () => {
      const result = await createPublishedUpdateAction({
        slug: entry.slug,
        request,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(
        experimentalPaths.publishedUpdate(entry.slug, result.sessionId),
      );
    });
  }

  return (
    <div>
      <div className="border-b border-zinc-800/80 bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="inline-flex items-center rounded-md border border-emerald-800/50 bg-emerald-950/30 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-100/90">
            Published
          </span>
          <Link
            href={experimentalPaths.published}
            className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            All published
          </Link>
        </div>
      </div>

      <EncyclopediaArticleView article={article} />

      <section className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-white">Update</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Describe the change. The Knowledge Engine researches only that
            request.
          </p>
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows={3}
            placeholder="Add today's viral event. · Update current relevance. · Rewrite the introduction. · Add another source."
            className="mt-4 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />
          <button
            type="button"
            disabled={pending || !request.trim()}
            onClick={onGenerateUpdate}
            className="mt-4 rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white disabled:opacity-50"
          >
            {pending ? "Generating…" : "Generate Update"}
          </button>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      </section>
    </div>
  );
}
