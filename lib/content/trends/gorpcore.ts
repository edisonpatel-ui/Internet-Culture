import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t40",
  slug: "gorpcore",
  title: "Gorpcore",
  category: "trend",
  description:
    "Outdoor gear as everyday fashion — Patagonia fleeces, Salomon sneakers, and trail chic in the city.",
  imageGradient: "from-orange-600 via-amber-700 to-stone-600",
  scores: { relevance: 35, influence: 72, cringe: 25, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 35,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 39,
    trendingScore: 30,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 35 (today's recognition, not influence) · Trending 30 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=8,667 for “Gorpcore”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=1825 prev7=1721 (6%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Gorpcore”",
      "[news/recent-articles] Google News: 2 items in last 30d (40 returned) for “Gorpcore”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Gorpcore”",
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
  addedAt: "2026-07-23",
  lastUpdated: "2026-07-25",
  historicalDate: "2017-01-01",
  views: 1400000,
  trendDirection: "declining",
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
