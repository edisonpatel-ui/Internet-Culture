/**
 * Research completeness types.
 *
 * REQUIRED fields may block article generation.
 * OPTIONAL fields never cause Research Failed — they become "Unknown"
 * after all Knowledge Engine stages are attempted.
 */

export type ConclusionConfidence = "high" | "medium" | "low";

/** Internal note on a key research conclusion. */
export interface ResearchConclusionNote {
  field: string;
  confidence: ConclusionConfidence;
  reasoning: string;
  escalateToEditor: boolean;
}

/** Checklist of encyclopedia sections. */
export const COMPLETENESS_SECTIONS = [
  "entity",
  "title",
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

/**
 * Required for article generation.
 * Maps to: canonical entity, title, summary/basic explanation,
 * category, slug, minimum trustworthy sources.
 */
export const REQUIRED_SECTIONS: CompletenessSection[] = [
  "entity",
  "title",
  "summary",
  "category",
  "slug",
  "sources",
];

/** @deprecated Use REQUIRED_SECTIONS */
export const REQUIRED_FOR_READY = REQUIRED_SECTIONS;

/**
 * Optional enrichment — Unknown is fine; never blocks Research Failed.
 */
export const OPTIONAL_SECTIONS: CompletenessSection[] = [
  "lead",
  "origin",
  "timeline",
  "culturalSignificance",
  "relatedEntries",
  "aliases",
  "mediaSuggestions",
  "seoMetadata",
];

export const SECTION_LABELS: Record<CompletenessSection, string> = {
  entity: "Canonical entity",
  title: "Title",
  lead: "Lead",
  summary: "Summary / basic explanation",
  category: "Category",
  slug: "Slug",
  origin: "Exact origin date / creator window",
  timeline: "Full timeline",
  culturalSignificance: "Complete cultural impact",
  relatedEntries: "Related entries",
  aliases: "Additional aliases",
  sources: "Trustworthy sources",
  mediaSuggestions: "Representative media",
  seoMetadata: "Additional SEO enrichment",
};

/** Explicit optional sentinel — not fabrication. */
export const UNKNOWN_SENTINEL = "Unknown";

export interface UndeterminedField {
  field: CompletenessSection;
  label?: string;
  /** True when this field is required (blocks Research Failed). */
  required: boolean;
  /**
   * Why the Knowledge Engine could not determine this —
   * only after all research stages were attempted.
   */
  reason: string;
  /** Which source classes / methods were searched. */
  sourcesSearched?: string[];
}

export interface ResearchCompletenessReport {
  /**
   * True when all REQUIRED fields are present —
   * optional Unknown does not block.
   */
  readyForEditor: boolean;
  /**
   * True only when the topic cannot be identified or the minimum
   * required encyclopedia package cannot be produced.
   */
  researchFailed: boolean;
  /** 0–1 score across all sections (Unknown optional lowers score, not readiness). */
  score: number;
  completedSections: CompletenessSection[];
  groundedFromEvidence: CompletenessSection[];
  /** Optional (and any required) gaps — Unknown with reasons. */
  undetermined: UndeterminedField[];
  /** Required gaps only (drives Research Failed). */
  requiredMissing: CompletenessSection[];
  passesCompleted: string[];
  escalations: ResearchConclusionNote[];
  stagesAttempted?: string[];
  allStagesAttempted?: boolean;
}

export function isUnknownSentinel(text: string): boolean {
  return text.trim().toLowerCase() === "unknown";
}

export function isRequiredSection(field: CompletenessSection): boolean {
  return REQUIRED_SECTIONS.includes(field);
}
