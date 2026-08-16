import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s82",
  slug: "tea-spilling",
  title: "Tea / Spilling Tea",
  category: "slang",
  description:
    "Gossip — especially juicy, verified-sounding drama delivered with flair.",
  imageGradient: "from-amber-700 via-orange-600 to-yellow-600",
  scores: { relevance: 36, influence: 72, cringe: 32, brainrot: 20 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 36,
    currentStatus: "classic",
    activePlatforms: [
      "youtube",
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 37,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Tea slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,234 for “Fruit (slang)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=737 prev7=769 (-4%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Tea”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-03-15",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “Tea slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Tea slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Tea slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Tea slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  views: 1800000,
  trendDirection: "stable",
  tags: ["aave", "lgbtq", "gossip", "youtube", "2010s"],
  definition:
    "'Tea' is gossip or the truth behind drama — 'what's the tea?' 'Spill the tea' means share what you know, ideally with details. It pairs naturally with receipts (proof) and lore (long backstory). Tea content fuels YouTube drama channels, TikTok storytimes, and celebrity scandal cycles.",
  origin:
    "Tea/spill tea comes from Black drag and ballroom culture, popularized into wider LGBTQ+ slang, then mainstream through RuPaul's Drag Race and reaction YouTube in the 2010s. 'But that's none of my business' Kermit memes helped cement tea as internet gossip vocabulary.",
  usageExamples: [
    "Grab your cup — I am about to spill tea.",
    "The group chat has tea about that launch party.",
    "She did not name names but the tea was obvious.",
  ],
  relatedSlugs: ["receipts", "lore", "stan", "karen"],
  sources: [
    {
      title: "Tea (slang) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Tea_(slang)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
