/**
 * lib/api/enrichedTerm.ts
 *
 * Builds the paid-tier "cultural intelligence" fields
 * (velocityIndex, decayTracker, originMapping, templateData) returned by
 * GET /api/v1/terms/[slug] for authenticated requests.
 *
 * IMPORTANT — what's real vs. heuristic:
 * This project's canonical content (lib/content/**) does not currently
 * capture per-platform stage timestamps (e.g. "peaked on TikTok on a
 * specific date") or a verified meme-template association. Rather than
 * inventing specific dates/platforms/template names that aren't backed by
 * real data — which would misrepresent fabricated facts as measured
 * telemetry to paying customers — every field below is computed
 * deterministically from fields that ARE real and already curated on the
 * entry (editorial scores, activePlatforms, formatType, historical dates,
 * metricsHistory). Each function's doc comment says exactly which real
 * field it derives from. This is explicitly v1/beta granularity; a future
 * version can swap in real per-platform telemetry without changing the
 * response shape.
 */

import type { BaseEntry } from "@/types";
import type { MetricSnapshot } from "@/lib/services/metricsHistory";

export type CringeStatus = "Oversaturated" | "Rising" | "Fresh";

export interface DecayTracker {
  cringeStatus: CringeStatus;
  /** 0–1, higher = more decayed/oversaturated. Derived from the entry's curated cringe score. */
  decayIndex: number;
}

export interface OriginMappingPoint {
  platform: string;
  stage: "Origin" | "Active" | "Current";
  date: string;
}

export interface TemplateData {
  name: string;
  status: "Established" | "Emerging";
  /** 0–100. Derived from the entry's curated influence score (closest existing signal to "template strength"). */
  viralPreferenceScore: number;
}

export interface EnrichedTermPayload {
  term: string;
  definition: string;
  category: BaseEntry["category"];
  velocityIndex: string;
  decayTracker: DecayTracker;
  originMapping: OriginMappingPoint[];
  templateData: TemplateData;
  relatedSlugs: string[];
}

/**
 * Percentage growth string (e.g. "12.5%"), derived from the most recent
 * metricsHistory snapshot's `velocity` (point change in curated relevance)
 * relative to the previous relevance value. 0% when there's no history yet
 * or the previous value was 0 (avoids a divide-by-zero blowing up to
 * "Infinity%").
 */
function computeVelocityIndex(history: MetricSnapshot[]): string {
  if (history.length === 0) return "0.0%";
  const latest = history[history.length - 1];
  const previousRelevance = latest.relevance - latest.velocity;
  if (previousRelevance <= 0) return "0.0%";
  const percent = (latest.velocity / previousRelevance) * 100;
  return `${percent.toFixed(1)}%`;
}

/** Buckets the entry's own curated `scores.cringe` (0–100) into a status label + normalized index. */
function computeDecayTracker(entry: BaseEntry): DecayTracker {
  const cringe = entry.scores.cringe;
  const decayIndex = Math.round((cringe / 100) * 100) / 100;
  const cringeStatus: CringeStatus = cringe >= 67 ? "Oversaturated" : cringe >= 34 ? "Rising" : "Fresh";
  return { cringeStatus, decayIndex };
}

/**
 * Builds a coarse origin→current timeline from real dated fields
 * (historicalDate/dateStarted/addedAt for origin, dynamicMetadata.lastReviewed
 * for the most recent check-in) and real tracked platforms
 * (dynamicMetadata.activePlatforms). Only two stages are populated today —
 * "Origin" and "Current" — because per-platform peak/mainstream dates
 * aren't tracked yet; see the module doc comment.
 */
function computeOriginMapping(entry: BaseEntry): OriginMappingPoint[] {
  const originDate = entry.historicalDate ?? entry.dateStarted ?? entry.addedAt;
  const platforms = entry.dynamicMetadata?.activePlatforms;
  const curatedOriginPlatform = entry.intelligence?.originPlatform;
  const primaryPlatform =
    (Array.isArray(curatedOriginPlatform) ? curatedOriginPlatform[0] : curatedOriginPlatform) ??
    (platforms && platforms.length > 0 ? platforms[0] : entry.origin ?? "web");

  const points: OriginMappingPoint[] = [
    { platform: primaryPlatform, stage: "Origin", date: originDate },
  ];

  const currentDate = entry.dynamicMetadata?.lastReviewed ?? entry.lastUpdated;
  if (currentDate && platforms && platforms.length > 0) {
    for (const platform of platforms.slice(0, 3)) {
      points.push({ platform, stage: "Current", date: currentDate });
    }
  }

  return points;
}

/**
 * Derives a template/format signal from the entry's own curated
 * `formatType` (e.g. "image-macro", "reaction") and `scores.influence` —
 * there is no verified named-template association in the current schema,
 * so this describes the entry's OWN format rather than asserting it copies
 * a specific named meme template.
 */
function computeTemplateData(entry: BaseEntry): TemplateData {
  const formatType = entry.intelligence?.formatType;
  const formatLabel = Array.isArray(formatType) ? formatType[0] : formatType;
  const name = formatLabel ? formatLabel.replace(/-/g, " ") : entry.title;

  const influence = entry.scores.influence;
  const status: TemplateData["status"] = influence >= 60 ? "Established" : "Emerging";

  return { name, status, viralPreferenceScore: influence };
}

export function buildEnrichedTermPayload(
  entry: BaseEntry,
  history: MetricSnapshot[],
): EnrichedTermPayload {
  return {
    term: entry.title,
    definition: entry.description,
    category: entry.category,
    velocityIndex: computeVelocityIndex(history),
    decayTracker: computeDecayTracker(entry),
    originMapping: computeOriginMapping(entry),
    templateData: computeTemplateData(entry),
    relatedSlugs: entry.relatedSlugs ?? [],
  };
}
