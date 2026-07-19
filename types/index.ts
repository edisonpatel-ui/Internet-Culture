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
 * Optional editorial lifecycle flag on an entry — distinct from TrendDirection
 * and from intelligence `lifecycleStage` (see CulturalIntelligence).
 *
 * TrendDirection tracks real-time movement (rising / stable / declining).
 * EntryStatus is a coarse editorial arc flag (rarely set today).
 * CulturalIntelligence.lifecycleStage is the Phase 7 model:
 * emerging → rising → peak → declining → legacy.
 *
 * Do not auto-write status or lifecycleStage from inference helpers.
 */
export type EntryStatus =
  | "rising"
  | "trending"
  | "peak"
  | "declining"
  | "archived";

// ─── Cultural intelligence (Phase 7 — internal / optional) ───────────────────

/**
 * Cultural era bucket for intelligence tooling.
 * Optional — not required on existing articles.
 */
export type CulturalEra =
  | "pre-internet"
  | "early-web"
  | "web-2"
  | "social"
  | "short-form"
  | "gen-alpha"
  | "unknown";

/**
 * Origin / home platform for a concept (intelligence metadata).
 * Prefer specific short-form values (youtube-shorts) when accurate.
 */
export type OriginPlatform =
  | "youtube"
  | "youtube-shorts"
  | "tiktok"
  | "instagram"
  | "twitter"
  | "reddit"
  | "4chan"
  | "tumblr"
  | "twitch"
  | "discord"
  | "myspace"
  | "newgrounds"
  | "snapchat"
  | "other"
  | "unknown";

/** Format of the cultural object (meme format, aesthetic, slang, etc.). */
export type CulturalFormatType =
  | "image-macro"
  | "reaction"
  | "animated-meme"
  | "video-meme"
  | "catchphrase"
  | "slang-term"
  | "aesthetic"
  | "platform-culture"
  | "creator-persona"
  | "event"
  | "sound-meme"
  | "copypasta"
  | "other";

/** Primary audience signal for intelligence clustering. */
export type CulturalAudience =
  | "gen-alpha"
  | "gen-z"
  | "millennial"
  | "gen-x"
  | "gaming"
  | "mainstream"
  | "niche"
  | "cross-generational"
  | "other";

/**
 * Intelligence lifecycle stage (Phase 7).
 * Distinct from `trendDirection` and optional `status`.
 * Never auto-assigned onto catalog files by inference utilities.
 */
export type LifecycleStage =
  | "emerging"
  | "rising"
  | "peak"
  | "declining"
  | "legacy";

/**
 * Optional structured cultural metadata for future intelligence systems.
 *
 * - Not rendered in public UI in Phase 7
 * - All fields optional — existing articles remain valid without it
 * - May also be supplied via `lib/intelligence/registry.ts` without editing every file
 *
 * @see docs/INTELLIGENCE_DATA_MODEL.md
 */
export interface CulturalIntelligence {
  /** Broad historical era (early-web, short-form, gen-alpha, …). */
  era?: CulturalEra | CulturalEra[];
  /** Platform where the concept originated or primarily lived. */
  originPlatform?: OriginPlatform | OriginPlatform[];
  /**
   * Freeform cultural category labels for clustering
   * (e.g. "brainrot", "aesthetic", "gaming-meme").
   */
  culturalCategory?: string[];
  /** Who primarily uses / used this concept. */
  audience?: CulturalAudience | CulturalAudience[];
  /** Format type (animated meme, slang term, aesthetic, …). */
  formatType?: CulturalFormatType | CulturalFormatType[];
  /**
   * Explicit lifecycle stage. Prefer leaving unset and using
   * `inferLifecycleStage()` for derived views — do not bulk-write this.
   */
  lifecycleStage?: LifecycleStage;
  /**
   * Short cultural signals for future AI / recommendation systems
   * (e.g. "Brainrot", "Gen Alpha", "Short-form video").
   */
  signals?: string[];
}

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

  /**
   * Optional structured cultural intelligence metadata (Phase 7).
   * Internal / future systems only — not a public UI surface.
   * Safe to omit; defaults resolve via lib/intelligence helpers + registry.
   */
  intelligence?: CulturalIntelligence;

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