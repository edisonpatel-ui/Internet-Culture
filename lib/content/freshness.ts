/**
 * Content freshness helpers — derived from existing fields only.
 * Does not invent editorial dates or statuses.
 */

import type { BaseEntry, EntryStatus, TrendDirection } from "@/types";

export type FreshnessLabel =
  | "Highly active"
  | "Current"
  | "Resurfacing"
  | "Occasionally referenced"
  | "Classic"
  | "Historical";

/**
 * Map trendDirection (+ age / relevance) → human freshness label.
 * Optional entry.status wins when explicitly set.
 * Does not invent lastUpdated — only derives a display label.
 */
export function getFreshnessLabel(entry: BaseEntry): FreshnessLabel {
  if (entry.status) {
    return statusToLabel(entry.status, entry);
  }
  return deriveLabel(entry);
}

function deriveLabel(entry: BaseEntry): FreshnessLabel {
  const age = getAgeYears(entry);
  const relevance = entry.scores?.relevance ?? 50;
  const trend = entry.trendDirection;

  if (trend === "rising") {
    return age != null && age >= 8 ? "Resurfacing" : "Highly active";
  }
  if (trend === "new") {
    return "Current";
  }
  if (trend === "declining") {
    if (age != null && age >= 18) return "Historical";
    if (age != null && age >= 8) return "Classic";
    return "Occasionally referenced";
  }

  // stable — do not read as “buzzing” by default
  if (relevance >= 85) return "Highly active";
  if (age != null && age >= 18 && relevance < 60) return "Historical";
  if (age != null && age >= 12 && relevance < 55) return "Classic";
  if (relevance < 50) return "Occasionally referenced";
  if (age != null && age >= 15 && relevance < 70) return "Classic";
  return "Current";
}

function trendToLabel(trend: TrendDirection, entry: BaseEntry): FreshnessLabel {
  return deriveLabel({ ...entry, trendDirection: trend });
}

function statusToLabel(status: EntryStatus, entry: BaseEntry): FreshnessLabel {
  switch (status) {
    case "rising":
    case "trending":
      return deriveLabel({ ...entry, trendDirection: "rising" });
    case "peak":
      return "Highly active";
    case "declining":
      return deriveLabel({ ...entry, trendDirection: "declining" });
    case "archived": {
      const age = getAgeYears(entry);
      return age != null && age >= 18 ? "Historical" : "Classic";
    }
    default:
      return trendToLabel(entry.trendDirection, entry);
  }
}

/** Effective last-modified date for SEO/UI — never invents a date. */
export function getEffectiveUpdatedAt(entry: BaseEntry): string {
  return entry.lastUpdated ?? entry.addedAt;
}

function getAgeYears(
  entry: BaseEntry,
  nowYear = new Date().getFullYear(),
): number | null {
  const yearStr =
    entry.historicalDate ?? entry.dateStarted ?? entry.addedAt ?? "";
  const m = /^(\d{4})/.exec(yearStr);
  if (!m) return null;
  return nowYear - Number(m[1]);
}

/**
 * Classic/legacy signal from age + declining trend — for hub “Legacy” sections.
 * Heuristic only; not written back onto entries.
 */
export function isLegacyMoment(
  entry: BaseEntry,
  nowYear = new Date().getFullYear(),
): boolean {
  if (entry.status === "archived") return true;
  const age = getAgeYears(entry, nowYear);
  if (age == null) return false;
  return age >= 8 && entry.trendDirection === "declining";
}
