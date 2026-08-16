import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t1",
  slug: "sigma-grindset",
  title: "Sigma Grindset",
  category: "trend",
  description:
    "A parody of hustle culture reframed as lone-wolf alpha energy, endlessly remixed on TikTok.",
  imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  scores: { relevance: 50, influence: 70, cringe: 83, brainrot: 81 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 50,
    currentStatus: "occasionally-referenced",
    activePlatforms: [
      "news",
    ],
    popularity: 37,
    trendingScore: 37,
    recentRevival: "unknown",
    popularityNotes: "Relevance: Recent creation signals rose modestly. Signals: news/recent-articles=37 (Google News: 4 items in last 60d (23 returned) for “Sigma Grindset”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Sigma Grindset”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Sigma”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-22",
      "[news/recent-articles] Google News: 4 items in last 60d (23 returned) for “Sigma Grindset”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Sigma Grindset”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Sigma Grindset\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
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
      relevance: "Recent creation signals rose modestly. Signals: news/recent-articles=37 (Google News: 4 items in last 60d (23 returned) for “Sigma Grindset”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-01",
  lastUpdated: "2026-08-16",
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
      title: "Sigma Grindset — Wikipedia search",
      url: "https://en.wikipedia.org/w/index.php?search=Sigma%20Grindset&title=Special:Search&fulltext=1",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["sigma", "looksmaxxing", "mewing"],
};

export default entry;
