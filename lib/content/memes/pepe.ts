import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m11",
  slug: "pepe",
  title: "Pepe the Frog",
  category: "meme",
  description:
    "The most versatile meme character in internet history — from webcomic frog to cultural icon to political controversy to ongoing reclamation.",
  imageGradient: "from-green-500 via-emerald-500 to-teal-500",
  scores: { relevance: 28, influence: 92, cringe: 21, brainrot: 41 },
  dynamicMetadata: {
    lastReviewed: "2026-08-16",
    currentRelevance: 28,
    currentStatus: "classic",
    activePlatforms: [
      "wikipedia",
    ],
    popularity: 16,
    trendingScore: 31,
    recentRevival: false,
    popularityNotes: "Relevance: Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Pepe the Frog”) Influence: Permanent cultural impact is not changed by a dynamic refresh. Brainrot: Absurdity / cohort character cues still match the prior brainrot reading. Cringe: Not enough mockery / social-awkwardness signals to reassess cringe.",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=25,241 for “Pepe the Frog”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=5708 prev7=6085 (-6%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Pepe”",
      "[dictionary/platform-activity] Wiktionary last revision 2026-05-12",
      "[news/recent-articles] Google News: 1 items in last 60d (40 returned) for “Pepe the Frog”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Pepe the Frog”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
      "Weak corroboration — blended heuristic (25) with AI double-check (30): Steady baseline interest (25k Wikipedia views) but declining trend and low news/Google‑Trends activity indicate modest, non‑spiking popularity.",
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
    scoreReasons: {
      relevance: "Little recent creation activity detected. Signals: news/recent-articles=16 (Google News: 1 items in last 60d (40 returned) for “Pepe the Frog”)",
      influence: "Permanent cultural impact is not changed by a dynamic refresh.",
      brainrot: "Absurdity / cohort character cues still match the prior brainrot reading.",
      cringe: "Not enough mockery / social-awkwardness signals to reassess cringe.",
    },
  },
  addedAt: "2026-07-16",
  lastUpdated: "2026-08-16",
  historicalDate: "2005-01-01",
  views: 5100000,
  trendDirection: "stable",
  tags: ["classic", "4chan", "reaction", "imageboard", "animals", "matt furie"],
  meaning:
    "A green anthropomorphic frog created by artist Matt Furie. Originally a laid-back, good-natured character, Pepe evolved into thousands of variants conveying every possible emotion. Has been both weaponized as a hate symbol (2016) and continuously reclaimed as a positive image.",
  origin:
    "Created by Matt Furie in his 2005 webcomic Boy's Club. A panel showing Pepe saying 'feels good man' was shared on MySpace and then 4chan around 2008, launching the meme as emotional shorthand. By the mid-2010s Pepe variants covered every reaction; in 2016 the Anti-Defamation League added some appropriated Pepe variants to its hate-symbol database after far-right political use — Furie publicly opposed that appropriation. The 2020 documentary Feels Good Man chronicles his legal and cultural fight to reclaim the character.",
  timeline: [
    { date: "2005", event: "Matt Furie creates Pepe in the 'Boy's Club' webcomic" },
    { date: "2008", event: "'Feels Good Man' panel shared widely — meme begins spreading" },
    {
      date: "2016",
      event:
        "ADL lists appropriated Pepe variants among hate symbols after political misuse; Furie objects",
    },
    {
      date: "2017",
      event: "Matt Furie kills Pepe in a comic strip in an attempt to reclaim the character",
    },
    {
      date: "2020",
      event: "'Feels Good Man' documentary released, chronicling Matt Furie's fight to reclaim Pepe",
    },
  ],
  examples: [
    "Feels good man.",
    "Feels bad man — I've had that day.",
    "Did you know Pepe started as a character in Matt Furie's Boy's Club comic?",
  ],
  relatedSlugs: ["wojak", "trollface", "doge", "rage-comics", "loss"],
  relationships: {
    sameFormat: ["wojak", "trollface"],
    sameEra: ["rage-comics", "doge"],
  },
  media: [
    // Wikipedia fair-use Boy's Club panel — the origin "Feels good man" image.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/6/63/Feels_good_man.jpg",
      title: "Pepe the Frog — 'Feels good man' (Boy's Club)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Feels_good_man.jpg",
      platform: "wikimedia",
      attribution: "Matt Furie / Boy's Club (fair use for identification)",
      license: "Fair use",
      description:
        "The Boy's Club panel that launched Pepe as an internet meme — 'feels good man.'",
      date: "2005",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/pepe-the-frog",
      title: "Pepe the Frog — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/pepe-the-frog",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Comprehensive history of Pepe from Boy's Club through mainstream meme culture.",
      date: "2005",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Feels Good Man (2020 documentary) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Feels_Good_Man",
      domain: "en.wikipedia.org",
    },
    {
      title: "Pepe the Frog — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Pepe_the_Frog",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
