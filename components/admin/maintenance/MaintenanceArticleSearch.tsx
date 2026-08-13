"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  deleteArticleAction,
  searchArticlesAction,
} from "@/lib/admin/maintenance/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import type { ContentCategory } from "@/types";

type Hit = {
  slug: string;
  title: string;
  category: ContentCategory;
  description: string;
  addedAt: string;
  lastUpdated?: string;
};

export function MaintenanceArticleSearch() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [searched, setSearched] = useState(false);
  const [pending, startTransition] = useTransition();
  const [confirmingSlug, setConfirmingSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deletedSlugs, setDeletedSlugs] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState<string | null>(null);

  function onSearch(value: string) {
    setQuery(value);
    setSearched(true);
    startTransition(async () => {
      const next = await searchArticlesAction(value);
      setHits(next);
    });
  }

  async function handleDelete(hit: Hit) {
    setDeleting(hit.slug);
    setNotice(null);
    try {
      const res = await deleteArticleAction(hit.category, hit.slug);
      if (!res.ok) {
        setNotice(`Couldn't delete "${hit.title}": ${res.error}`);
      } else {
        setDeletedSlugs((prev) => new Set(prev).add(hit.slug));
        const cleaned = res.result.referencesCleaned;
        setNotice(
          `Deleted "${hit.title}".` +
            (cleaned.length > 0
              ? ` Removed references from: ${cleaned.join(", ")}.`
              : ""),
        );
      }
    } finally {
      setDeleting(null);
      setConfirmingSlug(null);
    }
  }

  return (
    <section className="mb-10 rounded-lg border border-zinc-800 bg-zinc-950/60 p-5">
      <h2 className="text-sm font-semibold text-zinc-100">Find an article</h2>
      <p className="mt-1 text-xs text-zinc-500">
        Search by title, slug, or keyword. Edit sends it to the Published
        Article update flow; Delete removes it entirely — immediate, no
        undo.
      </p>

      <label className="mt-4 block">
        <span className="sr-only">Search articles</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Title, slug, or keyword…"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
        />
      </label>

      {notice && (
        <p className="mt-3 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300">
          {notice}
        </p>
      )}

      {searched && (
        <ul className="mt-4 divide-y divide-zinc-900 rounded-lg border border-zinc-800">
          {hits.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-zinc-500">
              {pending ? "Searching…" : "No articles match."}
            </li>
          ) : (
            hits.map((h) => {
              const isDeleted = deletedSlugs.has(h.slug);
              const isConfirming = confirmingSlug === h.slug;
              const isDeleting = deleting === h.slug;
              return (
                <li
                  key={h.slug}
                  className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className={isDeleted ? "opacity-40" : undefined}>
                    <p className="text-sm font-medium text-zinc-100">
                      {h.title}
                      {isDeleted && (
                        <span className="ml-2 text-xs text-rose-400">
                          Deleted
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {h.category} · /{h.slug}
                    </p>
                  </div>

                  {!isDeleted && (
                    <div className="flex shrink-0 items-center gap-2">
                      {isConfirming ? (
                        <>
                          <span className="text-xs text-rose-300">
                            Delete permanently?
                          </span>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => void handleDelete(h)}
                            className="rounded-md border border-rose-800 bg-rose-950/60 px-3 py-1.5 text-xs font-medium text-rose-200 hover:bg-rose-900/60 disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting…" : "Yes, delete"}
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => setConfirmingSlug(null)}
                            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-900"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={experimentalPaths.publishedArticle(h.slug)}
                            className="rounded-md border border-zinc-600 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 hover:bg-white"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => setConfirmingSlug(h.slug)}
                            className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-rose-300 hover:bg-zinc-900"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </section>
  );
}
