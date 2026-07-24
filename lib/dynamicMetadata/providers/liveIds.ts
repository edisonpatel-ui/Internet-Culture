/**
 * Live vs fallback provider classification for evidence-first scoring.
 */

import type { DynamicProviderId } from "./types";

/** Offline / heuristic providers — must not drive Current Relevance or Trending. */
export const FALLBACK_PROVIDER_IDS: ReadonlySet<DynamicProviderId> = new Set([
  "catalog-evidence",
  "authority-sources",
]);

export function isLiveEvidenceProvider(id: DynamicProviderId): boolean {
  return !FALLBACK_PROVIDER_IDS.has(id);
}
