import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m9",
  slug: "rickroll",
  title: "Rickroll",
  category: "meme",
  description:
    "The internet's most legendary bait-and-switch — Rick Astley's 'Never Gonna Give You Up' disguised as something else.",
  imageGradient: "from-blue-600 via-indigo-500 to-violet-600",
  scores: { relevance: 34, influence: 93, cringe: 25, brainrot: 26 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 34,
    currentStatus: "historical",
    activePlatforms: [
      "youtube",
      "wikipedia",
    ],
    popularity: 38,
    trendingScore: 27,
    recentRevival: false,
    popularityNotes: "Status: historical · Relevance 34 (today's recognition, not influence) · Trending 27 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] Wikimedia pageviews 30d=11,248 for “Harlem Shake (meme)”",
      "[wikipedia/editorial-trend] Pageviews WoW last7=2847 prev7=2219 (28%)",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Rickroll”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-06-23",
      "[news/recent-articles] Google News: 1 items in last 30d (40 returned) for “Rickroll”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Know Your Meme cited; Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Rickroll”",
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
  historicalDate: "2007-05-01",
  views: 4200000,
  trendDirection: "declining",
  tags: ["classic", "youtube", "music", "4chan", "rick astley"],
  meaning:
    "Tricking someone into clicking a disguised link that plays Rick Astley's 1987 hit 'Never Gonna Give You Up.' The joke is the surprise of the redirect, not the content.",
  origin:
    "Evolved from 'duckrolling' on 4chan, where misleading links led to an image of a duck on wheels. In May 2007, users on 4chan's /v/ board replaced the duck with Rick Astley's 1987 music video for 'Never Gonna Give You Up,' creating the first rickroll. The prank jumped to YouTube URL bait and became a permanent internet habit — Wikipedia notes Astley later leaned into the meme, including a 2008 Macy's Thanksgiving Day Parade appearance that effectively rickrolled live TV audiences.",
  timeline: [
    { date: "Jul 1987", event: "'Never Gonna Give You Up' released — reaches #1 in the UK" },
    { date: "May 2007", event: "First documented rickroll appears on 4chan's /v/ board" },
    {
      date: "Nov 2008",
      event:
        "Rick Astley performs at the Macy's Thanksgiving Day Parade in disguise, rickrolling millions on live TV",
    },
    {
      date: "Jul 2021",
      event:
        "Astley's official YouTube upload of the video surpasses 1 billion views — a late victory lap for the meme",
    },
    {
      date: "2012+",
      event: "Rickrolling becomes a permanent fixture of internet culture — never truly dies",
    },
  ],
  examples: [
    "Click here for the patch notes [it's a rickroll].",
    "You've been rickrolled — you knew it was coming.",
    "Did you know rickrolling started as 'duckrolling' on 4chan before Rick Astley?",
  ],
  relatedSlugs: ["doge", "nyan-cat", "harlem-shake", "pepe", "rage-comics"],
  relationships: {
    sameEra: ["doge", "nyan-cat", "rage-comics"],
    relatedTo: ["harlem-shake", "pepe"],
    sameFormat: ["harlem-shake"],
  },
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // YouTube thumbnail CDN (i.ytimg.com) is hotlink-safe and stable.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      title: "Never Gonna Give You Up — official music video thumbnail (1987)",
      source: "YouTube / Rick Astley",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      platform: "youtube",
      attribution: "Rick Astley / BMG",
      license: "YouTube Standard License",
      description: "Thumbnail of the official 'Never Gonna Give You Up' video — the destination of every rickroll since 2007.",
      date: "1987",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Rick Astley — Never Gonna Give You Up (Official Music Video)",
      source: "YouTube / Rick Astley",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      platform: "youtube",
      attribution: "Rick Astley / BMG",
      license: "YouTube Standard License",
      description: "The official music video — the unsuspecting destination of every rickroll since 2007.",
      date: "1987-07-27",
      tags: ["original", "music video"],
      verified: true,
    },
  ],
  sources: [
    {
      title: "Rickrolling — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Rickrolling",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
