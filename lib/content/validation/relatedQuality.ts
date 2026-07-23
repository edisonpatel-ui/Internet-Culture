/**
 * Soft related-article / internal-linking quality checks.
 */

import type { BaseEntry, RelationshipMap } from "@/types";
import type { ValidationIssue } from "./types";
import { RELATED_SLUGS_MIN } from "@/lib/content/standards/articleSpec";

const RELATIONSHIP_KEYS: (keyof RelationshipMap)[] = [
  "relatedTo",
  "inspiredBy",
  "popularizedBy",
  "originatedFrom",
  "spawnedVariants",
  "popularized",
  "originated",
  "sameEra",
  "sameFormat",
  "memberOf",
  "relatedSlang",
  "relatedEvent",
  "community",
];

export interface RelatedScore {
  score: number;
  outbound: number;
  typedEdges: number;
  crossCategory: number;
  issues: string[];
}

function typedEdgeCount(entry: BaseEntry): number {
  if (!entry.relationships) return 0;
  return RELATIONSHIP_KEYS.reduce(
    (n, key) => n + (entry.relationships?.[key]?.length ?? 0),
    0,
  );
}

export function scoreRelated(
  entry: BaseEntry,
  bySlug: Map<string, BaseEntry>,
): RelatedScore {
  const issues: string[] = [];
  const related = entry.relatedSlugs ?? [];
  const typed = typedEdgeCount(entry);
  const outbound = related.length + typed;

  let crossCategory = 0;
  for (const slug of related) {
    const other = bySlug.get(slug);
    if (other && other.category !== entry.category) crossCategory += 1;
  }

  if (related.length === 0 && typed === 0) {
    issues.push("No relatedSlugs or typed relationships");
  } else if (related.length > 0 && related.length < RELATED_SLUGS_MIN) {
    issues.push(
      `Only ${related.length} relatedSlug(s) — prefer ≥ ${RELATED_SLUGS_MIN} culturally relevant links`,
    );
  }

  if (related.includes(entry.slug)) {
    issues.push("relatedSlugs includes self-reference");
  }

  const unique = new Set(related);
  if (unique.size < related.length) {
    issues.push("Duplicate relatedSlugs entries");
  }

  if (typed === 0 && related.length > 0) {
    issues.push(
      "relatedSlugs only — add typed relationships (inspiredBy, sameFormat, community, …) when known",
    );
  }

  if (related.length >= RELATED_SLUGS_MIN && crossCategory === 0) {
    issues.push(
      "All related links are same-category — consider cross-category links when appropriate",
    );
  }

  let score = 40;
  score += Math.min(30, related.length * 10);
  score += Math.min(20, typed * 5);
  score += Math.min(10, crossCategory * 5);
  score -= Math.min(40, issues.length * 10);
  score = Math.max(0, Math.min(100, score));

  return { score, outbound, typedEdges: typed, crossCategory, issues };
}

export function validateRelatedQuality(
  entries: BaseEntry[],
): ValidationIssue[] {
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const issues: ValidationIssue[] = [];
  let reported = 0;
  const maxReport = 60;

  for (const entry of entries) {
    const result = scoreRelated(entry, bySlug);
    for (const msg of result.issues) {
      // Same-category-only and "typed relationships" are very noisy — keep soft but capped
      if (reported >= maxReport) break;
      if (
        msg.startsWith("All related links are same-category") ||
        msg.startsWith("relatedSlugs only")
      ) {
        // Cap these noisier tips more aggressively
        if (reported > 25) continue;
      }
      reported += 1;
      issues.push({
        severity: "warning",
        code: "RELATED_QUALITY",
        slug: entry.slug,
        id: entry.id,
        message: msg,
      });
    }
  }

  return issues;
}
