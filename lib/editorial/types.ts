/**
 * Internal editorial intelligence types.
 *
 * These are for audit tooling and the slug registry only.
 * Do NOT put them on objects passed to client components.
 * Do NOT render them in public UI.
 */

/** Human curation state for an entry. */
export type EditorialStatus =
  | "strong"
  | "needs-review"
  | "improve"
  | "merge-candidate";

/** Lasting cultural weight — distinct from scores.relevance (current attention). */
export type SignificanceLevel =
  | "landmark"
  | "notable"
  | "niche"
  | "questionable";

/** Manual override stored in the editorial registry (by slug). */
export interface EditorialRegistryEntry {
  editorialStatus?: EditorialStatus;
  significanceLevel?: SignificanceLevel;
  /** Short internal note for editors. */
  notes?: string;
  /** Suggested merge target slug when status is merge-candidate. */
  mergeIntoSlug?: string;
}

export type QualityBucket =
  | "strong"
  | "improve"
  | "merge"
  | "questionable";

export interface QualityEntryAssessment {
  slug: string;
  id: string;
  title: string;
  category: string;
  bucket: QualityBucket;
  editorialStatus: EditorialStatus;
  significanceLevel: SignificanceLevel;
  /** Why this assessment was made. */
  reasons: string[];
  /** True when a human override in the registry was applied. */
  registryOverride: boolean;
}
