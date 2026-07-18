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
  | "format";

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
};

export interface RelatedRecommendation {
  entry: BaseEntry;
  /** Relative match strength (higher = stronger). Not a public 0–100 cultural score. */
  score: number;
  reason: RelationReasonId;
  reasonLabel: string;
}

export interface CulturalScoreSnapshot {
  relevanceScore: number;
  culturalImpactScore: number;
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
