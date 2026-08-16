import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s3",
  slug: "fanum-tax",
  title: "Fanum Tax",
  category: "slang",
  description:
    "Streamer slang for playfully taking a bite of someone else's food — named after AMP member Fanum and popularized alongside Kai Cenat's circle.",
  imageGradient: "from-yellow-400 via-amber-400 to-orange-400",
  scores: { relevance: 25, influence: 76, cringe: 52, brainrot: 88 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [
      "twitch",
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 35,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Fanum Tax”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Fanum”",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Fanum Tax”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Fanum Tax”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Fanum Tax\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/title absurdity cue (brainrot character only)",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Fanum Tax”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-02",
  lastUpdated: "2026-08-16",
  views: 340000,
  trendDirection: "stable",
  tags: ["amp", "twitch", "streamer slang", "gen alpha", "fanum", "kai cenat"],
  definition:
    "Fanum tax means taking a bite or share of someone else's food (often without asking), framed as a joke 'tax' friends owe you for hanging out. People announce 'Fanum tax' before snatching fries or a slice. Named after Twitch/YouTube streamer Fanum (AMP), whose on-stream habit of taxing friends' meals became a clip and TikTok meme.",
  origin:
    "Fanum, a member of the AMP (Any Means Possible) creator collective with Kai Cenat and Duke Dennis, repeatedly took food from friends on stream and called it a tax. Compilations and TikTok spread the phrase into everyday friend-group humor alongside other AMP-era slang like rizz and gyatt.",
  usageExamples: [
    "Fanum tax incoming — hand over the fries",
    "You can't eat around me without paying the Fanum tax",
    "That's a 50% Fanum tax on that pizza slice",
  ],
  relatedSlugs: ["kai-cenat", "amp", "rizz", "gyatt", "duke-dennis", "glazing"],
  relationships: {
    popularizedBy: ["amp", "kai-cenat"],
    relatedSlang: ["rizz", "gyatt", "glazing"],
    community: ["duke-dennis"],
  },
  sources: [
    {
      title: "AMP (streamer collective) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/AMP_(streamer_collective)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
