/**
 * Coverage analysis — catalog context for a complete research package.
 * Gaps become AI fill targets, not editor homework lists.
 */

import type {
  CoverageAnalyzer,
  CoverageReport,
  Entity,
  ResearchInput,
} from "./types";

export const mockCoverageAnalyzer: CoverageAnalyzer = {
  analyze(input: ResearchInput, entities: Entity[]): CoverageReport {
    const related = entities
      .map((e) => e.catalogSlug)
      .filter((s): s is string => Boolean(s))
      .slice(0, 6);

    return {
      existingEntrySlug: undefined,
      existingEntryTitle: undefined,
      coverageLevel: related.length > 0 ? "adequate" : "thin",
      strengths: [
        `Topic "${input.topic}" has enough signal for a complete first research package.`,
        "Timeline, origin window, and related-entry candidates will be synthesized in completeness passes.",
      ],
      weaknesses: [
        "Live catalog match not asserted by the mock engine.",
        "Exact first-appearance timestamps may remain approximate.",
      ],
      // Empty: completeness pipeline fills rather than dumping gaps on editors.
      gaps: [],
      relatedCatalogSlugs: related,
    };
  },
};
