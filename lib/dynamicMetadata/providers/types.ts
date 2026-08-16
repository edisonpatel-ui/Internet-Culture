/**
 * Dynamic signal provider port — future Google Trends / Reddit / YouTube / etc.
 * plug in here without changing article architecture.
 */

export type DynamicProviderId =
  | "catalog-evidence"
  | "authority-sources"
  | "wikipedia"
  | "know-your-meme"
  | "dictionary"
  | "news"
  | "google-trends"
  | "reddit"
  | "bluesky"
  | "youtube"
  | "creator-pages";

export type DynamicSignalKind =
  | "search-interest"
  | "discussion-volume"
  | "recent-uploads"
  | "recent-articles"
  | "platform-activity"
  | "remix-activity"
  | "mockery-signal"
  | "outdatedness"
  | "absurdity"
  | "gen-cohort-adoption"
  | "authority-documentation"
  | "age-years"
  | "editorial-trend";

export interface DynamicSignalObservation {
  providerId: DynamicProviderId;
  kind: DynamicSignalKind;
  /**
   * Normalized 0–100 when measured.
   * `null` = provider ran but found no usable signal (not the same as 0).
   */
  value: number | null;
  /** Human-readable note for evidenceNotes (no secrets). */
  note?: string;
  /** ISO timestamp when observed. */
  observedAt?: string;
  /** Supporting URLs when the provider discovered them. */
  sourceUrls?: string[];
}

export interface DynamicSignalBundle {
  slug: string;
  title: string;
  observations: DynamicSignalObservation[];
  /** Providers that executed (including those that returned only nulls). */
  providersAttempted: DynamicProviderId[];
  /** True when any observation has a non-null value from a live/catalog provider. */
  hasMeasuredData: boolean;
  /** True when at least one live (non-catalog) provider returned a numeric signal. */
  hasLiveEvidence?: boolean;
}

export interface DynamicSignalProviderContext {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  /** Existing source URLs on the entry. */
  sourceUrls: string[];
  /** Approximate age in years when known. */
  ageYears: number | null;
  trendDirection: string;
  scores: {
    relevance: number;
    influence: number;
    cringe: number;
    brainrot: number;
  };
}

/**
 * Implement this interface to add a live data source later.
 * Must never throw for “no API key” — return empty observations instead.
 */
export interface DynamicSignalProvider {
  id: DynamicProviderId;
  label: string;
  /** Trust tier for exhaustion messaging (1 = highest). */
  priority: 1 | 2 | 3 | 4 | 5;
  collect(
    ctx: DynamicSignalProviderContext,
  ): Promise<DynamicSignalObservation[]> | DynamicSignalObservation[];
}
