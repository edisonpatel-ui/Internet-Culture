import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s74",
  slug: "rage-bait",
  title: "Rage Bait",
  category: "slang",
  description:
    "Content engineered to make you angry enough to engage — the cousin of clickbait, optimized for quote-tweets.",
  imageGradient: "from-red-600 via-orange-600 to-red-700",
  scores: { relevance: 75, influence: 68, cringe: 50, brainrot: 30 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 75,
    currentStatus: "highly-active",
    activePlatforms: [
      "x",
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 73,
    trendingScore: 57,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=73 (Google News: 24 items in last 60d (40 returned) for “Rage Bait”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=21,428 for “Rage-baiting”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3761 prev7=4342 (-13%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Rage”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-02-14",
      "[news/recent-articles] Google News: 24 items in last 60d (40 returned) for “Rage Bait”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Rage Bait”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Rage Bait\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (92) with AI double-check (58): While the term has solid documentation and recent news mentions, declining pageviews and low Google‑Trends activity indicate it isn’t currently spiking, so its popularity is moderate rather than extremely high.",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=73 (Google News: 24 items in last 60d (40 returned) for “Rage Bait”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  views: 1300000,
  trendDirection: "declining",
  tags: ["twitter", "youtube", "algorithm", "2020s", "outrage"],
  definition:
    "Rage bait is posts, thumbnails, or takes designed to trigger outrage so you comment, share, or dunk on them — feeding the algorithm. Unlike accidental bad takes, rage bait is often deliberate ('unpopular opinion' threads, inflammatory thumbnails). Calling something rage bait is a way to refuse engagement.",
  origin:
    "The term merged 'rage' forum culture with 'clickbait' as Twitter/X and YouTube reward engagement over nuance in the 2020s. Creators and brands learned that controversy drives distribution; users coined 'rage bait' to label posts they suspected were farming outrage on purpose.",
  usageExamples: [
    "Do not quote-tweet that — pure rage bait.",
    "The thumbnail said 'WORST GENERATION' — classic rage bait.",
    "He posts rage bait every Monday for the engagement spike.",
  ],
  relatedSlugs: ["clickbait", "ratio", "performative", "brand-social-media-wars"],
  relationships: {
    relatedSlang: ["clickbait"],
  },
  sources: [
    {
      title: "Clickbait — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clickbait",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
