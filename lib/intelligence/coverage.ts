/**
 * Internal recommendation / coverage utilities (Phase 7).
 *
 * Answers for future systems (not public UI):
 * - What entries are connected to this?
 * - What topics are missing?
 * - What should be created next?
 *
 * Server-side / tooling only.
 */

import type { BaseEntry } from "@/types";
import { getRelatedRecommendations } from "./related";
import {
  getCulturalIntelligence,
  intelligenceOverlapScore,
} from "./culturalMeta";

export interface ConnectedEntry {
  entry: BaseEntry;
  score: number;
  reasons: string[];
}

/**
 * Entries connected via typed relationships, relatedSlugs, and intelligence overlap.
 */
export function getConnectedEntries(
  entry: BaseEntry,
  catalog: BaseEntry[],
  limit = 12,
): ConnectedEntry[] {
  const related = getRelatedRecommendations(
    entry,
    catalog,
    Math.max(limit, 8),
  );

  const bySlug = new Map<string, ConnectedEntry>();
  for (const r of related) {
    bySlug.set(r.entry.slug, {
      entry: r.entry,
      score: r.score,
      reasons: [r.reasonLabel],
    });
  }

  for (const other of catalog) {
    if (other.slug === entry.slug) continue;
    const overlap = intelligenceOverlapScore(entry, other);
    if (overlap < 16) continue;
    const existing = bySlug.get(other.slug);
    if (existing) {
      existing.score += Math.min(overlap, 24);
      if (!existing.reasons.includes("Intelligence overlap")) {
        existing.reasons.push("Intelligence overlap");
      }
    } else {
      bySlug.set(other.slug, {
        entry: other,
        score: overlap,
        reasons: ["Intelligence overlap"],
      });
    }
  }

  return [...bySlug.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** A curated concept the encyclopedia may still need. */
export interface CoverageTarget {
  /** Human label for the gap. */
  concept: string;
  /** Suggested canonical slug if created. */
  suggestedSlug: string;
  /** Category hint for authors. */
  suggestedCategory: BaseEntry["category"] | "trend";
  /** Why it matters culturally. */
  reason: string;
  /** Slugs that already satisfy this coverage need. */
  satisfiedBy: string[];
  /** Search phrases that imply coverage. */
  matchHints: string[];
}

/**
 * Important coverage targets for gap analysis.
 * Satisfied when any `satisfiedBy` slug exists OR title/slug fuzzy-matches hints.
 */
export const COVERAGE_TARGETS: CoverageTarget[] = [
  {
    concept: "Vine (platform culture)",
    suggestedSlug: "vine-culture",
    suggestedCategory: "trend",
    reason: "Short-form predecessor to TikTok; shutdown is covered, platform culture may still be thin.",
    satisfiedBy: ["vine-shutdown"],
    matchHints: ["vine"],
  },
  {
    concept: "Facebook / Meta culture",
    suggestedSlug: "facebook-culture",
    suggestedCategory: "trend",
    reason: "Major social graph era not yet represented as platform culture.",
    satisfiedBy: [],
    matchHints: ["facebook", "meta culture"],
  },
  {
    concept: "Twitter / X culture",
    suggestedSlug: "twitter-culture",
    suggestedCategory: "trend",
    reason: "Ratio/brand wars exist; a dedicated Twitter culture page may still help.",
    satisfiedBy: ["twitter-x-transition", "ratio", "brand-social-media-wars"],
    matchHints: ["twitter culture", "x culture"],
  },
  {
    concept: "Copypasta",
    suggestedSlug: "copypasta",
    suggestedCategory: "meme",
    reason: "Foundational internet humor format.",
    satisfiedBy: [],
    matchHints: ["copypasta"],
  },
  {
    concept: "Deep-fried memes",
    suggestedSlug: "deep-fried-memes",
    suggestedCategory: "meme",
    reason: "Format family adjacent to distorted meme face.",
    satisfiedBy: ["distorted-meme-face"],
    matchHints: ["deep fried", "deep-fried"],
  },
  {
    concept: "Cancel culture",
    suggestedSlug: "cancel-culture",
    suggestedCategory: "trend",
    reason: "Major discourse trend with encyclopedia search demand.",
    satisfiedBy: [],
    matchHints: ["cancel culture"],
  },
  {
    concept: "Stan culture",
    suggestedSlug: "stan-culture",
    suggestedCategory: "trend",
    reason: "Fandom intensity culture spanning Tumblr → TikTok.",
    satisfiedBy: [],
    matchHints: ["stan culture", "stan twitter"],
  },
];

export interface CoverageGap {
  target: CoverageTarget;
  /** true when no satisfying entry exists */
  missing: boolean;
  matchedSlugs: string[];
}

function catalogMatchesHint(catalog: BaseEntry[], hint: string): string[] {
  const h = hint.toLowerCase();
  return catalog
    .filter((e) => {
      const blob = `${e.slug} ${e.title} ${(e.tags ?? []).join(" ")}`.toLowerCase();
      return blob.includes(h);
    })
    .map((e) => e.slug);
}

/**
 * Which curated coverage targets are still missing?
 */
export function findCoverageGaps(catalog: BaseEntry[]): CoverageGap[] {
  const slugSet = new Set(catalog.map((e) => e.slug));
  return COVERAGE_TARGETS.map((target) => {
    const fromSatisfied = target.satisfiedBy.filter((s) => slugSet.has(s));
    const fromHints = target.matchHints.flatMap((h) =>
      catalogMatchesHint(catalog, h),
    );
    const matchedSlugs = [...new Set([...fromSatisfied, ...fromHints])];
    return {
      target,
      missing: matchedSlugs.length === 0,
      matchedSlugs,
    };
  });
}

export interface NextArticleSuggestion {
  concept: string;
  suggestedSlug: string;
  suggestedCategory: CoverageTarget["suggestedCategory"];
  reason: string;
  priority: "high" | "medium" | "low";
}

/**
 * Suggest what to create next — prefers true gaps, then thin relationship graphs.
 */
export function suggestNextArticles(
  catalog: BaseEntry[],
  limit = 10,
): NextArticleSuggestion[] {
  const suggestions: NextArticleSuggestion[] = [];

  for (const gap of findCoverageGaps(catalog)) {
    if (!gap.missing) continue;
    suggestions.push({
      concept: gap.target.concept,
      suggestedSlug: gap.target.suggestedSlug,
      suggestedCategory: gap.target.suggestedCategory,
      reason: gap.target.reason,
      priority: "high",
    });
  }

  // Thin graph: high influence, few outbound links
  const thin = catalog
    .filter((e) => {
      const outs =
        (e.relatedSlugs?.length ?? 0) +
        Object.values(e.relationships ?? {}).reduce(
          (n, arr) => n + (arr?.length ?? 0),
          0,
        );
      return e.scores.influence >= 75 && outs < 2;
    })
    .sort((a, b) => b.scores.influence - a.scores.influence)
    .slice(0, 5);

  for (const e of thin) {
    const intel = getCulturalIntelligence(e);
    suggestions.push({
      concept: `Enrich graph around “${e.title}”`,
      suggestedSlug: e.slug,
      suggestedCategory: e.category,
      reason: `High influence (${e.scores.influence}) but few cultural links. Signals: ${intel.signals.slice(0, 4).join(", ") || "n/a"}. Prefer relationships over a new duplicate article.`,
      priority: "medium",
    });
  }

  const priorityRank = { high: 0, medium: 1, low: 2 };
  return suggestions
    .sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority])
    .slice(0, limit);
}

/**
 * Compact snapshot for future AI tooling — not for public UI.
 */
export function buildIntelligenceSnapshot(entry: BaseEntry, catalog: BaseEntry[]) {
  const intelligence = getCulturalIntelligence(entry);
  const connected = getConnectedEntries(entry, catalog, 8);
  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    intelligence,
    connected: connected.map((c) => ({
      slug: c.entry.slug,
      title: c.entry.title,
      score: c.score,
      reasons: c.reasons,
    })),
  };
}
