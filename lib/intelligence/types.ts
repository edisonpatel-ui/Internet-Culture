import type { BaseEntry } from "@/types";

/**
 * Why two entries are related — shown in the UI.
 * Keep labels short and factual; do not invent connections.
 */
export type RelationReasonId =
  | "editorial"
  | "mutual-link"
  | "creator-connection"
  | "same-platform"
  | "same-era"
  | "similar-meaning"
  | "shared-tags"
  | "same-movement"
  | "collaboration"
  | "audience-overlap"
  | "cultural-connection"
  | "format"
  | "popularized"
  | "originated"
  | "inspired-by"
  | "member-of"
  | "related-slang"
  | "related-event"
  | "community"
  | "same-format";

export const RELATION_REASON_LABELS: Record<RelationReasonId, string> = {
  editorial: "Curated link",
  "mutual-link": "Cross-linked",
  "creator-connection": "Creator connection",
  "same-platform": "Same platform",
  "same-era": "Same era",
  "similar-meaning": "Similar meaning",
  "shared-tags": "Shared tags",
  "same-movement": "Same movement",
  collaboration: "Collaboration",
  "audience-overlap": "Audience overlap",
  "cultural-connection": "Cultural connection",
  format: "Similar format",
  popularized: "Popularized",
  originated: "Originated",
  "inspired-by": "Inspired by",
  "member-of": "Member of",
  "related-slang": "Related slang",
  "related-event": "Related event",
  community: "Same community",
  "same-format": "Same format",
};

export interface RelatedRecommendation {
  entry: BaseEntry;
  /** Relative match strength (higher = stronger). Not a public 0–100 cultural score. */
  score: number;
  reason: RelationReasonId;
  reasonLabel: string;
}

export interface CulturalScoreSnapshot {
  /** Attention / discussion today */
  relevanceScore: number;
  /** Historical importance (legacy impact) — not this week's hype */
  culturalImpactScore: number;
  /** How much demand / discovery pressure exists (catalog proxy) */
  searchInterestScore: number;
  /** How widely this influenced other culture (impact + longevity) */
  culturalInfluenceScore: number;
  popularityScore: number;
  longevityScore: number;
  cringeLevel: number;
  /** Presentational brainrot score from existing data */
  brainrotScore: number;
  /**
   * Where each value came from — for transparency / future editors.
   * Does not claim live Google Trends / analytics precision.
   */
  assumptions: string[];
}
