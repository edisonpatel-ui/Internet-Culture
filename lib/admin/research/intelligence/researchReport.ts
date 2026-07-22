/**
 * Research report builder — composes all intelligence modules into ResearchOutput.
 * Mock pipeline. No providers. No article generation.
 */

import { mockConfidenceEngine } from "./confidenceEngine";
import { mockCoverageAnalyzer } from "./coverageAnalysis";
import { mockEntityGraphBuilder } from "./entityGraph";
import { mockEvidenceMatrixBuilder } from "./evidenceMatrix";
import { mockKnowledgeSummarizer } from "./knowledgeSummary";
import { mockRelationshipAnalyzer } from "./relationshipAnalysis";
import { mockResearchOrganizer } from "./researchOrganizer";
import { mockSourceCollector } from "./sourceCollector";
import { mockTimelineAnalyzer } from "./timelineAnalysis";
import type {
  ConflictingClaim,
  MediaSuggestionStub,
  ResearchInput,
  ResearchOutput,
  ResearchRecommendation,
  ResearchReport,
  ResearchReportBuilder,
} from "./types";

function slugTopic(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "adhoc";
}
/**
 * Internal AI follow-ups — resolved by the completeness pipeline.
 * Not presented as editor homework.
 */
function defaultRecommendations(topic: string): {
  editorial: ResearchRecommendation[];
  seo: ResearchRecommendation[];
  media: MediaSuggestionStub[];
  conflicts: ConflictingClaim[];
} {
  return {
    editorial: [
      {
        id: "ed-1",
        area: "editorial",
        severity: "info",
        recommendation: `Self-select best category for "${topic}" using format and usage signals.`,
        rationale: "Completeness pipeline owns classification before editor review.",
      },
    ],
    seo: [
      {
        id: "seo-1",
        area: "seo",
        severity: "info",
        recommendation: `Generate meta title/description and aliases for "${topic}".`,
        rationale: "Handled in metadata pass before DraftPackage generation.",
      },
    ],
    media: [
      {
        id: "media-1",
        role: "featured",
        title: `Representative visual for ${topic}`,
        searchHint:
          "Prefer Wikimedia Commons direct file URL or YouTube hqdefault — never invent URLs.",
        verified: false,
      },
      {
        id: "media-2",
        role: "reference",
        title: "Know Your Meme / Wikipedia reference card",
        searchHint: "Add role:reference after the live page URL is confirmed.",
        verified: false,
      },
    ],
    // Conflicts are synthesized then resolved in completeness pass 2.
    conflicts: [
      {
        id: "conflict-1",
        summary: "Origin dating may differ across culture archives and press.",
        claims: [
          "Some sources emphasize the earliest upload/community post.",
          "Others date the phenomenon from the mainstream amplification wave.",
        ],
        editorGuidance:
          "AI will choose the most consistent multi-source window and state uncertainty in origin prose.",
      },
    ],
  };
}

export function buildResearchReport(input: ResearchInput): ResearchOutput {
  const evidence = mockSourceCollector.collect(input);
  const organized = mockResearchOrganizer.organize(input, evidence);
  const evidenceMatrix = mockEvidenceMatrixBuilder.build(organized);
  const graph = mockEntityGraphBuilder.build(input, evidence);
  const allEntities = [
    ...graph.people,
    ...graph.organizations,
    ...graph.platforms,
    ...graph.communities,
    ...graph.memes,
    ...graph.slang,
  ];
  const relationships = [
    ...graph.relationships,
    ...mockRelationshipAnalyzer.analyze(allEntities, input),
  ];
  const { timeline, importantEvents } = mockTimelineAnalyzer.analyze(
    input,
    evidence,
  );
  const coverage = mockCoverageAnalyzer.analyze(input, allEntities);
  const summary = mockKnowledgeSummarizer.summarize(input, evidence);
  const confidenceLevels = mockConfidenceEngine.assess(evidence);
  const recs = defaultRecommendations(input.topic);

  // relationships reserved for future report section / RC3 mapping
  void relationships;

  const report: ResearchReport = {
    id: `report-${input.sessionId ?? slugTopic(input.topic)}`,
    topic: input.topic,
    generatedAt: "2026-07-17T12:00:00.000Z", // fixed mock stamp — never Date.now()
    // Completeness pipeline exhausts AI work first; human review is judgment-only.
    requiresHumanReview: false,
    executiveSummary: summary.executiveSummary,
    topicOverview: summary.topicOverview,
    historicalContext: summary.historicalContext,
    timeline,
    importantEvents,
    people: graph.people,
    organizations: graph.organizations,
    platforms: graph.platforms,
    communities: graph.communities,
    memes: graph.memes,
    slang: graph.slang,
    relationships,
    relatedEntries: coverage.relatedCatalogSlugs.map((slug) => ({
      slug,
      title: slug,
      reason: "Catalog slug from coverage analyzer.",
    })),
    potentialMissingEntries: coverage.gaps,
    evidenceMatrix,
    conflictingClaims: recs.conflicts,
    confidenceLevels,
    coverageAssessment: coverage,
    researchNotes: summary.researchNotes,
    editorialRecommendations: recs.editorial,
    seoRecommendations: recs.seo,
    futureMediaSuggestions: recs.media,
  };

  return {
    report,
    meta: {
      engine: "admin-research-intelligence",
      version: "rc4-c",
      mock: true,
    },
  };
}

export const mockResearchReportBuilder: ResearchReportBuilder = {
  build: buildResearchReport,
};
