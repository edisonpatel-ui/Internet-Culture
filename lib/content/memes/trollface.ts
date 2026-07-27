import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m10",
  slug: "trollface",
  title: "Trollface",
  category: "meme",
  description:
    "The smirking face of internet trolling — the default symbol for 'you've been tricked' across early internet culture.",
  imageGradient: "from-zinc-600 via-zinc-500 to-zinc-400",
  scores: { relevance: 29, influence: 85, cringe: 21, brainrot: 26 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 29,
    currentStatus: "historical",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 35,
    trendingScore: 18,
    recentRevival: false,
    popularityNotes: "Status: historical · Relevance 29 (today's recognition, not influence) · Trending 18 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=27,311 for “Trollface”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5720 prev7=5874 (-3%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Trollface”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-06-23",
      "[news/recent-articles] Google News: 0 items in last 30d (40 returned) for “Trollface”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Trollface”",
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
  addedAt: "2026-07-16",
  lastUpdated: "2026-07-25",
  historicalDate: "2008-09-19",
  views: 2800000,
  trendDirection: "declining",
  tags: ["classic", "4chan", "trolling", "reaction", "imageboard"],
  meaning:
    "A crudely drawn smirking face used to indicate someone has successfully trolled, pranked, or deceived another person. The caption 'Problem?' signals malicious satisfaction at the target's reaction.",
  origin:
    "Created by Carlos Ramirez (username 'Whynne') on September 19, 2008 as part of a comic depicting 4chan trolling culture. The image spread across imageboards and became the universal symbol of online trolling.",
  timeline: [
    {
      date: "Sep 2008",
      event: "Carlos Ramirez (Whynne) posts original Trollface comic on deviantArt",
    },
    { date: "2009–2011", event: "Trollface becomes the dominant trolling symbol across 4chan and Reddit" },
    { date: "2012", event: "Usage peaks; the format begins to age" },
    {
      date: "2020s",
      event: "Ironic Trollface revival among Gen Z as a retro-internet reference",
    },
  ],
  examples: [
    "Problem? [trollface]",
    "You fell for it [trollface]",
    "U mad? [trollface]",
  ],
  relatedSlugs: ["rage-comics", "wojak"],
  media: [
    // Wikipedia fair-use crop of Carlos Ramirez's original (same pattern as Doge).
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/7/73/Trollface.png",
      title: "Trollface — original rage-comic face (2008)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Trollface.png",
      platform: "wikimedia",
      attribution: "Carlos Ramirez / Whynne (fair use for identification)",
      license: "Fair use",
      description:
        "The original Trollface drawing by Carlos Ramirez — the defining smirk of early-internet trolling culture.",
      date: "2008-09-19",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/trollface",
      title: "Trollface — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/trollface",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin, copyright history, and usage documentation for Trollface.",
      date: "2008",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Trollface — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Trollface",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
