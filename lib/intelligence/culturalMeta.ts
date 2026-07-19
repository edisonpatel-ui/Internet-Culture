/**
 * Cultural intelligence metadata helpers (Phase 7).
 *
 * Resolution order for getCulturalIntelligence(entry):
 * 1. entry.intelligence (optional on the article file)
 * 2. INTELLIGENCE_REGISTRY override by slug
 * 3. Safe derived defaults from existing public fields (tags, category, …)
 *
 * Never writes back onto catalog files.
 * Do not import these into client UI for Phase 7 public features.
 */

import type {
  BaseEntry,
  CulturalAudience,
  CulturalEra,
  CulturalFormatType,
  CulturalImportance,
  CulturalIntelligence,
  LifecycleStage,
  OriginPlatform,
  TrendMomentum,
} from "@/types";
import { getIntelligenceOverride } from "./registry";
import {
  inferLifecycleStage,
  type LifecycleInferenceContext,
} from "./lifecycle";
import {
  resolveClusterIds,
  sharedClusterIds,
  type CulturalClusterId,
} from "./clusters";

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function uniqStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    const key = v.trim();
    if (!key) continue;
    const lower = key.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(key);
  }
  return out;
}

/** Normalized view used by recommendation / coverage tooling. */
export interface ResolvedCulturalIntelligence {
  era: CulturalEra[];
  originPlatform: OriginPlatform[];
  culturalCategory: string[];
  audience: CulturalAudience[];
  formatType: CulturalFormatType[];
  /**
   * Explicit stage when set on entry/registry; otherwise inferred (read-only).
   * `source` tells callers whether a human set it.
   */
  lifecycleStage: LifecycleStage;
  lifecycleSource: "explicit" | "inferred";
  signals: string[];
  /** Internal cultural clusters (Phase 7B). */
  clusters: CulturalClusterId[];
  /** Explicit importance only — use getCulturalImportance() for derived fill. */
  importance: CulturalImportance | undefined;
}

function deriveDefaults(entry: BaseEntry): CulturalIntelligence {
  const tags = (entry.tags ?? []).map((t) => t.toLowerCase());
  const blob = `${entry.title} ${entry.description} ${(entry.tags ?? []).join(" ")}`.toLowerCase();

  const era: CulturalEra[] = [];
  if (tags.some((t) => t.includes("gen alpha") || t.includes("brainrot"))) {
    era.push("gen-alpha");
  }
  if (
    tags.some((t) => t.includes("tiktok") || t.includes("short-form") || t.includes("shorts")) ||
    blob.includes("youtube shorts")
  ) {
    era.push("short-form");
  }
  if (tags.some((t) => t.includes("classic") || t.includes("early internet") || t.includes("geocities"))) {
    era.push("early-web");
  }
  if (tags.some((t) => t.includes("2000s") || t.includes("flash") || t.includes("myspace"))) {
    era.push("web-2");
  }
  if (era.length === 0) era.push("unknown");

  const originPlatform: OriginPlatform[] = [];
  const platformHints: Array<[RegExp, OriginPlatform]> = [
    [/youtube shorts|yt shorts/, "youtube-shorts"],
    [/youtube/, "youtube"],
    [/tiktok/, "tiktok"],
    [/instagram|insta\b/, "instagram"],
    [/twitter|\bx\b|tweet/, "twitter"],
    [/reddit/, "reddit"],
    [/4chan|imageboard/, "4chan"],
    [/tumblr/, "tumblr"],
    [/twitch/, "twitch"],
    [/discord/, "discord"],
    [/myspace/, "myspace"],
    [/newgrounds/, "newgrounds"],
    [/snapchat/, "snapchat"],
  ];
  for (const [re, platform] of platformHints) {
    if (re.test(blob) || tags.some((t) => re.test(t))) {
      originPlatform.push(platform);
    }
  }
  if (originPlatform.length === 0) originPlatform.push("unknown");

  const culturalCategory: string[] = [entry.category];
  if (tags.includes("brainrot")) culturalCategory.push("brainrot");
  if (tags.includes("aesthetic") || entry.category === "trend") {
    if (!culturalCategory.includes("aesthetic") && tags.includes("aesthetic")) {
      culturalCategory.push("aesthetic");
    }
  }
  if (tags.includes("gaming")) culturalCategory.push("gaming");

  const audience: CulturalAudience[] = [];
  if (tags.some((t) => t.includes("gen alpha"))) audience.push("gen-alpha");
  if (tags.some((t) => t.includes("gen z") || t.includes("genz"))) audience.push("gen-z");
  if (tags.some((t) => t.includes("gaming") || t.includes("esports"))) {
    audience.push("gaming");
  }
  if (audience.length === 0) {
    audience.push(entry.category === "slang" || entry.category === "meme" ? "mainstream" : "other");
  }

  let formatType: CulturalFormatType = "other";
  switch (entry.category) {
    case "slang":
      formatType = "slang-term";
      break;
    case "creator":
      formatType = "creator-persona";
      break;
    case "event":
      formatType = "event";
      break;
    case "trend":
      formatType = tags.includes("aesthetic") ? "aesthetic" : "other";
      if (blob.includes("culture") && blob.includes("platform")) {
        formatType = "platform-culture";
      }
      break;
    case "meme":
    case "brainrot":
      if (blob.includes("animated") || tags.includes("gmod") || tags.includes("animation")) {
        formatType = "animated-meme";
      } else if (tags.includes("reaction") || blob.includes("reaction")) {
        formatType = "reaction";
      } else if (tags.includes("catchphrase") || blob.includes("catchphrase")) {
        formatType = "catchphrase";
      } else if (tags.includes("video") || blob.includes("viral video")) {
        formatType = "video-meme";
      } else {
        formatType = "image-macro";
      }
      break;
    default:
      formatType = "other";
  }

  const signals = uniqStrings([
    ...tags.map((t) => t.replace(/\b\w/g, (c) => c.toUpperCase())),
    entry.category === "brainrot" || tags.includes("brainrot") ? "Brainrot" : "",
    tags.some((t) => t.includes("gen alpha")) ? "Gen Alpha" : "",
    tags.some((t) => t.includes("short-form") || t.includes("tiktok") || t.includes("shorts"))
      ? "Short-form video"
      : "",
  ]);

  return {
    era,
    originPlatform,
    culturalCategory: uniqStrings(culturalCategory),
    audience,
    formatType,
    signals,
  };
}

function mergeIntelligence(
  ...layers: Array<CulturalIntelligence | undefined>
): CulturalIntelligence {
  const out: CulturalIntelligence = {};
  for (const layer of layers) {
    if (!layer) continue;
    if (layer.era !== undefined) out.era = layer.era;
    if (layer.originPlatform !== undefined) out.originPlatform = layer.originPlatform;
    if (layer.culturalCategory !== undefined) {
      out.culturalCategory = uniqStrings([
        ...(out.culturalCategory ?? []),
        ...layer.culturalCategory,
      ]);
    }
    if (layer.audience !== undefined) out.audience = layer.audience;
    if (layer.formatType !== undefined) out.formatType = layer.formatType;
    if (layer.lifecycleStage !== undefined) out.lifecycleStage = layer.lifecycleStage;
    if (layer.signals !== undefined) {
      out.signals = uniqStrings([...(out.signals ?? []), ...layer.signals]);
    }
    if (layer.importance !== undefined) {
      out.importance = { ...out.importance, ...layer.importance };
    }
  }
  return out;
}

function meanImportance(imp?: CulturalImportance): number | null {
  if (!imp) return null;
  const vals = [
    imp.historicalSignificance,
    imp.culturalLongevity,
    imp.platformImpact,
    imp.audienceReach,
  ].filter((n): n is number => typeof n === "number");
  if (vals.length === 0) return null;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function momentumFromTrendDirection(entry: BaseEntry): TrendMomentum {
  switch (entry.trendDirection) {
    case "rising":
    case "new":
      return "accelerating";
    case "declining":
      return "cooling";
    case "stable":
      return "stable";
    default:
      return "unknown";
  }
}

/**
 * Resolve intelligence metadata for an entry without mutating the catalog.
 * Lifecycle inference uses cultural + cluster + importance signals (read-only).
 */
export function getCulturalIntelligence(entry: BaseEntry): ResolvedCulturalIntelligence {
  const derived = deriveDefaults(entry);
  const registry = getIntelligenceOverride(entry.slug);
  const merged = mergeIntelligence(derived, registry, entry.intelligence);

  const signals = merged.signals ?? [];
  const clusters = resolveClusterIds({
    slug: entry.slug,
    tags: entry.tags,
    signals,
    platforms: asArray(merged.originPlatform),
    culturalCategory: merged.culturalCategory ?? [],
  });

  const lifecycleCtx: LifecycleInferenceContext = {
    importanceComposite: meanImportance(merged.importance),
    historicalSignificance: merged.importance?.historicalSignificance,
    culturalLongevity: merged.importance?.culturalLongevity,
    clusterIds: clusters,
    culturalSignals: signals,
    eras: asArray(merged.era),
    // Prefer optional trendIntelligence momentum without importing trend module
    momentum: entry.trendIntelligence?.momentum ?? momentumFromTrendDirection(entry),
    trendConfidence: entry.trendIntelligence?.confidence,
  };

  // Explicit cultural lifecycle wins; else optional trendIntelligence; else infer
  const explicitCultural = merged.lifecycleStage;
  const explicitTrend = entry.trendIntelligence?.lifecycleStage;
  const lifecycleStage =
    explicitCultural ??
    explicitTrend ??
    inferLifecycleStage(entry, new Date().getFullYear(), lifecycleCtx);
  const lifecycleSource: "explicit" | "inferred" =
    explicitCultural || explicitTrend ? "explicit" : "inferred";

  return {
    era: asArray(merged.era),
    originPlatform: asArray(merged.originPlatform),
    culturalCategory: merged.culturalCategory ?? [],
    audience: asArray(merged.audience),
    formatType: asArray(merged.formatType),
    lifecycleStage,
    lifecycleSource,
    signals,
    clusters,
    importance: merged.importance,
  };
}

/**
 * Shared cultural-signal overlap for connection scoring.
 * Requires multi-dimensional evidence — platform alone is not enough.
 */
export function intelligenceOverlapScore(a: BaseEntry, b: BaseEntry): number {
  const ia = getCulturalIntelligence(a);
  const ib = getCulturalIntelligence(b);
  let score = 0;
  let dimensions = 0;

  const eraHits = ia.era.filter((e) => e !== "unknown" && ib.era.includes(e)).length;
  if (eraHits > 0) {
    score += eraHits * 8;
    dimensions += 1;
  }

  const platHits = ia.originPlatform.filter(
    (p) => p !== "unknown" && ib.originPlatform.includes(p),
  ).length;
  if (platHits > 0) {
    score += platHits * 10;
    dimensions += 1;
  }

  const audHits = ia.audience.filter((x) => ib.audience.includes(x)).length;
  if (audHits > 0) {
    score += audHits * 6;
    dimensions += 1;
  }

  const fmtHits = ia.formatType.filter((x) => ib.formatType.includes(x)).length;
  if (fmtHits > 0) {
    score += Math.min(fmtHits, 2) * 5;
    dimensions += 1;
  }

  const sigB = new Set(ib.signals.map((s) => s.toLowerCase()));
  const sigHits = ia.signals.filter((s) => sigB.has(s.toLowerCase())).length;
  if (sigHits > 0) {
    score += sigHits * 6;
    dimensions += 1;
  }

  const catB = new Set(ib.culturalCategory.map((c) => c.toLowerCase()));
  const catHits = ia.culturalCategory.filter((c) => catB.has(c.toLowerCase())).length;
  if (catHits > 0) {
    score += catHits * 4;
    dimensions += 1;
  }

  const clusters = sharedClusterIds(
    {
      slug: a.slug,
      tags: a.tags,
      signals: ia.signals,
      platforms: ia.originPlatform,
      culturalCategory: ia.culturalCategory,
    },
    {
      slug: b.slug,
      tags: b.tags,
      signals: ib.signals,
      platforms: ib.originPlatform,
      culturalCategory: ib.culturalCategory,
    },
  );
  if (clusters.length > 0) {
    score += clusters.length * 14;
    dimensions += 1;
  }

  // Quality gate: reject thin single-dimension matches (filler)
  if (dimensions < 2 && score < 28) return 0;

  return score;
}
