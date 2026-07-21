/**
 * Coverage analysis — compares research topic against catalog gaps (mock).
 */

import type {
  CoverageAnalyzer,
  CoverageReport,
  Entity,
  KnowledgeGap,
  ResearchInput,
} from "./types";

export const mockCoverageAnalyzer: CoverageAnalyzer = {
  analyze(input: ResearchInput, entities: Entity[]): CoverageReport {
    const gaps: KnowledgeGap[] = [
      {
        id: "gap-origin-date",
        title: "Verified origin date",
        reason: "Mock engine cannot verify dates — human must confirm with primary sources.",
        priority: "high",
      },
      {
        id: "gap-related-entry",
        title: "Related encyclopedia entries",
        reason: "Internal link targets may be missing or under-documented.",
        suggestedCategory: "meme",
        priority: "medium",
      },
    ];

    if (entities.some((e) => e.kind === "person" && !e.catalogSlug)) {
      gaps.push({
        id: "gap-creator",
        title: "Creator / person page",
        reason: "Named people without catalogSlug may need creator entries.",
        suggestedCategory: "creator",
        priority: "medium",
      });
    }

    return {
      existingEntrySlug: undefined,
      existingEntryTitle: undefined,
      coverageLevel: "none",
      strengths: [
        `Topic "${input.topic}" is framed for research.`,
        "Evidence stubs prepared for human verification.",
      ],
      weaknesses: [
        "No live catalog match asserted by mock engine.",
        "Timeline dates are placeholders.",
      ],
      gaps,
      relatedCatalogSlugs: [],
    };
  },
};
