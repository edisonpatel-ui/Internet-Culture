/**
 * Editorial Intelligence Engine (RC3-C).
 *
 * Reasoning framework for future AI research / evaluation.
 * Provider-agnostic, side-effect free, human-in-the-loop.
 *
 * Distinct from `lib/intelligence/` (catalog cultural intelligence scores /
 * recommendations used by the live site).
 *
 * @see docs/EDITORIAL_INTELLIGENCE.md
 */

export {
  RESEARCH_METHODOLOGY_STEPS,
  getResearchMethodologyStep,
  nextResearchMethodologyStep,
  type ResearchMethodologyStepId,
  type ResearchMethodologyStep,
} from "./researchMethodology";

export {
  SOURCE_CATEGORY_PROFILES,
  getSourceCategoryProfile,
  compareCitationPriority,
  type SourceCategory,
  type SourceScale,
  type SourceCategoryProfile,
} from "./sourceEvaluation";

export {
  scoreEvidence,
  type EvidenceTier,
  type EvidenceSignals,
  type EvidenceScoreResult,
} from "./evidenceScoring";

export {
  assessFactConfidence,
  confidenceLabelToScore,
  type FactConfidenceLabel,
  type FactEvidenceInput,
  type FactConfidenceResult,
} from "./factConfidence";

export {
  buildContradictionAnalysis,
  createContradictionRecord,
  type ContradictionKind,
  type ContradictionClaim,
  type ContradictionRecord,
  type ContradictionAnalysisResult,
} from "./contradictionAnalysis";

export {
  buildTimeline,
  createTimelineEvent,
  type DatePrecision,
  type TimelineImportance,
  type TimelineSourceRef,
  type TimelineEvent,
  type TimelineBuildResult,
} from "./timelineBuilder";

export {
  buildCulturalImpactAssessment,
  type ImpactDimension,
  type ImpactSignalStrength,
  type CulturalImpactSignal,
  type CulturalImpactAssessment,
} from "./culturalImpact";

export {
  buildRelationshipDiscovery,
  type CulturalRelationshipKind,
  type DiscoveredRelationship,
  type RelationshipDiscoveryResult,
} from "./relationshipDiscovery";

export {
  buildInternalLinkSuggestions,
  type LinkSuggestionKind,
  type InternalLinkSuggestion,
  type InternalLinkSuggestionResult,
} from "./internalLinkSuggestions";

export {
  buildEntityExtraction,
  normalizeEntityAliases,
  type ExtractedEntityKind,
  type ExtractedEntity,
  type EntityExtractionResult,
} from "./entityExtraction";

export {
  buildQualityAssessment,
  type QualityIssueCode,
  type QualitySeverity,
  type QualityIssue,
  type QualityAssessmentResult,
} from "./qualityAssessment";
