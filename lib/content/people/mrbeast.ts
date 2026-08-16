import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr4",
  slug: "mrbeast",
  title: "MrBeast",
  category: "creator",
  personType: "Creator",
  description:
    "The most-subscribed individual creator on YouTube — known for large-scale philanthropy, stunts, and record-breaking productions.",
  imageGradient: "from-yellow-400 via-amber-500 to-orange-500",
  scores: { relevance: 85, influence: 97, cringe: 33, brainrot: 38 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 85,
    currentStatus: "highly-active",
    activePlatforms: [
      "youtube",
      "news",
    ],
    popularity: 73,
    trendingScore: 73,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Recent creation activity still looks similar (very high recent creation). Signals: news/recent-articles=73 (Google News: 24 items in last 60d (40 returned) for “MrBeast creator”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “MrBeast creator”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “MrBeast”",
      "[news/recent-articles] Google News: 24 items in last 60d (40 returned) for “MrBeast creator”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “MrBeast creator”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"MrBeast creator\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (92) with AI double-check (78): Strong documentation and recent news keep MrBeast highly popular, but the low Google‑Trends activity shows a dip in current buzz, pulling the score below the heuristic’s 92.",
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
      relevance: "Recent creation activity still looks similar (very high recent creation). Signals: news/recent-articles=73 (Google News: 24 items in last 60d (40 returned) for “MrBeast creator”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-01",
  lastUpdated: "2026-08-16",
  views: 860000,
  trendDirection: "declining",
  tags: ["youtube", "philanthropy", "stunts", "feastables"],
  careerStart: "2012",
  platforms: [
    {
      platform: "youtube",
      handle: "MrBeast",
      url: "https://www.youtube.com/@MrBeast",
    },
    {
      platform: "instagram",
      handle: "@mrbeast",
      url: "https://www.instagram.com/mrbeast",
    },
    {
      platform: "x",
      handle: "@MrBeast",
      url: "https://x.com/MrBeast",
    },
  ],
  followers: {
    youtube: "~350M+",
  },
  notableMoments: [
    "Became the most-subscribed individual YouTube channel",
    "Founded Feastables chocolate brand",
    "Produced Beast Games — a reality competition show on Amazon Prime",
    "Philanthropic productions have distributed tens of millions in prizes and donations",
  ],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Wikimedia Commons — extracted from a CC BY YouTube video by NickRewind.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/26/MrBeast_at_the_Kids_Choice_Awards_2022.jpg",
      title: "MrBeast at the Kids Choice Awards 2022",
      source: "Wikimedia Commons / NickRewind",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:MrBeast_at_the_Kids_Choice_Awards_2022.jpg",
      platform: "wikimedia",
      attribution: "NickRewind (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "MrBeast (Jimmy Donaldson) giving a speech after winning Favorite Male Creator at the 2022 Kids Choice Awards.",
      date: "2022",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/MrBeast",
      title: "MrBeast — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/MrBeast",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering MrBeast's career, philanthropy, and cultural impact.",
      verified: true,
    },
  ],
  sources: [
    {
      title: "MrBeast — YouTube Channel",
      url: "https://www.youtube.com/@MrBeast",
      domain: "youtube.com",
    },
    {
      title: "MrBeast — Wikipedia",
      url: "https://en.wikipedia.org/wiki/MrBeast",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
