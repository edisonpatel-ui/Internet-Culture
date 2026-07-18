/**
 * Soft title / concept overlap detection for content validation.
 *
 * Warnings only — near-duplicates require human review, not automatic failure.
 */

import type { BaseEntry } from "@/types";
import type { ValidationIssue } from "./types";

const STOP_TOKENS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "meme",
  "memes",
  "meaning",
  "what",
  "does",
  "is",
  "are",
  "how",
  "vs",
  "versus",
]);

/** Normalize informal spelling variants for overlap detection. */
const TOKEN_ALIASES: Record<string, string> = {
  shii: "shit",
  shi: "shit",
  gyat: "gyatt",
};

export interface TitleTokens {
  slug: string;
  title: string;
  tokens: Set<string>;
  normalized: string;
}

export function normalizeTitleText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeTitle(text: string): Set<string> {
  const normalized = normalizeTitleText(text);
  const tokens = new Set<string>();
  for (const raw of normalized.split(" ")) {
    if (!raw || STOP_TOKENS.has(raw)) continue;
    const mapped = TOKEN_ALIASES[raw] ?? raw;
    if (mapped.length < 2 && !/^\d+$/.test(mapped)) continue;
    tokens.add(mapped);
  }
  return tokens;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const t of a) {
    if (b.has(t)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function isSubset(smaller: Set<string>, larger: Set<string>): boolean {
  if (smaller.size === 0) return false;
  for (const t of smaller) {
    if (!larger.has(t)) return false;
  }
  return true;
}

function buildTitleTokens(entry: BaseEntry): TitleTokens {
  const fromTitle = tokenizeTitle(entry.title);
  const fromSlug = tokenizeTitle(entry.slug.replace(/-/g, " "));
  const tokens = new Set([...fromTitle, ...fromSlug]);
  return {
    slug: entry.slug,
    title: entry.title,
    tokens,
    normalized: normalizeTitleText(entry.title),
  };
}

interface OverlapPair {
  a: TitleTokens;
  b: TitleTokens;
  kind: "exact" | "containment" | "similar";
  score: number;
}

function detectPair(a: TitleTokens, b: TitleTokens): OverlapPair | null {
  if (a.slug === b.slug) return null;

  if (a.normalized && a.normalized === b.normalized) {
    return { a, b, kind: "exact", score: 1 };
  }

  const jac = jaccard(a.tokens, b.tokens);
  const aInB = isSubset(a.tokens, b.tokens);
  const bInA = isSubset(b.tokens, a.tokens);

  // One title's tokens fully contained in the other (Sigma ⊂ Sigma Male)
  if (
    (aInB || bInA) &&
    Math.min(a.tokens.size, b.tokens.size) >= 1 &&
    Math.max(a.tokens.size, b.tokens.size) <= 6
  ) {
    return { a, b, kind: "containment", score: Math.max(jac, 0.75) };
  }

  // Near-duplicate token overlap (Type Shii ≈ Type Shit after alias normalize)
  if (jac >= 0.6 && a.tokens.size >= 1 && b.tokens.size >= 1) {
    return { a, b, kind: "similar", score: jac };
  }

  return null;
}

/**
 * Emit TITLE_SIMILARITY warnings for near-duplicate concepts.
 * One warning per entry that has at least one overlap partner.
 */
export function checkTitleSimilarity(
  entries: readonly BaseEntry[],
): ValidationIssue[] {
  const indexed = entries.map(buildTitleTokens);
  const partners = new Map<string, Array<{ other: TitleTokens; kind: string }>>();

  for (let i = 0; i < indexed.length; i++) {
    for (let j = i + 1; j < indexed.length; j++) {
      const hit = detectPair(indexed[i], indexed[j]);
      if (!hit) continue;

      const listA = partners.get(hit.a.slug) ?? [];
      listA.push({ other: hit.b, kind: hit.kind });
      partners.set(hit.a.slug, listA);

      const listB = partners.get(hit.b.slug) ?? [];
      listB.push({ other: hit.a, kind: hit.kind });
      partners.set(hit.b.slug, listB);
    }
  }

  const issues: ValidationIssue[] = [];
  // Emit once per unordered pair via sorted slug key to avoid double-reporting noise,
  // but keep readable "A ↔ B, C" format grouped by primary slug (lexicographically first).
  const reportedPairs = new Set<string>();

  for (const entry of indexed) {
    const hits = partners.get(entry.slug);
    if (!hits || hits.length === 0) continue;

    const uniqueOthers = new Map<string, TitleTokens>();
    for (const h of hits) {
      uniqueOthers.set(h.other.slug, h.other);
    }

    const others = [...uniqueOthers.values()].sort((x, y) =>
      x.slug.localeCompare(y.slug),
    );

    // Deduplicate pair warnings: only emit when this slug is lexicographically first
    // against each partner, OR when reporting the cluster from the lowest slug in set.
    const clusterSlugs = [entry.slug, ...others.map((o) => o.slug)].sort();
    const clusterKey = clusterSlugs.join("|");
    if (reportedPairs.has(clusterKey)) continue;
    if (entry.slug !== clusterSlugs[0]) continue;
    reportedPairs.add(clusterKey);

    const otherList = others
      .map((o) => `"${o.title}" (${o.slug})`)
      .join(", ");

    issues.push({
      severity: "warning",
      code: "TITLE_SIMILARITY",
      slug: entry.slug,
      message: `Possible concept overlap: "${entry.title}" (${entry.slug}) ↔ ${otherList}. Review whether to merge, link via relationships, or keep distinct.`,
    });
  }

  return issues;
}
