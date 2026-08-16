import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t5",
  slug: "looksmaxxing",
  title: "Looksmaxxing",
  category: "trend",
  description:
    "An online self-improvement subculture focused on maximizing physical appearance — from skincare and gym routines to contested 'looksmax' jargon on Reddit and TikTok.",
  imageGradient: "from-amber-500 via-orange-500 to-red-500",
  scores: { relevance: 75, influence: 87, cringe: 78, brainrot: 75 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 75,
    currentStatus: "highly-active",
    activePlatforms: [
      "tiktok",
      "reddit",
      "news",
    ],
    popularity: 71,
    trendingScore: 71,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=71 (Google News: 22 items in last 60d (40 returned) for “Looksmaxxing trend”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Looksmaxxing trend”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Looksmaxxing”",
      "[news/recent-articles] Google News: 22 items in last 60d (40 returned) for “Looksmaxxing trend”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Looksmaxxing trend”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Looksmaxxing trend\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/title absurdity cue (brainrot character only)",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (90) with AI double-check (60): While niche forums and news show strong interest, low Google Trends and limited mainstream buzz suggest a moderate rather than peak popularity",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: news/recent-articles=71 (Google News: 22 items in last 60d (40 returned) for “Looksmaxxing trend”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-05",
  lastUpdated: "2026-08-16",
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
