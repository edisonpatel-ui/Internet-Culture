/**
 * Internal cultural importance modeling (Phase 7B).
 *
 * These dimensions are NOT public encyclopedia scores and must not replace
 * `scores.relevance|influence|cringe|brainrot`. Used only by intelligence tooling.
 */

import type { BaseEntry, CulturalImportance } from "@/types";
import { getCulturalIntelligence } from "./culturalMeta";

export interface ResolvedCulturalImportance {
  historicalSignificance: number | null;
  culturalLongevity: number | null;
  platformImpact: number | null;
  audienceReach: number | null;
  /** Mean of available dimensions; null if none set. */
  composite: number | null;
  /** True when any dimension comes from explicit metadata (not derived). */
  hasExplicit: boolean;
}

function clampScore(n: number | undefined): number | null {
  if (n == null || Number.isNaN(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function mean(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}

/**
 * Light derived hints when explicit importance is missing.
 * Conservative — never invents high scores from thin evidence.
 */
function deriveImportanceHints(entry: BaseEntry): CulturalImportance {
  const meta = getCulturalIntelligence(entry);
  const hints: CulturalImportance = {};

  if (meta.lifecycleStage === "legacy") {
    hints.historicalSignificance = 70;
    hints.culturalLongevity = 75;
  } else if (meta.lifecycleStage === "peak") {
    hints.audienceReach = 65;
    hints.platformImpact = 55;
  } else if (meta.lifecycleStage === "declining") {
    hints.culturalLongevity = 55;
  }

  const signals = meta.signals.map((s) => s.toLowerCase());
  if (signals.some((s) => s.includes("foundational") || s.includes("classic"))) {
    hints.historicalSignificance = Math.max(
      hints.historicalSignificance ?? 0,
      72,
    );
  }
  if (signals.some((s) => s.includes("brainrot") || s.includes("viral"))) {
    hints.audienceReach = Math.max(hints.audienceReach ?? 0, 60);
  }

  // Encyclopedia scores can softly inform reach/influence — never copy 1:1
  if (entry.scores.influence >= 80) {
    hints.platformImpact = Math.max(hints.platformImpact ?? 0, 68);
  }
  if (entry.scores.relevance >= 80) {
    hints.audienceReach = Math.max(hints.audienceReach ?? 0, 62);
  }

  return hints;
}

/**
 * Resolve importance for an entry: explicit registry/entry values win;
 * derived hints fill gaps only.
 */
export function getCulturalImportance(entry: BaseEntry): ResolvedCulturalImportance {
  const explicit = getCulturalIntelligence(entry).importance ?? {};
  const derived = deriveImportanceHints(entry);

  const historicalSignificance =
    clampScore(explicit.historicalSignificance) ??
    clampScore(derived.historicalSignificance);
  const culturalLongevity =
    clampScore(explicit.culturalLongevity) ??
    clampScore(derived.culturalLongevity);
  const platformImpact =
    clampScore(explicit.platformImpact) ?? clampScore(derived.platformImpact);
  const audienceReach =
    clampScore(explicit.audienceReach) ?? clampScore(derived.audienceReach);

  const hasExplicit = Boolean(
    explicit.historicalSignificance != null ||
      explicit.culturalLongevity != null ||
      explicit.platformImpact != null ||
      explicit.audienceReach != null,
  );

  const available = [
    historicalSignificance,
    culturalLongevity,
    platformImpact,
    audienceReach,
  ].filter((n): n is number => n != null);

  return {
    historicalSignificance,
    culturalLongevity,
    platformImpact,
    audienceReach,
    composite: mean(available),
    hasExplicit,
  };
}

/** Overlap boost for recommendations — only when both have a composite. */
export function importanceAffinity(
  a: BaseEntry,
  b: BaseEntry,
): number {
  const ia = getCulturalImportance(a).composite;
  const ib = getCulturalImportance(b).composite;
  if (ia == null || ib == null) return 0;
  const gap = Math.abs(ia - ib);
  if (gap <= 12) return 8;
  if (gap <= 25) return 4;
  return 0;
}
