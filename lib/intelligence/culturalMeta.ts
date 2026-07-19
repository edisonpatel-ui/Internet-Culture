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
  CulturalIntelligence,
  LifecycleStage,
  OriginPlatform,
} from "@/types";
import { getIntelligenceOverride } from "./registry";
import { inferLifecycleStage } from "./lifecycle";

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
  }
  return out;
}

/**
 * Resolve intelligence metadata for an entry without mutating the catalog.
 */
export function getCulturalIntelligence(entry: BaseEntry): ResolvedCulturalIntelligence {
  const derived = deriveDefaults(entry);
  const registry = getIntelligenceOverride(entry.slug);
  const merged = mergeIntelligence(derived, registry, entry.intelligence);

  const explicit = merged.lifecycleStage;
  const lifecycleStage = explicit ?? inferLifecycleStage(entry);
  const lifecycleSource: "explicit" | "inferred" = explicit ? "explicit" : "inferred";

  return {
    era: asArray(merged.era),
    originPlatform: asArray(merged.originPlatform),
    culturalCategory: merged.culturalCategory ?? [],
    audience: asArray(merged.audience),
    formatType: asArray(merged.formatType),
    lifecycleStage,
    lifecycleSource,
    signals: merged.signals ?? [],
  };
}

/** Shared signal / category overlap count (for connection scoring). */
export function intelligenceOverlapScore(a: BaseEntry, b: BaseEntry): number {
  const ia = getCulturalIntelligence(a);
  const ib = getCulturalIntelligence(b);
  let score = 0;

  const eraB = new Set(ib.era);
  score += ia.era.filter((e) => e !== "unknown" && eraB.has(e)).length * 8;

  const platB = new Set(ib.originPlatform);
  score += ia.originPlatform.filter((p) => p !== "unknown" && platB.has(p)).length * 10;

  const audB = new Set(ib.audience);
  score += ia.audience.filter((x) => audB.has(x)).length * 6;

  const fmtB = new Set(ib.formatType);
  score += ia.formatType.filter((x) => fmtB.has(x)).length * 7;

  const sigB = new Set(ib.signals.map((s) => s.toLowerCase()));
  score += ia.signals.filter((s) => sigB.has(s.toLowerCase())).length * 5;

  const catB = new Set(ib.culturalCategory.map((c) => c.toLowerCase()));
  score += ia.culturalCategory.filter((c) => catB.has(c.toLowerCase())).length * 4;

  return score;
}
