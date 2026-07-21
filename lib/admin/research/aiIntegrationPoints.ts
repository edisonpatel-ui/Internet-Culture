/**
 * Future AI integration points for the Research Workspace (RC4-B).
 *
 * Interfaces only — no provider calls, no RC3 workflow execution.
 * When wired later, implementations will call lib/ai workflows / intelligence.
 */

import type { ResearchSession } from "@/types/admin";
import type { ResearchPackage } from "@/lib/ai/packages";
import type { EvidenceScoreResult } from "@/lib/ai/intelligence/evidenceScoring";
import type { EntityExtractionResult } from "@/lib/ai/intelligence/entityExtraction";
import type { TimelineBuildResult } from "@/lib/ai/intelligence/timelineBuilder";
import type { RelationshipDiscoveryResult } from "@/lib/ai/intelligence/relationshipDiscovery";
import type { InternalLinkSuggestionResult } from "@/lib/ai/intelligence/internalLinkSuggestions";

/** Research → ResearchPackage (RC3-B researchWorkflow / researchPipeline). */
export interface ResearchAssistantPort {
  run(session: ResearchSession): Promise<ResearchPackage>;
}

/** Evidence scoring (RC3-C scoreEvidence / factConfidence). */
export interface EvidenceScoringPort {
  scoreClaim(claim: string, session: ResearchSession): Promise<EvidenceScoreResult>;
}

/** Entity extraction (RC3-C entityExtraction). */
export interface EntityExtractionPort {
  extract(session: ResearchSession): Promise<EntityExtractionResult>;
}

/** Timeline building (RC3-C timelineBuilder). */
export interface TimelineBuildingPort {
  build(session: ResearchSession): Promise<TimelineBuildResult>;
}

/** Relationship discovery (RC3-C relationshipDiscovery). */
export interface RelationshipDiscoveryPort {
  discover(session: ResearchSession): Promise<RelationshipDiscoveryResult>;
}

/** Internal links (RC3-C internalLinkSuggestions). */
export interface InternalLinksPort {
  suggest(session: ResearchSession): Promise<InternalLinkSuggestionResult>;
}

/** Gap detection (content roadmap / gap registry — future). */
export interface GapDetectionPort {
  suggestGaps(session: ResearchSession): Promise<
    Array<{ title: string; reason: string; suggestedSlug?: string }>
  >;
}

/**
 * Bundle of ports the Research Workspace will accept later.
 * RC4-B: all remain unimplemented stubs.
 */
export interface ResearchAiIntegrationPorts {
  research: ResearchAssistantPort;
  evidenceScoring: EvidenceScoringPort;
  entityExtraction: EntityExtractionPort;
  timelineBuilding: TimelineBuildingPort;
  relationshipDiscovery: RelationshipDiscoveryPort;
  internalLinks: InternalLinksPort;
  gapDetection: GapDetectionPort;
}

function notWired(name: string): never {
  throw new Error(
    `Research AI port "${name}" is not wired (RC4-B). Connect RC3 providers/workflows later.`,
  );
}

/** Placeholder ports — calling any method throws. */
export const unwiredResearchAiPorts: ResearchAiIntegrationPorts = {
  research: { run: async () => notWired("research") },
  evidenceScoring: { scoreClaim: async () => notWired("evidence_scoring") },
  entityExtraction: { extract: async () => notWired("entity_extraction") },
  timelineBuilding: { build: async () => notWired("timeline_building") },
  relationshipDiscovery: { discover: async () => notWired("relationship_discovery") },
  internalLinks: { suggest: async () => notWired("internal_links") },
  gapDetection: { suggestGaps: async () => notWired("gap_detection") },
};
