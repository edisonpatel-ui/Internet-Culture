/**
 * Completeness-first research philosophy types.
 *
 * Confidence drives AI behavior internally.
 * Only low-confidence material decisions escalate to editors.
 */

export type ConclusionConfidence = "high" | "medium" | "low";

/** Internal note on a key research conclusion. */
export interface ResearchConclusionNote {
  field: string;
  confidence: ConclusionConfidence;
  /** Short reasoning shown optionally for medium/low. */
  reasoning: string;
  /**
   * True when low confidence would materially affect article quality.
   * Only these surface as editor escalations.
   */
  escalateToEditor: boolean;
}

/** Checklist of encyclopedia sections the AI must attempt to fill. */
export const COMPLETENESS_SECTIONS = [
  "lead",
  "summary",
  "category",
  "slug",
  "origin",
  "timeline",
  "culturalSignificance",
  "relatedEntries",
  "aliases",
  "sources",
  "mediaSuggestions",
  "seoMetadata",
] as const;

export type CompletenessSection = (typeof COMPLETENESS_SECTIONS)[number];

export interface ResearchCompletenessReport {
  /** True when AI exhausted self-improvement and article-ready research exists. */
  readyForEditor: boolean;
  /** 0–1 overall completeness score. */
  score: number;
  completedSections: CompletenessSection[];
  /** Sections filled via responsible inference (not blank). */
  filledByInference: CompletenessSection[];
  /** Pass labels completed in order. */
  passesCompleted: string[];
  /** Only material low-confidence items. */
  escalations: ResearchConclusionNote[];
}
