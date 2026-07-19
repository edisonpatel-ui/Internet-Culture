/**
 * Trend intelligence resolution (Phase 7C — internal).
 *
 * Combines optional entry/registry trend metadata with read-only lifecycle
 * inference and placeholder signal bundles. Never mutates catalog fields.
 */

import type {
  BaseEntry,
  LifecycleStage,
  TrendIntelligence,
  TrendMomentum,
} from "@/types";
import { getCulturalIntelligence } from "./culturalMeta";
import { getCulturalImportance } from "./importance";
import {
  inferLifecycleStage,
  type LifecycleInferenceContext,
} from "./lifecycle";
import {
  collectTrendSignalPlaceholders,
  mergeTrendSignalObservations,
  type TrendSignalBundle,
  type TrendSignalObservation,
} from "./trendSignals";
import {
  getTrendIntelligenceOverride,
  TREND_INTELLIGENCE_REGISTRY,
} from "./trendRegistry";

export { getTrendIntelligenceOverride, TREND_INTELLIGENCE_REGISTRY };

export interface ResolvedTrendIntelligence {
  lifecycleStage: LifecycleStage;
  /** Where lifecycleStage came from. */
  lifecycleSource: "explicit-trend" | "explicit-cultural" | "inferred";
  momentum: TrendMomentum;
  confidence: number;
  observationNotes: string | undefined;
  detectedSignals: string[];
  signalIds: string[];
  /** Placeholder / merged signal bundle (external APIs not connected). */
  signalBundle: TrendSignalBundle;
}

function clampConfidence(n: number | undefined, fallback: number): number {
  if (n == null || Number.isNaN(n)) return fallback;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function mergeTrendLayers(
  ...layers: Array<TrendIntelligence | undefined>
): TrendIntelligence {
  const out: TrendIntelligence = {};
  for (const layer of layers) {
    if (!layer) continue;
    if (layer.lifecycleStage !== undefined) {
      out.lifecycleStage = layer.lifecycleStage;
    }
    if (layer.momentum !== undefined) out.momentum = layer.momentum;
    if (layer.confidence !== undefined) out.confidence = layer.confidence;
    if (layer.observationNotes !== undefined) {
      out.observationNotes = layer.observationNotes;
    }
    if (layer.detectedSignals !== undefined) {
      out.detectedSignals = [
        ...new Set([
          ...(out.detectedSignals ?? []),
          ...layer.detectedSignals,
        ]),
      ];
    }
    if (layer.signalIds !== undefined) {
      out.signalIds = [
        ...new Set([...(out.signalIds ?? []), ...layer.signalIds]),
      ];
    }
  }
  return out;
}

function deriveMomentum(entry: BaseEntry): TrendMomentum {
  switch (entry.trendDirection) {
    case "rising":
    case "new":
      return "accelerating";
    case "declining":
      return "cooling";
    case "stable":
      return "stable";
    default:
      return "unknown";
  }
}

function deriveDetectedSignals(
  entry: BaseEntry,
  stage: LifecycleStage,
  ctx: LifecycleInferenceContext,
): string[] {
  const out: string[] = [];
  if (stage === "legacy") out.push("legacy arc");
  if (stage === "emerging" || stage === "rising") out.push("pre-peak movement");
  if (ctx.clusterIds && ctx.clusterIds.length > 0) {
    out.push("cluster membership");
  }
  if ((ctx.importanceComposite ?? 0) >= 70) out.push("high cultural importance");
  if (entry.scores.relevance < 45 && entry.scores.influence >= 70) {
    out.push("cool activity / lasting footprint");
  }
  if (entry.trendDirection === "rising") out.push("rising trendDirection");
  if (entry.trendDirection === "declining") out.push("cooling trendDirection");
  return out;
}

/**
 * Resolve trend intelligence for an entry (read-only).
 * Does not write `trendDirection`, scores, or article metadata.
 */
export function getTrendIntelligence(
  entry: BaseEntry,
  options?: { measuredSignals?: TrendSignalObservation[] },
): ResolvedTrendIntelligence {
  const cultural = getCulturalIntelligence(entry);
  const importance = getCulturalImportance(entry);
  const merged = mergeTrendLayers(
    getTrendIntelligenceOverride(entry.slug),
    entry.trendIntelligence,
  );

  const ctx: LifecycleInferenceContext = {
    importanceComposite: importance.composite,
    historicalSignificance: importance.historicalSignificance,
    culturalLongevity: importance.culturalLongevity,
    clusterIds: cultural.clusters,
    culturalSignals: cultural.signals,
    eras: cultural.era,
    momentum: merged.momentum ?? deriveMomentum(entry),
    trendConfidence: merged.confidence,
  };

  let lifecycleStage: LifecycleStage;
  let lifecycleSource: ResolvedTrendIntelligence["lifecycleSource"];

  if (merged.lifecycleStage) {
    lifecycleStage = merged.lifecycleStage;
    lifecycleSource = "explicit-trend";
  } else if (cultural.lifecycleSource === "explicit") {
    lifecycleStage = cultural.lifecycleStage;
    lifecycleSource = "explicit-cultural";
  } else {
    lifecycleStage = inferLifecycleStage(
      entry,
      new Date().getFullYear(),
      ctx,
    );
    lifecycleSource = "inferred";
  }

  const momentum = merged.momentum ?? deriveMomentum(entry);
  const detected = [
    ...new Set([
      ...(merged.detectedSignals ?? []),
      ...deriveDetectedSignals(entry, lifecycleStage, ctx),
    ]),
  ];

  const baseConfidence =
    lifecycleSource === "inferred"
      ? 45
      : lifecycleSource === "explicit-cultural"
        ? 70
        : 85;
  const confidence = clampConfidence(merged.confidence, baseConfidence);

  const signalBundle = options?.measuredSignals?.length
    ? mergeTrendSignalObservations(entry.slug, options.measuredSignals)
    : collectTrendSignalPlaceholders(entry.slug);

  return {
    lifecycleStage,
    lifecycleSource,
    momentum,
    confidence,
    observationNotes: merged.observationNotes,
    detectedSignals: detected,
    signalIds: merged.signalIds ?? [],
    signalBundle,
  };
}
