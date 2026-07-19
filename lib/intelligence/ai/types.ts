/**
 * AI assistance types (Phase 7E — internal).
 *
 * All AI outputs are suggestions for human review.
 * Never auto-apply to catalog files, scores, or public UI.
 */

import type { ContentCategory, LifecycleStage, TrendMomentum } from "@/types";
import type { OpportunityTier } from "../opportunity";

/** Future provider capabilities (not all may be implemented). */
export type AiCapability =
  | "trend-analysis"
  | "content-suggestions"
  | "quality-review"
  | "cultural-summaries"
  | "relationship-analysis";

/**
 * How a suggestion was produced.
 * - unavailable: provider not connected
 * - heuristic: deterministic intelligence-layer suggestion (no LLM)
 * - ai: model output (still requires human review)
 */
export type AiSuggestionSource = "unavailable" | "heuristic" | "ai";

/**
 * Envelope for every AI / assistance result.
 * `requiresHumanReview` is always true by policy.
 */
export interface AiSuggestionResult<T> {
  status: AiSuggestionSource;
  provider: string;
  /** Suggestion payload — null when unavailable. */
  data: T | null;
  notes: string[];
  /** Always true — AI must never auto-modify content. */
  requiresHumanReview: true;
  generatedAt: string;
}

export interface AiTrendAnalysis {
  slug: string;
  suggestedLifecycle: LifecycleStage | null;
  suggestedMomentum: TrendMomentum | null;
  summary: string;
  signals: string[];
  confidence: number;
}

export interface AiContentSuggestion {
  concept: string;
  suggestedSlug: string;
  suggestedCategory: ContentCategory | "trend";
  reason: string;
  tier: OpportunityTier;
  priority: number;
  signals: string[];
}

export type AiQualityDimension =
  | "sources"
  | "media"
  | "relationships"
  | "prose"
  | "intelligence-metadata"
  | "freshness";

export interface AiQualityFinding {
  dimension: AiQualityDimension;
  severity: "info" | "improve" | "critical";
  message: string;
}

export interface AiQualityReview {
  slug: string;
  overall: "strong" | "improve" | "weak" | "unknown";
  findings: AiQualityFinding[];
  summary: string;
}

export interface AiCulturalSummary {
  slug: string;
  headline: string;
  summary: string;
  eras: string[];
  platforms: string[];
  audiences: string[];
  clusters: string[];
  keySignals: string[];
}

export interface AiRelationshipInsight {
  fromSlug: string;
  toSlug: string;
  strength: number;
  reasons: string[];
  suggestion: string;
}

export function aiUnavailableResult<T>(
  provider: string,
  notes: string[] = ["AI provider not connected — no model output"],
): AiSuggestionResult<T> {
  return {
    status: "unavailable",
    provider,
    data: null,
    notes,
    requiresHumanReview: true,
    generatedAt: new Date().toISOString(),
  };
}

export function aiHeuristicResult<T>(
  provider: string,
  data: T,
  notes: string[] = ["Deterministic intelligence heuristic — not an LLM"],
): AiSuggestionResult<T> {
  return {
    status: "heuristic",
    provider,
    data,
    notes,
    requiresHumanReview: true,
    generatedAt: new Date().toISOString(),
  };
}

export function aiModelResult<T>(
  provider: string,
  data: T,
  notes: string[] = ["Model suggestion — human review required before any catalog change"],
): AiSuggestionResult<T> {
  return {
    status: "ai",
    provider,
    data,
    notes,
    requiresHumanReview: true,
    generatedAt: new Date().toISOString(),
  };
}
