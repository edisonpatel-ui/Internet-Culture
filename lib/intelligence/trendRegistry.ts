/**
 * Optional trend-intelligence slug seeds (Phase 7C).
 * Metadata only — never bulk-generate; never auto-write onto articles.
 */

import type { TrendIntelligence } from "@/types";

export const TREND_INTELLIGENCE_REGISTRY: Record<string, TrendIntelligence> =
  {};

export function getTrendIntelligenceOverride(
  slug: string,
): TrendIntelligence | undefined {
  return TREND_INTELLIGENCE_REGISTRY[slug];
}
