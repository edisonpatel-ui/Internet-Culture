/**
 * Centralized dynamic scoring methodology — same rules for every article.
 *
 * Current Relevance = how much NEW content is being created recently (≈30–60d).
 * Influence / Brainrot / Cringe are independent — never derived from each other.
 * Historical authority / encyclopedia page volume must not drive Current Relevance.
 */

import type {
  DynamicCurrentStatus,
  DynamicMetadata,
  Scores,
} from "@/types";
import type { DynamicSignalBundle, DynamicSignalKind } from "./providers/types";
import { isLiveEvidenceProvider } from "./providers/liveIds";

export const DYNAMIC_SCORING_METHODOLOGY = {
  version: "5.1.0",
  relevance: {
    label: "Current Popularity",
    question: "How much are people posting about this RIGHT NOW?",
    window: "last 30–60 days (heavily weighted)",
    inputs: [
      "LIVE recent-uploads (YouTube / Shorts / creator pages)",
      "LIVE discussion-volume (Reddit)",
      "LIVE recent-articles (Google News)",
      "LIVE Google Trends spikes (on-list)",
      "LIVE Know Your Meme recent edits",
      "LIVE Wikipedia pageview acceleration (weak secondary)",
      "LIVE short-form / X activity when providers are available",
    ],
    rule:
      "RIGHT NOW posting velocity — not historical fame. Historical authority is a weak fallback only. Scores may rise sharply when recent evidence is strong, and fall when creation slows. Influence / Brainrot ignored.",
    bands: {
      "95-100": "Flood of new posts/uploads right now",
      "80-94": "Very high recent posting velocity",
      "60-79": "Steady ongoing creation this month",
      "40-59": "Occasional new posts",
      "20-39": "Sparse recent creation",
      "0-19": "Little to no new posting recently",
    },
  },
  influence: {
    question: "How much did this permanently shape internet culture?",
    rule: "Never reduced by age or by a dynamic refresh. Dynamic pass leaves Influence unchanged.",
  },
  brainrot: {
    question:
      "How absurd, chaotic, overstimulating, or representative of modern internet brainrot culture is this?",
    inputs: ["absurdity", "gen-cohort-adoption", "remix-activity"],
    rule:
      "Cultural identity — not Current Relevance or popularity. Almost never decreases solely because time passed.",
  },
  cringe: {
    question:
      "How socially embarrassing, awkward, or widely perceived as cringe is this today?",
    inputs: ["mockery-signal", "outdatedness (perceived, not chronological age)"],
    rule: "Independent of relevance, influence, and brainrot.",
  },
  trending: {
    question: "Is recent attention rising relative to now?",
    inputs: [
      "LIVE editorial-trend",
      "LIVE recent-uploads",
      "LIVE recent-articles",
      "LIVE discussion-volume",
    ],
    rule: "Short-window momentum only — separate from Current Relevance.",
  },
} as const;

export interface ScoreReasons {
  relevance: string;
  influence: string;
  brainrot: string;
  cringe: string;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function avg(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function weightedAvg(parts: Array<{ v: number; w: number }>): number | null {
  if (parts.length === 0) return null;
  const tw = parts.reduce((s, p) => s + p.w, 0);
  if (tw <= 0) return null;
  return parts.reduce((s, p) => s + p.v * p.w, 0) / tw;
}

function valuesFor(
  bundle: DynamicSignalBundle,
  kinds: DynamicSignalKind[],
  opts?: {
    liveOnly?: boolean;
    excludeProviders?: string[];
    includeProviders?: string[];
  },
): number[] {
  const set = new Set(kinds);
  const excluded = new Set(opts?.excludeProviders ?? []);
  const included = opts?.includeProviders
    ? new Set(opts.includeProviders)
    : null;
  return bundle.observations
    .filter((o) => {
      if (!set.has(o.kind) || o.value == null) return false;
      if (opts?.liveOnly && !isLiveEvidenceProvider(o.providerId)) return false;
      if (excluded.has(o.providerId)) return false;
      if (included && !included.has(o.providerId)) return false;
      return true;
    })
    .map((o) => o.value as number);
}

export interface RelevanceActivitySignal {
  providerId: string;
  kind: string;
  value: number;
  note?: string;
  role: "primary" | "secondary";
}

/**
 * Recent-creation signals that feed Current Relevance (for editors / calibration).
 * Excludes Wikipedia pageview volume and other historical-authority proxies.
 */
export function listRelevanceActivitySignals(
  bundle: DynamicSignalBundle,
): RelevanceActivitySignal[] {
  const out: RelevanceActivitySignal[] = [];
  for (const o of bundle.observations) {
    if (!isLiveEvidenceProvider(o.providerId) || o.value == null) continue;

    if (
      o.kind === "recent-uploads" ||
      o.kind === "recent-articles" ||
      o.kind === "discussion-volume"
    ) {
      out.push({
        providerId: o.providerId,
        kind: o.kind,
        value: o.value,
        note: o.note,
        role: "primary",
      });
      continue;
    }

    // Google Trends on-list only (absence emits null search-interest).
    if (
      o.providerId === "google-trends" &&
      o.kind === "search-interest" &&
      o.value >= 40
    ) {
      out.push({
        providerId: o.providerId,
        kind: o.kind,
        value: o.value,
        note: o.note,
        role: "secondary",
      });
      continue;
    }

    // Meme-site recent edits — not “entry exists”.
    if (
      o.providerId === "know-your-meme" &&
      o.kind === "platform-activity" &&
      o.value >= 50
    ) {
      out.push({
        providerId: o.providerId,
        kind: o.kind,
        value: o.value,
        note: o.note,
        role: "secondary",
      });
      continue;
    }

    // Rising short-window attention only — never Wikipedia pageview volume.
    if (
      o.providerId === "wikipedia" &&
      o.kind === "editorial-trend" &&
      o.value >= 65
    ) {
      out.push({
        providerId: o.providerId,
        kind: o.kind,
        value: o.value,
        note: o.note,
        role: "secondary",
      });
    }
  }
  return out;
}

function creationActivityHitCount(signals: RelevanceActivitySignal[]): number {
  return new Set(
    signals.filter((s) => s.value >= 35).map((s) => s.providerId),
  ).size;
}

/**
 * Current Relevance — RIGHT NOW posting velocity (~30–60d).
 * Not historical fame. Wikipedia pageview totals / authority docs ignored.
 * Acceleration (WoW) is a weak secondary only.
 */
function scoreRelevance(bundle: DynamicSignalBundle): number | "unknown" {
  const uploads = avg(
    valuesFor(bundle, ["recent-uploads"], { liveOnly: true }),
  );
  const articles = avg(
    valuesFor(bundle, ["recent-articles"], { liveOnly: true }),
  );
  const discussion = avg(
    valuesFor(bundle, ["discussion-volume"], { liveOnly: true }),
  );

  const trendsOnList = avg(
    valuesFor(bundle, ["search-interest"], {
      liveOnly: true,
      includeProviders: ["google-trends"],
    }),
  );
  const kymFresh = avg(
    valuesFor(bundle, ["platform-activity"], {
      liveOnly: true,
      includeProviders: ["know-your-meme"],
    }),
  );
  const wikiRising = avg(
    valuesFor(bundle, ["editorial-trend"], {
      liveOnly: true,
      includeProviders: ["wikipedia"],
    }),
  );

  // Emphasize posting velocity — mid-band recent activity maps to “steady”.
  const stretch = (v: number) => {
    if (v <= 0) return 0;
    return clamp(Math.round(v * 1.18 + 6));
  };

  const primary: Array<{ v: number; w: number }> = [];
  // Uploads + discussion = strongest “posting right now” evidence.
  if (uploads != null) primary.push({ v: stretch(uploads), w: 1.7 });
  if (discussion != null) primary.push({ v: stretch(discussion), w: 1.65 });
  if (articles != null) primary.push({ v: stretch(articles), w: 1.35 });

  const secondary: Array<{ v: number; w: number }> = [];
  if (trendsOnList != null && trendsOnList >= 40) {
    secondary.push({ v: trendsOnList, w: 1.25 });
  }
  if (kymFresh != null && kymFresh >= 50) {
    secondary.push({ v: kymFresh, w: 0.65 });
  }
  // Pageview *acceleration* only — never raw historical volume.
  if (wikiRising != null && wikiRising >= 60) {
    secondary.push({ v: Math.min(wikiRising, 85), w: 0.55 });
  }

  if (primary.length === 0 && secondary.length === 0) return "unknown";

  let score: number;
  if (primary.length > 0) {
    const primaryScore = weightedAvg(primary) ?? 0;
    const secondaryScore = weightedAvg(secondary);
    if (secondaryScore == null) {
      score = primaryScore;
    } else if (primaryScore < 28 && secondaryScore > primaryScore) {
      // Thin primary + strong acceleration → let RIGHT NOW momentum lift.
      score = primaryScore * 0.4 + Math.min(secondaryScore, 78) * 0.6;
    } else {
      // Strong creation can rise sharply; secondary fine-tunes.
      score = primaryScore * 0.82 + secondaryScore * 0.18;
    }
  } else {
    // Acceleration-only fallback — never claims “dominating” from wiki alone.
    score = Math.min(weightedAvg(secondary) ?? 0, 52);
  }

  const signals = listRelevanceActivitySignals(bundle);
  const hits = creationActivityHitCount(signals);
  const primaryMax = primary.length
    ? Math.max(...primary.map((p) => p.v))
    : null;

  // Multi-surface posting velocity → allow significant rises.
  if (hits >= 3 && (primaryMax ?? 0) >= 40) score = Math.max(score, 76);
  else if (hits >= 2 && (primaryMax ?? 0) >= 45) score = Math.max(score, 70);
  if (primaryMax != null && primaryMax >= 50) score = Math.max(score, 64);
  if (primaryMax != null && primaryMax >= 65) score = Math.max(score, 78);
  if (primaryMax != null && primaryMax >= 80) score = Math.max(score, 88);
  if (primaryMax != null && primaryMax >= 90) score = Math.max(score, 94);

  // Strong news + accelerating attention (active evergreen / viral clips).
  if (
    articles != null &&
    articles >= 55 &&
    wikiRising != null &&
    wikiRising >= 70
  ) {
    score = Math.max(score, clamp(articles + 18));
  }

  return clamp(score);
}

/**
 * Trending — short-window momentum (may use editorial-trend).
 * Independent of Current Relevance.
 */
function scoreTrending(bundle: DynamicSignalBundle): number | "unknown" {
  const growthClean = avg(
    bundle.observations
      .filter(
        (o) =>
          isLiveEvidenceProvider(o.providerId) &&
          o.kind === "editorial-trend" &&
          o.value != null &&
          // Ignore soft “absence from trending list” filler.
          !(o.providerId === "google-trends" && o.value <= 30),
      )
      .map((o) => o.value as number),
  );
  const fresh = avg(
    valuesFor(
      bundle,
      ["recent-uploads", "recent-articles", "discussion-volume"],
      { liveOnly: true },
    ),
  );
  const trendsOnList = avg(
    valuesFor(bundle, ["search-interest"], {
      liveOnly: true,
      includeProviders: ["google-trends"],
    }),
  );

  const parts: Array<{ v: number; w: number }> = [];
  if (growthClean != null) parts.push({ v: growthClean, w: 1.35 });
  if (fresh != null) parts.push({ v: fresh, w: 1.35 });
  if (trendsOnList != null) parts.push({ v: trendsOnList, w: 1.1 });

  if (parts.length === 0) return "unknown";
  return clamp(weightedAvg(parts) ?? 0);
}

/**
 * Brainrot — cultural identity of modern brainrot, not popularity.
 * Absurdity / cohort / remix / short-form saturation — never Current Relevance.
 */
function scoreBrainrot(bundle: DynamicSignalBundle): number | "unknown" {
  const absurdity = avg(valuesFor(bundle, ["absurdity"]));
  const cohort = avg(valuesFor(bundle, ["gen-cohort-adoption"]));
  const remix = avg(valuesFor(bundle, ["remix-activity"]));

  const parts: Array<{ v: number; w: number }> = [];
  if (absurdity != null) parts.push({ v: absurdity, w: 1.85 });
  if (cohort != null) parts.push({ v: cohort, w: 1.35 });
  if (remix != null) parts.push({ v: remix, w: 0.55 });

  if (parts.length === 0) return "unknown";

  let score = weightedAvg(parts) ?? 0;

  // Defining brainrot icons stay at the ceiling of their character cues.
  if (absurdity != null && absurdity >= 90) {
    score = Math.max(score, absurdity);
  } else if (absurdity != null && absurdity >= 85) {
    score = Math.max(score, absurdity - 1);
  }
  // High absurdity + Gen Alpha + remix ⇒ top-tier brainrot identity.
  if (
    absurdity != null &&
    absurdity >= 94 &&
    cohort != null &&
    cohort >= 85 &&
    remix != null &&
    remix >= 70
  ) {
    score = Math.max(score, 98);
  }

  return clamp(score);
}

/**
 * Cringe — social awkwardness today; independent of other scores.
 * "outdatedness" means perceived as dated/cringe — not chronological age.
 */
function scoreCringe(bundle: DynamicSignalBundle): number | "unknown" {
  const mockery = avg(valuesFor(bundle, ["mockery-signal"]));
  const outdated = avg(valuesFor(bundle, ["outdatedness"]));

  if (mockery == null && outdated == null) return "unknown";

  const parts: Array<{ v: number; w: number }> = [];
  if (mockery != null) parts.push({ v: mockery, w: 1.4 });
  if (outdated != null) parts.push({ v: outdated, w: 0.85 });
  return clamp(weightedAvg(parts) ?? 0);
}

function scorePopularity(bundle: DynamicSignalBundle): number | "unknown" {
  // Popularity tracks recent creation/discussion — not encyclopedia pageviews.
  const v = avg(
    valuesFor(
      bundle,
      ["recent-uploads", "recent-articles", "discussion-volume"],
      { liveOnly: true },
    ),
  );
  return v == null ? "unknown" : clamp(v);
}

function deriveStatus(
  relevance: number | "unknown",
  bundle: DynamicSignalBundle,
): DynamicCurrentStatus {
  if (relevance === "unknown") return "unknown";

  const trend = avg(
    valuesFor(bundle, ["editorial-trend"], { liveOnly: true }),
  );
  const rising = (trend ?? 0) >= 75;

  if (rising && relevance >= 55) return "resurfacing";
  if (relevance >= 85) return "highly-active";
  if (relevance >= 60) return "current";
  if (relevance >= 40) return "occasionally-referenced";
  if (relevance < 25) return "historical";
  return "classic";
}

function deriveTrendDirection(
  status: DynamicCurrentStatus,
  bundle: DynamicSignalBundle,
): "rising" | "stable" | "declining" | "new" {
  const trend = avg(
    valuesFor(bundle, ["editorial-trend"], { liveOnly: true }),
  );
  if (trend != null && trend >= 75) return "rising";
  if (trend != null && trend <= 35) return "declining";
  if (status === "resurfacing" || status === "highly-active") return "rising";
  if (status === "historical") return "declining";
  return "stable";
}

function detectRecentRevival(
  bundle: DynamicSignalBundle,
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
  if (rising) return true;
  if (search == null) return "unknown";
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
  return [...platforms];
}

function bandLabel(score: number): string {
  if (score >= 95) return "dominates new content creation";
  if (score >= 80) return "very high recent creation";
  if (score >= 60) return "steady ongoing creation";
  if (score >= 40) return "occasional new posts";
  if (score >= 20) return "sparse recent creation";
  return "little to no new content recently";
}

function formatActivitySignalSummary(
  signals: RelevanceActivitySignal[],
): string {
  if (signals.length === 0) {
    return "No recent-creation signals available (Wikipedia pageviews / authority docs ignored).";
  }
  return signals
    .map(
      (s) =>
        `${s.providerId}/${s.kind}=${s.value}${s.note ? ` (${s.note})` : ""}`,
    )
    .join("; ");
}

export function buildScoreReasons(input: {
  before: Scores;
  relevance: number | "unknown";
  brainrot: number | "unknown";
  cringe: number | "unknown";
  usedCatalogFallback: boolean;
  liveHits: number;
  activitySignals: RelevanceActivitySignal[];
}): ScoreReasons {
  const {
    before,
    relevance,
    brainrot,
    cringe,
    usedCatalogFallback,
    liveHits,
    activitySignals,
  } = input;

  const signalSummary = formatActivitySignalSummary(activitySignals);

  let relevanceReason: string;
  if (relevance === "unknown" || usedCatalogFallback) {
    relevanceReason = `No confident recent-creation evidence for Current Relevance. ${signalSummary}`;
  } else if (relevance === before.relevance) {
    relevanceReason = `Recent creation activity still looks similar (${bandLabel(relevance)}). Signals: ${signalSummary}`;
  } else if (relevance > before.relevance && relevance >= 60) {
    relevanceReason = `Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: ${signalSummary}`;
  } else if (relevance > before.relevance) {
    relevanceReason = `Recent creation signals rose modestly. Signals: ${signalSummary}`;
  } else if (relevance >= 60) {
    relevanceReason = `Creation volume is not peaking, but new content is still being produced regularly. Signals: ${signalSummary}`;
  } else if (liveHits >= 1 || (typeof relevance === "number" && relevance >= 40)) {
    relevanceReason = `Recent creation looks limited versus active internet topics. Signals: ${signalSummary}`;
  } else {
    relevanceReason = `Little recent creation activity detected. Signals: ${signalSummary}`;
  }

  const influenceReason =
    "Permanent cultural impact is not changed by a dynamic refresh.";

  let brainrotReason: string;
  if (brainrot === "unknown") {
    brainrotReason =
      "Not enough character signals to reassess brainrot independently.";
  } else if (brainrot === before.brainrot) {
    brainrotReason =
      "Absurdity / cohort character cues still match the prior brainrot reading.";
  } else if (brainrot > before.brainrot) {
    brainrotReason =
      "Character signals still mark this as strongly representative of chaotic internet brainrot culture.";
  } else {
    brainrotReason =
      "Character cues suggest slightly less chaotic brainrot intensity — not because the topic aged.";
  }

  let cringeReason: string;
  if (cringe === "unknown") {
    cringeReason =
      "Not enough mockery / social-awkwardness signals to reassess cringe.";
  } else if (cringe === before.cringe) {
    cringeReason =
      "Perceived awkwardness / mockery signals remain similar today.";
  } else if (cringe > before.cringe) {
    cringeReason =
      "Mockery or dated-perception signals suggest higher social cringe today.";
  } else {
    cringeReason =
      "Mockery signals suggest less widespread cringe perception today.";
  }

  return {
    relevance: relevanceReason,
    influence: influenceReason,
    brainrot: brainrotReason,
    cringe: cringeReason,
  };
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
  scoreReasons: ScoreReasons;
  /** Recent-creation signals that drove Current Relevance. */
  relevanceActivitySignals: RelevanceActivitySignal[];
}

/**
 * Map signal bundle → dynamic scores using the documented methodology.
 */
export function scoreDynamicMetadata(
  bundle: DynamicSignalBundle,
  opts?: {
    ageYears?: number | null;
    tags?: string[];
    previousScores?: Scores;
  },
): DynamicScoreSuggestion {
  // ageYears intentionally unused for Current Relevance / Brainrot magnitude.
  void opts?.ageYears;

  const relevanceActivitySignals = listRelevanceActivitySignals(bundle);
  const relevance = scoreRelevance(bundle);
  const cringe = scoreCringe(bundle);
  let brainrot = scoreBrainrot(bundle);
  // Brainrot is cultural identity — independent of Current Relevance; no time decay.
  if (
    typeof brainrot === "number" &&
    opts?.previousScores &&
    typeof opts.previousScores.brainrot === "number"
  ) {
    brainrot = Math.max(opts.previousScores.brainrot, brainrot);
  }
  const popularity = scorePopularity(bundle);
  const trendingScore = scoreTrending(bundle);
  const currentStatus = deriveStatus(relevance, bundle);
  const trendDirection = deriveTrendDirection(currentStatus, bundle);
  const recentRevival = detectRecentRevival(bundle);
  const activePlatforms = activePlatformsFromSignals(
    bundle,
    opts?.tags ?? [],
  );

  // Creation evidence only — Wikipedia pageviews alone do not count.
  const hasCreationEvidence = relevanceActivitySignals.length > 0;
  const usedCatalogFallback =
    relevance === "unknown" || !hasCreationEvidence;

  const evidenceNotes = bundle.observations
    .filter((o) => o.note)
    .map((o) => `[${o.providerId}/${o.kind}] ${o.note}`)
    .slice(0, 32);

  if (usedCatalogFallback) {
    evidenceNotes.unshift(
      "No confident recent-creation evidence — Current Relevance Unknown (Wikipedia/authority volume is not a substitute).",
    );
  }

  const previousScores = opts?.previousScores ?? {
    relevance: 0,
    influence: 0,
    cringe: 0,
    brainrot: 0,
  };

  const scoreReasons = buildScoreReasons({
    before: previousScores,
    relevance,
    brainrot,
    cringe,
    usedCatalogFallback,
    liveHits: creationActivityHitCount(relevanceActivitySignals),
    activitySignals: relevanceActivitySignals,
  });

  const popularityNotes = [
    `Relevance: ${scoreReasons.relevance}`,
    `Influence: ${scoreReasons.influence}`,
    `Brainrot: ${scoreReasons.brainrot}`,
    `Cringe: ${scoreReasons.cringe}`,
  ].join(" ");

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
    scoreReasons,
    relevanceActivitySignals,
  };
}

/**
 * Apply dynamic suggestion onto public Scores.
 * Influence is never changed here.
 * Current Relevance Unknown → clear stale stored relevance (set 0).
 * Cringe / brainrot Unknown → keep previous.
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

  if (typeof suggestion.cringe === "number") {
    next.cringe = suggestion.cringe;
  }
  if (typeof suggestion.brainrot === "number") {
    next.brainrot = suggestion.brainrot;
  }
  // influence intentionally untouched
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
    scoreReasons: suggestion.scoreReasons,
  };
}
