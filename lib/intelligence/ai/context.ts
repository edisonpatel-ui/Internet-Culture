/**
 * AI context packs (Phase 7E — internal).
 *
 * Bundle existing intelligence layers for future AI providers.
 * Read-only — never mutates catalog entries.
 */

import type { BaseEntry } from "@/types";
import { getCulturalIntelligence } from "../culturalMeta";
import { getCulturalImportance } from "../importance";
import { getTrendIntelligence } from "../trendIntelligence";
import {
  buildIntelligenceSnapshot,
  findCoverageGaps,
  getConnectedEntries,
  suggestNextArticles,
  type CoverageGap,
  type NextArticleSuggestion,
} from "../coverage";
import { CLUSTER_LABELS } from "../clusters";
import {
  scoreTrendOpportunity,
  type TrendOpportunityAssessment,
} from "../opportunity";
import type { AnalyticsIntelligenceReport } from "../analyticsSignals";
import type { ResolvedCulturalIntelligence } from "../culturalMeta";
import type { ResolvedCulturalImportance } from "../importance";
import type { ResolvedTrendIntelligence } from "../trendIntelligence";

/** Compact entry pack for AI providers. */
export interface AiEntryContext {
  slug: string;
  title: string;
  category: BaseEntry["category"];
  description: string;
  /** Public scores snapshot (read-only reference — AI must not overwrite). */
  scores: BaseEntry["scores"];
  trendDirection: BaseEntry["trendDirection"];
  cultural: ResolvedCulturalIntelligence;
  importance: ResolvedCulturalImportance;
  trend: Pick<
    ResolvedTrendIntelligence,
    | "lifecycleStage"
    | "lifecycleSource"
    | "momentum"
    | "confidence"
    | "detectedSignals"
    | "observationNotes"
  >;
  clusters: Array<{ id: string; label: string }>;
  connected: Array<{
    slug: string;
    title: string;
    score: number;
    reasons: string[];
  }>;
  opportunity: TrendOpportunityAssessment | null;
  /** Full intelligence snapshot for summarization helpers. */
  snapshot: ReturnType<typeof buildIntelligenceSnapshot>;
  analytics: {
    hasReport: boolean;
    popularRank: number | null;
    failedSearchMentions: number;
  };
}

/** Catalog-wide pack for content suggestion / coverage tooling. */
export interface AiCatalogContext {
  entryCount: number;
  coverageGaps: CoverageGap[];
  nextArticleSuggestions: NextArticleSuggestion[];
  topOpportunities: TrendOpportunityAssessment[];
  clusterLabels: string[];
  analytics: {
    hasReport: boolean;
    topFailedSearches: Array<{ query: string; count: number }>;
    topRisingSearches: Array<{ query: string; count: number }>;
    growingClusters: Array<{ clusterId: string; activity: number }>;
  };
}

export interface BuildAiContextOptions {
  analyticsReport?: AnalyticsIntelligenceReport;
  opportunityLimit?: number;
  connectedLimit?: number;
}

/**
 * Build a read-only AI context for one entry from the intelligence layer.
 */
export function buildAiEntryContext(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): AiEntryContext {
  const cultural = getCulturalIntelligence(entry);
  const importance = getCulturalImportance(entry);
  const trend = getTrendIntelligence(entry, {
    analyticsReport: options?.analyticsReport,
  });
  const connected = getConnectedEntries(
    entry,
    catalog,
    options?.connectedLimit ?? 8,
  );
  const snapshot = buildIntelligenceSnapshot(entry, catalog);
  const opportunity = scoreTrendOpportunity(entry, catalog, {
    analyticsReport: options?.analyticsReport,
  });

  const report = options?.analyticsReport;
  let popularRank: number | null = null;
  let failedSearchMentions = 0;
  if (report) {
    const idx = report.popularEntries.findIndex((p) => p.key === entry.slug);
    popularRank = idx >= 0 ? idx + 1 : null;
    failedSearchMentions = report.failedSearches.filter((f) =>
      f.key.includes(entry.slug) || entry.title.toLowerCase().includes(f.key),
    ).length;
  }

  return {
    slug: entry.slug,
    title: entry.title,
    category: entry.category,
    description: entry.description,
    scores: entry.scores,
    trendDirection: entry.trendDirection,
    cultural,
    importance,
    trend: {
      lifecycleStage: trend.lifecycleStage,
      lifecycleSource: trend.lifecycleSource,
      momentum: trend.momentum,
      confidence: trend.confidence,
      detectedSignals: trend.detectedSignals,
      observationNotes: trend.observationNotes,
    },
    clusters: cultural.clusters.map((id) => ({
      id,
      label: CLUSTER_LABELS[id] ?? id,
    })),
    connected: connected.map((c) => ({
      slug: c.entry.slug,
      title: c.entry.title,
      score: c.score,
      reasons: c.reasons,
    })),
    opportunity,
    snapshot,
    analytics: {
      hasReport: Boolean(report),
      popularRank,
      failedSearchMentions,
    },
  };
}

/**
 * Build a catalog-level AI context (gaps, opportunities, analytics).
 */
export function buildAiCatalogContext(
  catalog: BaseEntry[],
  options?: BuildAiContextOptions,
): AiCatalogContext {
  const limit = options?.opportunityLimit ?? 15;
  const report = options?.analyticsReport;
  const gaps = findCoverageGaps(catalog);
  const next = suggestNextArticles(catalog, limit);
  const topOpportunities = catalog
    .map((e) =>
      scoreTrendOpportunity(e, catalog, {
        analyticsReport: report,
      }),
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return {
    entryCount: catalog.length,
    coverageGaps: gaps,
    nextArticleSuggestions: next,
    topOpportunities,
    clusterLabels: Object.values(CLUSTER_LABELS),
    analytics: {
      hasReport: Boolean(report),
      topFailedSearches: (report?.failedSearches ?? [])
        .slice(0, 10)
        .map((f) => ({ query: f.key, count: f.count })),
      topRisingSearches: (report?.risingSearches ?? [])
        .slice(0, 10)
        .map((f) => ({ query: f.key, count: f.count })),
      growingClusters: (report?.growingClusters ?? [])
        .slice(0, 10)
        .map((c) => ({
          clusterId: c.clusterId,
          activity: c.viewCount + c.relatedClickCount,
        })),
    },
  };
}
