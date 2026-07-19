/**
 * Phase 7E — AI assistance foundation (internal only).
 *
 * No public chatbot. No auto-writing of articles.
 */

export type {
  AiCapability,
  AiSuggestionSource,
  AiSuggestionResult,
  AiTrendAnalysis,
  AiContentSuggestion,
  AiQualityDimension,
  AiQualityFinding,
  AiQualityReview,
  AiCulturalSummary,
  AiRelationshipInsight,
} from "./types";
export {
  aiUnavailableResult,
  aiHeuristicResult,
  aiModelResult,
} from "./types";

export type {
  AiEntryContext,
  AiCatalogContext,
  BuildAiContextOptions,
} from "./context";
export { buildAiEntryContext, buildAiCatalogContext } from "./context";

export type { AiAssistanceProvider } from "./provider";
export {
  nullAiAssistanceProvider,
  getAiAssistanceProvider,
  setAiAssistanceProvider,
  resetAiAssistanceProvider,
} from "./provider";

export {
  suggestArticleOpportunities,
  identifyWeakCoverage,
  summarizeIntelligenceSnapshot,
  analyzeRelationships,
  reviewArticleQuality,
  analyzeTrendAssistance,
  runAssistancePass,
} from "./assistance";
