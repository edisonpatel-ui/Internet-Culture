import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s1",
  slug: "rizz",
  title: "Rizz",
  category: "slang",
  description:
    "Short for charisma — specifically someone's ability to flirt, charm, or attract romantic interest.",
  imageGradient: "from-indigo-500 via-purple-500 to-pink-500",
  scores: { relevance: 39, influence: 89, cringe: 48, brainrot: 75 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 39,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 25,
    trendingScore: 37,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Rizz slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=4,379 for “Internet slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=982 prev7=998 (-2%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] No Wiktionary page for “Rizz”",
      "[news/recent-articles] Google News: 2 items in last 60d (40 returned) for “Rizz slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Dictionary / Britannica cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Rizz slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Rizz slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/absurdity] Tag/title absurdity cue (brainrot character only)",
      "[catalog-evidence/gen-cohort-adoption] Cohort cue from tags/title (brainrot character only)",
      "Weak corroboration — blended heuristic (36) with AI double-check (42): Mainstream signals are weak while niche community cues are strong, suggesting modest overall popularity around the mid‑40s.",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=25 (Google News: 2 items in last 60d (40 returned) for “Rizz slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-06-01",
  lastUpdated: "2026-08-16",
  views: 980000,
  trendDirection: "stable",
  definition:
    "Rizz is short for charisma: someone's ability to flirt, charm, or successfully attract romantic interest. Saying someone 'has rizz' means they're good at that game; 'W rizz' / 'L rizz' rates a flirting attempt as a win or a fail. Used sincerely or ironically. Oxford University Press named it Word of the Year for 2023 after it spread from Twitch/streamer culture into mainstream TikTok and everyday speech.",
  origin:
    "Popularized by Twitch streamer Kai Cenat and related streaming communities in the early 2020s, then widely adopted on TikTok. Oxford's 2023 Word of the Year selection cemented its mainstream status.",
  usageExamples: [
    "He's got unlimited rizz — how does he do it?",
    "W rizz / L rizz (win/loss charisma)",
    "I lost all my rizz the moment I said 'hello fellow kids'",
  ],
  relatedSlugs: [
    "kai-cenat",
    "amp",
    "gyatt",
    "fanum-tax",
    "glazing",
    "locked-in",
    "aura",
  ],
  relationships: {
    popularizedBy: ["kai-cenat", "amp"],
    relatedSlang: ["gyatt", "fanum-tax", "glazing", "aura", "locked-in"],
  },
  sources: [
    {
      title: "Oxford University Press Word of the Year 2023: rizz",
      url: "https://languages.oup.com/word-of-the-year/2023/",
      domain: "oup.com",
    },
  ],
};

export default entry;
