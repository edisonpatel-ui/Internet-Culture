import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t3",
  slug: "demure-mindful",
  title: "Very Demure, Very Mindful",
  category: "trend",
  description:
    "TikTok catchphrase about understated elegance that became ironic workplace satire overnight.",
  imageGradient: "from-rose-500 via-pink-500 to-purple-500",
  scores: { relevance: 36, influence: 90, cringe: 56, brainrot: 26 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 36,
    currentStatus: "classic",
    activePlatforms: [
      "news",
    ],
    popularity: 25,
    trendingScore: 25,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Very Demure, Very Mindful”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Very Demure, Very Mindful”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Very”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-05-08",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “Very Demure, Very Mindful”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Very Demure, Very Mindful”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Very Demure, Very Mindful\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (36) with AI double-check (35): Sparse recent news and low Google Trends despite some documentation mean the catchphrase is only mildly known, not currently popular.",
    ],
    providersUsed: [
      "wikipedia",
      "know-your-meme",
      "dictionary",
      "news",
      "creator-pages",
      "authority-sources",
      "google-trends",
      "reddit",
      "bluesky",
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
    scoreReasons: {
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Very Demure, Very Mindful”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-08",
  lastUpdated: "2026-08-16",
  views: 890000,
  trendDirection: "declining",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: Jools demure TikTok still. Sources checked: Commons/Wikipedia
  // (no portrait; wrong Seattle file); TikTok CDN forbidden.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jools_Lebron",
      title: "Jools Lebron — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jools_Lebron",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Coverage of Jools Lebron and the 'very demure, very mindful' viral phrase.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Jools Lebron — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jools_Lebron",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["jools-lebron", "slay"],
};

export default entry;
