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
import { CLUSTER_LABELS, sharedClusterIds } from "./clusters";
import { getCulturalImportance } from "./importance";
import { getTrendIntelligence } from "./trendIntelligence";
import {
  CONTENT_GAP_REGISTRY,
  gapCategoryToArticleCategory,
  type ContentGapEntry,
  type ContentGapImportance,
  type RoadmapPriority,
} from "./contentGap";

export interface ConnectedEntry {
  entry: BaseEntry;
  score: number;
  reasons: string[];
}

/**
 * Entries connected via typed relationships, relatedSlugs, clusters,
 * and multi-signal intelligence overlap. Quality over quantity.
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
  const srcMeta = getCulturalIntelligence(entry);

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
    // Raise bar vs Phase 7A — skip thin filler
    if (overlap < 22) continue;

    const otherMeta = getCulturalIntelligence(other);
    const clusters = sharedClusterIds(
      {
        slug: entry.slug,
        tags: entry.tags,
        signals: srcMeta.signals,
        platforms: srcMeta.originPlatform,
        culturalCategory: srcMeta.culturalCategory,
      },
      {
        slug: other.slug,
        tags: other.tags,
        signals: otherMeta.signals,
        platforms: otherMeta.originPlatform,
        culturalCategory: otherMeta.culturalCategory,
      },
    );

    const reasons: string[] = ["Intelligence overlap"];
    if (clusters.length > 0) {
      reasons.push(
        ...clusters.slice(0, 2).map((id) => `Cluster: ${CLUSTER_LABELS[id]}`),
      );
    }

    const existing = bySlug.get(other.slug);
    if (existing) {
      existing.score += Math.min(overlap, 28);
      for (const reason of reasons) {
        if (!existing.reasons.includes(reason)) existing.reasons.push(reason);
      }
    } else {
      bySlug.set(other.slug, {
        entry: other,
        score: overlap,
        reasons,
      });
    }
  }

  return [...bySlug.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Legacy view of a coverage concept (derived from ContentGapEntry). */
export interface CoverageTarget {
  /** Human label for the gap. */
  concept: string;
  /** Suggested canonical slug if created. */
  suggestedSlug: string;
  /** Category hint for authors (platform gaps map to trend). */
  suggestedCategory: BaseEntry["category"];
  /** Why it matters culturally. */
  reason: string;
  /** Slugs that already satisfy this coverage need. */
  satisfiedBy: string[];
  /** Search phrases that imply coverage. */
  matchHints: string[];
  /** Gap registry id when sourced from CONTENT_GAP_REGISTRY. */
  gapId?: string;
  /** Curated importance for prioritization. */
  importance?: ContentGapImportance;
  /** Roadmap build priority (1 = soonest). */
  priority?: RoadmapPriority;
  /** Planning status from the gap registry. */
  status?: ContentGapEntry["status"];
}

/** Map a content-gap row into the legacy CoverageTarget shape. */
export function contentGapToCoverageTarget(
  gap: ContentGapEntry,
): CoverageTarget {
  return {
    concept: gap.name,
    suggestedSlug: gap.suggestedSlug,
    suggestedCategory: gapCategoryToArticleCategory(gap.category),
    reason: gap.reason,
    satisfiedBy: gap.satisfiedBy ?? [],
    matchHints: gap.matchHints ?? [],
    gapId: gap.id,
    importance: gap.importance,
    priority: gap.priority,
    status: gap.status,
  };
}

/**
 * Coverage targets derived from CONTENT_GAP_REGISTRY.
 * Prefer editing `lib/intelligence/contentGap.ts` — not this list.
 */
export const COVERAGE_TARGETS: CoverageTarget[] = CONTENT_GAP_REGISTRY.map(
  contentGapToCoverageTarget,
);

export interface CoverageGap {
  target: CoverageTarget;
  /** true when no satisfying entry exists and status is not published */
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
 * Which curated coverage targets still lack a canonical article?
 * Partial relatives (`satisfiedBy` / hints) are recorded in `matchedSlugs`
 * but do not close the gap until `suggestedSlug` exists (or status is published).
 */
export function findCoverageGaps(catalog: BaseEntry[]): CoverageGap[] {
  const slugSet = new Set(catalog.map((e) => e.slug));
  return COVERAGE_TARGETS.map((target) => {
    const fromSatisfied = target.satisfiedBy.filter((s) => slugSet.has(s));
    const fromHints = target.matchHints.flatMap((h) =>
      catalogMatchesHint(catalog, h),
    );
    const exactSlug = slugSet.has(target.suggestedSlug)
      ? [target.suggestedSlug]
      : [];
    const matchedSlugs = [
      ...new Set([...exactSlug, ...fromSatisfied, ...fromHints]),
    ];
    const hasCanonical =
      exactSlug.length > 0 || target.status === "published";
    return {
      target,
      missing: !hasCanonical,
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
 * Suggest what to create next — prefers true gaps (by importance), then thin graphs.
 */
export function suggestNextArticles(
  catalog: BaseEntry[],
  limit = 10,
): NextArticleSuggestion[] {
  const suggestions: NextArticleSuggestion[] = [];

  const priorityFromRoadmap = (
    importance: ContentGapImportance | undefined,
    roadmapPriority: RoadmapPriority | undefined,
  ): "high" | "medium" | "low" => {
    if (roadmapPriority === 1) return "high";
    if (roadmapPriority === 3) return "low";
    if (roadmapPriority === 2) return "medium";
    return importance ?? "high";
  };

  for (const gap of findCoverageGaps(catalog)) {
    if (!gap.missing) continue;
    if (gap.target.status === "published") continue;
    suggestions.push({
      concept: gap.target.concept,
      suggestedSlug: gap.target.suggestedSlug,
      suggestedCategory: gap.target.suggestedCategory,
      reason: gap.target.reason,
      priority: priorityFromRoadmap(
        gap.target.importance,
        gap.target.priority,
      ),
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
  const importance = getCulturalImportance(entry);
  const trend = getTrendIntelligence(entry);
  const connected = getConnectedEntries(entry, catalog, 8);
  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    intelligence,
    importance,
    trend: {
      lifecycleStage: trend.lifecycleStage,
      lifecycleSource: trend.lifecycleSource,
      momentum: trend.momentum,
      confidence: trend.confidence,
      detectedSignals: trend.detectedSignals,
      hasMeasuredSignals: trend.signalBundle.hasMeasuredData,
    },
    connected: connected.map((c) => ({
      slug: c.entry.slug,
      title: c.entry.title,
      score: c.score,
      reasons: c.reasons,
    })),
  };
}
