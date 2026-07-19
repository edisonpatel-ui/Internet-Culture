export {
  getBrainrotScore,
  getCringeLevel,
  getCringeScore,
  getCulturalScoreSnapshot,
  getEntryYear,
  getInfluenceScore,
  getRelevanceScore,
} from "./culturalScores";
export { SCORE_DEFINITIONS, ALLOWED_SCORE_KEYS } from "./scoreDocs";
export {
  getSourceAuthorityBoost,
  listAuthoritySourceLabels,
} from "./sourceSignals";
export { getRelatedRecommendations } from "./related";
export {
  RELATION_REASON_LABELS,
  type CulturalScoreSnapshot,
  type RelatedRecommendation,
  type RelationReasonId,
} from "./types";

// Phase 7 — cultural intelligence foundation (internal / future systems)
export {
  getCulturalIntelligence,
  intelligenceOverlapScore,
  type ResolvedCulturalIntelligence,
} from "./culturalMeta";
export {
  LIFECYCLE_STAGES,
  LIFECYCLE_STAGE_LABELS,
  inferLifecycleStage,
  isPostPeakStage,
  isPrePeakStage,
} from "./lifecycle";
export {
  INTELLIGENCE_REGISTRY,
  getIntelligenceOverride,
} from "./registry";
export {
  CULTURAL_CLUSTERS,
  CLUSTER_LABELS,
  resolveClusterIds,
  sharedClusterIds,
  getClusterById,
  type CulturalCluster,
  type CulturalClusterId,
} from "./clusters";
export {
  getCulturalImportance,
  importanceAffinity,
  type ResolvedCulturalImportance,
} from "./importance";
export {
  COVERAGE_TARGETS,
  getConnectedEntries,
  findCoverageGaps,
  suggestNextArticles,
  buildIntelligenceSnapshot,
  type ConnectedEntry,
  type CoverageGap,
  type CoverageTarget,
  type NextArticleSuggestion,
} from "./coverage";
export { validateIntelligenceMetadata } from "./validateIntelligence";
