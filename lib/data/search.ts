import { trends } from "./trends";
import { memes } from "./memes";
import { slangTerms } from "./slang";
import { events } from "./events";
import { creators } from "./creators";
import { getAliases, resolveAliasQuery } from "@/lib/content/aliases";
import type { BaseEntry } from "@/types";

export interface SearchResult extends BaseEntry {
  type: "trend" | "meme" | "slang" | "event" | "creator";
}

/** Intent phrases stripped so "what does gyatt mean" still matches Gyatt. */
const INTENT_PREFIXES = [
  /^what does\s+/i,
  /^what is (the\s+)?/i,
  /^who is\s+/i,
  /^meaning of\s+/i,
  /^define\s+/i,
];

const INTENT_SUFFIXES = [
  /\s+meaning$/i,
  /\s+meme$/i,
  /\s+slang$/i,
  /\s+explained$/i,
  /\s+definition$/i,
];

/** Category / role hints in the query → boost matching types. */
const CATEGORY_HINTS: Array<{ pattern: RegExp; types: SearchResult["type"][] }> =
  [
    { pattern: /\b(meme|memes|macro|reaction)\b/i, types: ["meme"] },
    { pattern: /\b(slang|word|phrase|meaning|define)\b/i, types: ["slang"] },
    {
      pattern: /\b(streamer|youtuber|creator|influencer|tiktoker)\b/i,
      types: ["creator"],
    },
    { pattern: /\b(event|challenge|raid|launch)\b/i, types: ["event"] },
    { pattern: /\b(trend|viral|aesthetic)\b/i, types: ["trend", "meme"] },
    {
      pattern: /\b(brainrot|gen alpha|skibidi)\b/i,
      types: ["meme", "slang", "creator"],
    },
  ];

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

function normalizeQuery(raw: string): string {
  let q = raw.trim().toLowerCase().replace(/\s+/g, " ");
  for (const re of INTENT_PREFIXES) q = q.replace(re, "");
  for (const re of INTENT_SUFFIXES) q = q.replace(re, "");
  return q.trim();
}

/** Small Levenshtein with early exit — for typo tolerance on short tokens. */
function editDistance(a: string, b: string, max = 2): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const rows = a.length + 1;
  const cols = b.length + 1;
  let prev = new Array(cols);
  let curr = new Array(cols);
  for (let j = 0; j < cols; j++) prev[j] = j;
  for (let i = 1; i < rows; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1;
    [prev, curr] = [curr, prev];
  }
  return prev[b.length];
}

function fuzzyHit(query: string, target: string): boolean {
  if (!query || query.length < 3) return false;
  if (target.includes(query) || query.includes(target)) return true;
  const maxDist = query.length <= 4 ? 1 : 2;
  if (editDistance(query, target, maxDist) <= maxDist) return true;
  // Token-level: "gyat" vs title tokens / alias tokens
  const tokens = target.split(/[\s/-]+/).filter((t) => t.length >= 3);
  return tokens.some((t) => editDistance(query, t, maxDist) <= maxDist);
}

function detectCategoryBoosts(rawQuery: string): Set<SearchResult["type"]> {
  const boosts = new Set<SearchResult["type"]>();
  for (const hint of CATEGORY_HINTS) {
    if (hint.pattern.test(rawQuery)) {
      for (const t of hint.types) boosts.add(t);
    }
  }
  return boosts;
}

/**
 * Scores a result against the query words.
 * Priority: exact title > aliases > fuzzy title/alias > tags > category > description.
 */
function scoreResult(
  item: SearchResult,
  words: string[],
  fullQuery: string,
  rawQuery: string,
  categoryBoosts: Set<SearchResult["type"]>,
): number {
  const titleLower = item.title.toLowerCase();
  const slugWords = item.slug.replace(/-/g, " ");
  const aliases = getAliases(item.slug).map((a) => a.toLowerCase());
  const titleTokens = titleLower.split(/\s+/);

  let score = 0;

  if (titleLower === fullQuery) return 220;
  if (aliases.some((a) => a === fullQuery)) return 210;
  if (titleLower.startsWith(fullQuery)) score += 170;
  else if (titleLower.includes(fullQuery)) score += 130;
  else if (aliases.some((a) => a === fullQuery || a.startsWith(fullQuery))) {
    score += 125;
  } else if (aliases.some((a) => a.includes(fullQuery))) {
    score += 110;
  }

  // Short alias exact token (e.g. "kai" → Kai Cenat)
  if (fullQuery.length <= 4) {
    if (aliases.some((a) => a === fullQuery)) score = Math.max(score, 200);
    if (titleTokens.some((t) => t === fullQuery)) score = Math.max(score, 175);
  }

  for (const word of words) {
    if (titleLower.includes(word)) score += 40;
    else if (fuzzyHit(word, titleLower) || fuzzyHit(word, slugWords)) score += 28;
    if (aliases.some((a) => a.includes(word) || fuzzyHit(word, a))) score += 35;
    if (titleTokens.some((t) => fuzzyHit(word, t))) score += 22;
    if (item.tags?.some((t) => t.toLowerCase().includes(word))) score += 15;
    if (item.category.toLowerCase().includes(word)) score += 12;
    if (item.type.toLowerCase().includes(word)) score += 12;
    if (item.description.toLowerCase().includes(word)) score += 5;
  }

  // Multi-word: prefer entries matching more distinct words
  if (words.length > 1) {
    let matched = 0;
    for (const word of words) {
      if (
        titleLower.includes(word) ||
        slugWords.includes(word) ||
        aliases.some((a) => a.includes(word)) ||
        fuzzyHit(word, titleLower)
      ) {
        matched += 1;
      }
    }
    if (matched === words.length) score += 40;
    else if (matched >= Math.ceil(words.length * 0.6)) score += 15;
  }

  const aliasHits = resolveAliasQuery(fullQuery);
  if (aliasHits.some((h) => h.slug === item.slug && h.exact)) {
    score = Math.max(score, 205);
  } else if (aliasHits.some((h) => h.slug === item.slug)) {
    score = Math.max(score, 115);
  }

  // Also resolve against raw intent-laden query
  if (rawQuery !== fullQuery) {
    const rawHits = resolveAliasQuery(rawQuery);
    if (rawHits.some((h) => h.slug === item.slug && h.exact)) {
      score = Math.max(score, 200);
    }
  }

  if (categoryBoosts.has(item.type)) score += 18;

  // Mild cultural freshness boost — rising/new surface sooner
  if (item.trendDirection === "rising") score += 8;
  else if (item.trendDirection === "new") score += 6;

  return score;
}

/**
 * Filters and ranks search results for a given query.
 *
 * Supports aliases, light typo tolerance, intent stripping, and category hints.
 * Architecture note: replace with DB/full-text search in a later version without
 * changing call sites.
 */
export function filterSearchResults(query: string): SearchResult[] {
  const raw = query.trim();
  if (!raw) return [];

  const fullQuery = normalizeQuery(raw);
  if (!fullQuery) return [];

  const words = fullQuery.split(/\s+/).filter(Boolean);
  const categoryBoosts = detectCategoryBoosts(raw);
  const all = getAllSearchResults();

  const scored = all
    .map((item) => {
      const s = scoreResult(item, words, fullQuery, raw.toLowerCase(), categoryBoosts);
      return s > 0 ? { item, score: s } : null;
    })
    .filter(Boolean) as { item: SearchResult; score: number }[];

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}

export function getSearchSuggestions(query: string, limit = 5): SearchResult[] {
  if (!query.trim()) return [];
  return filterSearchResults(query).slice(0, limit);
}
