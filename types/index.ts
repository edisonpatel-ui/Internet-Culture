// ─── Primitive enums ─────────────────────────────────────────────────────────

export type ContentCategory =
  | "meme"
  | "slang"
  | "trend"
  | "brainrot"
  | "event"
  | "creator";

export type TrendDirection = "rising" | "declining" | "stable" | "new";

/**
 * Lifecycle state of an entry — distinct from TrendDirection.
 * TrendDirection tracks real-time movement.
 * EntryStatus tracks where the entry sits in its cultural arc.
 */
export type EntryStatus =
  | "rising"
  | "trending"
  | "peak"
  | "declining"
  | "archived";

export type AiInsightStatus = "pending" | "approved" | "rejected";

// ─── Scores ──────────────────────────────────────────────────────────────────

/**
 * Encyclopedia cultural scores (0–100) — exactly four dimensions.
 *
 * Keep this simple. Do not add popularity, longevity, virality, or
 * derived “search interest” fields here. See lib/intelligence/scoreDocs.ts.
 */
export interface Scores {
  /** How culturally current / actively discussed this is right now. */
  relevance: number;
  /** How much this shaped internet culture (lasting footprint). */
  influence: number;
  /** Perceived online cringe reception — not editorial personal taste. */
  cringe: number;
  /** Absurdist / chaotic energy associated with the topic. */
  brainrot: number;
}

// ─── Media ───────────────────────────────────────────────────────────────────

/**
 * Type of media asset.
 */
export type MediaItemType =
  | "image"
  | "video"
  | "gif"
  | "embed";

export type MediaPlatform =
  | "youtube"
  | "tiktok"
  | "twitter"
  | "instagram"
  | "reddit"
  | "twitch"
  | "wikimedia"
  | "knowyourmeme"
  | "original"
  | "other";

/**
 * Defines where media appears inside an article.
 *
 * featured:
 * - Main visual identity of the article.
 * - Used for hero sections and article previews.
 * - Normally only one item per article.
 *
 * supporting:
 * - Additional images, screenshots, examples, or visual context.
 * - Appears inside the media gallery.
 *
 * video:
 * - Important videos, interviews, clips, reactions, etc.
 * - Appears inside the media gallery.
 *
 * reference:
 * - Historical documentation or supporting source material.
 * - Appears only when useful.
 */
export type MediaRole =
  | "featured"
  | "supporting"
  | "video"
  | "reference";

export interface MediaItem {
  // ── Identity ────────────────────────────────────────────────────────

  /**
   * Determines how this media is used throughout the website.
   */
  role: MediaRole;

  type: MediaItemType;

  /**
   * Full URL:
   * - image source
   * - YouTube link
   * - embed URL
   */
  url: string;

  title: string;

  // ── Attribution ─────────────────────────────────────────────────────

  source: string;

  sourceUrl: string;

  platform: MediaPlatform;

  // ── Legal context ────────────────────────────────────────────────────

  attribution?: string;

  license?: string;

  // ── Editorial metadata ──────────────────────────────────────────────

  description?: string;

  date?: string;

  tags?: string[];

  /**
   * Human verification status.
   * Future AI-generated suggestions should default false.
   */
  verified?: boolean;
}

// ─── Sources & references ─────────────────────────────────────────────────────

export interface EntrySource {
  title: string;
  url?: string;
  domain?: string;
}

// ─── Supporting content types ─────────────────────────────────────────────────

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface AffiliateProduct {
  name: string;
  description: string;
  priceLabel: string;
}

// ─── Relationship map ─────────────────────────────────────────────────────────

/**
 * Typed cultural relationships (optional).
 * Prefer these over generic same-category filler when ranking related articles.
 * `relatedSlugs` remains the editorial shortcut and stays fully compatible.
 */
export interface RelationshipMap {
  relatedTo?: string[];
  inspiredBy?: string[];
  popularizedBy?: string[];
  originatedFrom?: string[];
  spawnedVariants?: string[];
  /** This entry popularized the linked topics. */
  popularized?: string[];
  /** This entry originated the linked topics. */
  originated?: string[];
  sameEra?: string[];
  sameFormat?: string[];
  memberOf?: string[];
  relatedSlang?: string[];
  relatedEvent?: string[];
  community?: string[];
}

// ─── Base entry ───────────────────────────────────────────────────────────────

export interface BaseEntry {
  // Identity
  id: string;
  slug: string;
  title: string;
  category: ContentCategory;
  description: string;

  // Lifecycle
  trendDirection: TrendDirection;
  status?: EntryStatus;

  addedAt: string;
  lastUpdated?: string;

  dateStarted?: string;
  dateEnded?: string;

  /**
   * Real-world historical date for timeline features.
   * Represents when the cultural event/meme actually originated.
   */
  historicalDate?: string;

  // Attribution
  origin?: string;
  creator?: string;

  // Scores
  scores: Scores;

  // Stats
  views: number;

  // Media
  /**
   * Legacy placeholder fields.
   * Kept for backward compatibility.
   */
  imageGradient: string;
  imageUrl?: string;
  thumbnailUrl?: string;

  /**
   * Canonical media system.
   *
   * Structure:
   *
   * Article
   *  ↓
   * Featured Media (hero/cover image)
   *  ↓
   * Media Gallery
   *      ├── Supporting images
   *      ├── Videos
   *      └── Reference material
   *
   * The MediaRole field controls placement.
   *
   * Rules:
   * - Featured media powers article previews and hero sections.
   * - Supporting media appears in the gallery.
   * - Videos appear in the gallery.
   * - Do not create separate media systems.
   */
  media?: MediaItem[];

  // Discovery
  tags?: string[];

  relatedSlugs?: string[];

  // Information
  sources?: EntrySource[];

  // AI preparation (fields reserved for future systems — not public features yet)
  // Future trend/analysis tooling can consume: category, scores, tags,
  // relatedSlugs, relationships, sources, timeline fields, and aliases
  // from lib/content/aliases/registry.ts (aliases are not stored on entries).
  aiSummary?: string;
  aiStatus?: AiInsightStatus;
  aiGeneratedAt?: string;

  // Editorial (public prose summary only — NOT internal editorialStatus)
  summary?: string;

  // Knowledge graph — prefer typed edges over filler relatedSlugs
  relationships?: RelationshipMap;
}


// ─── Category-specific entry types ───────────────────────────────────────────

export interface MemeEntry extends BaseEntry {
  category: "meme";

  origin: string;

  meaning: string;

  timeline: TimelineEvent[];

  examples: string[];

  relatedSlugs: string[];

  affiliateProduct?: AffiliateProduct;

  variations?: string[];
}


export interface SlangEntry extends BaseEntry {
  category: "slang";

  definition: string;

  origin: string;

  usageExamples: string[];

  relatedSlugs: string[];
}


export interface EventEntry extends BaseEntry {
  category: "event";

  startDate?: string;

  endDate?: string;

  platform?: string;

  impact: string;

  highlights: string[];

  relatedSlugs: string[];

  participants?: string[];
}


// ─── Creator types ────────────────────────────────────────────────────────────

export type SocialPlatform =
  | "youtube"
  | "tiktok"
  | "twitch"
  | "instagram"
  | "x";


export interface CreatorPlatformLink {
  platform: SocialPlatform;

  handle: string;

  url?: string;
}


export interface CreatorEntry extends BaseEntry {
  category: "creator";

  /**
   * Approximate follower counts.
   * Example: "~10M"
   */
  followers?: Partial<Record<SocialPlatform, string>>;

  platforms?: CreatorPlatformLink[];

  careerStart?: string;

  notableMoments?: string[];
}


export interface BrainrotEntry extends BaseEntry {
  category: "brainrot";

  loreUniverse?: string;

  targetAgeGroup?: string;

  relatedSlugs?: string[];
}


// ─── Ranking types ────────────────────────────────────────────────────────────

export interface BrainrotRanking {
  rank: number;

  slug: string;

  title: string;

  brainrotScore: number;

  category: ContentCategory;

  /** Preview media fields — same resolution path as TrendCard / EntryCardMedia. */
  imageGradient: string;
  imageUrl?: string;
  media?: MediaItem[];
}


export type RankingType =
  | "brainrot"
  | "cringe"
  | "popular"
  | "viral"
  | "newest"
  | "fastest-growing"
  | "fastest-declining"
  | "influential"
  | "underrated"
  | "discussed";


export interface RankingSystem {
  id: RankingType;

  label: string;

  icon: string;

  description: string;
}