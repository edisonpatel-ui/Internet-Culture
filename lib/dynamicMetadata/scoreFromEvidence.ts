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
import { isLiveEvidenceProvider } from "./providers/liveIds";

export const DYNAMIC_SCORING_METHODOLOGY = {
  version: "2.0.0",
  relevance: {
    question:
      "Would the average internet user—especially a teenager or young adult—still naturally recognize, reference, discuss, search for, or encounter this today?",
    inputs: [
      "LIVE search-interest",
      "LIVE discussion-volume",
      "LIVE recent-uploads",
      "LIVE recent-articles",
      "LIVE platform-activity",
      "LIVE editorial-trend (growth/decline)",
    ],
    rule:
      "Average of live-provider attention signals only. Catalog/age heuristics never set Current Relevance. Influence ignored. Unknown if no live attention evidence after exhaust.",
  },
  trending: {
    question: "Is this rising in recent discussion relative to the catalog right now?",
    inputs: [
      "LIVE search-interest",
      "LIVE discussion-volume",
      "LIVE recent-uploads",
      "LIVE recent-articles",
      "LIVE platform-activity",
      "LIVE editorial-trend",
    ],
    rule:
      "Live recent-attention only, with extra weight on editorial-trend / uploads / news. Historical popularity and stored relevance must not dominate. Unknown without live evidence.",
  },
  brainrot: {
    inputs: [
      "absurdity",
      "remix-activity",
      "gen-cohort-adoption",
      "platform-activity",
    ],
    rule: "Weighted mean; catalog character cues allowed when live silent.",
  },
  cringe: {
    inputs: ["mockery-signal", "outdatedness", "remix-activity (ironic)"],
    rule: "Blend of mockery + outdatedness; mild remix irony boost.",
  },
  popularity: {
    inputs: [
      "LIVE search-interest",
      "LIVE discussion-volume",
      "LIVE platform-activity",
      "LIVE editorial-trend",
    ],
    rule: "Live attention family only.",
  },
} as const;

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function avg(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function valuesFor(
  bundle: DynamicSignalBundle,
  kinds: DynamicSignalKind[],
  opts?: { liveOnly?: boolean },
): number[] {
  const set = new Set(kinds);
  return bundle.observations
    .filter((o) => {
      if (!set.has(o.kind) || o.value == null) return false;
      if (opts?.liveOnly && !isLiveEvidenceProvider(o.providerId)) return false;
      return true;
    })
    .map((o) => o.value as number);
}

const ATTENTION_KINDS: DynamicSignalKind[] = [
  "search-interest",
  "discussion-volume",
  "recent-uploads",
  "recent-articles",
  "platform-activity",
  "editorial-trend",
];

/**
 * Current Relevance — live evidence only. Influence / age heuristics ignored.
 */
function scoreRelevance(bundle: DynamicSignalBundle): number | "unknown" {
  const positive = avg(valuesFor(bundle, ATTENTION_KINDS, { liveOnly: true }));
  if (positive == null) return "unknown";
  return clamp(positive);
}

/**
 * Trending Score — live recent attention; weight growth + uploads + news higher.
 */
function scoreTrending(bundle: DynamicSignalBundle): number | "unknown" {
  const base = valuesFor(
    bundle,
    ["search-interest", "discussion-volume", "platform-activity"],
    { liveOnly: true },
  );
  const growth = valuesFor(bundle, ["editorial-trend"], { liveOnly: true });
  const fresh = valuesFor(
    bundle,
    ["recent-uploads", "recent-articles"],
    { liveOnly: true },
  );

  const parts: number[] = [];
  const b = avg(base);
  const g = avg(growth);
  const f = avg(fresh);
  if (b != null) parts.push(b);
  if (g != null) parts.push(g);
  if (f != null) {
    parts.push(f);
    parts.push(f); // extra weight on fresh content
  }

  if (parts.length === 0) return "unknown";
  return clamp(avg(parts) ?? 0);
}

function scoreBrainrot(bundle: DynamicSignalBundle): number | "unknown" {
  const live = avg(
    valuesFor(
      bundle,
      ["absurdity", "remix-activity", "gen-cohort-adoption", "platform-activity"],
      { liveOnly: true },
    ),
  );
  if (live != null) return clamp(live);
  const any = avg(
    valuesFor(bundle, [
      "absurdity",
      "remix-activity",
      "gen-cohort-adoption",
      "platform-activity",
    ]),
  );
  return any == null ? "unknown" : clamp(any);
}

function scoreCringe(bundle: DynamicSignalBundle): number | "unknown" {
  const mockery = avg(valuesFor(bundle, ["mockery-signal"]));
  const outdated = avg(valuesFor(bundle, ["outdatedness"], { liveOnly: true }));
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
    valuesFor(
      bundle,
      [
        "search-interest",
        "discussion-volume",
        "platform-activity",
        "editorial-trend",
      ],
      { liveOnly: true },
    ),
  );
  return v == null ? "unknown" : clamp(v);
}

function deriveStatus(
  relevance: number | "unknown",
  bundle: DynamicSignalBundle,
  ageYears: number | null,
): DynamicCurrentStatus {
  if (relevance === "unknown") return "unknown";

  const trend = avg(
    valuesFor(bundle, ["editorial-trend"], { liveOnly: true }),
  );
  const rising = (trend ?? 0) >= 75;

  if (rising && ageYears != null && ageYears >= 8) return "resurfacing";
  if (relevance >= 85) return "highly-active";
  if (relevance >= 60) return "current";
  if (ageYears != null && ageYears >= 18 && relevance < 40) return "historical";
  if (ageYears != null && ageYears >= 12 && relevance < 55) return "classic";
  if (relevance < 50) return "occasionally-referenced";
  return "current";
}

function deriveTrendDirection(
  status: DynamicCurrentStatus,
  relevance: number | "unknown",
  bundle: DynamicSignalBundle,
): "rising" | "stable" | "declining" | "new" {
  const trend = avg(
    valuesFor(bundle, ["editorial-trend"], { liveOnly: true }),
  );
  if (trend != null && trend >= 75) return "rising";
  if (trend != null && trend <= 35) return "declining";
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
    (o) =>
      isLiveEvidenceProvider(o.providerId) &&
      o.kind === "editorial-trend" &&
      (o.value ?? 0) >= 80,
  );
  const search = avg(
    valuesFor(bundle, ["search-interest", "discussion-volume"], {
      liveOnly: true,
    }),
  );
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
  for (const o of bundle.observations) {
    if (o.value == null || o.value < 20) continue;
    if (!isLiveEvidenceProvider(o.providerId)) continue;
    if (o.providerId === "reddit") platforms.add("reddit");
    if (o.providerId === "youtube" || o.providerId === "creator-pages") {
      platforms.add("youtube");
    }
    if (o.providerId === "news") platforms.add("news");
    if (o.providerId === "wikipedia") platforms.add("wikipedia");
  }
  const activity = avg(
    valuesFor(bundle, ["platform-activity"], { liveOnly: true }),
  );
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
  trendingScore: number | "unknown";
  currentStatus: DynamicCurrentStatus;
  trendDirection: "rising" | "stable" | "declining" | "new";
  recentRevival: boolean | "unknown";
  activePlatforms: string[];
  popularityNotes?: string;
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
  const trendingScore = scoreTrending(bundle);
  const ageYears = opts?.ageYears ?? null;
  const currentStatus = deriveStatus(relevance, bundle, ageYears);
  const trendDirection = deriveTrendDirection(
    currentStatus,
    relevance,
    bundle,
  );
  const recentRevival = detectRecentRevival(bundle, ageYears);
  const activePlatforms = activePlatformsFromSignals(
    bundle,
    opts?.tags ?? [],
  );

  const liveMeasured =
    bundle.hasLiveEvidence === true ||
    bundle.observations.some(
      (o) => o.value != null && isLiveEvidenceProvider(o.providerId),
    );
  const usedCatalogFallback = !liveMeasured;

  const evidenceNotes = bundle.observations
    .filter((o) => o.note)
    .map((o) => `[${o.providerId}/${o.kind}] ${o.note}`)
    .slice(0, 32);

  if (!liveMeasured) {
    evidenceNotes.unshift(
      "No live evidence after provider exhaust — Current Relevance/Trending stay Unknown (not guessed from age heuristics).",
    );
  }

  const popularityNotes = buildPopularityNotes({
    relevance,
    trendingScore,
    currentStatus,
    recentRevival,
    usedCatalogFallback,
  });

  return {
    relevance,
    cringe,
    brainrot,
    popularity,
    trendingScore,
    currentStatus,
    trendDirection,
    recentRevival,
    activePlatforms,
    popularityNotes,
    evidenceNotes,
    providersUsed: [...new Set(bundle.providersAttempted)],
    usedCatalogFallback,
    methodologyVersion: DYNAMIC_SCORING_METHODOLOGY.version,
  };
}

function buildPopularityNotes(input: {
  relevance: number | "unknown";
  trendingScore: number | "unknown";
  currentStatus: DynamicCurrentStatus;
  recentRevival: boolean | "unknown";
  usedCatalogFallback: boolean;
}): string {
  const parts: string[] = [];
  parts.push(`Status: ${input.currentStatus}`);
  if (input.relevance !== "unknown") {
    parts.push(`Relevance ${input.relevance} (today's recognition, not influence)`);
  } else {
    parts.push("Relevance Unknown — stale score cleared; excluded from Trending");
  }
  if (input.trendingScore !== "unknown") {
    parts.push(`Trending ${input.trendingScore} (recent attention)`);
  } else {
    parts.push("Trending Unknown — excluded from homepage Trending");
  }
  if (input.recentRevival === true) parts.push("Recent revival signal");
  if (input.usedCatalogFallback) {
    parts.push("No live evidence — relevance/trending not guessed");
  }
  return parts.join(" · ");
}

/**
 * Apply dynamic suggestion onto public Scores.
 *
 * Current Relevance Unknown → clear stale stored relevance (set 0).
 * Do NOT preserve an old high relevance when live evidence is insufficient.
 * Cringe / brainrot Unknown → keep previous (character cues may still apply).
 * Influence is never changed here.
 */
export function suggestScoresFromSignals(
  current: Scores,
  suggestion: DynamicScoreSuggestion,
): Scores {
  const next = { ...current };

  if (suggestion.relevance === "unknown") {
    next.relevance = 0;
  } else if (typeof suggestion.relevance === "number") {
    next.relevance = suggestion.relevance;
  }

  for (const key of ["cringe", "brainrot"] as const) {
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
    currentRelevance: suggestion.relevance,
    currentStatus: suggestion.currentStatus,
    activePlatforms: suggestion.activePlatforms,
    popularity: suggestion.popularity,
    trendingScore: suggestion.trendingScore,
    recentRevival: suggestion.recentRevival,
    popularityNotes: suggestion.popularityNotes,
    evidenceNotes: suggestion.evidenceNotes,
    providersUsed: suggestion.providersUsed,
    usedCatalogFallback: suggestion.usedCatalogFallback,
  };
}
