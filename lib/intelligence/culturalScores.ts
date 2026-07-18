import type { BaseEntry } from "@/types";
import type { CulturalScoreSnapshot } from "@/lib/intelligence/types";

/**
 * Cultural scoring accessors — read the four stored scores.
 * No derived popularity / longevity / search-interest formulas.
 */

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function getRelevanceScore(entry: BaseEntry): number {
  return clamp(entry.scores.relevance);
}

export function getInfluenceScore(entry: BaseEntry): number {
  return clamp(entry.scores.influence);
}

export function getCringeScore(entry: BaseEntry): number {
  return clamp(entry.scores.cringe);
}

export function getBrainrotScore(entry: BaseEntry): number {
  return clamp(entry.scores.brainrot);
}

/** @deprecated Prefer getCringeScore — kept as alias for older call sites. */
export function getCringeLevel(entry: BaseEntry): number {
  return getCringeScore(entry);
}

export function getCulturalScoreSnapshot(
  entry: BaseEntry,
): CulturalScoreSnapshot {
  return {
    relevance: getRelevanceScore(entry),
    influence: getInfluenceScore(entry),
    cringe: getCringeScore(entry),
    brainrot: getBrainrotScore(entry),
  };
}

/** Year helper used by related-article matching — not a cultural score. */
export function getEntryYear(entry: BaseEntry): number | null {
  for (const value of [entry.historicalDate, entry.dateStarted, entry.addedAt]) {
    if (!value) continue;
    const m = /^(\d{4})/.exec(value);
    if (m) return Number(m[1]);
  }
  const timeline = (
    entry as BaseEntry & { timeline?: { date: string }[] }
  ).timeline;
  if (timeline?.[0]?.date) {
    const m = /(\d{4})/.exec(timeline[0].date);
    if (m) return Number(m[1]);
  }
  return null;
}
