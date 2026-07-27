import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t5",
  slug: "looksmaxxing",
  title: "Looksmaxxing",
  category: "trend",
  description:
    "An online self-improvement subculture focused on maximizing physical appearance — from skincare and gym routines to contested 'looksmax' jargon on Reddit and TikTok.",
  imageGradient: "from-amber-500 via-orange-500 to-red-500",
  scores: { relevance: 45, influence: 78, cringe: 67, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 45,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
      "reddit",
      "wikipedia",
      "news",
    ],
    popularity: 39,
    trendingScore: 54,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 45 (today's recognition, not influence) · Trending 54 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=76,601 for “Looksmaxxing”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=18375 prev7=20841 (-12%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Looksmaxxing”",
      "[news/recent-articles] Google News: 34 items in last 30d (40 returned) for “Looksmaxxing”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Looksmaxxing”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags (not used for relevance/trending)",
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
  addedAt: "2026-07-05",
  lastUpdated: "2026-07-25",
  views: 420000,
  trendDirection: "declining",
  tags: ["looksmaxxing", "mewing", "tiktok", "reddit", "self-improvement", "sigma"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: non-misleading looksmaxxing diagram. Sources checked: Commons/KYM.
  // Gym/selfie stock would mislead as generic fitness.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/looksmaxxing",
      title: "Looksmaxxing — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/looksmaxxing",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of looksmaxxing culture and related slang.",
      date: "2020",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Looksmaxxing — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Looksmaxxing",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["mewing", "sigma", "sigma-grindset", "mogging", "aura"],
  relationships: {
    relatedTo: ["mewing", "mogging"],
    relatedSlang: ["sigma", "aura"],
    sameEra: ["sigma-grindset"],
  },
};

export default entry;
