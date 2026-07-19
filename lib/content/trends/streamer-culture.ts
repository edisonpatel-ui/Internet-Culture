import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t22",
  slug: "streamer-culture",
  title: "Streamer Culture",
  category: "trend",
  description:
    "Live internet performance culture — Twitch chats, raids, emotes, parasocial hangouts, and the drama economy of being live.",
  imageGradient: "from-purple-600 via-violet-700 to-zinc-900",
  scores: { relevance: 86, influence: 88, cringe: 40, brainrot: 45 },
  addedAt: "2026-07-19",
  historicalDate: "2011-01-01",
  views: 4500000,
  trendDirection: "stable",
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
