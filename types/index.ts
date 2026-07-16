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

export interface TimelineEvent {
  date: string;
  event: string;
}

export interface AffiliateProduct {
  name: string;
  description: string;
  priceLabel: string;
}

export interface BrainrotRanking {
  rank: number;
  slug: string;
  title: string;
  brainrotScore: number;
  category: ContentCategory;
}

export type SearchableEntry = BaseEntry & {
  searchTags: string[];
};
