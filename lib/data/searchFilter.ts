/**
 * Pure search ranking — safe to import from client components.
 *
 * Does NOT import catalog content. Pass a slim {@link SearchDocument}[] built
 * on the server via `buildSearchIndex()` in `./search`.
 */

import type { ContentCategory, MediaItem, TrendDirection } from "@/types";

export type SearchResultType =
  | "trend"
  | "meme"
  | "slang"
  | "event"
  | "creator";

/**
 * Lightweight search hit — enough to rank + render a result card.
 * Full article bodies stay on the server.
 */
export interface SearchDocument {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  type: SearchResultType;
  tags?: string[];
  trendDirection: TrendDirection;
  imageGradient: string;
  /** Featured media only (0–1 items) for card thumbnails. */
  media?: MediaItem[];
  /** Lowercased aliases for this slug (precomputed on the server). */
  aliases: string[];
}

/**
 * Minimum score for a result to count as a "close match."
 * Exact title (~220) and aliases (~200+) always clear this.
 */
export const MIN_SEARCH_CONFIDENCE = 48;

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

const CATEGORY_HINTS: Array<{
  pattern: RegExp;
  types: SearchResultType[];
}> = [
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

function normalizeQuery(raw: string): string {
  let q = raw.trim().toLowerCase().replace(/\s+/g, " ");
  for (const re of INTENT_PREFIXES) q = q.replace(re, "");
  for (const re of INTENT_SUFFIXES) q = q.replace(re, "");
  return q.trim();
}

function editDistance(a: string, b: string, max = 2): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const cols = b.length + 1;
  let prev = new Array(cols);
  let curr = new Array(cols);
  for (let j = 0; j < cols; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
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
  if (!query || query.length < 4 || !target || target.length < 4) return false;
  if (target.includes(query)) return true;
  if (query.slice(0, 2) !== target.slice(0, 2)) return false;
  const maxDist = query.length <= 5 ? 1 : 2;
  if (editDistance(query, target, maxDist) <= maxDist) return true;
  const tokens = target.split(/[\s/-]+/).filter((t) => t.length >= 4);
  return tokens.some(
    (t) =>
      t.slice(0, 2) === query.slice(0, 2) &&
      editDistance(query, t, maxDist) <= maxDist,
  );
}

function detectCategoryBoosts(rawQuery: string): Set<SearchResultType> {
  const boosts = new Set<SearchResultType>();
  for (const hint of CATEGORY_HINTS) {
    if (hint.pattern.test(rawQuery)) {
      for (const t of hint.types) boosts.add(t);
    }
  }
  return boosts;
}

function scoreDocument(
  item: SearchDocument,
  words: string[],
  fullQuery: string,
  categoryBoosts: Set<SearchResultType>,
): { score: number; hasIdentityMatch: boolean } {
  const titleLower = item.title.toLowerCase();
  const slugWords = item.slug.replace(/-/g, " ");
  const aliases = item.aliases;
  const titleTokens = titleLower.split(/\s+/);

  let identity = 0;
  let secondary = 0;

  if (titleLower === fullQuery) return { score: 220, hasIdentityMatch: true };
  if (aliases.some((a) => a === fullQuery))
    return { score: 210, hasIdentityMatch: true };

  if (fullQuery.length <= 2) {
    if (titleTokens.some((t) => t === fullQuery))
      return { score: 200, hasIdentityMatch: true };
    if (aliases.some((a) => a === fullQuery))
      return { score: 200, hasIdentityMatch: true };
    return { score: 0, hasIdentityMatch: false };
  }

  if (titleLower.startsWith(fullQuery)) identity += 170;
  else if (fullQuery.length >= 4 && titleLower.includes(fullQuery))
    identity += 130;
  else if (aliases.some((a) => a === fullQuery || a.startsWith(fullQuery))) {
    identity += 125;
  } else if (
    fullQuery.length >= 4 &&
    aliases.some((a) => a.includes(fullQuery))
  ) {
    identity += 110;
  }

  if (fullQuery.length <= 4) {
    if (aliases.some((a) => a === fullQuery))
      identity = Math.max(identity, 200);
    if (titleTokens.some((t) => t === fullQuery))
      identity = Math.max(identity, 175);
  }

  for (const word of words) {
    if (word.length < 2) continue;

    if (titleTokens.some((t) => t === word)) identity += 45;
    else if (word.length >= 4 && titleLower.includes(word)) identity += 40;
    else if (fuzzyHit(word, titleLower) || fuzzyHit(word, slugWords))
      identity += 28;

    if (aliases.some((a) => a === word)) identity += 40;
    else if (
      aliases.some(
        (a) => (word.length >= 4 && a.includes(word)) || fuzzyHit(word, a),
      )
    ) {
      identity += 35;
    }

    if (titleTokens.some((t) => fuzzyHit(word, t))) identity += 22;

    if (word.length >= 4) {
      if (item.tags?.some((t) => t.toLowerCase().includes(word)))
        secondary += 8;
      if (item.category.toLowerCase().includes(word)) secondary += 6;
      if (item.type.toLowerCase().includes(word)) secondary += 6;
      if (item.description.toLowerCase().includes(word)) secondary += 3;
    }
  }

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
    if (matched === words.length) identity += 40;
    else if (matched >= Math.ceil(words.length * 0.6)) identity += 15;
  }

  const hasIdentityMatch = identity > 0;
  if (!hasIdentityMatch) {
    return { score: 0, hasIdentityMatch: false };
  }

  let score = identity + secondary;
  if (categoryBoosts.has(item.type)) score += 18;
  if (item.trendDirection === "rising") score += 8;
  else if (item.trendDirection === "new") score += 6;

  return { score, hasIdentityMatch };
}

/**
 * Rank a prebuilt search index. Client-safe — no catalog imports.
 */
export function filterSearchDocuments(
  documents: readonly SearchDocument[],
  query: string,
): SearchDocument[] {
  const raw = query.trim();
  if (!raw) return [];

  const fullQuery = normalizeQuery(raw);
  if (!fullQuery) return [];

  const words = fullQuery.split(/\s+/).filter(Boolean);
  const categoryBoosts = detectCategoryBoosts(raw);

  const scored = documents
    .map((item) => {
      const { score, hasIdentityMatch } = scoreDocument(
        item,
        words,
        fullQuery,
        categoryBoosts,
      );
      if (!hasIdentityMatch || score < MIN_SEARCH_CONFIDENCE) return null;
      return { item, score };
    })
    .filter(Boolean) as { item: SearchDocument; score: number }[];

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}
