/**
 * Trend signal framework (Phase 7C — interfaces only).
 *
 * Defines the vocabulary for future search / platform / cultural / content
 * signals. No external APIs are connected yet; collectors return empty
 * observations until a future phase wires real sources.
 *
 * Do not import from client UI.
 */

/** High-level signal family. */
export type TrendSignalCategory =
  | "search"
  | "platform"
  | "cultural"
  | "content";

/**
 * Stable signal IDs for tooling + TrendIntelligence.signalIds.
 * Add new IDs carefully — treat as a soft vocabulary.
 */
export type TrendSignalId =
  // Search
  | "search-growth"
  | "internal-search-demand"
  // Platform
  | "tiktok-activity"
  | "youtube-activity"
  | "reddit-activity"
  | "creator-activity"
  // Cultural
  | "new-related-entries"
  | "cluster-growth"
  | "audience-expansion"
  // Content
  | "article-views"
  | "clicks"
  | "engagement";

export interface TrendSignalDefinition {
  id: TrendSignalId;
  category: TrendSignalCategory;
  label: string;
  description: string;
  /**
   * Where this will come from later (docs only — not wired).
   * Examples: "Google Trends", "internal search logs", "TikTok Research API".
   */
  futureSource: string;
}

/** A single measured (or placeholder) observation for a signal. */
export interface TrendSignalObservation {
  signalId: TrendSignalId;
  /**
   * Normalized 0–100 intensity when measured.
   * `null` means “not wired yet” or “no data”.
   */
  value: number | null;
  /** ISO timestamp when observed. */
  observedAt?: string;
  note?: string;
}

/** Bundle of observations for one topic/slug. */
export interface TrendSignalBundle {
  slug: string;
  observations: TrendSignalObservation[];
  /** True when at least one observation has a non-null value. */
  hasMeasuredData: boolean;
}

export const TREND_SIGNAL_DEFINITIONS: readonly TrendSignalDefinition[] = [
  {
    id: "search-growth",
    category: "search",
    label: "Search growth",
    description: "External search interest rising for the topic.",
    futureSource: "Search interest APIs (e.g. Google Trends) — not connected",
  },
  {
    id: "internal-search-demand",
    category: "search",
    label: "Internal search demand",
    description: "Hub search queries / click-through for this topic.",
    futureSource: "Internal analytics / search logs — not connected",
  },
  {
    id: "tiktok-activity",
    category: "platform",
    label: "TikTok activity",
    description: "Short-form posting / sound / hashtag activity on TikTok.",
    futureSource: "TikTok Research / public trend surfaces — not connected",
  },
  {
    id: "youtube-activity",
    category: "platform",
    label: "YouTube activity",
    description: "Upload / view / Shorts activity related to the topic.",
    futureSource: "YouTube Data API — not connected",
  },
  {
    id: "reddit-activity",
    category: "platform",
    label: "Reddit activity",
    description: "Subreddit discussion volume / upvote spikes.",
    futureSource: "Reddit API / public listings — not connected",
  },
  {
    id: "creator-activity",
    category: "platform",
    label: "Creator activity",
    description: "Notable creators covering or remixing the topic.",
    futureSource: "Creator graph + platform feeds — not connected",
  },
  {
    id: "new-related-entries",
    category: "cultural",
    label: "New related entries",
    description: "New encyclopedia entries linking into this topic’s neighborhood.",
    futureSource: "Catalog graph diffs — internal, not wired as a live feed yet",
  },
  {
    id: "cluster-growth",
    category: "cultural",
    label: "Cluster growth",
    description: "Growth of entries inside a shared cultural cluster.",
    futureSource: "Cluster membership over time — internal heuristic for now",
  },
  {
    id: "audience-expansion",
    category: "cultural",
    label: "Audience expansion",
    description: "Topic crossing into new audiences / platforms.",
    futureSource: "Audience + platform metadata diffs — not connected",
  },
  {
    id: "article-views",
    category: "content",
    label: "Article views",
    description: "Encyclopedia article page views.",
    futureSource: "Site analytics — not connected (catalog `views` is editorial)",
  },
  {
    id: "clicks",
    category: "content",
    label: "Clicks",
    description: "Inbound clicks from listings, search, and related modules.",
    futureSource: "Site analytics — not connected",
  },
  {
    id: "engagement",
    category: "content",
    label: "Engagement",
    description: "Dwell / share / return visits (future).",
    futureSource: "Site analytics — not connected",
  },
] as const;

export const TREND_SIGNAL_BY_ID: Record<TrendSignalId, TrendSignalDefinition> =
  Object.fromEntries(
    TREND_SIGNAL_DEFINITIONS.map((d) => [d.id, d]),
  ) as Record<TrendSignalId, TrendSignalDefinition>;

export function listTrendSignalsByCategory(
  category: TrendSignalCategory,
): TrendSignalDefinition[] {
  return TREND_SIGNAL_DEFINITIONS.filter((d) => d.category === category);
}

/**
 * Placeholder collector — returns null-valued observations for every signal.
 * Wire real sources in a later phase; do not invent metrics here.
 */
export function collectTrendSignalPlaceholders(
  slug: string,
): TrendSignalBundle {
  const observations: TrendSignalObservation[] = TREND_SIGNAL_DEFINITIONS.map(
    (d) => ({
      signalId: d.id,
      value: null,
      note: "Placeholder — external/internal source not connected",
    }),
  );
  return { slug, observations, hasMeasuredData: false };
}

/**
 * Merge optional measured observations over placeholders.
 * Unknown signal IDs are ignored (soft vocabulary).
 */
export function mergeTrendSignalObservations(
  slug: string,
  measured: TrendSignalObservation[] = [],
): TrendSignalBundle {
  const byId = new Map<TrendSignalId, TrendSignalObservation>();
  for (const d of TREND_SIGNAL_DEFINITIONS) {
    byId.set(d.id, {
      signalId: d.id,
      value: null,
      note: "Placeholder — external/internal source not connected",
    });
  }
  for (const obs of measured) {
    if (!TREND_SIGNAL_BY_ID[obs.signalId]) continue;
    byId.set(obs.signalId, obs);
  }
  const observations = [...byId.values()];
  return {
    slug,
    observations,
    hasMeasuredData: observations.some((o) => o.value != null),
  };
}
