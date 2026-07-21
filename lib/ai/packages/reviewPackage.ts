/**
 * Editorial review package — recommendations only (RC3-B).
 *
 * Never rewrites content. Never mutates catalog files.
 */

import type { AIDraftCategory } from "../types";

export type ReviewDimension =
  | "factual_completeness"
  | "editorial_clarity"
  | "readability"
  | "teach_first"
  | "seo"
  | "duplicate_content"
  | "unsupported_claims"
  | "hype_language"
  | "vague_wording"
  | "missing_context"
  | "missing_sources"
  | "style_guide_consistency";

export type ReviewSeverity = "info" | "improve" | "critical";

export interface ReviewRecommendation {
  dimension: ReviewDimension;
  severity: ReviewSeverity;
  /** What is wrong or weak. */
  finding: string;
  /** What a human should consider doing — not an auto-applied rewrite. */
  recommendation: string;
}

export interface ReviewPackage {
  slug?: string;
  title: string;
  category: AIDraftCategory;
  overall: "strong" | "improve" | "weak";
  recommendations: ReviewRecommendation[];
  summary: string;
  /** Always true — AI must not auto-merge. */
  requiresHumanReview: true;
  /** Style-guide checklist notes (teach-first five questions, etc.). */
  styleGuideNotes: string[];
}
