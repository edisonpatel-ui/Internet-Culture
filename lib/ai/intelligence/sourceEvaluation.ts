/**
 * Source evaluation — credibility profiles by source category (RC3-C).
 *
 * Pure data + helpers. Does not fetch URLs or call providers.
 */

/** Coarse source categories for editorial evaluation. */
export type SourceCategory =
  | "official"
  | "academic"
  | "journalism"
  | "primary_witness"
  | "archive"
  | "platform_documentation"
  | "wikipedia"
  | "know_your_meme"
  | "reddit"
  | "social_media"
  | "blog"
  | "unknown";

/** 1 = lowest, 5 = highest (relative editorial weight). */
export type SourceScale = 1 | 2 | 3 | 4 | 5;

export interface SourceCategoryProfile {
  category: SourceCategory;
  label: string;
  /** Baseline trust for factual claims. */
  credibility: SourceScale;
  /** Usefulness for reconstructing past culture. */
  historicalUsefulness: SourceScale;
  /** Preference order when citing (5 = cite first when available). */
  citationPriority: SourceScale;
  /** Risk of agenda, marketing, or community bias. */
  biasRisk: SourceScale;
  /** How hard it is for a human to verify the claim. */
  verificationDifficulty: SourceScale;
  notes: string;
}

export const SOURCE_CATEGORY_PROFILES: Record<
  SourceCategory,
  SourceCategoryProfile
> = {
  official: {
    category: "official",
    label: "Official",
    credibility: 5,
    historicalUsefulness: 4,
    citationPriority: 5,
    biasRisk: 2,
    verificationDifficulty: 1,
    notes: "Company/org statements, court filings, official blogs.",
  },
  academic: {
    category: "academic",
    label: "Academic",
    credibility: 5,
    historicalUsefulness: 5,
    citationPriority: 5,
    biasRisk: 2,
    verificationDifficulty: 2,
    notes: "Peer-reviewed or scholarly press; still check scope.",
  },
  journalism: {
    category: "journalism",
    label: "Journalism",
    credibility: 4,
    historicalUsefulness: 4,
    citationPriority: 5,
    biasRisk: 3,
    verificationDifficulty: 2,
    notes: "Reputable newsrooms with bylines and corrections policy.",
  },
  primary_witness: {
    category: "primary_witness",
    label: "Primary witness",
    credibility: 4,
    historicalUsefulness: 5,
    citationPriority: 4,
    biasRisk: 3,
    verificationDifficulty: 3,
    notes: "Creator posts, original uploads — authenticity must be checked.",
  },
  archive: {
    category: "archive",
    label: "Archive",
    credibility: 4,
    historicalUsefulness: 5,
    citationPriority: 4,
    biasRisk: 2,
    verificationDifficulty: 2,
    notes: "Wayback, library collections, museum/wiki commons records.",
  },
  platform_documentation: {
    category: "platform_documentation",
    label: "Platform documentation",
    credibility: 4,
    historicalUsefulness: 3,
    citationPriority: 4,
    biasRisk: 2,
    verificationDifficulty: 1,
    notes: "Help centers, API docs, status pages — good for product facts.",
  },
  wikipedia: {
    category: "wikipedia",
    label: "Wikipedia",
    credibility: 3,
    historicalUsefulness: 4,
    citationPriority: 3,
    biasRisk: 3,
    verificationDifficulty: 2,
    notes: "Useful overview; prefer cited primary/journalism underneath.",
  },
  know_your_meme: {
    category: "know_your_meme",
    label: "Know Your Meme",
    credibility: 3,
    historicalUsefulness: 5,
    citationPriority: 4,
    biasRisk: 3,
    verificationDifficulty: 2,
    notes: "Strong for meme chronology; still verify key claims.",
  },
  reddit: {
    category: "reddit",
    label: "Reddit",
    credibility: 2,
    historicalUsefulness: 3,
    citationPriority: 2,
    biasRisk: 4,
    verificationDifficulty: 4,
    notes: "Community signal / primary threads — not sole factual basis.",
  },
  social_media: {
    category: "social_media",
    label: "Social media",
    credibility: 2,
    historicalUsefulness: 3,
    citationPriority: 2,
    biasRisk: 4,
    verificationDifficulty: 4,
    notes: "Posts may be primary artifacts; attribution and permanence vary.",
  },
  blog: {
    category: "blog",
    label: "Blog",
    credibility: 2,
    historicalUsefulness: 2,
    citationPriority: 2,
    biasRisk: 4,
    verificationDifficulty: 3,
    notes: "Use when expert or contemporaneous; corroborate.",
  },
  unknown: {
    category: "unknown",
    label: "Unknown",
    credibility: 1,
    historicalUsefulness: 1,
    citationPriority: 1,
    biasRisk: 5,
    verificationDifficulty: 5,
    notes: "Unclassified — do not rely on alone.",
  },
};

export function getSourceCategoryProfile(
  category: SourceCategory,
): SourceCategoryProfile {
  return SOURCE_CATEGORY_PROFILES[category];
}

/** Higher is better for preferring citations. */
export function compareCitationPriority(
  a: SourceCategory,
  b: SourceCategory,
): number {
  return (
    SOURCE_CATEGORY_PROFILES[b].citationPriority -
    SOURCE_CATEGORY_PROFILES[a].citationPriority
  );
}
