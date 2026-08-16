import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s42",
  slug: "standing-on-business",
  title: "Standing on Business",
  category: "slang",
  description:
    "Slang for handling your responsibilities seriously — no excuses, no fluff, just getting it done.",
  imageGradient: "from-emerald-700 via-green-600 to-teal-500",
  scores: { relevance: 70, influence: 77, cringe: 28, brainrot: 45 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 70,
    currentStatus: "current",
    activePlatforms: [
      "tiktok",
      "wikipedia",
      "news",
    ],
    popularity: 44,
    trendingScore: 56,
    recentRevival: false,
    popularityNotes: "Relevance: Creation volume is not peaking, but new content is still being produced regularly. Signals: wikipedia/editorial-trend=67 (Pageviews WoW last7=9 prev7=7 (29%)); news/recent-articles=44 (Google News: 6 items in last 60d (40 returned) for “Standing on Business”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Character signals still mark this as strongly representative of chaotic internet brainrot culture. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=25 for “Standing Committee on Business and Industry”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=9 prev7=7 (29%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Standing”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-11",
      "[news/recent-articles] Google News: 6 items in last 60d (40 returned) for “Standing on Business”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] No Wikipedia / KYM / dictionary / major-news URLs on entry sources",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Standing on Business”",
      "[bluesky/discussion-volume] Bluesky search unavailable for \"Standing on Business\"",
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
      relevance: "Creation volume is not peaking, but new content is still being produced regularly. Signals: wikipedia/editorial-trend=67 (Pageviews WoW last7=9 prev7=7 (29%)); news/recent-articles=44 (Google News: 6 items in last 60d (40 returned) for “Standing on Business”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Character signals still mark this as strongly representative of chaotic internet brainrot culture.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-18",
  lastUpdated: "2026-08-16",
  historicalDate: "2020-01-01",
  views: 1100000,
  trendDirection: "stable",
  tags: ["motivation", "tiktok", "gen z", "hustle", "aave-adjacent"],
  definition:
    "Standing on business means taking care of what you're supposed to — work, money, goals, accountability — without playing around. It can praise someone who's locked in, or call out someone who isn't. Tone ranges from motivational to lightly roasting people who make excuses.",
  origin:
    "The phrase circulated in Black American vernacular / AAVE-influenced internet speech before exploding on TikTok and Twitter/X in the early 2020s as a catchphrase for seriousness and follow-through. Know Your Meme tracks the viral meme/slang usage of the phrase.",
  usageExamples: [
    "She's standing on business — graduated and still stacking certificates",
    "I ain't arguing in the group chat, I'm standing on business",
    "Clock in and stand on business or stay broke",
  ],
  relatedSlugs: ["locked-in", "aura", "sigma", "goat", "w-dub"],
  relationships: {
    relatedSlang: ["locked-in", "aura", "sigma"],
  },
  sources: [
    {
      title: "Standing — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Standing",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
