/**
 * Search intelligence utilities (Phase 7D — internal).
 *
 * Track search demand, identify missing content, rank coverage opportunities.
 * Does not change public search behavior or UI.
 */

import type { BaseEntry } from "@/types";
import { resolveAliasQuery } from "@/lib/content/aliases";
import type { IntelligenceAnalyticsEvent } from "./analyticsEvents";
import { getEventQuery } from "./analyticsEvents";
import type { AnalyticsIntelligenceReport } from "./analyticsSignals";
import type {
  OpportunityTier,
  TrendOpportunityAssessment,
} from "./opportunity";

export interface SearchQueryAnalysis {
  query: string;
  normalizedQuery: string;
  matchedSlugs: string[];
  resultCount: number;
  /** True when no catalog / alias hit. */
  isMiss: boolean;
  /** Coverage opportunity when the query misses. */
  opportunity: SearchCoverageOpportunity | null;
}

export interface SearchCoverageOpportunity {
  query: string;
  suggestedSlug: string;
  title: string;
  signal: string;
  recommendation: string;
  /** Soft priority 0–100 for curator queues. */
  priority: number;
  tier: OpportunityTier;
  demandCount: number;
}

function normalizeQuery(raw: string): string {
  return raw.toLowerCase().replace(/\s+/g, " ").trim();
}

function slugifyQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/**
 * Analyze a single search query against the catalog (alias + title/slug).
 * Example: "quandale" → miss → potential coverage opportunity.
 */
export function analyzeSearchQuery(
  query: string,
  catalog: BaseEntry[],
): SearchQueryAnalysis {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) {
    return {
      query,
      normalizedQuery: "",
      matchedSlugs: [],
      resultCount: 0,
      isMiss: true,
      opportunity: null,
    };
  }

  const matched = new Set<string>();
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));

  for (const hit of resolveAliasQuery(normalizedQuery)) {
    if (bySlug.has(hit.slug)) matched.add(hit.slug);
  }

  for (const entry of catalog) {
    const title = entry.title.toLowerCase();
    const slug = entry.slug.toLowerCase();
    if (
      title === normalizedQuery ||
      slug === normalizedQuery ||
      title.includes(normalizedQuery) ||
      slug.includes(normalizedQuery.replace(/\s+/g, "-"))
    ) {
      matched.add(entry.slug);
    }
  }

  const matchedSlugs = [...matched];
  const isMiss = matchedSlugs.length === 0;

  let opportunity: SearchCoverageOpportunity | null = null;
  if (isMiss) {
    const suggestedSlug = slugifyQuery(normalizedQuery) || "untitled-topic";
    opportunity = {
      query: normalizedQuery,
      suggestedSlug,
      title: query.trim(),
      signal: "Potential coverage opportunity",
      recommendation:
        "No article — research whether this is a real cultural topic before creating",
      priority: 70,
      tier: "high",
      demandCount: 1,
    };
  }

  return {
    query,
    normalizedQuery,
    matchedSlugs,
    resultCount: matchedSlugs.length,
    isMiss,
    opportunity,
  };
}

/**
 * Aggregate search demand from intelligence events (performed + no-result).
 */
export function aggregateSearchDemand(
  events: IntelligenceAnalyticsEvent[],
): Array<{ query: string; total: number; misses: number; hits: number }> {
  const map = new Map<
    string,
    { total: number; misses: number; hits: number }
  >();

  for (const event of events) {
    if (event.kind !== "search_performed" && event.kind !== "search_no_result") {
      continue;
    }
    const q = getEventQuery(event);
    if (!q) continue;
    const row = map.get(q) ?? { total: 0, misses: 0, hits: 0 };
    row.total += 1;
    if (event.kind === "search_no_result") row.misses += 1;
    else row.hits += 1;
    map.set(q, row);
  }

  return [...map.entries()]
    .map(([query, row]) => ({ query, ...row }))
    .sort((a, b) => b.total - a.total || a.query.localeCompare(b.query));
}

/**
 * Rank missing-content opportunities from failed searches + catalog analysis.
 */
export function rankSearchCoverageOpportunities(
  catalog: BaseEntry[],
  reportOrEvents:
    | AnalyticsIntelligenceReport
    | IntelligenceAnalyticsEvent[],
  limit = 20,
): SearchCoverageOpportunity[] {
  const failed: Array<{ query: string; count: number }> = Array.isArray(
    reportOrEvents,
  )
    ? aggregateSearchDemand(reportOrEvents)
        .filter((r) => r.misses > 0)
        .map((r) => ({ query: r.query, count: r.misses }))
    : reportOrEvents.failedSearches.map((f) => ({
        query: f.key,
        count: f.count,
      }));

  const byQuery = new Map<string, SearchCoverageOpportunity>();

  for (const row of failed) {
    const analysis = analyzeSearchQuery(row.query, catalog);
    if (!analysis.isMiss || !analysis.opportunity) continue;

    const existing = byQuery.get(analysis.normalizedQuery);
    const demandCount = (existing?.demandCount ?? 0) + row.count;
    const priority = Math.min(95, 55 + demandCount * 8);
    let tier: OpportunityTier = "watch";
    if (priority >= 70) tier = "high";
    else if (priority >= 50) tier = "medium";

    byQuery.set(analysis.normalizedQuery, {
      ...analysis.opportunity,
      demandCount,
      priority,
      tier,
      signal:
        demandCount >= 3
          ? "Repeated failed search — strong coverage opportunity"
          : "Potential coverage opportunity",
      recommendation:
        demandCount >= 3
          ? "High search demand with no article — prioritize research & creation if culturally real"
          : analysis.opportunity.recommendation,
    });
  }

  // Also surface rising searches that still miss the catalog
  if (!Array.isArray(reportOrEvents)) {
    for (const rising of reportOrEvents.risingSearches) {
      const analysis = analyzeSearchQuery(rising.key, catalog);
      if (!analysis.isMiss || !analysis.opportunity) continue;
      if (byQuery.has(analysis.normalizedQuery)) continue;
      byQuery.set(analysis.normalizedQuery, {
        ...analysis.opportunity,
        demandCount: rising.count,
        priority: Math.min(80, 50 + rising.count * 5),
        tier: rising.count >= 3 ? "medium" : "watch",
        signal: "Rising search with no article",
      });
    }
  }

  return [...byQuery.values()]
    .sort((a, b) => b.priority - a.priority || b.demandCount - a.demandCount)
    .slice(0, limit);
}

/**
 * Map search coverage opportunities into the trend-opportunity assessment shape.
 */
export function searchOpportunitiesAsTrendAssessments(
  opportunities: SearchCoverageOpportunity[],
): TrendOpportunityAssessment[] {
  return opportunities.map((o) => ({
    topic: o.suggestedSlug,
    title: o.title,
    score: o.priority,
    tier: o.tier,
    lifecycleStage: "emerging",
    signals: [o.signal, `search demand: ${o.demandCount}`],
    reasons: [
      `query: "${o.query}"`,
      o.signal,
      `demandCount: ${o.demandCount}`,
    ],
    recommendation: o.recommendation,
  }));
}
