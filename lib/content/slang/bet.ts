import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s45",
  slug: "bet",
  title: "Bet",
  category: "slang",
  description:
    "A quick agreement or challenge acknowledgment — 'okay,' 'deal,' or 'you're on.'",
  imageGradient: "from-yellow-500 via-amber-500 to-orange-500",
  scores: { relevance: 44, influence: 80, cringe: 28, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 44,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 32,
    trendingScore: 43,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Bet slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Bet”",
      "[dictionary/platform-activity] Wiktionary last revision 2024-09-28",
      "[news/recent-articles] Google News: 3 items in last 60d (40 returned) for “Bet slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Dictionary / Britannica cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Bet slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Bet slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
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
      relevance: "Recent creation looks limited versus active internet topics. Signals: news/recent-articles=32 (Google News: 3 items in last 60d (40 returned) for “Bet slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-18",
  lastUpdated: "2026-08-16",
  historicalDate: "1990-01-01",
  views: 2000000,
  trendDirection: "stable",
  tags: ["aave", "agreement", "gen z", "tiktok", "texting"],
  definition:
    "Bet is a versatile affirmational slang word. As agreement it means 'okay / sounds good / I'm down.' As a challenge response it means 'you're on.' Tone is casual and confident — shorter and cooler than 'okay' or 'alright.'",
  origin:
    "Rooted in AAVE and broader American slang for accepting a wager or deal; mainstreamed online through texting, Vine, Twitter, and TikTok as an all-purpose affirmative. Dictionary and culture coverage treat it as established internet-era slang.",
  usageExamples: [
    "You free at 8? — Bet",
    "I bet I can beat your score",
    "Pull up later. Bet.",
  ],
  relatedSlugs: ["no-cap", "deadass", "w-dub", "locked-in", "say-wallahi-bro"],
  relationships: {
    relatedSlang: ["no-cap", "deadass", "locked-in"],
  },
  sources: [
    {
      title: "bet — Dictionary.com slang",
      url: "https://www.dictionary.com/e/slang/bet/",
      domain: "dictionary.com",
    },
  ],
};

export default entry;
