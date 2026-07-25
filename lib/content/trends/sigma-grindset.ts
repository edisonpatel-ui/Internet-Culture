import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t1",
  slug: "sigma-grindset",
  title: "Sigma Grindset",
  category: "trend",
  description:
    "A parody of hustle culture reframed as lone-wolf alpha energy, endlessly remixed on TikTok.",
  imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  scores: { relevance: 31, influence: 64, cringe: 81, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 31,
    currentStatus: "occasionally-referenced",
    activePlatforms: [],
    popularity: 37,
    trendingScore: 24,
    recentRevival: false,
    popularityNotes: "Status: occasionally-referenced · Relevance 31 (today's recognition, not influence) · Trending 24 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Sigma Grindset”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Sigma”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-22",
      "[news/recent-articles] Google News: 1 items in last 30d (25 returned) for “Sigma Grindset”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Sigma Grindset”",
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
  addedAt: "2026-07-01",
  lastUpdated: "2026-07-25",
  views: 284000,
  trendDirection: "declining",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: ironic sigma hustle-edit still (often Bateman montage style).
  // Sources checked: Commons Patrick Bateman cosplay (comic-con — not the meme),
  // Know Your Meme. Cosplay / film stills would mislead as American Psycho fandom.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/sigma-male",
      title: "Sigma Male — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/sigma-male",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Documentation of sigma-male / grindset meme culture and its ironic TikTok era.",
      date: "2018",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Sigma Male — Know Your Meme",
      url: "https://knowyourmeme.com/memes/sigma-male",
      domain: "knowyourmeme.com",
    },
  ],
  relatedSlugs: ["sigma", "looksmaxxing", "mewing"],
};

export default entry;
