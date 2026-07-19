/**
 * Analytics → trend intelligence adapters (Phase 7D — internal).
 *
 * Prepare future analytics influence on TrendMomentum, TrendIntelligence,
 * and opportunity scoring. Never auto-writes public `trendDirection` or scores.
 */

import type { BaseEntry, TrendIntelligence, TrendMomentum } from "@/types";
import type { AnalyticsIntelligenceReport } from "./analyticsSignals";
import type { TrendSignalObservation } from "./trendSignals";

/** Soft analytics influence for a single topic/slug (read-only hints). */
export interface AnalyticsTopicInfluence {
  slug: string;
  viewCount: number;
  relatedClickIn: number;
  relatedClickOut: number;
  searchHits: number;
  /** Suggested momentum from analytics only — not applied to public fields. */
  suggestedMomentum: TrendMomentum;
  /** Confidence in the analytics-derived read (0–100). */
  confidence: number;
  detectedSignals: string[];
  /** Observations ready for mergeTrendSignalObservations / opportunity. */
  signalObservations: TrendSignalObservation[];
  /** Partial TrendIntelligence overlay (never auto-persisted). */
  trendOverlay: TrendIntelligence;
}

function countFor(items: Array<{ key: string; count: number }>, key: string): number {
  return items.find((i) => i.key === key)?.count ?? 0;
}

function normalizeIntensity(count: number, ceiling: number): number {
  if (count <= 0 || ceiling <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((count / ceiling) * 100)));
}

/**
 * Derive analytics influence for one catalog slug from an aggregated report.
 * Returns null when the slug has no analytics footprint in the report.
 */
export function deriveAnalyticsTopicInfluence(
  slug: string,
  report: AnalyticsIntelligenceReport,
): AnalyticsTopicInfluence | null {
  const viewCount = countFor(report.popularEntries, slug);
  const relatedClickIn = report.recommendationPaths
    .filter((p) => p.toSlug === slug)
    .reduce((n, p) => n + p.count, 0);
  const relatedClickOut = report.recommendationPaths
    .filter((p) => p.fromSlug === slug)
    .reduce((n, p) => n + p.count, 0);

  // Searches that exactly match slug are rare; treat as soft demand when present
  const searchHits = countFor(report.risingSearches, slug);

  if (
    viewCount === 0 &&
    relatedClickIn === 0 &&
    relatedClickOut === 0 &&
    searchHits === 0
  ) {
    return null;
  }

  const maxViews = Math.max(1, report.popularEntries[0]?.count ?? viewCount);
  const maxRelated = Math.max(
    1,
    relatedClickIn,
    relatedClickOut,
    ...report.recommendationPaths.map((p) => p.count),
  );
  const maxSearch = Math.max(
    1,
    report.risingSearches[0]?.count ?? searchHits,
  );

  const viewIntensity = normalizeIntensity(viewCount, maxViews);
  const clickIntensity = normalizeIntensity(
    relatedClickIn + relatedClickOut,
    maxRelated,
  );
  const searchIntensity = normalizeIntensity(searchHits, maxSearch);

  const detectedSignals: string[] = [];
  if (viewCount > 0) detectedSignals.push("analytics entry views");
  if (relatedClickIn + relatedClickOut > 0) {
    detectedSignals.push("analytics recommendation path");
  }
  if (searchHits > 0) detectedSignals.push("analytics search demand");

  const inGrowingCluster = report.growingClusters.some((c) =>
    c.memberSlugsTouched.includes(slug),
  );
  if (inGrowingCluster) detectedSignals.push("analytics growing cluster");

  let suggestedMomentum: TrendMomentum = "unknown";
  if (viewIntensity >= 60 || clickIntensity >= 55 || searchIntensity >= 50) {
    suggestedMomentum = "accelerating";
  } else if (viewIntensity >= 25 || clickIntensity >= 25) {
    suggestedMomentum = "stable";
  } else if (viewCount > 0 || relatedClickIn + relatedClickOut > 0) {
    suggestedMomentum = "stable";
  }

  const confidence = Math.min(
    75,
    25 +
      Math.round(viewIntensity * 0.25) +
      Math.round(clickIntensity * 0.2) +
      (inGrowingCluster ? 10 : 0),
  );

  const observedAt = new Date().toISOString();
  const signalObservations: TrendSignalObservation[] = [
    {
      signalId: "article-views",
      value: viewCount > 0 ? viewIntensity : null,
      observedAt,
      note: viewCount > 0 ? `${viewCount} views in batch` : undefined,
    },
    {
      signalId: "clicks",
      value:
        relatedClickIn + relatedClickOut > 0 ? clickIntensity : null,
      observedAt,
      note:
        relatedClickIn + relatedClickOut > 0
          ? `${relatedClickIn + relatedClickOut} related clicks`
          : undefined,
    },
    {
      signalId: "internal-search-demand",
      value: searchHits > 0 ? searchIntensity : null,
      observedAt,
      note: searchHits > 0 ? `${searchHits} search hits` : undefined,
    },
    {
      signalId: "cluster-growth",
      value: inGrowingCluster ? 55 : null,
      observedAt,
      note: inGrowingCluster ? "slug in growing analytics cluster" : undefined,
    },
  ];

  const trendOverlay: TrendIntelligence = {
    momentum: suggestedMomentum,
    confidence,
    detectedSignals,
    signalIds: signalObservations
      .filter((o) => o.value != null)
      .map((o) => o.signalId),
    observationNotes: `Analytics-derived overlay (${viewCount} views, ${relatedClickIn + relatedClickOut} related clicks). Not applied to public trendDirection.`,
  };

  return {
    slug,
    viewCount,
    relatedClickIn,
    relatedClickOut,
    searchHits,
    suggestedMomentum,
    confidence,
    detectedSignals,
    signalObservations,
    trendOverlay,
  };
}

/**
 * Suggested momentum from analytics — never writes `entry.trendDirection`.
 */
export function suggestMomentumFromAnalytics(
  slug: string,
  report: AnalyticsIntelligenceReport,
): TrendMomentum | null {
  return deriveAnalyticsTopicInfluence(slug, report)?.suggestedMomentum ?? null;
}

/**
 * Merge analytics observations for an entry (for getTrendIntelligence options).
 */
export function analyticsObservationsForEntry(
  entry: BaseEntry,
  report: AnalyticsIntelligenceReport,
): TrendSignalObservation[] {
  return (
    deriveAnalyticsTopicInfluence(entry.slug, report)?.signalObservations ?? []
  );
}

/**
 * Soft opportunity boost from analytics (0–24). Does not replace base scoring.
 */
export function analyticsOpportunityBoost(
  slug: string,
  report: AnalyticsIntelligenceReport,
): { boost: number; signals: string[]; reasons: string[] } {
  const influence = deriveAnalyticsTopicInfluence(slug, report);
  if (!influence) return { boost: 0, signals: [], reasons: [] };

  let boost = 0;
  const signals: string[] = [];
  const reasons: string[] = [];

  if (influence.viewCount >= 5) {
    boost += 10;
    signals.push("popular entry (analytics)");
    reasons.push(`analytics views: ${influence.viewCount}`);
  } else if (influence.viewCount > 0) {
    boost += 4;
    reasons.push(`analytics views: ${influence.viewCount}`);
  }

  if (influence.relatedClickIn + influence.relatedClickOut >= 3) {
    boost += 8;
    signals.push("active recommendation path");
    reasons.push("analytics related clicks");
  }

  if (influence.suggestedMomentum === "accelerating") {
    boost += 6;
    signals.push("analytics accelerating momentum");
    reasons.push("analytics momentum: accelerating");
  }

  if (
    report.growingClusters.some((c) => c.memberSlugsTouched.includes(slug))
  ) {
    boost += 4;
    signals.push("growing cluster (analytics)");
    reasons.push("analytics cluster growth");
  }

  return {
    boost: Math.min(24, boost),
    signals,
    reasons,
  };
}

/**
 * Build measured signal list for opportunity / trend helpers from a report.
 */
export function measuredSignalsFromAnalyticsReport(
  slug: string,
  report: AnalyticsIntelligenceReport,
): TrendSignalObservation[] {
  return (
    deriveAnalyticsTopicInfluence(slug, report)?.signalObservations.filter(
      (o) => o.value != null,
    ) ?? []
  );
}
