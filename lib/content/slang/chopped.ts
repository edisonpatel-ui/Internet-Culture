import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s18",
  slug: "chopped",
  title: "Chopped",
  category: "slang",
  description:
    "Ugly, unattractive, or simply not impressive — a dismissive verdict from Black internet culture.",
  imageGradient: "from-red-500 via-rose-500 to-pink-500",
  scores: { relevance: 25, influence: 68, cringe: 48, brainrot: 40 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 33,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Chopped slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=4,379 for “Internet slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=982 prev7=998 (-2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Chopped”",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Chopped slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Chopped slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Chopped slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Chopped slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  views: 410000,
  trendDirection: "stable",
  tags: ["aave", "appearance", "dismissive", "internet culture"],
  definition:
    "Used to describe someone or something as unattractive, poorly made, or generally lacking in quality. Rooted in African American Vernacular English (AAVE). Can refer to physical appearance, the quality of work, or a general dismissal.",
  origin:
    "Rooted in AAVE slang and spread through Black internet communities on Twitter, TikTok, and Instagram. Usage expanded broadly across internet culture through the early 2020s.",
  usageExamples: [
    "That haircut is chopped — he needs to go back",
    "Why is this design so chopped? A professional made this?",
    "I'm not chopped, I just had a bad game",
  ],
  relatedSlugs: ["mid", "l"],
  sources: [
    {
      title: "Chopped — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Chopped",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
