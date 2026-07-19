/**
 * Lifecycle modeling for cultural intelligence (Phase 7).
 *
 * Stages: emerging → rising → peak → declining → legacy
 *
 * Inference is read-only. It never writes `lifecycleStage`, `status`,
 * or `trendDirection` onto catalog entries.
 */

import type { BaseEntry, LifecycleStage } from "@/types";
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
 * Derive a lifecycle stage from existing public fields only.
 * Prefer explicit `entry.intelligence.lifecycleStage` when present
 * (handled by getCulturalIntelligence).
 */
export function inferLifecycleStage(
  entry: BaseEntry,
  nowYear = new Date().getFullYear(),
): LifecycleStage {
  // Optional EntryStatus — only when a human set it
  if (entry.status === "archived") return "legacy";
  if (entry.status === "peak") return "peak";
  if (entry.status === "declining") {
    return isLegacyMoment(entry, nowYear) ? "legacy" : "declining";
  }
  if (entry.status === "rising" || entry.status === "trending") return "rising";

  if (isLegacyMoment(entry, nowYear)) return "legacy";

  switch (entry.trendDirection) {
    case "new":
      return "emerging";
    case "rising":
      return entry.scores.relevance >= 85 ? "rising" : "emerging";
    case "declining":
      return "declining";
    case "stable":
    default:
      if (entry.scores.relevance >= 80 && entry.scores.influence >= 70) {
        return "peak";
      }
      if (entry.scores.relevance < 45 && entry.scores.influence >= 70) {
        return "legacy";
      }
      return "peak";
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
