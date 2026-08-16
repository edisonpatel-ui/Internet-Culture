import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s75",
  slug: "clickbait",
  title: "Clickbait",
  category: "slang",
  description:
    "Headlines and thumbnails that promise more than they deliver — the original engagement hack of the feed era.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 0, influence: 89, cringe: 53, brainrot: 55 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 0,
    currentStatus: "historical",
    activePlatforms: [
      "youtube",
      "wikipedia",
    ],
    popularity: 0,
    trendingScore: 25,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (17 returned) for “Clickbait slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=4,379 for “Internet slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=982 prev7=998 (-2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Clickbait”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-09-22",
      "[news/recent-articles] Google News: 0 items in last 60d (17 returned) for “Clickbait slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited; Dictionary / Britannica cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Clickbait slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Clickbait slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=0 (Google News: 0 items in last 60d (17 returned) for “Clickbait slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  historicalDate: "2006-01-01",
  views: 2800000,
  trendDirection: "declining",
  tags: ["youtube", "journalism", "advertising", "2000s", "algorithm"],
  definition:
    "Clickbait is any title, thumbnail, or preview designed to maximize clicks through curiosity gaps, shock, or misleading promises — 'You won't BELIEVE...' The word is neutral-descriptive but usually negative: the content rarely matches the hype. Modern variants include thumbnail faces, red circles, and listicle slugs optimized for Facebook and YouTube.",
  origin:
    "Digital publishers in the late 2000s–early 2010s (Upworthy, BuzzFeed-era Facebook) industrialized curiosity-gap headlines. YouTube's recommendation system rewarded extreme thumbnails by the mid-2010s. 'Clickbait' entered everyday speech as users learned to recognize the pattern.",
  usageExamples: [
    "The video was two minutes of nothing — total clickbait.",
    "That news alert was clickbait; read the actual article.",
    "Red arrow on the thumbnail? Instant clickbait alarm.",
  ],
  relatedSlugs: ["rage-bait", "influencer-marketing", "youtube-creator-era", "ratio"],
  relationships: {
    relatedSlang: ["rage-bait"],
  },
  sources: [
    {
      title: "Clickbait — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clickbait",
      domain: "en.wikipedia.org",
    },
    {
      title: "Clickbait — Merriam-Webster",
      url: "https://www.merriam-webster.com/dictionary/clickbait",
      domain: "merriam-webster.com",
    },
  ],
};

export default entry;
