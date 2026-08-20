/**
 * Experimental Maintenance Center — types.
 * Refresh → Preview → Apply. Never auto-commit / auto-push.
 */

import type { ContentCategory, DynamicMetadata, MediaItem, Scores, TrendDirection } from "@/types";

export type MaintenanceCategoryFilter =
  | "meme"
  | "slang"
  | "event"
  | "creator"
  | "trend";

export type MaintenanceRefreshOutcome =
  | "updated"
  | "no_changes"
  | "unknown"
  | "failed"
  | "skipped";

export type MaintenanceApplyResultKind =
  | "updated"
  | "no_changes_required"
  | "skipped"
  | "unknown"
  | "failed";

export type MaintenanceJobStatus =
  | "running"
  | "success"
  | "failed"
  | "stopped";

export interface MaintenanceProviderStatus {
  id: string;
  label: string;
  status: "ok" | "failed" | "no_data";
  note?: string;
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
  beforeCurrentRelevance: number | null;
  afterCurrentRelevance: number | "unknown" | null;
  relevanceDelta: number | null;
  trendingDelta: number | null;
  lastReviewed: string;
  currentStatus?: DynamicMetadata["currentStatus"];
  activePlatforms?: string[];
  popularityNotes?: string;
  /** Per-score explanations for Maintenance Preview */
  scoreReasons?: {
    relevance: string;
    influence: string;
    brainrot: string;
    cringe: string;
  };
  usedCatalogFallback: boolean;
  /** Propose-time classification */
  outcome: MaintenanceRefreshOutcome;
  outcomeReason: string;
  providers: MaintenanceProviderStatus[];
  /** Full before-state, for Undo. Absent on failed/skipped articles. */
  before?: {
    scores: Scores;
    trendDirection: TrendDirection;
    dynamicMetadata?: DynamicMetadata;
  };
  /** Full after-state for apply (absent when failed) */
  after?: {
    scores: Scores;
    trendDirection: TrendDirection;
    lastUpdated: string;
    dynamicMetadata: DynamicMetadata;
  };
  /**
   * Set only when this entry had NO media at all and a live search found a
   * candidate to backfill. Never set for an entry that already has media —
   * existing media (verified or not) is never touched by Refresh.
   */
  mediaBackfill?: MediaItem[];
  errorMessage?: string;
}

export interface MaintenanceApplyArticleResult {
  slug: string;
  title: string;
  result: MaintenanceApplyResultKind;
  reason: string;
  relevance?: { from: number; to: number };
  trending?: { from: number | null; to: number | null };
}

export interface MaintenanceRefreshReport {
  id: string;
  createdAt: string;
  status: "proposed" | "applied" | "discarded";
  jobStatus: MaintenanceJobStatus;
  category: MaintenanceCategoryFilter;
  scopeLabel: string;
  targetCount: number;
  processedCount: number;
  updatedCount: number;
  unchangedCount: number;
  unknownCount: number;
  failedCount: number;
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
  appliedAt?: string;
  appliedCount?: number;
  applyResults?: MaintenanceApplyArticleResult[];
  /** Set once this report's applied changes have been reverted via Undo. */
  undoneAt?: string;
  notes: string[];
  estimatedSecondsPerArticle: number;
  /** Set when the editor stopped mid-category */
  stoppedMessage?: string;
  resumedFromSlug?: string | null;
}

export interface MaintenanceJobProgress {
  jobId: string;
  reportId: string;
  status: MaintenanceJobStatus;
  category: MaintenanceCategoryFilter;
  scopeLabel: string;
  total: number;
  currentIndex: number;
  currentTitle: string | null;
  currentSlug: string | null;
  providers: MaintenanceProviderStatus[];
  estimatedSecondsRemaining: number;
  error?: string;
  /** True when finished with zero Updated/Unknown/Failed */
  noMaterialChanges?: boolean;
  processedCount?: number;
  stoppedMessage?: string;
}

export const CATEGORY_LABELS: Record<MaintenanceCategoryFilter, string> = {
  meme: "Memes",
  slang: "Slang",
  event: "Events",
  creator: "People",
  trend: "Trends",
};

/** Rough live-provider budget used for ETA display. */
export const ESTIMATED_SECONDS_PER_ARTICLE = 4;
