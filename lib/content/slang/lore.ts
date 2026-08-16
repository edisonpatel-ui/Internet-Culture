import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s73",
  slug: "lore",
  title: "Lore",
  category: "slang",
  description:
    "Backstory, hidden context, or accumulated drama around a person, fandom, or meme — the wiki in your head.",
  imageGradient: "from-indigo-700 via-purple-700 to-violet-800",
  scores: { relevance: 25, influence: 81, cringe: 15, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 25,
    currentStatus: "classic",
    activePlatforms: [
      "tiktok",
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 31,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Lore slang”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=16,273 for “Bitch (slang)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=3434 prev7=3694 (-7%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Lore”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-14",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Lore slang”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Lore slang”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Lore slang\"",
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
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Lore slang”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-23",
  lastUpdated: "2026-08-16",
  views: 2400000,
  trendDirection: "stable",
  tags: ["fandom", "gaming", "tiktok", "storytelling", "2020s"],
  definition:
    "Internet lore is the deep or messy history behind something — creator feuds, deleted tweets, origin myths, inside jokes. 'That's lore' means newcomers are missing context. 'Adding to the lore' means someone did something that future fans will have to explain. Gaming and YouTube communities used 'lore' for worldbuilding; TikTok broadened it to personal and celebrity drama.",
  origin:
    "Lore comes from Old English storytelling traditions; gaming (Dark Souls, Minecraft, ARGs) repopularized it for optional deep narrative. Twitter and TikTok in the early 2020s stretched 'lore' to any serialized online drama — streamer arcs, franchise fan theories, even cafeteria gossip with wiki energy.",
  usageExamples: [
    "You need the 2019 tweet for this meme — that's lore.",
    "He showed up in her stream chat. Lore updated.",
    "The company reply-all email is corporate lore now.",
  ],
  relatedSlugs: ["stan", "receipts", "npc", "brainrot"],
  sources: [
    {
      title: "Lore (gaming) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Lore_(gaming)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
