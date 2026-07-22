"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { searchPublishedAction } from "@/lib/admin/editorialOs/actions";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

type Hit = {
  slug: string;
  title: string;
  category: string;
  description: string;
  addedAt: string;
  lastUpdated?: string;
};

export function PublishedSearch({ initial }: { initial: Hit[] }) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>(initial);
  const [pending, startTransition] = useTransition();

  function onSearch(value: string) {
    setQuery(value);
    startTransition(async () => {
      const next = await searchPublishedAction(value);
      setHits(next);
    });
  }

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="text-[11px] uppercase tracking-wide text-zinc-500">
          Search published articles
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Title, slug, or keyword…"
          className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
        />
      </label>

      <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
        {hits.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-zinc-500">
            {pending ? "Searching…" : "No articles match."}
          </li>
        ) : (
          hits.map((h) => (
            <li key={h.slug}>
              <Link
                href={experimentalPaths.publishedArticle(h.slug)}
                className="flex flex-col gap-0.5 px-4 py-3 hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-zinc-100">{h.title}</p>
                  <p className="text-xs text-zinc-500">
                    {h.category} · /{h.slug}
                  </p>
                </div>
                <span className="text-xs text-zinc-600">
                  {h.lastUpdated ?? h.addedAt}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
