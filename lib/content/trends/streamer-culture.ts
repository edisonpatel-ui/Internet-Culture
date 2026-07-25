import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t22",
  slug: "streamer-culture",
  title: "Streamer Culture",
  category: "trend",
  description:
    "Live internet performance culture — Twitch chats, raids, emotes, parasocial hangouts, and the drama economy of being live.",
  imageGradient: "from-purple-600 via-violet-700 to-zinc-900",
  scores: { relevance: 29, influence: 88, cringe: 40, brainrot: 34 },
  dynamicMetadata: {
    lastReviewed: "2026-07-25",
    currentRelevance: 29,
    currentStatus: "classic",
    activePlatforms: [
      "twitch",
      "news",
    ],
    popularity: 32,
    trendingScore: 26,
    recentRevival: "unknown",
    popularityNotes: "Status: classic · Relevance 29 (today's recognition, not influence) · Trending 26 (recent attention)",
    evidenceNotes: [
      "[wikipedia/search-interest] No confident English Wikipedia match for “Streamer Culture”",
      "[know-your-meme/authority-documentation] Know Your Meme entry located",
      "[know-your-meme/platform-activity] KYM entry exists; last-updated date not parseable",
      "[dictionary/authority-documentation] Wiktionary page “Streamer”",
      "[dictionary/platform-activity] Wiktionary last revision 2025-09-22",
      "[news/recent-articles] Google News: 2 items in last 30d (40 returned) for “Streamer Culture”",
      "[creator-pages/recent-uploads] No YouTube channel_id URLs on entry sources — creator RSS skipped",
      "[authority-sources/authority-documentation] Wikipedia / Wikimedia cited",
      "[google-trends/search-interest] Not on current Google US Trending RSS (10 topics) — not treated as zero search interest",
      "[google-trends/editorial-trend] Absence from daily trending list → not currently spiking",
      "[reddit/discussion-volume] Reddit search unavailable for “Streamer Culture”",
      "[youtube/recent-uploads] YOUTUBE_DATA_API_KEY not set — YouTube live search skipped",
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
  addedAt: "2026-07-19",
  lastUpdated: "2026-07-25",
  historicalDate: "2011-01-01",
  views: 4500000,
  trendDirection: "declining",
  tags: ["twitch","streaming","live","gaming","parasocial"],
  origin:
    "Justin.tv/Twitch and later Kick/YouTube Live turned live gameplay and Just Chatting into a primary entertainment form. Streamer culture includes sub/bit economy, chat slang, raids, drama cycles, and IRL streaming (overlaps Twitch culture).",
  summary:
    "Canonical home for Twitch culture + streamer culture as one topic: live audience power, emote literacy, and creators who are always 'on.' Linked to NPC streaming as a format and to the broader creator economy.",
  relatedSlugs: ["creator-economy","npc-streaming","kai-cenat","xqc","ninja","gg","hot-damn"],
  relationships: {
  "relatedTo": [
    "creator-economy",
    "npc-streaming",
    "kai-cenat",
    "xqc",
    "ninja",
    "gg"
  ],
  "community": [
    "npc-streaming",
    "gg"
  ],
  "relatedEvent": [
    "youtube-rewind"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg",
    "title": "Twitch glitch logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Twitch_Glitch_Logo_Purple.svg",
    "platform": "wikimedia",
    "attribution": "Twitch Interactive (see Commons file page)",
    "license": "See Commons file page",
    "description": "Twitch mark representing mainstream live streamer culture.",
    "date": "2011",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Twitch_(service)",
    "title": "Streamer Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Twitch_(service)",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Streamer Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Twitch_(service)",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Live streaming — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Live_streaming",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
