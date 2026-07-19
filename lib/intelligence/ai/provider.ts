/**
 * AI assistance provider port (Phase 7E — internal).
 *
 * Future vendors (OpenAI, Anthropic, local models, etc.) implement
 * {@link AiAssistanceProvider}. Default is a safe null provider —
 * no external APIs are connected in this phase.
 *
 * Do not import into public UI / chatbots.
 */

import type {
  AiCapability,
  AiContentSuggestion,
  AiCulturalSummary,
  AiQualityReview,
  AiRelationshipInsight,
  AiSuggestionResult,
  AiTrendAnalysis,
} from "./types";
import { aiUnavailableResult } from "./types";
import type { AiCatalogContext, AiEntryContext } from "./context";

/**
 * Internal AI assistance provider.
 * All methods return suggestions only — never write catalog content.
 */
export interface AiAssistanceProvider {
  readonly name: string;
  readonly capabilities: readonly AiCapability[];

  /** Whether this provider can fulfill a capability (connected + supports). */
  supports(capability: AiCapability): boolean;

  analyzeTrend(
    ctx: AiEntryContext,
  ): Promise<AiSuggestionResult<AiTrendAnalysis>>;

  suggestContent(
    ctx: AiCatalogContext,
  ): Promise<AiSuggestionResult<AiContentSuggestion[]>>;

  reviewQuality(
    ctx: AiEntryContext,
  ): Promise<AiSuggestionResult<AiQualityReview>>;

  summarizeCulture(
    ctx: AiEntryContext,
  ): Promise<AiSuggestionResult<AiCulturalSummary>>;

  analyzeRelationships(
    ctx: AiEntryContext,
  ): Promise<AiSuggestionResult<AiRelationshipInsight[]>>;
}

const ALL_CAPABILITIES: readonly AiCapability[] = [
  "trend-analysis",
  "content-suggestions",
  "quality-review",
  "cultural-summaries",
  "relationship-analysis",
] as const;

/**
 * Safe default — every method returns unavailable / null data.
 * Swap via {@link setAiAssistanceProvider} when a real vendor is added.
 */
export const nullAiAssistanceProvider: AiAssistanceProvider = {
  name: "null",
  capabilities: ALL_CAPABILITIES,

  supports() {
    return false;
  },

  async analyzeTrend() {
    return aiUnavailableResult<AiTrendAnalysis>("null", [
      "AI provider not connected — trend analysis unavailable",
      "Use heuristic helpers in lib/intelligence/ai/assistance.ts",
    ]);
  },

  async suggestContent() {
    return aiUnavailableResult<AiContentSuggestion[]>("null", [
      "AI provider not connected — content suggestions unavailable",
      "Use heuristic coverage / opportunity utilities instead",
    ]);
  },

  async reviewQuality() {
    return aiUnavailableResult<AiQualityReview>("null", [
      "AI provider not connected — quality review unavailable",
      "Use heuristic quality review helper for deterministic checks",
    ]);
  },

  async summarizeCulture() {
    return aiUnavailableResult<AiCulturalSummary>("null", [
      "AI provider not connected — cultural summaries unavailable",
      "Use heuristic summarizeIntelligenceSnapshot helper",
    ]);
  },

  async analyzeRelationships() {
    return aiUnavailableResult<AiRelationshipInsight[]>("null", [
      "AI provider not connected — relationship analysis unavailable",
      "Use heuristic analyzeRelationships helper",
    ]);
  },
};

let activeProvider: AiAssistanceProvider = nullAiAssistanceProvider;

export function getAiAssistanceProvider(): AiAssistanceProvider {
  return activeProvider;
}

/**
 * Test / future hook — replace the null provider with a real implementation.
 * Not used by public UI in Phase 7E.
 */
export function setAiAssistanceProvider(provider: AiAssistanceProvider): void {
  activeProvider = provider;
}

/** Reset to the safe null provider. */
export function resetAiAssistanceProvider(): void {
  activeProvider = nullAiAssistanceProvider;
}
