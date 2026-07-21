/**
 * Update package — compare existing article vs new research (RC3-B).
 *
 * Recommendations for revision only. Never auto-edits published content.
 */

import type { AIDraftCategory } from "../types";
import type { ResearchPackage } from "./researchPackage";
import type { SuggestedCulturalScores } from "./draftPackage";

/** Snapshot of an existing entry for comparison (editor-supplied or future loader). */
export interface ExistingArticleSnapshot {
  slug: string;
  title: string;
  category: AIDraftCategory;
  description: string;
  /** Flattened body fields currently published. */
  fields: Record<string, string>;
  aliases?: string[];
  tags?: string[];
  relatedSlugs?: string[];
  lastUpdated?: string;
  scores?: SuggestedCulturalScores;
}

export interface UpdatePackage {
  slug: string;
  title: string;
  category: AIDraftCategory;
  /** New research used for the comparison. */
  newResearch: ResearchPackage;
  changedFacts: string[];
  outdatedSections: string[];
  newEvents: string[];
  /** Newly relevant meme / slang / culture connections (titles or slugs). */
  newMemes: string[];
  newAliases: string[];
  suggestedScoreUpdates: SuggestedCulturalScores;
  /** 0–1 confidence that an update is warranted. */
  confidence: number;
  /** Always true for update proposals. */
  humanReviewRequired: true;
  summary: string;
  editorNotes: string[];
}
