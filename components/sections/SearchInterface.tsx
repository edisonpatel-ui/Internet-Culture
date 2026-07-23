"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EntryCardMedia } from "@/components/media/EntryCardMedia";
import {
  filterSearchDocuments,
  type SearchDocument,
  type SearchResultType,
} from "@/lib/data/searchFilter";
import type { TrendingSearchTopic } from "@/lib/discovery/trendingSearches";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { getDetailHref, getCategoryLabel, pluralize } from "@/lib/utils";

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
] as const;

const SearchResultItem = memo(function SearchResultItem({
  result,
  query,
  position,
}: {
  result: SearchDocument;
  query: string;
  position: number;
}) {
  const href = getDetailHref(result.category, result.slug);

  return (
    <Link
      href={href}
      onClick={() => {
        trackEvent(ANALYTICS_EVENTS.SEARCH_RESULT_CLICK, {
          query,
          slug: result.slug,
          category: result.category,
          position,
        });
      }}
      className="glass-card flex items-center gap-4 overflow-hidden p-3 transition-colors duration-200 hover:border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 sm:p-4"
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
});

interface SearchInterfaceProps {
  /** Slim index from the server — keeps catalogs out of the client bundle. */
  index: SearchDocument[];
  /** Editorial trending chips for the empty state (swappable data source). */
  trendingSearches?: TrendingSearchTopic[];
  initialQuery?: string;
}

export function SearchInterface({
  index,
  trendingSearches = [],
  initialQuery = "",
}: SearchInterfaceProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<"all" | SearchResultType>(
    "all",
  );
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const lastTrackedQuery = useRef("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => filterSearchDocuments(index, query),
    [index, query],
  );

  const filteredResults = useMemo(() => {
    let r = results;
    if (activeFilter !== "all") {
      r = r.filter((item) => item.type === activeFilter);
    }
    if (activeTopic) {
      const topic = activeTopic;
      r = r.filter(
        (item) =>
          item.tags?.some((t) => t.toLowerCase().includes(topic)) ||
          item.description.toLowerCase().includes(topic),
      );
    }
    return r;
  }, [results, activeFilter, activeTopic]);

  const isEmptyQuery = query.trim() === "";

  const applyTrendingSearch = useCallback((topic: TrendingSearchTopic) => {
    setQuery(topic.query);
    setActiveTopic(null);
    trackEvent(ANALYTICS_EVENTS.TOPIC_FILTER, {
      topic: topic.slug,
      active: true,
    });
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    const handle = window.setTimeout(() => {
      if (q === lastTrackedQuery.current) return;
      lastTrackedQuery.current = q;
      trackEvent(ANALYTICS_EVENTS.SEARCH, {
        query: q,
        result_count: filteredResults.length,
        category_filter: activeFilter,
        topic_filter: activeTopic ?? "",
      });
      if (filteredResults.length === 0) {
        trackEvent(ANALYTICS_EVENTS.SEARCH_NO_RESULT, {
          query: q,
          category_filter: activeFilter,
          topic_filter: activeTopic ?? "",
        });
      }
    }, 600);
    return () => window.clearTimeout(handle);
  }, [query, filteredResults.length, activeFilter, activeTopic]);

  const filters: { id: "all" | SearchResultType; label: string }[] = [
    { id: "all", label: "All" },
    { id: "meme", label: "Memes" },
    { id: "slang", label: "Slang" },
    { id: "trend", label: "Trends" },
    { id: "event", label: "Events" },
    { id: "creator", label: "People" },
  ];

  return (
    <div className="space-y-6">
      <div className="relative" role="search">
        <label htmlFor="encyclopedia-search" className="sr-only">
          Search memes, slang, trends, and people
        </label>
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          id="encyclopedia-search"
          type="search"
          placeholder="Search memes, slang, trends, people…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          className="w-full rounded-2xl border border-white/10 bg-[var(--surface)] py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 transition-colors focus:border-[var(--accent-border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
        />
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => {
              setActiveFilter(filter.id);
              trackEvent(ANALYTICS_EVENTS.CATEGORY_FILTER, {
                filter: filter.id,
              });
            }}
            className={`min-h-10 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50 ${
              activeFilter === filter.id
                ? "chip-brand-active"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:border-[var(--accent-border)] hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {!isEmptyQuery && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by topic"
        >
          {TOPICS.map((topic) => (
            <button
              key={topic.value}
              type="button"
              aria-pressed={activeTopic === topic.value}
              onClick={() => {
                const next = activeTopic === topic.value ? null : topic.value;
                setActiveTopic(next);
                trackEvent(ANALYTICS_EVENTS.TOPIC_FILTER, {
                  topic: topic.value,
                  active: next !== null,
                });
              }}
              className={`min-h-9 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50 ${
                activeTopic === topic.value
                  ? "chip-brand-active"
                  : "border border-white/10 bg-transparent text-zinc-500 hover:border-[var(--accent-border)] hover:text-zinc-300"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      )}

      {isEmptyQuery ? (
        <section aria-label="Trending searches">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Trending Searches
          </h2>
          {trendingSearches.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {trendingSearches.map((topic) => (
                <li key={topic.slug}>
                  <button
                    type="button"
                    onClick={() => applyTrendingSearch(topic)}
                    className="min-h-10 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-[var(--accent-border)] hover:bg-[var(--accent-muted)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-secondary)]/50"
                  >
                    {topic.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="glass-card py-10 text-center">
              <p className="text-sm text-zinc-400">
                Search by name, alias, or a short phrase
              </p>
            </div>
          )}
        </section>
      ) : filteredResults.length === 0 ? (
        <div className="glass-card py-14 text-center" role="status">
          <p className="text-lg font-medium text-zinc-300">
            No close matches found.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {activeFilter !== "all" || activeTopic
              ? "Clear a filter, or try a closer title or alias."
              : "Try a closer title, alias, or shorter spelling."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-zinc-500" aria-live="polite">
            {filteredResults.length}{" "}
            {pluralize(filteredResults.length, "match", "matches")}
          </p>
          {filteredResults.map((result, index) => (
            <SearchResultItem
              key={`${result.type}-${result.slug}`}
              result={result}
              query={query.trim()}
              position={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
