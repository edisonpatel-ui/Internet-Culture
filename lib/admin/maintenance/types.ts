/**
 * Experimental Maintenance Center — types.
 * Propose → review → apply. Never auto-commit / auto-push.
 */

import type { ContentCategory, DynamicMetadata, Scores, TrendDirection } from "@/types";

export type MaintenanceScopeKind =
  | "entire"
  | "category"
  | "selected"
  | "prompt";

export type MaintenanceCategoryFilter =
  | "meme"
  | "slang"
  | "event"
  | "creator"
  | "trend"
  | "brainrot";

export interface MaintenanceRefreshRequest {
  kind: MaintenanceScopeKind;
  /** When kind === "category" */
  category?: MaintenanceCategoryFilter;
  /** When kind === "selected" */
  slugs?: string[];
  /** When kind === "prompt" */
  prompt?: string;
}

export interface MaintenanceEntryChange {
  slug: string;
  title: string;
  category: ContentCategory | string;
  beforeScores: Scores;
  afterScores: Scores;
  beforeTrendDirection: TrendDirection;
  afterTrendDirection: TrendDirection;
  beforeTrendingScore: number | null;
  afterTrendingScore: number | null;
  relevanceDelta: number | null;
  trendingDelta: number | null;
  lastReviewed: string;
  currentStatus?: DynamicMetadata["currentStatus"];
  activePlatforms?: string[];
  popularityNotes?: string;
  usedCatalogFallback: boolean;
  needsManualReview: boolean;
  reviewReasons: string[];
  /** Full after-state for apply */
  after: {
    scores: Scores;
    trendDirection: TrendDirection;
    lastUpdated: string;
    dynamicMetadata: DynamicMetadata;
  };
}

export interface MaintenanceRefreshReport {
  id: string;
  createdAt: string;
  status: "proposed" | "applied" | "discarded";
  request: MaintenanceRefreshRequest;
  /** Human-readable scope summary */
  scopeLabel: string;
  /** How the prompt was interpreted (when applicable) */
  promptInterpretation?: string;
  targetCount: number;
  updatedCount: number;
  unchangedCount: number;
  changes: MaintenanceEntryChange[];
  largestRelevanceChanges: Array<{
    slug: string;
    title: string;
    from: number;
    to: number;
    delta: number;
  }>;
  largestTrendingChanges: Array<{
    slug: string;
    title: string;
    from: number;
    to: number;
    delta: number;
  }>;
  manualReviewSlugs: string[];
  appliedAt?: string;
  appliedCount?: number;
  notes: string[];
}
