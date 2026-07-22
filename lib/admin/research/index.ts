/**
 * Internal Research Workspace services — session browsing + intelligence.
 * Editorial approval: lib/admin/researchReview (ApprovedResearch).
 */

export {
  listSessions,
  listActiveSessions,
  loadSession,
  createSession,
  updateSession,
  archiveSession,
  validateSession,
  resetResearchSessionStore,
} from "./sessionService";

export { MOCK_RESEARCH_SESSIONS } from "./mockData";

export { resolveReportForSession, findMockReportForTopic } from "./resolveReport";

export { startResearchJob } from "./startResearchJob";
export {
  startResearchJobAction,
  loadAssessmentAction,
} from "./actions";

export {
  unwiredResearchAiPorts,
  type ResearchAiIntegrationPorts,
  type ResearchAssistantPort,
  type EvidenceScoringPort,
  type EntityExtractionPort,
  type TimelineBuildingPort,
  type RelationshipDiscoveryPort,
  type InternalLinksPort,
  type GapDetectionPort,
} from "./aiIntegrationPoints";

export * from "./intelligence";
