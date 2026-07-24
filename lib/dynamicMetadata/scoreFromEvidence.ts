/**
 * Centralized dynamic scoring methodology — same rules for every article.
 *
 * No hardcoded article-specific numbers. Scores are derived only from
 * DynamicSignalObservation values collected by providers.
 */

import type {
  DynamicCurrentStatus,
  DynamicMetadata,
  Scores,
} from "@/types";
import type { DynamicSignalBundle, DynamicSignalKind } from "./providers/types";
import type { DynamicScoreKey } from "./fieldSplit";

export const DYNAMIC_SCORING_METHODOLOGY = {
  version: "1.0.0",
  relevance: {
    inputs: [
      "search-interest",
      "discussion-volume",
      "recent-uploads",
      "recent-articles",
      "platform-activity",
      "editorial-trend",
      "outdatedness (inverse)",
    ],
    rule: "Weighted mean of available current-attention signals; subtract outdatedness pressure. Unknown if no attention signals after exhaust.",
  },
  brainrot: {
    inputs: [
      "absurdity",
      "remix-activity",
      "gen-cohort-adoption",
      "platform-activity",
    ],
    rule: "Weighted mean of absurdity / remix / cohort signals. Unknown if none present.",
  },
  cringe: {
    inputs: ["mockery-signal", "outdatedness", "remix-activity (ironic)"],
    rule: "Blend of mockery + outdatedness; mild remix irony boost. Unknown if none present.",
  },
  popularity: {
    inputs: [
      "search-interest",
      "discussion-volume",
      "platform-activity",
      "editorial-trend",
    ],
    rule: "Same family as relevance without outdatedness penalty.",
  },
} as const;

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function avg(
  values: number[],
): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function valuesFor(
  bundle: DynamicSignalBundle,
  kinds: DynamicSignalKind[],
): number[] {
  const set = new Set(kinds);
  return bundle.observations
    .filter((o) => set.has(o.kind) && o.value != null)
    .map((o) => o.value as number);
}

function scoreRelevance(bundle: DynamicSignalBundle): number | "unknown" {
  const positive = avg(
    valuesFor(bundle, [
      "search-interest",
      "discussion-volume",
      "recent-uploads",
      "recent-articles",
      "platform-activity",
      "editorial-trend",
    ]),
  );
  const outdated = avg(valuesFor(bundle, ["outdatedness"]));

  if (positive == null && outdated == null) return "unknown";

  let score = positive ?? 45;
  if (outdated != null) {
    // High outdatedness pulls current relevance down.
    score = score * (1 - outdated / 200) - outdated * 0.15;
  }
  return clamp(score);
}

function scoreBrainrot(bundle: DynamicSignalBundle): number | "unknown" {
  const v = avg(
    valuesFor(bundle, [
      "absurdity",
      "remix-activity",
      "gen-cohort-adoption",
      "platform-activity",
    ]),
  );
  return v == null ? "unknown" : clamp(v);
}

function scoreCringe(bundle: DynamicSignalBundle): number | "unknown" {
  const mockery = avg(valuesFor(bundle, ["mockery-signal"]));
  const outdated = avg(valuesFor(bundle, ["outdatedness"]));
  const remix = avg(valuesFor(bundle, ["remix-activity"]));

  if (mockery == null && outdated == null && remix == null) return "unknown";

  const parts: number[] = [];
  if (mockery != null) parts.push(mockery);
  if (outdated != null) parts.push(outdated * 0.7);
  if (remix != null) parts.push(remix * 0.35);
  return clamp(avg(parts) ?? 0);
}

function scorePopularity(bundle: DynamicSignalBundle): number | "unknown" {
  const v = avg(
    valuesFor(bundle, [
      "search-interest",
      "discussion-volume",
      "platform-activity",
      "editorial-trend",
    ]),
  );
  return v == null ? "unknown" : clamp(v);
}

function deriveStatus(
  relevance: number | "unknown",
  bundle: DynamicSignalBundle,
  ageYears: number | null,
): DynamicCurrentStatus {
  if (relevance === "unknown") return "unknown";

  const trendObs = bundle.observations.find(
    (o) => o.kind === "editorial-trend" && o.value != null,
  );
  const rising = (trendObs?.value ?? 0) >= 80;
  const outdated = avg(valuesFor(bundle, ["outdatedness"])) ?? 0;

  if (rising && ageYears != null && ageYears >= 8) return "resurfacing";
  if (relevance >= 85) return "highly-active";
  if (relevance >= 60) return "current";
  if (ageYears != null && ageYears >= 18 && outdated >= 70) return "historical";
  if (ageYears != null && ageYears >= 12 && relevance < 55) return "classic";
  if (relevance < 50) return "occasionally-referenced";
  return "current";
}

function deriveTrendDirection(
  status: DynamicCurrentStatus,
  relevance: number | "unknown",
): "rising" | "stable" | "declining" | "new" {
  if (status === "resurfacing" || status === "highly-active") return "rising";
  if (
    status === "historical" ||
    status === "classic" ||
    status === "occasionally-referenced"
  ) {
    return "declining";
  }
  if (relevance !== "unknown" && relevance >= 75) return "stable";
  if (relevance !== "unknown" && relevance < 45) return "declining";
  return "stable";
}

function detectRecentRevival(
  bundle: DynamicSignalBundle,
  ageYears: number | null,
): boolean | "unknown" {
  const rising = bundle.observations.some(
    (o) => o.kind === "editorial-trend" && (o.value ?? 0) >= 80,
  );
  const search = avg(valuesFor(bundle, ["search-interest", "discussion-volume"]));
  if (ageYears == null) {
    return rising ? true : "unknown";
  }
  if (ageYears >= 8 && (rising || (search != null && search >= 70))) return true;
  if (ageYears < 5) return false;
  if (search == null && !rising) return "unknown";
  return false;
}

function activePlatformsFromSignals(
  bundle: DynamicSignalBundle,
  tags: string[],
): string[] {
  const platforms = new Set<string>();
  for (const tag of tags) {
    const t = tag.toLowerCase();
    if (t.includes("tiktok")) platforms.add("tiktok");
    if (t.includes("youtube")) platforms.add("youtube");
    if (t.includes("reddit")) platforms.add("reddit");
    if (t.includes("twitter") || t === "x") platforms.add("x");
    if (t.includes("instagram")) platforms.add("instagram");
    if (t.includes("twitch")) platforms.add("twitch");
    if (t.includes("discord")) platforms.add("discord");
  }
  const activity = avg(valuesFor(bundle, ["platform-activity"]));
  if (activity != null && activity >= 50 && platforms.size === 0) {
    platforms.add("web");
  }
  return [...platforms];
}

export interface DynamicScoreSuggestion {
  relevance: number | "unknown";
  cringe: number | "unknown";
  brainrot: number | "unknown";
  popularity: number | "unknown";
  currentStatus: DynamicCurrentStatus;
  trendDirection: "rising" | "stable" | "declining" | "new";
  recentRevival: boolean | "unknown";
  activePlatforms: string[];
  evidenceNotes: string[];
  providersUsed: string[];
  usedCatalogFallback: boolean;
  methodologyVersion: string;
}

/**
 * Map signal bundle → dynamic scores using the documented methodology.
 * Never invents sources; returns Unknown when required signal families are empty.
 */
export function scoreDynamicMetadata(
  bundle: DynamicSignalBundle,
  opts?: { ageYears?: number | null; tags?: string[] },
): DynamicScoreSuggestion {
  const relevance = scoreRelevance(bundle);
  const cringe = scoreCringe(bundle);
  const brainrot = scoreBrainrot(bundle);
  const popularity = scorePopularity(bundle);
  const ageYears = opts?.ageYears ?? null;
  const currentStatus = deriveStatus(relevance, bundle, ageYears);
  const trendDirection = deriveTrendDirection(currentStatus, relevance);
  const recentRevival = detectRecentRevival(bundle, ageYears);
  const activePlatforms = activePlatformsFromSignals(
    bundle,
    opts?.tags ?? [],
  );

  const liveMeasured = bundle.observations.some(
    (o) =>
      o.value != null &&
      o.providerId !== "catalog-evidence" &&
      o.providerId !== "authority-sources",
  );
  const usedCatalogFallback = !liveMeasured && bundle.hasMeasuredData;

  const evidenceNotes = bundle.observations
    .filter((o) => o.note)
    .map((o) => `[${o.providerId}/${o.kind}] ${o.note}`)
    .slice(0, 24);

  if (!bundle.hasMeasuredData) {
    evidenceNotes.unshift(
      "All providers exhausted without measurable signals — prefer Unknown over guessing.",
    );
  }

  return {
    relevance,
    cringe,
    brainrot,
    popularity,
    currentStatus,
    trendDirection,
    recentRevival,
    activePlatforms,
    evidenceNotes,
    providersUsed: [...new Set(bundle.providersAttempted)],
    usedCatalogFallback,
    methodologyVersion: DYNAMIC_SCORING_METHODOLOGY.version,
  };
}

/**
 * Apply dynamic suggestion onto public Scores.
 * Unknown → keep previous numeric score (do not invent).
 * Influence is never changed here.
 */
export function suggestScoresFromSignals(
  current: Scores,
  suggestion: DynamicScoreSuggestion,
): Scores {
  const next = { ...current };
  const keys: DynamicScoreKey[] = ["relevance", "cringe", "brainrot"];
  for (const key of keys) {
    const v = suggestion[key];
    if (typeof v === "number") next[key] = v;
  }
  return next;
}

export function toDynamicMetadata(
  suggestion: DynamicScoreSuggestion,
  lastReviewed: string,
): DynamicMetadata {
  return {
    lastReviewed,
    currentStatus: suggestion.currentStatus,
    activePlatforms: suggestion.activePlatforms,
    popularity: suggestion.popularity,
    recentRevival: suggestion.recentRevival,
    evidenceNotes: suggestion.evidenceNotes,
    providersUsed: suggestion.providersUsed,
    usedCatalogFallback: suggestion.usedCatalogFallback,
  };
}
