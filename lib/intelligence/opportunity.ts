/**
 * Trend opportunity scoring (Phase 7C — internal only).
 *
 * Answers: "What topics deserve attention?"
 * Not a public score system. Does not replace encyclopedia Scores.
 */

import type { BaseEntry, LifecycleStage } from "@/types";
import { getCulturalIntelligence } from "./culturalMeta";
import { getCulturalImportance } from "./importance";
import { getTrendIntelligence } from "./trendIntelligence";
import { findCoverageGaps } from "./coverage";
import { isPrePeakStage } from "./lifecycle";
import type { TrendSignalObservation } from "./trendSignals";

export type OpportunityTier = "high" | "medium" | "low" | "watch";

export interface TrendOpportunityAssessment {
  /** Entry slug or suggested concept slug. */
  topic: string;
  title: string;
  /** Internal opportunity score 0–100 (not a public encyclopedia score). */
  score: number;
  tier: OpportunityTier;
  lifecycleStage: LifecycleStage;
  signals: string[];
  reasons: string[];
  recommendation: string;
}

function tierFromScore(score: number): OpportunityTier {
  if (score >= 70) return "high";
  if (score >= 50) return "medium";
  if (score >= 30) return "watch";
  return "low";
}

function recommendationFor(
  tier: OpportunityTier,
  stage: LifecycleStage,
): string {
  switch (tier) {
    case "high":
      return isPrePeakStage(stage)
        ? "High opportunity — prioritize coverage, links, and media verification"
        : "High opportunity — enrich graph and keep the article current";
    case "medium":
      return "Medium opportunity — worth a curator pass when capacity allows";
    case "watch":
      return "Watch — light monitoring; revisit if momentum signals strengthen";
    default:
      return "Low opportunity — maintain as needed; not a priority push";
  }
}

/**
 * Soft proxy for cluster growth: share of catalog in the same clusters
 * that were added recently (by addedAt year). Not a live platform metric.
 */
function clusterGrowthProxy(
  entry: BaseEntry,
  catalog: BaseEntry[],
  nowYear: number,
): { score: number; note: string | null } {
  const clusters = new Set(getCulturalIntelligence(entry).clusters);
  if (clusters.size === 0) return { score: 0, note: null };

  let members = 0;
  let recent = 0;
  for (const other of catalog) {
    if (other.slug === entry.slug) continue;
    const otherClusters = getCulturalIntelligence(other).clusters;
    if (!otherClusters.some((c) => clusters.has(c))) continue;
    members += 1;
    const y = Number(/^(\d{4})/.exec(other.addedAt)?.[1] ?? 0);
    if (y && nowYear - y <= 2) recent += 1;
  }

  if (members === 0) return { score: 0, note: null };
  const ratio = recent / members;
  if (ratio >= 0.35 && recent >= 2) {
    return {
      score: 18,
      note: `rising cluster (${recent} recent neighbors in shared clusters)`,
    };
  }
  if (recent >= 1) {
    return { score: 8, note: "modest cluster growth nearby" };
  }
  return { score: 0, note: null };
}

function coverageGapBoost(
  entry: BaseEntry,
  catalog: BaseEntry[],
): { score: number; note: string | null } {
  const gaps = findCoverageGaps(catalog).filter((g) => g.missing);
  const hit = gaps.find(
    (g) =>
      g.target.satisfiedBy.includes(entry.slug) ||
      g.target.suggestedSlug === entry.slug ||
      g.target.matchHints.some((h) =>
        entry.slug.includes(h) || entry.title.toLowerCase().includes(h),
      ),
  );
  if (hit) {
    return { score: 16, note: `coverage gap concept: ${hit.target.concept}` };
  }

  // Thin graph on a culturally important entry
  const outs =
    (entry.relatedSlugs?.length ?? 0) +
    Object.values(entry.relationships ?? {}).reduce(
      (n, arr) => n + (arr?.length ?? 0),
      0,
    );
  const importance = getCulturalImportance(entry).composite ?? 0;
  if (importance >= 65 && outs < 2) {
    return { score: 14, note: "low coverage / thin cultural graph" };
  }
  if (outs < 1 && entry.scores.influence >= 70) {
    return { score: 10, note: "low coverage" };
  }
  return { score: 0, note: null };
}

function platformSpreadProxy(entry: BaseEntry): {
  score: number;
  note: string | null;
} {
  const platforms = getCulturalIntelligence(entry).originPlatform.filter(
    (p) => p !== "unknown",
  );
  if (platforms.length >= 3) {
    return { score: 14, note: "high platform spread" };
  }
  if (platforms.length === 2) {
    return { score: 8, note: "multi-platform footprint" };
  }
  return { score: 0, note: null };
}

/**
 * Evaluate how much curator / tooling attention a topic deserves.
 */
export function scoreTrendOpportunity(
  entry: BaseEntry,
  catalog: BaseEntry[],
  options?: { measuredSignals?: TrendSignalObservation[] },
): TrendOpportunityAssessment {
  const nowYear = new Date().getFullYear();
  const trend = getTrendIntelligence(entry, {
    measuredSignals: options?.measuredSignals,
  });
  const importance = getCulturalImportance(entry);
  const signals: string[] = [...trend.detectedSignals];
  const reasons: string[] = [];
  let score = 0;

  // Lifecycle weight — pre-peak deserves attention; legacy less so unless gaps
  switch (trend.lifecycleStage) {
    case "emerging":
      score += 22;
      reasons.push("lifecycle: emerging");
      break;
    case "rising":
      score += 26;
      reasons.push("lifecycle: rising");
      break;
    case "peak":
      score += 16;
      reasons.push("lifecycle: peak");
      break;
    case "declining":
      score += 8;
      reasons.push("lifecycle: declining");
      break;
    case "legacy":
      score += 4;
      reasons.push("lifecycle: legacy");
      break;
  }

  // Cultural importance — landmarks still deserve maintenance, not silence
  const imp = importance.composite;
  if (imp != null) {
    if (imp >= 80) {
      score += 18;
      reasons.push("high cultural importance");
      signals.push("high cultural importance");
    } else if (imp >= 60) {
      score += 12;
      reasons.push("notable cultural importance");
    } else if (imp >= 40) {
      score += 6;
    }
  }

  // Momentum (from trend intelligence / public trendDirection proxy)
  if (trend.momentum === "accelerating") {
    score += 16;
    reasons.push("momentum accelerating");
    signals.push("accelerating momentum");
  } else if (trend.momentum === "stable") {
    score += 6;
  } else if (trend.momentum === "cooling") {
    score += 2;
    reasons.push("momentum cooling");
  }

  // Measured external signals when present (future)
  const measured = (options?.measuredSignals ?? []).filter(
    (o) => o.value != null,
  );
  if (measured.length > 0) {
    const avg =
      measured.reduce((a, o) => a + (o.value ?? 0), 0) / measured.length;
    const boost = Math.round(avg * 0.15);
    score += boost;
    reasons.push(`measured signals avg ${Math.round(avg)}`);
    signals.push("measured platform/search signals");
  }

  const cluster = clusterGrowthProxy(entry, catalog, nowYear);
  score += cluster.score;
  if (cluster.note) {
    reasons.push(cluster.note);
    signals.push(cluster.note);
  }

  const coverage = coverageGapBoost(entry, catalog);
  score += coverage.score;
  if (coverage.note) {
    reasons.push(coverage.note);
    signals.push(coverage.note);
  }

  const spread = platformSpreadProxy(entry);
  score += spread.score;
  if (spread.note) {
    reasons.push(spread.note);
    signals.push(spread.note);
  }

  // Soft confidence dampener when everything is inferred + no measured data
  if (trend.lifecycleSource === "inferred" && !trend.signalBundle.hasMeasuredData) {
    score = Math.round(score * 0.92);
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const tier = tierFromScore(score);

  return {
    topic: entry.slug,
    title: entry.title,
    score,
    tier,
    lifecycleStage: trend.lifecycleStage,
    signals: [...new Set(signals)],
    reasons,
    recommendation: recommendationFor(tier, trend.lifecycleStage),
  };
}

/**
 * Rank catalog topics by internal opportunity (highest first).
 */
export function rankTrendOpportunities(
  catalog: BaseEntry[],
  limit = 20,
): TrendOpportunityAssessment[] {
  return catalog
    .map((e) => scoreTrendOpportunity(e, catalog))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Opportunity-style view of curated coverage targets that are still missing.
 */
export function scoreCoverageGapOpportunities(
  catalog: BaseEntry[],
): TrendOpportunityAssessment[] {
  return findCoverageGaps(catalog)
    .filter((g) => g.missing)
    .map((g) => {
      const signals = ["low coverage", "missing curated concept"];
      const score = 72;
      const tier: OpportunityTier = "high";
      return {
        topic: g.target.suggestedSlug,
        title: g.target.concept,
        score,
        tier,
        lifecycleStage: "emerging" as LifecycleStage,
        signals,
        reasons: [g.target.reason, ...signals],
        recommendation: recommendationFor(tier, "emerging"),
      };
    });
}
