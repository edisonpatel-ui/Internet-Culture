import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m6",
  slug: "roman-empire-meme",
  title: "Roman Empire",
  category: "meme",
  description:
    "'How often do you think about the Roman Empire?' — the relationship test heard round the world.",
  imageGradient: "from-amber-600 via-yellow-600 to-orange-500",
  scores: { relevance: 40, influence: 40, cringe: 40, brainrot: 30 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 54,
    currentStatus: "current",
    activePlatforms: [
      "wikipedia",
      "news",
    ],
    popularity: 51,
    trendingScore: 59,
    recentRevival: false,
    popularityNotes: "Status: current · Relevance 54 (today's recognition, not influence) · Trending 59 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=198,538 for “Roman Empire”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=53137 prev7=41348 (29%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Roman”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-07-23",
      "[news/recent-articles] Google News: 32 items in last 30d (40 returned) for “Roman Empire”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Roman Empire”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "[catalog-evidence/remix-activity] Format/remix cue (brainrot/cringe only)",
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
  addedAt: "2026-04-18",
  lastUpdated: "2026-07-25",
  views: 320000,
  trendDirection: "stable",
  meaning:
    "A viral prompt asking men how frequently they think about the Roman Empire — spawned confessions and parodies.",
  origin:
    "Sparked by a viral September 2023 Instagram Reels trend where women asked their male partners how often they think about the Roman Empire. Men's unexpectedly frequent answers — 'every day,' 'at least once a week' — surprised many and turned the question into a widespread social experiment. Historians, classicists, and meme accounts piled on with genuine context and comedic takes.",
  timeline: [
    { date: "Sep 2023", event: "Trend starts on Instagram Reels — women asking men the Roman Empire question" },
    { date: "Oct 2023", event: "Peak mainstream media coverage — the New York Times, BBC, and others cover it" },
    { date: "2024+", event: "Format adapts: 'how often do you think about [X]' spawns variations across demographics" },
  ],
  examples: [
    "She asked about the Roman Empire — I showed her my playlist",
    "Thinking about the Roman Empire more than my savings account",
    "How often do you think about the Roman Empire? Twice a day at minimum",
  ],
  relatedSlugs: [
    "girl-dinner",
    "sigma-grindset",
    "looksmaxxing",
    "performative",
    "brat-summer",
  ],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: viral Reel/TikTok still or text card of the question
  // "How often do you think about the Roman Empire?"
  // Removed Colosseum photo — tourism landmark is topic association, not the meme.
  // Sources checked: Wikimedia Commons (Colosseum only), Know Your Meme (docs, no
  // hotlinkable template), Wikipedia (no fair-use viral still), Instagram/TikTok
  // CDN forbidden. Substitutes (Colosseum, legion armor) mislead as ancient-history
  // encyclopedia entries rather than the 2023 relationship-prompt meme.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/how-often-do-you-think-about-the-roman-empire",
      title: "How Often Do You Think About the Roman Empire — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/how-often-do-you-think-about-the-roman-empire",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the 2023 Roman Empire relationship-question trend.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Roman Empire — Wikipedia search",
      url: "https://en.wikipedia.org/w/index.php?search=Roman%20Empire&title=Special:Search&fulltext=1",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
