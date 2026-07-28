import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t6",
  slug: "mewing",
  title: "Mewing",
  category: "trend",
  description:
    "A tongue-posture technique from orthotropics that spread on TikTok and looksmaxxing forums as jawline advice — then became a joke about silence, jawlines, and 'mewing face.'",
  imageGradient: "from-teal-400 via-cyan-500 to-blue-500",
  scores: { relevance: 68, influence: 75, cringe: 79, brainrot: 32 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 25,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "tiktok",
    ],
    popularity: 30,
    trendingScore: 22,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 25 (today's recognition, not influence) · Trending 22 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikipedia page “Mewing (orthotropics)” found but pageviews unavailable",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Mewing”",
      "[news/recent-articles] Google News: 1 items in last 30d (40 returned) for “Mewing”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Mewing”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/category absurdity cue (not used for relevance/trending)",
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
  addedAt: "2026-06-28",
  lastUpdated: "2026-07-25",
  views: 380000,
  trendDirection: "declining",
  tags: ["looksmaxxing", "tiktok", "jawline", "gen alpha", "sigma", "self-improvement"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: mewing tongue-posture diagram used in looksmaxxing TikToks.
  // Sources checked: Commons ("tongue posture mewing" — unrelated books/PDFs),
  // Know Your Meme. Medical stock would mislead as clinical dentistry content.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/mewing",
      title: "Mewing — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/mewing",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of mewing as looksmaxxing slang and viral TikTok practice.",
      date: "2019",
      verified: false,
    },
    // No CC-licensed portrait of Dr. John Mew found on Wikimedia Commons — reference only.
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/John_Mew",
      title: "John Mew — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/John_Mew",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "British orthodontist associated with orthotropics; the mewing technique is named after him.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Looksmaxxing — Wikipedia (discusses mewing)",
      url: "https://en.wikipedia.org/wiki/Looksmaxxing",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["looksmaxxing", "sigma", "sigma-grindset", "mogging", "aura"],
  relationships: {
    relatedTo: ["looksmaxxing", "mogging"],
    sameEra: ["sigma-grindset", "sigma"],
    community: ["looksmaxxing"],
  },
};

export default entry;
