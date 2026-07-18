import type { BaseEntry } from "@/types";
import { getCalibration } from "@/lib/intelligence/scoreCalibration";
import { SCORE_DEFINITIONS } from "@/lib/intelligence/scoreDocs";
import {
  getSourceAuthorityBoost,
  listAuthoritySourceLabels,
} from "@/lib/intelligence/sourceSignals";
import type { CulturalScoreSnapshot } from "@/lib/intelligence/types";

/**
 * Cultural scoring accessors (calibrated).
 *
 * CURRENT RELEVANCE ≠ CULTURAL IMPACT
 * -----------------------------------
 * - relevanceScore     → attention / discussion *today*
 * - culturalImpactScore → lasting influence on internet culture
 *
 * Legacy `scores.relevance` on content files is an ambiguous prior that mixed
 * both ideas. Heuristics + SCORE_CALIBRATION decompose it. Article files are
 * not modified.
 *
 * See scoreDocs.ts for evidence lists and change-frequency notes.
 */

type EntryWithFutureScores = BaseEntry & {
  relevanceScore?: number;
  culturalImpactScore?: number;
  popularityScore?: number;
  longevityScore?: number;
  cringeLevel?: number;
};

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function viewsToPopularityBand(views: number): number {
  if (views <= 0) return 0;
  const band = 20 + Math.log10(views + 1) * 10;
  return clamp(band);
}

function extractYear(entry: BaseEntry): number | null {
  for (const value of [entry.historicalDate, entry.dateStarted, entry.addedAt]) {
    if (!value) continue;
    const m = /^(\d{4})/.exec(value);
    if (m) return Number(m[1]);
  }
  // Timeline first-event year (memes)
  const timeline = (
    entry as BaseEntry & { timeline?: { date: string }[] }
  ).timeline;
  if (timeline?.[0]?.date) {
    const m = /(\d{4})/.exec(timeline[0].date);
    if (m) return Number(m[1]);
  }
  return null;
}

export function getEntryYear(entry: BaseEntry): number | null {
  return extractYear(entry);
}

function getAgeYears(entry: BaseEntry): number | null {
  const year = extractYear(entry);
  if (year === null) return null;
  return Math.max(0, new Date().getFullYear() - year);
}

function tagsOf(entry: BaseEntry): string[] {
  return (entry.tags ?? []).map((t) => t.toLowerCase());
}

function isClassicSignal(entry: BaseEntry): boolean {
  const tags = tagsOf(entry);
  if (tags.some((t) => ["classic", "legacy", "historical"].includes(t))) {
    return true;
  }
  const age = getAgeYears(entry);
  return age !== null && age >= 8;
}

function isFlashTrendSignal(entry: BaseEntry): boolean {
  const tags = tagsOf(entry);
  return tags.some((t) =>
    ["gen alpha", "viral", "2024", "2025", "2026"].includes(t),
  );
}

/**
 * Current relevance — how much attention this receives *today*.
 * Does NOT measure historical importance.
 */
export function getRelevanceScore(entry: BaseEntry): number {
  const e = entry as EntryWithFutureScores;
  if (typeof e.relevanceScore === "number") return clamp(e.relevanceScore);

  const calibrated = getCalibration(entry.slug)?.relevanceScore;
  if (typeof calibrated === "number") return clamp(calibrated);

  // Start from legacy prior, then pull toward "current attention"
  let score = entry.scores.relevance;
  const age = getAgeYears(entry);

  switch (entry.trendDirection) {
    case "rising":
      score += 10;
      break;
    case "new":
      score += 12;
      break;
    case "stable":
      break;
    case "declining":
      score -= 14;
      break;
  }

  // Older + declining → historically important ≠ currently relevant
  if (age !== null) {
    if (age >= 10) score -= 22;
    else if (age >= 7) score -= 16;
    else if (age >= 4) score -= 8;
    else if (age <= 1) score += 6;
  }

  if (isClassicSignal(entry) && entry.trendDirection === "declining") {
    score -= 8;
  }

  // Weak catalog-views signal (not Google Trends)
  const viewBand = viewsToPopularityBand(entry.views);
  score = score * 0.85 + viewBand * 0.15;

  return clamp(score);
}

/**
 * Cultural impact — how much this shaped internet culture.
 * Does NOT measure this week's attention.
 */
export function getCulturalImpactScore(entry: BaseEntry): number {
  const e = entry as EntryWithFutureScores;
  if (typeof e.culturalImpactScore === "number") {
    return clamp(e.culturalImpactScore);
  }

  const calibrated = getCalibration(entry.slug)?.culturalImpactScore;
  if (typeof calibrated === "number") return clamp(calibrated);

  if (typeof entry.scores.influence === "number") {
    return clamp(entry.scores.influence);
  }

  // Impact prior: use legacy relevance as importance hint only — never current relevance
  let score = entry.scores.relevance * 0.7;
  const age = getAgeYears(entry);
  const sourceBoost = getSourceAuthorityBoost(entry);

  if (age !== null) {
    if (age >= 10) score += 22;
    else if (age >= 7) score += 16;
    else if (age >= 4) score += 10;
    else if (age <= 1) score -= 6; // too new to claim landmark impact
  }

  if (isClassicSignal(entry)) score += 12;
  if (isFlashTrendSignal(entry) && (age === null || age < 3)) score -= 8;

  // Documented on Wikipedia / KYM → stronger historical footprint
  score += sourceBoost * 0.7;

  // Declining trend often means the peak passed — impact can still be high
  if (entry.trendDirection === "declining" && (age ?? 0) >= 5) {
    score += 6;
  }

  return clamp(score);
}

export function getPopularityScore(entry: BaseEntry): number {
  const e = entry as EntryWithFutureScores;
  if (typeof e.popularityScore === "number") return clamp(e.popularityScore);

  const calibrated = getCalibration(entry.slug)?.popularityScore;
  if (typeof calibrated === "number") return clamp(calibrated);

  if (typeof entry.scores.popularity === "number") {
    return clamp(entry.scores.popularity);
  }
  return viewsToPopularityBand(entry.views);
}

/**
 * Longevity — expected recognition years later.
 * High for legends; lower for temporary viral waves.
 */
export function getLongevityScore(entry: BaseEntry): number {
  const e = entry as EntryWithFutureScores;
  if (typeof e.longevityScore === "number") return clamp(e.longevityScore);

  const calibrated = getCalibration(entry.slug)?.longevityScore;
  if (typeof calibrated === "number") return clamp(calibrated);

  if (typeof entry.scores.longevity === "number") {
    return clamp(entry.scores.longevity);
  }

  // Longevity tracks impact more than current hype — but is not identical
  let score = getCulturalImpactScore(entry) * 0.55;
  const age = getAgeYears(entry);

  if (isClassicSignal(entry)) score += 18;
  if (isFlashTrendSignal(entry)) score -= 14;

  if (age !== null) {
    if (age >= 10) score += 16;
    else if (age >= 5) score += 10;
    else if (age <= 2) score -= 10;
  }

  // Still discussed while old → proven staying power
  if (
    (age ?? 0) >= 5 &&
    (entry.trendDirection === "stable" || entry.trendDirection === "rising")
  ) {
    score += 10;
  }

  // High current relevance alone does not grant longevity
  const current = getRelevanceScore(entry);
  if (current >= 85 && (age === null || age < 3)) {
    score -= 12;
  }

  return clamp(score);
}

export function getCringeLevel(entry: BaseEntry): number {
  const e = entry as EntryWithFutureScores;
  if (typeof e.cringeLevel === "number") return clamp(e.cringeLevel);
  return clamp(entry.scores.cringe);
}

export function getBrainrotScore(entry: BaseEntry): number {
  return clamp(entry.scores.brainrot);
}

export function getCulturalScoreSnapshot(
  entry: BaseEntry,
): CulturalScoreSnapshot {
  const assumptions: string[] = [
    SCORE_DEFINITIONS.relevanceScore.question,
    SCORE_DEFINITIONS.culturalImpactScore.question,
    "Current relevance and cultural impact are computed separately — never blended.",
    "Not live Google Trends / platform analytics; calibration + heuristics until APIs exist.",
  ];

  const calibration = getCalibration(entry.slug);
  if (calibration) {
    assumptions.push(
      calibration.note
        ? `Calibration override: ${calibration.note}`
        : "Calibration override applied for this slug.",
    );
  } else {
    assumptions.push(
      "No slug calibration — derived from trendDirection, age, tags, sources, and legacy scores.relevance prior.",
    );
  }

  const authority = listAuthoritySourceLabels(entry);
  if (authority.length > 0) {
    assumptions.push(`Cited authority sources: ${authority.join(", ")}.`);
  }

  if (SCORE_DEFINITIONS.relevanceScore.changesFrequently) {
    assumptions.push("Current relevance is expected to change more often than impact/longevity.");
  }

  return {
    relevanceScore: getRelevanceScore(entry),
    culturalImpactScore: getCulturalImpactScore(entry),
    popularityScore: getPopularityScore(entry),
    longevityScore: getLongevityScore(entry),
    cringeLevel: getCringeLevel(entry),
    brainrotScore: getBrainrotScore(entry),
    assumptions,
  };
}
