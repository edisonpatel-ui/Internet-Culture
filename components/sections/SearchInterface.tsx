"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import { filterSearchResults } from "@/lib/data/search";
import { getDetailHref, getCategoryLabel } from "@/lib/utils";
import type { SearchResult } from "@/lib/data/search";

/** Common topic chips shown below the category filter. */
const TOPICS = [
  { label: "Brainrot", value: "brainrot" },
  { label: "Gen Alpha", value: "gen alpha" },
  { label: "Gaming", value: "gaming" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Streaming", value: "streaming" },
  { label: "Classic", value: "classic" },
  { label: "Social Media", value: "social media" },
];

function SearchResultItem({ result }: { result: SearchResult }) {
  const href = getDetailHref(result.category, result.slug);

  return (
    <Link
      href={href}
      className="glass-card flex items-center gap-4 overflow-hidden p-3 transition-all hover:border-white/15 sm:p-4"
    >
      <EntryCardMedia
        entry={result}
        aspect="none"
        className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-white">{result.title}</h3>
            <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
              {result.description}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
            {getCategoryLabel(result.category)}
          </span>
        </div>
      </div>
    </Link>
  );
}

interface SearchInterfaceProps {
  compact?: boolean;
  /** Prefill from homepage / URL — not a search redesign. */
  initialQuery?: string;
}

export function SearchInterface({
  compact = false,
  initialQuery = "",
}: SearchInterfaceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "meme" | "slang" | "trend" | "event" | "creator"
  >("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const results = useMemo(() => filterSearchResults(query), [query]);

  const filteredResults = useMemo(() => {
    let r = results;
    // Category filter
    if (activeFilter !== "all") {
      r = r.filter((item) => item.type === activeFilter);
    }
    // Topic/tag filter — matches against tags array and description
    if (activeTopic) {
      const topic = activeTopic; // capture narrowed string for closure
      r = r.filter(
        (item) =>
          item.tags?.some((t) => t.toLowerCase().includes(topic)) ||
          item.description.toLowerCase().includes(topic),
      );
    }
    return r;
  }, [results, activeFilter, activeTopic]);

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
          placeholder="Search memes, slang, trends, creators…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
        />
      </div>

      {/* Category filters */}
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

      {/* Topic chips — shown only when not in compact mode or when a topic is active */}
      {(!compact || activeTopic) && (
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <button
              key={topic.value}
              type="button"
              onClick={() =>
                setActiveTopic(activeTopic === topic.value ? null : topic.value)
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTopic === topic.value
                  ? "bg-sky-600 text-white"
                  : "border border-white/10 bg-transparent text-zinc-500 hover:border-white/20 hover:text-zinc-300"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      )}

      {query.trim() === "" ? (
        <div className={`glass-card text-center ${compact ? "py-8" : "py-16"}`}>
          <p className={`${compact ? "text-3xl" : "text-4xl"} mb-3`}>🔍</p>
          <p className="text-base font-medium text-zinc-300">
            Start typing to search the encyclopedia
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Try aliases and typos — e.g. &ldquo;gyat&rdquo;, &ldquo;skibidi guy&rdquo;, &ldquo;kai&rdquo;
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
