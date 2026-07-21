/**
 * Research Intelligence Engine (RC4-C).
 *
 * Provider-agnostic reasoning layer for the Research Workspace.
 * Mock implementations only — no App Router, UI, APIs, or providers.
 */

export type {
  ResearchInput,
  ResearchOutput,
  Evidence,
  EvidenceGroup,
  Entity,
  Relationship,
  TimelineEvent,
  CoverageReport,
  ResearchRecommendation,
  KnowledgeGap,
  ConfidenceAssessment,
  ConflictingClaim,
  MediaSuggestionStub,
  ResearchReport,
  SourceCollector,
  ResearchOrganizer,
  EvidenceMatrixBuilder,
  EntityGraphBuilder,
  TimelineAnalyzer,
  RelationshipAnalyzer,
  CoverageAnalyzer,
  KnowledgeSummarizer,
  ConfidenceEngine,
  ResearchReportBuilder,
} from "./types";

export { mockSourceCollector } from "./sourceCollector";
export { mockResearchOrganizer } from "./researchOrganizer";
export { mockEvidenceMatrixBuilder } from "./evidenceMatrix";
export { mockEntityGraphBuilder } from "./entityGraph";
export { mockTimelineAnalyzer } from "./timelineAnalysis";
export { mockRelationshipAnalyzer } from "./relationshipAnalysis";
export { mockCoverageAnalyzer } from "./coverageAnalysis";
export { mockKnowledgeSummarizer } from "./knowledgeSummary";
export { mockConfidenceEngine } from "./confidenceEngine";
export {
  buildResearchReport,
  mockResearchReportBuilder,
} from "./researchReport";

export {
  MOCK_RESEARCH_REPORTS,
  MOCK_REPORT_ITALIAN_BRAINROT,
  MOCK_REPORT_NPC_STREAMING,
  MOCK_REPORT_LOOKSMAXXING,
  MOCK_REPORT_SKIBIDI_TOILET,
  MOCK_REPORT_BARBENHEIMER,
  getMockReportByTopic,
} from "./mockReports";

export {
  unwiredResearchIntelligenceRc3Ports,
  mockResearchIntelligenceProvider,
  entitiesFromReport,
  timelineFromReport,
  relationshipsFromReport,
  coverageFromReport,
  type ResearchIntelligenceRc3Ports,
  type ResearchIntelligenceProvider,
  type ResearchWorkflowPort,
  type EvidenceScoringIntelligencePort,
  type EntityExtractionIntelligencePort,
  type TimelineBuilderIntelligencePort,
  type RelationshipDiscoveryIntelligencePort,
  type InternalLinkingIntelligencePort,
  type GapDetectionIntelligencePort,
} from "./rc3Integration";
