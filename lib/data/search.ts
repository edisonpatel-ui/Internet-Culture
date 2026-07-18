/**
 * Server-side search index builder.
 *
 * Ranking logic lives in `./searchFilter` so client UI never imports the
 * full content catalogs.
 */

import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";
import { events } from "./events";
import { creators } from "./creators";
import { getAliases } from "@/lib/content/aliases";
import { getFeaturedMediaItem } from "@/lib/media/mediaUtils";
import {
  filterSearchDocuments,
  type SearchDocument,
  type SearchResultType,
} from "./searchFilter";
import type { BaseEntry } from "@/types";

export type { SearchDocument, SearchResultType };
export {
  filterSearchDocuments,
  MIN_SEARCH_CONFIDENCE,
} from "./searchFilter";

/** @deprecated Prefer SearchDocument — kept for older call sites. */
export interface SearchResult extends BaseEntry {
  type: SearchResultType;
}

function toSearchDocument(
  entry: BaseEntry,
  type: SearchResultType,
): SearchDocument {
  const featured = getFeaturedMediaItem(entry.media ?? []);
  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    type,
    tags: entry.tags,
    trendDirection: entry.trendDirection,
    imageGradient: entry.imageGradient,
    media: featured ? [featured] : undefined,
    aliases: getAliases(entry.slug).map((a) => a.toLowerCase()),
  };
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

/** Slim index for the search UI — pass from a Server Component as props. */
export function buildSearchIndex(): SearchDocument[] {
  return getAllSearchResults().map((r) => toSearchDocument(r, r.type));
}

/**
 * Server convenience: build index + filter in one call.
 * Prefer `filterSearchDocuments(buildSearchIndex(), query)` when the index
 * is already available (e.g. search page props).
 */
export function filterSearchResults(query: string): SearchDocument[] {
  return filterSearchDocuments(buildSearchIndex(), query);
}

export function getSearchSuggestions(
  query: string,
  limit = 5,
): SearchDocument[] {
  if (!query.trim()) return [];
  return filterSearchResults(query).slice(0, limit);
}
