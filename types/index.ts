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
 * TrendDirection tracks the real-time movement vector.
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

export interface Scores {
  relevance: number;
  brainrot: number;
  cringe: number;
  popularity?: number;
  virality?: number;
  influence?: number;
  longevity?: number;
  discussion?: number;
}

// ─── Media ───────────────────────────────────────────────────────────────────

export type MediaEmbedType =
  | "youtube"
  | "tiktok"
  | "twitter"
  | "instagram"
  | "reddit";

export interface MediaEmbed {
  type: MediaEmbedType;
  /** Full URL to the post or video. */
  url: string;
  caption?: string;
}

// ─── Sources & references ─────────────────────────────────────────────────────

export interface EntrySource {
  title: string;
  url?: string;
  /** Short domain label shown after the link, e.g. "knowyourmeme.com". */
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
 * Typed knowledge-graph relationships between entries.
 * Optional and additive — does not replace relatedSlugs.
 * Intended for future graph-based features and richer editorial linking.
 */
export interface RelationshipMap {
  /** Generic related slugs — mirrors the relatedSlugs concept as a named alias. */
  relatedTo?: string[];
  /** This entry was directly inspired by these entries. */
  inspiredBy?: string[];
  /** Creator slugs that popularized or amplified this entry. */
  popularizedBy?: string[];
  /** Platform, community, or earlier entry this originated from. */
  originatedFrom?: string[];
  /** Entries that this entry directly spawned or created. */
  spawnedVariants?: string[];
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
   * Real-world historical date for "On This Day" and timeline features.
   * Represents when the event/meme actually originated, not when it was added to the database.
   * Format: "YYYY-MM-DD" — partial dates like "2011-04-00" are not supported; omit if unknown.
   */
  historicalDate?: string;

  // Attribution
  /** Where/how this entry originated. Required on MemeEntry and SlangEntry. */
  origin?: string;
  creator?: string;

  // Scores
  scores: Scores;

  // Stats
  views: number;

  // Media
  /** Tailwind gradient classes — visual placeholder until imageUrl is available. */
  imageGradient: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  mediaEmbeds?: MediaEmbed[];

  // Discovery
  tags?: string[];
  /** Cross-collection related slugs. Category-specific types narrow this to required. */
  relatedSlugs?: string[];

  // Information
  sources?: EntrySource[];

  // AI preparation — no functionality yet, fields only
  aiSummary?: string;
  aiStatus?: AiInsightStatus;
  aiGeneratedAt?: string;

  // Editorial
  /** Encyclopedia-grade summary paragraph. Distinct from description (used on cards). */
  summary?: string;

  // Knowledge graph
  /** Typed relationship map for future graph-based features. Coexists with relatedSlugs. */
  relationships?: RelationshipMap;
}

// ─── Category-specific entry types ───────────────────────────────────────────

export interface MemeEntry extends BaseEntry {
  category: "meme";
  /** Required for memes; BaseEntry has the optional generic version. */
  origin: string;
  meaning: string;
  /** Meme-specific timeline; BaseEntry has the optional generic version. */
  timeline: TimelineEvent[];
  /** Meme-specific examples; BaseEntry has the optional generic version. */
  examples: string[];
  relatedSlugs: string[];
  affiliateProduct?: AffiliateProduct;
  /** Template variations of the meme format. */
  variations?: string[];
}

export interface SlangEntry extends BaseEntry {
  category: "slang";
  definition: string;
  /** Required for slang; BaseEntry has the optional generic version. */
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
  /** Key participants: people, brands, or platforms involved. */
  participants?: string[];
}

// ─── Creator types ────────────────────────────────────────────────────────────

export type SocialPlatform = "youtube" | "tiktok" | "twitch" | "instagram" | "x";

export interface CreatorPlatformLink {
  platform: SocialPlatform;
  /** Public handle / username on that platform. */
  handle: string;
  url?: string;
}

export interface CreatorEntry extends BaseEntry {
  category: "creator";
  /** Follower / subscriber estimates — use approximate strings like "~10M", never exact integers. */
  followers?: Partial<Record<SocialPlatform, string>>;
  platforms?: CreatorPlatformLink[];
  /** Year or ISO date when the creator became publicly active. */
  careerStart?: string;
  /** Key milestones or viral moments in plain text. */
  notableMoments?: string[];
}

export interface BrainrotEntry extends BaseEntry {
  category: "brainrot";
  /** The fictional universe or series this belongs to, e.g. "Skibidi Toilet". */
  loreUniverse?: string;
  /** Primary audience demographic, e.g. "Gen Alpha". */
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
