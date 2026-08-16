import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t8",
  slug: "girl-dinner",
  title: "Girl Dinner",
  category: "trend",
  description:
    "Snack-plate meals posted as aesthetic chaos — relatable, debated, endlessly duplicated.",
  imageGradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
  scores: { relevance: 68, influence: 64, cringe: 45, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 68,
    currentStatus: "current",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 63,
    trendingScore: 44,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=63 (Google News: 15 items in last 60d (40 returned) for “Girl Dinner”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=67 for “Girl Geek Dinners”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=12 prev7=21 (-43%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Girl”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-13",
      "[news/recent-articles] Google News: 15 items in last 60d (40 returned) for “Girl Dinner”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Girl Dinner”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Girl Dinner\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (80) with AI double-check (55): While there are several documentation signals and news mentions, many metrics are unrelated or show declining interest, and Google Trends is low, indicating moderate rather than high current popularity.",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=63 (Google News: 15 items in last 60d (40 returned) for “Girl Dinner”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-05-12",
  lastUpdated: "2026-08-16",
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
