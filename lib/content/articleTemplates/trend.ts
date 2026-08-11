import type { ArticleTemplate } from "./types";

/**
 * Trend (BaseEntry, category "trend") — reference article: Looksmaxxing.
 * No dedicated *Entry subtype — uses shared BaseEntry fields plus
 * dynamicMetadata for live status.
 */
export const trendTemplate: ArticleTemplate = {
  category: "trend",
  publicName: "Trend",
  sections: [
    "identity",
    "quickOverview",
    "history",
    "culturalContext",
    "spreadEcosystem",
    "references",
    "metadata",
    "seo",
  ],
  focus:
    "What changed culturally, why it spread, and what it's connected to — trends are about a shift in behavior/subculture, not a single joke or event. Contested/controversial trends should be described neutrally, not endorsed.",
  fields: [
    {
      key: "description",
      label: "Card description",
      rule: "ONE punchy sentence, max ~25 words, capturing the subculture/behavior in vivid concrete terms.",
      goodExample:
        "An online self-improvement subculture focused on maximizing physical appearance — from skincare and gym routines to contested 'looksmax' jargon on Reddit and TikTok.",
      badExample: "\"A trend that became popular on social media.\"",
    },
    {
      key: "meaning / summary",
      label: "Overview",
      rule: "1-3 sentences: what the trend actually IS in practice, before any history. Name the specific platforms/communities involved.",
      goodExample:
        "A self-improvement subculture centered on maximizing physical appearance through skincare, fitness, and grooming routines, with its own specialized jargon circulating on Reddit and TikTok.",
    },
    {
      key: "origin",
      label: "Origin",
      rule: "Dense narrative prose with specific communities, platforms, and dates. State plainly what is unconfirmed rather than guessing.",
      goodExample:
        "Emerged from forum-based self-improvement and \"looks\" communities before spreading to Reddit and, later, TikTok, where the jargon and routines were repackaged for short-form video.",
    },
    {
      key: "tags",
      label: "Tags",
      rule: "Concrete platforms/communities/related terms, not generic words.",
      goodExample: "[\"looksmaxxing\", \"mewing\", \"tiktok\", \"reddit\", \"self-improvement\"]",
    },
  ],
  pageStructure:
    "Media and References are combined into one 'References' section (media shown without per-item source captions, citation list below it). No 'Explore nearby' footer section.",
};
