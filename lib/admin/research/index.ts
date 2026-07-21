/**
 * Internal Research Workspace services (RC4-B).
 * Mock-backed. No providers. No public encyclopedia writes.
 *
 * RC4-C: Research Intelligence Engine under ./intelligence
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
