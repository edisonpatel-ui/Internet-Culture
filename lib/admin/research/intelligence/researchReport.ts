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
        severity: "critical",
        recommendation: `Confirm category classification for "${topic}" before drafting.`,
        rationale: "Misclassification is the most common encyclopedia error.",
      },
      {
        id: "ed-2",
        area: "sources",
        severity: "improve",
        recommendation: "Attach at least one High/Medium-tier URL for origin claims.",
      },
      {
        id: "ed-3",
        area: "structure",
        severity: "info",
        recommendation: "Map report sections into ResearchPackage fields when promoting.",
      },
    ],
    seo: [
      {
        id: "seo-1",
        area: "seo",
        severity: "improve",
        recommendation: `Draft a one-sentence definition for "${topic}" suitable for title/meta.`,
      },
      {
        id: "seo-2",
        area: "seo",
        severity: "info",
        recommendation: "List likely search aliases and misspellings for future FAQ/related.",
      },
    ],
    media: [
      {
        id: "media-1",
        role: "featured",
        title: `Representative visual for ${topic}`,
        searchHint: "Prefer Wikimedia Commons or YouTube hqdefault — never invent URLs.",
        verified: false,
      },
      {
        id: "media-2",
        role: "reference",
        title: "Know Your Meme / Wikipedia reference card",
        searchHint: "Add role:reference after page URL is confirmed.",
        verified: false,
      },
    ],
    conflicts: [
      {
        id: "conflict-1",
        summary: "Origin date or platform may be disputed across sources.",
        claims: [
          "Claim A: earliest appearance on platform X (unverified stub).",
          "Claim B: popularized later on platform Y (unverified stub).",
        ],
        editorGuidance:
          "Preserve both claims until primary evidence resolves; do not invent a winner.",
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
    id: `report-${input.sessionId ?? "adhoc"}-${Date.now()}`,
    topic: input.topic,
    generatedAt: new Date().toISOString(),
    requiresHumanReview: true,
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
