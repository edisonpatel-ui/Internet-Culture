"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { filterSearchResults } from "@/lib/data/search";
import { getDetailHref, getCategoryLabel } from "@/lib/utils";
import type { SearchResult } from "@/lib/data/search";

function SearchResultItem({ result }: { result: SearchResult }) {
  const href = getDetailHref(result.category, result.slug);

  return (
    <Link
      href={href}
      className="glass-card block p-4 transition-all hover:border-white/15"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-white">{result.title}</h3>
          <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
            {result.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
          {getCategoryLabel(result.category)}
        </span>
      </div>
    </Link>
  );
}

interface SearchInterfaceProps {
  compact?: boolean;
}

export function SearchInterface({ compact = false }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "meme" | "slang" | "trend" | "event" | "creator"
  >("all");

  const results = useMemo(() => filterSearchResults(query), [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    if (activeFilter === "meme") return results.filter((r) => r.type === "meme");
    if (activeFilter === "slang") return results.filter((r) => r.type === "slang");
    if (activeFilter === "event") return results.filter((r) => r.type === "event");
    if (activeFilter === "creator") return results.filter((r) => r.type === "creator");
    return results.filter((r) => r.type === "trend");
  }, [results, activeFilter]);

  const filters = [
    { id: "all" as const, label: "All" },
    { id: "meme" as const, label: "Memes" },
    { id: "slang" as const, label: "Slang" },
    { id: "trend" as const, label: "Trends" },
    { id: "event" as const, label: "Events" },
    { id: "creator" as const, label: "Creators" },
  ];

  const displayResults = compact ? filteredResults.slice(0, 5) : filteredResults;

  return (
    <div className="space-y-6">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="search"
          placeholder="Search memes, slang, trends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {query.trim() === "" ? (
        <div className={`glass-card text-center ${compact ? "py-8" : "py-16"}`}>
          <p className={`${compact ? "text-3xl" : "text-4xl"} mb-3`}>🔍</p>
          <p className="text-base font-medium text-zinc-300">
            Start typing to search the encyclopedia
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Search across memes, slang, trends, events, and more
          </p>
        </div>
      ) : displayResults.length === 0 ? (
        <div className={`glass-card text-center ${compact ? "py-8" : "py-16"}`}>
          <p className="text-lg font-medium text-zinc-300">No results for &ldquo;{query}&rdquo;</p>
          <p className="mt-2 text-sm text-zinc-500">Try a different search term or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">
              {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
            </p>
            {compact && filteredResults.length > 5 && (
              <Link href={`/search?q=${encodeURIComponent(query)}`} className="text-sm text-violet-400 hover:text-violet-300">
                See all {filteredResults.length} results →
              </Link>
            )}
          </div>
          {displayResults.map((result) => (
            <SearchResultItem key={`${result.type}-${result.slug}`} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}
