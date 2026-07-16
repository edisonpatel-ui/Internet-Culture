import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";
import { events } from "./events";
import type { BaseEntry } from "@/types";

export interface SearchResult extends BaseEntry {
  type: "trend" | "meme" | "slang" | "event";
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

  const trendOnly = trends.filter(
    (t) =>
      !memes.some((m) => m.slug === t.slug) &&
      !slangTerms.some((s) => s.slug === t.slug) &&
      !events.some((e) => e.slug === t.slug)
  );

  const trendResults: SearchResult[] = trendOnly.map((t) => ({
    ...t,
    type: "trend" as const,
  }));

  return [...memeResults, ...slangResults, ...eventResults, ...trendResults];
}

export function filterSearchResults(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getAllSearchResults().filter((item) => {
    const haystack = [
      item.title,
      item.description,
      item.category,
      ...(item.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function getSearchSuggestions(query: string, limit = 5): SearchResult[] {
  if (!query.trim()) return [];
  const results = filterSearchResults(query);
  return results.slice(0, limit);
}
