/**
 * Lifecycle modeling for cultural intelligence (Phase 7 / 7C).
 *
 * Stages: emerging → rising → peak → declining → legacy
 *
 * Inference is read-only. It never writes `lifecycleStage`, `status`,
 * `trendDirection`, or encyclopedia scores onto catalog entries.
 */

import type { BaseEntry, LifecycleStage, TrendMomentum } from "@/types";
import { isLegacyMoment } from "@/lib/content/freshness";

export const LIFECYCLE_STAGES: readonly LifecycleStage[] = [
  "emerging",
  "rising",
  "peak",
  "declining",
  "legacy",
] as const;

export const LIFECYCLE_STAGE_LABELS: Record<LifecycleStage, string> = {
  emerging: "Emerging",
  rising: "Rising",
  peak: "Peak",
  declining: "Declining",
  legacy: "Legacy",
};

/**
 * Optional multi-signal context for richer inference.
 * Built by culturalMeta / trendIntelligence — lifecycle itself stays
 * free of imports from those modules (avoids cycles).
 */
export interface LifecycleInferenceContext {
  importanceComposite?: number | null;
  historicalSignificance?: number | null;
  culturalLongevity?: number | null;
  clusterIds?: readonly string[];
  culturalSignals?: readonly string[];
  eras?: readonly string[];
  /** Qualitative momentum from trend intelligence (optional). */
  momentum?: TrendMomentum | null;
  /** Confidence in trend/lifecycle read (0–100). */
  trendConfidence?: number | null;
}

function entryAgeYears(
  entry: BaseEntry,
  nowYear: number,
): number | null {
  const yearStr =
    entry.historicalDate ?? entry.dateStarted ?? entry.addedAt ?? "";
  const m = /^(\d{4})/.exec(yearStr);
  if (!m) return null;
  return nowYear - Number(m[1]);
}

function hasClassicSignal(ctx?: LifecycleInferenceContext): boolean {
  if (!ctx) return false;
  const blob = [
    ...(ctx.culturalSignals ?? []),
    ...(ctx.clusterIds ?? []),
    ...(ctx.eras ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return (
    blob.includes("classic") ||
    blob.includes("early-web") ||
    blob.includes("legacy") ||
    ctx.clusterIds?.includes("classic-internet") === true
  );
}

/**
 * Old + culturally important + low current activity → legacy, not "irrelevant".
 * We have no irrelevant stage; this prevents mis-labeling landmarks as mere decline.
 */
function isImportantCoolingLegacy(
  entry: BaseEntry,
  ctx: LifecycleInferenceContext | undefined,
  nowYear: number,
): boolean {
  const age = entryAgeYears(entry, nowYear);
  if (age == null || age < 6) return false;

  const importance =
    ctx?.importanceComposite ??
    ctx?.historicalSignificance ??
    null;
  const longevity = ctx?.culturalLongevity ?? null;
  const highImportance =
    (importance != null && importance >= 70) ||
    (longevity != null && longevity >= 75) ||
    hasClassicSignal(ctx) ||
    entry.scores.influence >= 80;

  const lowActivity =
    entry.scores.relevance < 55 &&
    entry.trendDirection !== "rising" &&
    entry.trendDirection !== "new" &&
    ctx?.momentum !== "accelerating";

  return highImportance && lowActivity;
}

function isHotCluster(ctx?: LifecycleInferenceContext): boolean {
  if (!ctx?.clusterIds?.length) return false;
  const hot = new Set([
    "brainrot-culture",
    "tiktok-culture",
    "streaming-culture",
  ]);
  return ctx.clusterIds.some((id) => hot.has(id));
}

/**
 * Derive a lifecycle stage from public fields + optional intelligence context.
 * Prefer explicit `entry.intelligence.lifecycleStage` /
 * `entry.trendIntelligence.lifecycleStage` when present (callers handle that).
 */
export function inferLifecycleStage(
  entry: BaseEntry,
  nowYear = new Date().getFullYear(),
  ctx?: LifecycleInferenceContext,
): LifecycleStage {
  // Optional EntryStatus — only when a human set it
  if (entry.status === "archived") return "legacy";
  if (entry.status === "peak") return "peak";
  if (entry.status === "declining") {
    return isLegacyMoment(entry, nowYear) ||
      isImportantCoolingLegacy(entry, ctx, nowYear)
      ? "legacy"
      : "declining";
  }
  if (entry.status === "rising" || entry.status === "trending") {
    return "rising";
  }

  if (isLegacyMoment(entry, nowYear)) return "legacy";
  if (isImportantCoolingLegacy(entry, ctx, nowYear)) return "legacy";

  const age = entryAgeYears(entry, nowYear);
  const momentum = ctx?.momentum;

  // Momentum from trend intelligence (when set) — still read-only
  if (momentum === "accelerating") {
    if (entry.trendDirection === "new" || (age != null && age <= 2)) {
      return "emerging";
    }
    return entry.scores.relevance >= 70 ? "rising" : "emerging";
  }
  if (momentum === "cooling") {
    if (isImportantCoolingLegacy(entry, ctx, nowYear)) return "legacy";
    if (age != null && age >= 5 && entry.scores.relevance < 60) {
      return "declining";
    }
  }

  switch (entry.trendDirection) {
    case "new":
      return "emerging";
    case "rising": {
      if (isHotCluster(ctx) || entry.scores.relevance >= 75) return "rising";
      return entry.scores.relevance >= 85 ? "rising" : "emerging";
    }
    case "declining": {
      // High importance + age + cool activity → legacy (not a dead-end "irrelevant")
      if (isImportantCoolingLegacy(entry, ctx, nowYear)) return "legacy";
      if (
        (age != null && age >= 8) ||
        hasClassicSignal(ctx) ||
        entry.scores.influence >= 85
      ) {
        return "legacy";
      }
      return "declining";
    }
    case "stable":
    default: {
      // Landmark that cooled → legacy
      if (isImportantCoolingLegacy(entry, ctx, nowYear)) return "legacy";

      // Young + in a hot cluster with solid relevance → rising
      if (
        age != null &&
        age <= 3 &&
        isHotCluster(ctx) &&
        entry.scores.relevance >= 70
      ) {
        return "rising";
      }

      if (entry.scores.relevance >= 80 && entry.scores.influence >= 70) {
        return "peak";
      }

      // High influence, low current relevance → legacy (historically important)
      if (entry.scores.relevance < 45 && entry.scores.influence >= 70) {
        return "legacy";
      }

      // Mid relevance + high influence + older → prefer peak over false decline
      if (
        entry.scores.influence >= 75 &&
        entry.scores.relevance >= 50 &&
        (age == null || age < 10)
      ) {
        return "peak";
      }

      return "peak";
    }
  }
}

/** True when stage is past cultural peak (declining or legacy). */
export function isPostPeakStage(stage: LifecycleStage): boolean {
  return stage === "declining" || stage === "legacy";
}

/** True when stage is still climbing (emerging or rising). */
export function isPrePeakStage(stage: LifecycleStage): boolean {
  return stage === "emerging" || stage === "rising";
}
