/**
 * Pure search ranking — safe to import from client components.
 *
 * Does NOT import catalog content. Pass a slim {@link SearchDocument}[] built
 * on the server via `buildSearchIndex()` in `./search`.
 *
 * Philosophy: never invent relevance. Prefer empty results over weak matches.
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
 * Minimum score for title/alias/slug identity matches.
 * Exact title (~220) and aliases (~200+) always clear this.
 */
export const MIN_SEARCH_CONFIDENCE = 55;

/**
 * Fuzzy/typo-only matches must clear a higher bar so random
 * near-misses (e.g. invented names) never fill the page.
 */
export const MIN_FUZZY_CONFIDENCE = 95;

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
    pattern: /\b(streamer|youtuber|creator|creators|influencer|tiktoker|people|person|personality)\b/i,
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

/** Strip spaces/hyphens for dadbod ↔ dad bod / italianbrainrot matches. */
function compactKey(value: string): string {
  return value.toLowerCase().replace(/[\s\-_/'’]+/g, "");
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
  if (target === query) return true;

  const qTokens = query.split(/[\s/-]+/).filter(Boolean);
  const tokens = target.split(/[\s/-]+/).filter((t) => t.length > 0);
  const maxDist = query.length <= 6 ? 1 : 2;

  // Single-token query: match a whole token (skibidi ∈ skibidi toilet), not a
  // mid-compound substring (brainrot ⊄ italianbrainrot).
  if (qTokens.length === 1) {
    const q = qTokens[0];
    if (tokens.some((t) => t === q)) return true;
    return tokens.some(
      (t) =>
        t.length >= 4 &&
        t.slice(0, 2) === q.slice(0, 2) &&
        editDistance(q, t, maxDist) <= maxDist,
    );
  }

  // Multi-word query: tight edit distance on the full string only.
  // Do NOT use endsWith/startsWith — "brain rot" would match "italian brain rot".
  if (query.slice(0, 2) !== target.slice(0, 2)) return false;
  if (Math.abs(query.length - target.length) > maxDist + 2) return false;
  return editDistance(query, target, maxDist) <= maxDist;
}

/** Compact-form fuzzy (no spaces). Edit-distance only — no substring includes. */
function compactFuzzyHit(query: string, target: string): boolean {
  if (!query || query.length < 4 || !target || target.length < 4) return false;
  if (query === target) return true;
  if (query.slice(0, 2) !== target.slice(0, 2)) return false;
  const maxDist = query.length <= 6 ? 1 : 2;
  if (Math.abs(query.length - target.length) > maxDist) return false;
  return editDistance(query, target, maxDist) <= maxDist;
}

/**
 * Alias containment without ranking a longer phrase that merely ends with the
 * query (e.g. "italian brain rot" must not beat "brain rot" → Brainrot).
 */
function aliasContainsQuery(alias: string, query: string): boolean {
  if (alias === query) return true;
  if (alias.startsWith(`${query} `)) return true;
  if (!query.includes(" ")) {
    return alias.split(/[\s/-]+/).includes(query);
  }
  return false;
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

interface ScoredMatch {
  score: number;
  /** True when title, slug, or alias contributed — not tags/category alone. */
  hasIdentityMatch: boolean;
  /** True when identity came only from fuzzy/typo paths. */
  fuzzyOnly: boolean;
}

function scoreDocument(
  item: SearchDocument,
  words: string[],
  fullQuery: string,
  categoryBoosts: Set<SearchResultType>,
): ScoredMatch {
  const titleLower = item.title.toLowerCase();
  const slugLower = item.slug.toLowerCase();
  const slugWords = slugLower.replace(/-/g, " ");
  const aliases = item.aliases;
  const titleTokens = titleLower.split(/\s+/);
  const queryCompact = compactKey(fullQuery);
  const titleCompact = compactKey(titleLower);
  const slugCompact = compactKey(slugLower);

  let strong = 0; // exact / prefix / contains / alias / token
  let fuzzy = 0;

  // ── Exact identity (highest priority) ───────────────────────────────────
  // Title / slug beat aliases so "skibidi" ranks Skibidi Toilet above creators
  // that only list it as an alias.
  if (titleLower === fullQuery || slugLower === fullQuery || slugWords === fullQuery) {
    return { score: 220, hasIdentityMatch: true, fuzzyOnly: false };
  }
  // Compact exact: "dadbod" ↔ "Dad Bod", "brain rot" ↔ "Brainrot"
  if (
    queryCompact.length >= 4 &&
    (titleCompact === queryCompact || slugCompact === queryCompact)
  ) {
    return { score: 218, hasIdentityMatch: true, fuzzyOnly: false };
  }
  if (
    titleLower.startsWith(`${fullQuery} `) ||
    slugWords.startsWith(`${fullQuery} `)
  ) {
    return { score: 215, hasIdentityMatch: true, fuzzyOnly: false };
  }
  if (aliases.some((a) => a === fullQuery)) {
    return { score: 200, hasIdentityMatch: true, fuzzyOnly: false };
  }
  if (
    queryCompact.length >= 4 &&
    aliases.some((a) => compactKey(a) === queryCompact)
  ) {
    return { score: 198, hasIdentityMatch: true, fuzzyOnly: false };
  }

  // Ultra-short queries: exact title token / alias only
  if (fullQuery.length <= 2) {
    if (titleTokens.some((t) => t === fullQuery)) {
      return { score: 200, hasIdentityMatch: true, fuzzyOnly: false };
    }
    if (aliases.some((a) => a === fullQuery)) {
      return { score: 190, hasIdentityMatch: true, fuzzyOnly: false };
    }
    return { score: 0, hasIdentityMatch: false, fuzzyOnly: false };
  }

  if (titleLower.startsWith(fullQuery) || slugWords.startsWith(fullQuery)) {
    strong += 170;
  } else if (fullQuery.length >= 4 && titleLower.includes(fullQuery)) {
    strong += 130;
  } else if (fullQuery.length >= 4 && slugWords.includes(fullQuery)) {
    strong += 125;
  } else if (aliases.some((a) => a.startsWith(fullQuery))) {
    strong += 120;
  } else if (
    fullQuery.length >= 4 &&
    aliases.some((a) => aliasContainsQuery(a, fullQuery))
  ) {
    strong += 105;
  }

  // Short alias / title token exact (e.g. "kai" → Kai Cenat)
  if (fullQuery.length <= 4) {
    if (aliases.some((a) => a === fullQuery)) strong = Math.max(strong, 200);
    if (titleTokens.some((t) => t === fullQuery)) strong = Math.max(strong, 175);
  }

  // Whole-query typo against title / slug / alias (e.g. "skibdi" → Skibidi).
  // Only when there is no strong match yet — otherwise longer alias phrases
  // like "skibidi toilet creator" would outrank the primary title via includes().
  if (
    strong === 0 &&
    (fuzzyHit(fullQuery, titleLower) ||
      fuzzyHit(fullQuery, slugWords) ||
      compactFuzzyHit(queryCompact, titleCompact) ||
      compactFuzzyHit(queryCompact, slugCompact) ||
      aliases.some(
        (a) =>
          fuzzyHit(fullQuery, a) ||
          compactFuzzyHit(queryCompact, compactKey(a)),
      ))
  ) {
    fuzzy += 100;
  }

  let secondary = 0;

  for (const word of words) {
    if (word.length < 2) continue;

    if (titleTokens.some((t) => t === word)) strong += 45;
    else if (word.length >= 4 && titleLower.includes(word)) strong += 40;
    else if (word.length >= 4 && slugWords.includes(word)) strong += 38;
    else if (fuzzyHit(word, titleLower) || fuzzyHit(word, slugWords)) fuzzy += 28;

    if (aliases.some((a) => a === word)) strong += 40;
    else if (
      word.length >= 4 &&
      aliases.some((a) => aliasContainsQuery(a, word))
    )
      strong += 35;
    else if (aliases.some((a) => fuzzyHit(word, a))) fuzzy += 30;

    if (titleTokens.some((t) => fuzzyHit(word, t))) fuzzy += 22;

    // Secondary — never enough alone; category-aware soft signals
    if (word.length >= 4) {
      if (item.tags?.some((t) => t.toLowerCase().includes(word)))
        secondary += 6;
      if (item.description.toLowerCase().includes(word)) secondary += 2;
    }
  }

  // Category token in the query matching the entry type is a soft boost only
  // when strong identity already exists (applied below).

  if (words.length > 1) {
    let matchedStrong = 0;
    for (const word of words) {
      if (
        titleLower.includes(word) ||
        slugWords.includes(word) ||
        aliases.some((a) => a.includes(word))
      ) {
        matchedStrong += 1;
      }
    }
    if (matchedStrong === words.length) strong += 40;
    else if (matchedStrong >= Math.ceil(words.length * 0.6)) strong += 15;
  }

  const hasIdentityMatch = strong > 0 || fuzzy > 0;
  if (!hasIdentityMatch) {
    return { score: 0, hasIdentityMatch: false, fuzzyOnly: false };
  }

  const fuzzyOnly = strong === 0 && fuzzy > 0;
  let score = strong + fuzzy + secondary;

  // Category-aware boost — only refines real identity matches
  if (categoryBoosts.has(item.type)) score += 12;
  if (item.trendDirection === "rising") score += 6;
  else if (item.trendDirection === "new") score += 4;

  return { score, hasIdentityMatch: true, fuzzyOnly };
}

/**
 * Rank a prebuilt search index. Client-safe — no catalog imports.
 * Returns [] when nothing clears the confidence bar → UI shows
 * "No close matches found."
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
      const { score, hasIdentityMatch, fuzzyOnly } = scoreDocument(
        item,
        words,
        fullQuery,
        categoryBoosts,
      );
      if (!hasIdentityMatch) return null;
      const min = fuzzyOnly ? MIN_FUZZY_CONFIDENCE : MIN_SEARCH_CONFIDENCE;
      if (score < min) return null;
      return { item, score };
    })
    .filter(Boolean) as { item: SearchDocument; score: number }[];

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}
