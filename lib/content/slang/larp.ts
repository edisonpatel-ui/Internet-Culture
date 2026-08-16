import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s15",
  slug: "larp",
  title: "LARP",
  category: "slang",
  description:
    "Live Action Role Play — used online to accuse someone of performing a persona they don't genuinely live.",
  imageGradient: "from-indigo-600 via-blue-500 to-sky-500",
  scores: { relevance: 66, influence: 72, cringe: 59, brainrot: 31 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 66,
    currentStatus: "current",
    activePlatforms: [
      "x",
      "wikipedia",
      "news",
    ],
    popularity: 57,
    trendingScore: 55,
    recentRevival: false,
    popularityNotes: "Relevance: Creation volume is not peaking, but new content is still being produced regularly. Signals: news/recent-articles=57 (Google News: 11 items in last 60d (40 returned) for “LARP slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=23,408 for “Glossary of 2020s slang”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5560 prev7=5286 (5%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “LARP”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-08",
      "[news/recent-articles] Google News: 11 items in last 60d (40 returned) for “LARP slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “LARP slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"LARP slang\"",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (73) with AI double-check (58): The mixed signals—moderate wiki views and news mentions but low Google‑Trends activity—indicate LARP slang is modestly known but not currently spiking in popularity.",
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
      relevance: "Creation volume is not peaking, but new content is still being produced regularly. Signals: news/recent-articles=57 (Google News: 11 items in last 60d (40 returned) for “LARP slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  historicalDate: "2012-01-01",
  views: 520000,
  trendDirection: "stable",
  tags: ["gaming", "roleplay", "accusation", "identity", "twitter", "internet culture"],
  definition:
    "Originally refers to Live Action Role Playing — physical events where participants dress up and act out fictional scenarios. On the internet, 'LARPing' means performing or pretending to be something you're not. Calling someone a 'larper' accuses them of cosplaying an identity rather than genuinely living it.",
  origin:
    "LARP as an activity has existed since the 1970s–80s. The internet repurposed the term around 2012–2015 to describe inauthentic online behavior — particularly when someone claims to hold an identity, lifestyle, or ideology they don't genuinely inhabit.",
  usageExamples: [
    "He's LARPing as a tough guy online — would never say that in person",
    "The whole account is a LARP, nothing he posts is real",
    "Stop larping as a 1950s housewife, you live in a studio apartment",
  ],
  relatedSlugs: ["sigma", "based"],
  sources: [
    {
      title: "Live action role-playing game — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Live_action_role-playing_game",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
