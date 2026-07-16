export type ContentCategory =
  | "meme"
  | "slang"
  | "trend"
  | "brainrot"
  | "event";

export type TrendDirection = "rising" | "declining" | "stable" | "new";

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

export interface BaseEntry {
  id: string;
  slug: string;
  title: string;
  category: ContentCategory;
  description: string;
  imageGradient: string;
  scores: Scores;
  addedAt: string;
  views: number;
  trendDirection: TrendDirection;
  tags?: string[];
}

export interface MemeEntry extends BaseEntry {
  category: "meme";
  meaning: string;
  origin: string;
  timeline: TimelineEvent[];
  examples: string[];
  relatedSlugs: string[];
  affiliateProduct?: AffiliateProduct;
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
}

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface AffiliateProduct {
  name: string;
  description: string;
  priceLabel: string;
}

export interface RankingEntry {
  rank: number;
  slug: string;
  title: string;
  score: number;
  category: ContentCategory;
  scoreLabel: string;
  description?: string;
}

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

export type SearchableEntry = BaseEntry & {
  searchTags: string[];
};
