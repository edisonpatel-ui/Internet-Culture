/**
 * Content freshness helpers — derived from existing fields only.
 * Does not invent editorial dates or statuses.
 */

import type { BaseEntry, EntryStatus, TrendDirection } from "@/types";

export type FreshnessLabel =
  | "Rising"
  | "Active"
  | "Falling"
  | "Legacy"
  | "New";

/**
 * Map required trendDirection → human freshness label.
 * Optional entry.status wins when explicitly set (future editorial use).
 * Does not invent lastUpdated — only derives a display label.
 */
export function getFreshnessLabel(entry: BaseEntry): FreshnessLabel {
  if (entry.status) {
    return statusToLabel(entry.status);
  }
  // Older declining moments read as Legacy in the UI (no new fields written)
  if (isLegacyMoment(entry)) {
    return "Legacy";
  }
  return trendToLabel(entry.trendDirection);
}

function trendToLabel(trend: TrendDirection): FreshnessLabel {
  switch (trend) {
    case "rising":
      return "Rising";
    case "new":
      return "New";
    case "declining":
      return "Falling";
    case "stable":
    default:
      return "Active";
  }
}

function statusToLabel(status: EntryStatus): FreshnessLabel {
  switch (status) {
    case "rising":
    case "trending":
      return "Rising";
    case "peak":
      return "Active";
    case "declining":
      return "Falling";
    case "archived":
      return "Legacy";
    default:
      return "Active";
  }
}

/** Effective last-modified date for SEO/UI — never invents a date. */
export function getEffectiveUpdatedAt(entry: BaseEntry): string {
  return entry.lastUpdated ?? entry.addedAt;
}

/**
 * Classic/legacy signal from age + declining trend — for hub “Legacy” sections.
 * Heuristic only; not written back onto entries.
 */
export function isLegacyMoment(entry: BaseEntry, nowYear = new Date().getFullYear()): boolean {
  if (entry.status === "archived") return true;
  const yearStr =
    entry.historicalDate ?? entry.dateStarted ?? entry.addedAt ?? "";
  const m = /^(\d{4})/.exec(yearStr);
  if (!m) return false;
  const age = nowYear - Number(m[1]);
  return age >= 8 && entry.trendDirection === "declining";
}
