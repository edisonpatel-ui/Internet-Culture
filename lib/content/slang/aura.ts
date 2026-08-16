import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s16",
  slug: "aura",
  title: "Aura",
  category: "slang",
  description:
    "Someone's effortless cool or presence — often joked about as gaining or losing 'aura points.'",
  imageGradient: "from-violet-400 via-purple-400 to-indigo-500",
  scores: { relevance: 38, influence: 82, cringe: 54, brainrot: 55 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 38,
    currentStatus: "classic",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 39,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Aura slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Aura”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-01",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “Aura slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Google Trending RSS unavailable",
      "[reddit/discussion-volume] Reddit search unavailable for “Aura slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Aura slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (36) with AI double-check (40): Documentation is decent but recent news and platform activity are low, indicating modest but not strong current popularity.",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Aura slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  historicalDate: "2024-01-01",
  views: 980000,
  trendDirection: "stable",
  tags: ["tiktok", "gen z", "personality", "cool", "2024", "vibes"],
  definition:
    "Aura means someone's perceived cool, mystery, or social presence — the vibe they give off without trying. Saying someone 'has aura' means they seem effortlessly compelling. Online, people also treat it like a score: cool or smooth actions are '+1000 aura,' while embarrassing ones are 'aura loss.' Broader than rizz (flirting skill); closer to overall presence.",
  origin:
    "Borrowed from spiritual/wellness talk about energy fields, then remixed by Gen Z TikTok and meme culture around 2024 into a jokey social metric ('aura points') for cool vs. cringe moments.",
  usageExamples: [
    "Silent guys with aura > loud guys with rizz",
    "I lost all my aura when I tripped in front of the entire class",
    "He walked into the room and the aura was immaculate",
  ],
  relatedSlugs: ["rizz", "sigma", "aura-farming", "locked-in", "glazing"],
  relationships: {
    relatedSlang: ["rizz", "sigma", "locked-in", "glazing"],
    relatedTo: ["aura-farming"],
  },
  sources: [
    {
      title: "aura — Wiktionary (slang)",
      url: "https://en.wiktionary.org/wiki/aura#English",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
