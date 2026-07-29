import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t8",
  slug: "girl-dinner",
  title: "Girl Dinner",
  category: "trend",
  description:
    "Snack-plate meals posted as aesthetic chaos — relatable, debated, endlessly duplicated.",
  imageGradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
  scores: { relevance: 44, influence: 64, cringe: 45, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 44,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 41,
    trendingScore: 50,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 44 (today's recognition, not influence) · Trending 50 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=94 for “Girl Geek Dinners”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=16 prev7=15 (7%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Girl”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-13",
      "[news/recent-articles] Google News: 20 items in last 30d (40 returned) for “Girl Dinner”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Girl Dinner”",
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
      "youtube",
      "catalog-evidence",
    ],
    usedCatalogFallback: false,
  },
  addedAt: "2026-05-12",
  lastUpdated: "2026-07-25",
  views: 290000,
  trendDirection: "declining",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: TikTok snack-plate Girl Dinner still. Sources checked: Commons
  // charcuterie/snack (generic food). Generic boards mislead as food stock.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/girl-dinner",
      title: "Girl Dinner — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/girl-dinner",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and spread of the Girl Dinner snack-plate aesthetic.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Girl Dinner — Wikipedia search",
      url: "https://en.wikipedia.org/w/index.php?search=Girl%20Dinner&title=Special:Search&fulltext=1",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["brat-summer", "its-giving"],
};

export default entry;
