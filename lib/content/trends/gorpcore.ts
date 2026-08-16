import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t40",
  slug: "gorpcore",
  title: "Gorpcore",
  category: "trend",
  description:
    "Outdoor gear as everyday fashion — Patagonia fleeces, Salomon sneakers, and trail chic in the city.",
  imageGradient: "from-orange-600 via-amber-700 to-stone-600",
  scores: { relevance: 36, influence: 72, cringe: 25, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 36,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 34,
    recentRevival: false,
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Gorpcore trend”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=3,367 for “Internet aesthetic”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=755 prev7=862 (-12%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Gorpcore”",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “Gorpcore trend”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Gorpcore trend”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Gorpcore trend\"",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Gorpcore trend”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  historicalDate: "2017-01-01",
  views: 1400000,
  trendDirection: "stable",
  tags: ["fashion", "outdoors", "streetwear", "2020s", "aesthetic"],
  origin:
    "Gorp (Good Old Raisins and Peanuts = trail mix) slang met high fashion when luxury and streetwear adopted Arc'teryx, The North Face, and hiking boots around 2017–2020. TikTok and Instagram runway edits made 'mountain cosplay' a city uniform — functional gear as status without ever hiking.",
  summary:
    "Gorpcore is Patagonia in the coffee shop: technical fabrics, earthy palettes, and outdoor brands as daily wear. It overlaps normcore and athleisure but signals outdoorsy taste (real or performed).",
  relatedSlugs: ["old-money", "clean-girl-aesthetic", "fit-check", "drip"],
  sources: [
    {
      title: "Gorpcore — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gorpcore",
      domain: "en.wikipedia.org",
    },
    {
      title: "Gorpcore — Vogue",
      url: "https://www.vogue.com/article/gorpcore-fashion-trend",
      domain: "vogue.com",
    },
  ],
};

export default entry;
