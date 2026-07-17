import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";
import { events } from "./events";
import { creators } from "./creators";
import type { BaseEntry } from "@/types";

export interface SearchResult extends BaseEntry {
  type: "trend" | "meme" | "slang" | "event" | "creator";
}

export function getAllSearchResults(): SearchResult[] {
  const memeResults: SearchResult[] = memes.map((m) => ({
    ...m,
    type: "meme" as const,
  }));

  const slangResults: SearchResult[] = slangTerms.map((s) => ({
    ...s,
    type: "slang" as const,
  }));

  const eventResults: SearchResult[] = events.map((e) => ({
    ...e,
    type: "event" as const,
  }));

  const creatorResults: SearchResult[] = creators.map((c) => ({
    ...c,
    type: "creator" as const,
  }));

  const trendOnly = trends.filter(
    (t) =>
      !memes.some((m) => m.slug === t.slug) &&
      !slangTerms.some((s) => s.slug === t.slug) &&
      !events.some((e) => e.slug === t.slug),
  );

  const trendResults: SearchResult[] = trendOnly.map((t) => ({
    ...t,
    type: "trend" as const,
  }));

  return [
    ...memeResults,
    ...slangResults,
    ...eventResults,
    ...creatorResults,
    ...trendResults,
  ];
}

/**
 * Scores a result against the query words.
 * Priority: exact title > title word match > tags > category > description.
 * Returns 0 if no words match anything.
 */
function scoreResult(item: SearchResult, words: string[]): number {
  const titleLower = item.title.toLowerCase();
  const fullQuery = words.join(" ");

  let score = 0;

  // Title exact match
  if (titleLower === fullQuery) return 200;
  // Title starts with full query
  if (titleLower.startsWith(fullQuery)) score += 160;
  // Title contains full query
  else if (titleLower.includes(fullQuery)) score += 120;

  for (const word of words) {
    if (titleLower.includes(word)) score += 40;
    if (item.tags?.some((t) => t.toLowerCase().includes(word))) score += 15;
    if (item.category.toLowerCase().includes(word)) score += 12;
    if (item.type.toLowerCase().includes(word)) score += 12;
    if (item.description.toLowerCase().includes(word)) score += 5;
  }

  return score;
}

/**
 * Filters and ranks search results for a given query.
 *
 * Supports multi-word queries — "gaming memes" matches entries that contain
 * both "gaming" (in tags) and "memes" (in category). Results are ranked by
 * match quality: title > tags/category > description.
 *
 * Architecture note: replace this function with a database full-text search
 * (e.g. Postgres tsvector, Algolia, Typesense) in Version 2 without changing
 * any call sites.
 */
export function filterSearchResults(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const words = normalized.split(/\s+/).filter(Boolean);
  const all = getAllSearchResults();

  const scored = all
    .map((item) => {
      const s = scoreResult(item, words);
      return s > 0 ? { item, score: s } : null;
    })
    .filter(Boolean) as { item: SearchResult; score: number }[];

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}

export function getSearchSuggestions(query: string, limit = 5): SearchResult[] {
  if (!query.trim()) return [];
  return filterSearchResults(query).slice(0, limit);
}
