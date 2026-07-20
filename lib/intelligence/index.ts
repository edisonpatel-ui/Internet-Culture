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
  type LifecycleInferenceContext,
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
  TREND_SIGNAL_DEFINITIONS,
  TREND_SIGNAL_BY_ID,
  listTrendSignalsByCategory,
  collectTrendSignalPlaceholders,
  mergeTrendSignalObservations,
  type TrendSignalCategory,
  type TrendSignalId,
  type TrendSignalDefinition,
  type TrendSignalObservation,
  type TrendSignalBundle,
} from "./trendSignals";
export {
  TREND_INTELLIGENCE_REGISTRY,
  getTrendIntelligenceOverride,
  getTrendIntelligence,
  type ResolvedTrendIntelligence,
} from "./trendIntelligence";
export {
  scoreTrendOpportunity,
  rankTrendOpportunities,
  scoreCoverageGapOpportunities,
  applyAnalyticsToOpportunity,
  type OpportunityTier,
  type TrendOpportunityAssessment,
  type ScoreTrendOpportunityOptions,
} from "./opportunity";
export {
  normalizeAnalyticsEvent,
  normalizeAnalyticsEvents,
  toTrackableAnalyticsEvent,
  INTELLIGENCE_TO_ANALYTICS_EVENT,
  type IntelligenceAnalyticsEventKind,
  type IntelligenceAnalyticsEvent,
} from "./analyticsEvents";
export {
  buildAnalyticsIntelligenceReport,
  type AnalyticsIntelligenceReport,
  type CountedItem,
  type RecommendationPath,
  type GrowingClusterSignal,
} from "./analyticsSignals";
export {
  deriveAnalyticsTopicInfluence,
  suggestMomentumFromAnalytics,
  analyticsObservationsForEntry,
  analyticsOpportunityBoost,
  measuredSignalsFromAnalyticsReport,
  type AnalyticsTopicInfluence,
} from "./analyticsAdapters";
export {
  analyzeSearchQuery,
  aggregateSearchDemand,
  rankSearchCoverageOpportunities,
  searchOpportunitiesAsTrendAssessments,
  type SearchQueryAnalysis,
  type SearchCoverageOpportunity,
} from "./searchIntelligence";
export {
  COVERAGE_TARGETS,
  contentGapToCoverageTarget,
  getConnectedEntries,
  findCoverageGaps,
  suggestNextArticles,
  buildIntelligenceSnapshot,
  type ConnectedEntry,
  type CoverageGap,
  type CoverageTarget,
  type NextArticleSuggestion,
} from "./coverage";
export {
  CONTENT_GAP_REGISTRY,
  asEraList,
  gapCategoryToArticleCategory,
  listContentGapsByStatus,
  listOpenContentGaps,
  getContentGapById,
  getContentGapBySlug,
  prioritizeContentGaps,
  validateContentGapRegistry,
  type ContentGapCategory,
  type ContentGapImportance,
  type ContentGapStatus,
  type ContentGapEntry,
  type RoadmapEraId,
  type RoadmapPriority,
} from "./contentGap";
export {
  CONTENT_EXPANSION_ROADMAP,
  ROADMAP_ERA_META,
  listRoadmapByEra,
  listRoadmapByCategory,
  listRoadmapByPriority,
  summarizeContentRoadmap,
  type RoadmapEntry,
} from "./contentRoadmap";
export { validateIntelligenceMetadata } from "./validateIntelligence";
export type { GetTrendIntelligenceOptions } from "./trendIntelligence";

// Phase 7E — AI assistance foundation (internal; no public chatbot)
export {
  buildAiEntryContext,
  buildAiCatalogContext,
  nullAiAssistanceProvider,
  getAiAssistanceProvider,
  setAiAssistanceProvider,
  resetAiAssistanceProvider,
  suggestArticleOpportunities,
  identifyWeakCoverage,
  summarizeIntelligenceSnapshot,
  analyzeRelationships,
  reviewArticleQuality,
  analyzeTrendAssistance,
  runAssistancePass,
  aiUnavailableResult,
  aiHeuristicResult,
  aiModelResult,
  type AiAssistanceProvider,
  type AiCapability,
  type AiSuggestionSource,
  type AiSuggestionResult,
  type AiTrendAnalysis,
  type AiContentSuggestion,
  type AiQualityReview,
  type AiCulturalSummary,
  type AiRelationshipInsight,
  type AiEntryContext,
  type AiCatalogContext,
  type BuildAiContextOptions,
} from "./ai";
