/**
 * Coverage analysis — catalog context only.
 * Gaps are reported honestly; never claim synthesis will invent missing knowledge.
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

    const hasCatalogContext = related.length > 0;

    return {
      existingEntrySlug: undefined,
      existingEntryTitle: undefined,
      coverageLevel: hasCatalogContext ? "adequate" : "thin",
      strengths: hasCatalogContext
        ? [
            `Related catalog slugs available for "${input.topic}".`,
          ]
        : [],
      weaknesses: [
        "Live catalog match not asserted by the mock engine.",
        "Mock coverage cannot invent origin, timeline, or impact claims.",
      ],
      gaps: hasCatalogContext
        ? []
        : [
            {
              id: "gap-related",
              title: "Related encyclopedia targets",
              reason:
                "No related catalog matches found — related entries remain undetermined until the Knowledge Engine retrieves them.",
              suggestedCategory: undefined,
              priority: "high" as const,
            },
          ],
      relatedCatalogSlugs: related,
    };
  },
};
