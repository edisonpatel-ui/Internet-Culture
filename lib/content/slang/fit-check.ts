import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s61",
  slug: "fit-check",
  title: "Fit Check",
  category: "slang",
  description:
    "A quick outfit reveal — mirror spin, hallway walk, or TikTok format asking strangers to rate your look.",
  imageGradient: "from-fuchsia-500 via-purple-500 to-violet-600",
  scores: { relevance: 76, influence: 78, cringe: 57, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 88,
    currentStatus: "highly-active",
    activePlatforms: [
      "tiktok",
      "instagram",
      "wikipedia",
      "news",
    ],
    popularity: 67,
    trendingScore: 66,
    recentRevival: false,
    popularityNotes: "Relevance: Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: wikipedia/editorial-trend=65 (Pageviews WoW last7=55 prev7=44 (25%)); news/recent-articles=67 (Google News: 18 items in last 60d (40 returned) for “Fit Check”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=206 for “Fit Check”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=55 prev7=44 (25%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Fit”",
      "[news/recent-articles] Google News: 18 items in last 60d (40 returned) for “Fit Check”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Fit Check”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Fit Check\"",
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
      relevance: "Ongoing new posts/uploads/discussion support steady Current Relevance. Signals: wikipedia/editorial-trend=65 (Pageviews WoW last7=55 prev7=44 (25%)); news/recent-articles=67 (Google News: 18 items in last 60d (40 returned) for “Fit Check”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  views: 1400000,
  trendDirection: "rising",
  tags: ["fashion", "tiktok", "instagram", "streetwear", "2020s"],
  definition:
    "A fit check is a short video or photo set showing off an outfit — usually with a spin, pose, or caption asking for approval. 'Fit' means outfit; the 'check' is both inspection and flex. The format turned everyday dressing into shareable content and tied into sneaker culture, haul culture, and GRWM ('get ready with me') videos.",
  origin:
    "Outfit posts existed on Lookbook.nu and Tumblr for years, but 'fit check' as a named TikTok genre solidified around 2020–2022 as streetwear and thrift aesthetics exploded on the app. Soundtracks, transition edits, and comment-section ratings made it a repeatable template.",
  usageExamples: [
    "Quick fit check before the party.",
    "Fit check: thrifted jacket, vintage tee, beat-up Converse.",
    "The comments on her fit check were brutal but fair.",
  ],
  relatedSlugs: ["drip", "its-giving", "glow-up", "thrift-flip"],
  sources: [
    {
      title: "Outfit of the Day — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Outfit_of_the_day",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
