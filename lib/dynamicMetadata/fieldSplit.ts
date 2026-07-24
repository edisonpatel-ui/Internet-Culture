/**
 * Explicit split: permanent encyclopedia facts vs time-varying metadata.
 * Refresh Dynamic Metadata must only touch DYNAMIC_ENTRY_FIELDS.
 */

/** Paths / conceptual fields that must stay stable across refreshes. */
export const STATIC_ENTRY_FIELDS = [
  "id",
  "slug",
  "title",
  "category",
  "description",
  "summary",
  "origin",
  "meaning",
  "definition",
  "timeline",
  "examples",
  "usageExamples",
  "impact",
  "highlights",
  "sources",
  "media",
  "relatedSlugs",
  "relationships",
  "tags",
  "historicalDate",
  "dateStarted",
  "dateEnded",
  "creator",
  "personType",
  "platforms",
  "followers",
  "notableMoments",
  "careerStart",
  "addedAt",
  "imageGradient",
  /** Influence is lasting footprint — not refreshed by default. */
  "scores.influence",
] as const;

/** Fields Refresh Dynamic Metadata is allowed to change. */
export const DYNAMIC_ENTRY_FIELDS = [
  "scores.relevance",
  "scores.cringe",
  "scores.brainrot",
  "trendDirection",
  "status",
  "lastUpdated",
  "dynamicMetadata",
  "dynamicMetadata.currentRelevance",
  "dynamicMetadata.trendingScore",
  "dynamicMetadata.popularity",
  "dynamicMetadata.currentStatus",
  "dynamicMetadata.activePlatforms",
  "dynamicMetadata.lastReviewed",
  "dynamicMetadata.recentRevival",
  "dynamicMetadata.popularityNotes",
] as const;

export type DynamicScoreKey = "relevance" | "cringe" | "brainrot";

export function isDynamicScoreKey(key: string): key is DynamicScoreKey {
  return key === "relevance" || key === "cringe" || key === "brainrot";
}
