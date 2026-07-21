/**
 * Conceptual RC3 integration ports for the Research Intelligence Engine (RC4-C).
 *
 * Maps intelligence outputs ↔ RC3 workflows / RC3-C modules.
 * Implementations throw — no providers, no network, no article generation.
 */

import type { ResearchPackage } from "@/lib/ai/packages";
import type { EvidenceScoreResult } from "@/lib/ai/intelligence/evidenceScoring";
import type { EntityExtractionResult } from "@/lib/ai/intelligence/entityExtraction";
import type { TimelineBuildResult } from "@/lib/ai/intelligence/timelineBuilder";
import type { RelationshipDiscoveryResult } from "@/lib/ai/intelligence/relationshipDiscovery";
import type { InternalLinkSuggestionResult } from "@/lib/ai/intelligence/internalLinkSuggestions";

import type {
  CoverageReport,
  Evidence,
  Entity,
  KnowledgeGap,
  Relationship,
  ResearchInput,
  ResearchOutput,
  ResearchReport,
  TimelineEvent,
} from "./types";

const UNWIRED =
  "RC4-C Research Intelligence → RC3 port is unwired. No providers. Wire later via lib/ai workflows.";

function reject(): never {
  throw new Error(UNWIRED);
}

/** Research workflow: ResearchReport → ResearchPackage (RC3-B). */
export interface ResearchWorkflowPort {
  toResearchPackage(report: ResearchReport): Promise<ResearchPackage>;
}

/** Evidence scoring: Evidence[] → RC3-C scoreEvidence. */
export interface EvidenceScoringIntelligencePort {
  score(evidence: Evidence[]): Promise<EvidenceScoreResult[]>;
}

/** Entity extraction: report entities ↔ RC3-C entityExtraction. */
export interface EntityExtractionIntelligencePort {
  extract(input: ResearchInput): Promise<EntityExtractionResult>;
  fromReport(report: ResearchReport): Entity[];
}

/** Timeline builder: TimelineEvent[] ↔ RC3-C timelineBuilder. */
export interface TimelineBuilderIntelligencePort {
  build(input: ResearchInput): Promise<TimelineBuildResult>;
  fromReport(report: ResearchReport): TimelineEvent[];
}

/** Relationship discovery ↔ RC3-C relationshipDiscovery. */
export interface RelationshipDiscoveryIntelligencePort {
  discover(input: ResearchInput): Promise<RelationshipDiscoveryResult>;
  fromReport(report: ResearchReport): Relationship[];
}

/** Internal linking suggestions. */
export interface InternalLinkingIntelligencePort {
  suggest(report: ResearchReport): Promise<InternalLinkSuggestionResult>;
}

/** Gap detection — aligns with RC4-B GapDetectionPort shape. */
export interface GapDetectionIntelligencePort {
  detect(report: ResearchReport): Promise<KnowledgeGap[]>;
  coverage(report: ResearchReport): CoverageReport;
}

export interface ResearchIntelligenceRc3Ports {
  researchWorkflow: ResearchWorkflowPort;
  evidenceScoring: EvidenceScoringIntelligencePort;
  entityExtraction: EntityExtractionIntelligencePort;
  timelineBuilder: TimelineBuilderIntelligencePort;
  relationshipDiscovery: RelationshipDiscoveryIntelligencePort;
  internalLinking: InternalLinkingIntelligencePort;
  gapDetection: GapDetectionIntelligencePort;
}

/** Sync helpers that only reshape local mock data (safe, no throw). */
export function entitiesFromReport(report: ResearchReport): Entity[] {
  return [
    ...report.people,
    ...report.organizations,
    ...report.platforms,
    ...report.communities,
    ...report.memes,
    ...report.slang,
  ];
}

export function timelineFromReport(report: ResearchReport): TimelineEvent[] {
  return report.timeline;
}

export function relationshipsFromReport(report: ResearchReport): Relationship[] {
  return report.relationships;
}

export function coverageFromReport(report: ResearchReport): CoverageReport {
  return report.coverageAssessment;
}

/** Unwired async ports — future provider/workflow adapters. */
export const unwiredResearchIntelligenceRc3Ports: ResearchIntelligenceRc3Ports = {
  researchWorkflow: {
    toResearchPackage: async () => reject(),
  },
  evidenceScoring: {
    score: async () => reject(),
  },
  entityExtraction: {
    extract: async () => reject(),
    fromReport: entitiesFromReport,
  },
  timelineBuilder: {
    build: async () => reject(),
    fromReport: timelineFromReport,
  },
  relationshipDiscovery: {
    discover: async () => reject(),
    fromReport: relationshipsFromReport,
  },
  internalLinking: {
    suggest: async () => reject(),
  },
  gapDetection: {
    detect: async () => reject(),
    coverage: coverageFromReport,
  },
};

/** Future AI provider hook — replace mock builder with provider-backed pipeline. */
export interface ResearchIntelligenceProvider {
  /** Provider id for logging (e.g. "openai", "anthropic", "local-mock"). */
  id: string;
  run(input: ResearchInput): Promise<ResearchOutput>;
}

export const mockResearchIntelligenceProvider: ResearchIntelligenceProvider = {
  id: "local-mock",
  async run(input) {
    const { buildResearchReport } = await import("./researchReport");
    return buildResearchReport(input);
  },
};
