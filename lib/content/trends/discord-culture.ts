import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t26",
  slug: "discord-culture",
  title: "Discord Culture",
  category: "trend",
  description:
    "Servers, roles, pings, and VC — the chat OS for friend groups, fandoms, study communities, and creator inner circles.",
  imageGradient: "from-indigo-500 via-violet-600 to-zinc-900",
  scores: { relevance: 82, influence: 80, cringe: 30, brainrot: 35 },
  addedAt: "2026-07-19",
  historicalDate: "2015-05-13",
  views: 3600000,
  trendDirection: "rising",
  tags: ["discord","chat","servers","gaming","community"],
  origin:
    "Discord (2015) replaced many Skype/forum group chats for gamers, then everyone else. Culture includes server hierarchy, nitro, reaction spam, and creators running paid/community Discords as loyalty hubs (Wikipedia: Discord).",
  summary:
    "Where internet friend groups actually hang out after the timeline. Distinct from Twitch (broadcast) — Discord is the backstage and the group chat.",
  relatedSlugs: ["streamer-culture","reddit-culture","gg","touch-grass","creator-economy"],
  relationships: {
  "relatedTo": [
    "streamer-culture",
    "reddit-culture",
    "gg",
    "touch-grass",
    "creator-economy"
  ],
  "community": [
    "streamer-culture",
    "gg"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Discord_Color_Text_Logo_No_Padding.svg",
    "title": "Discord logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Discord_Color_Text_Logo_No_Padding.svg",
    "platform": "wikimedia",
    "attribution": "Discord Inc. (see Commons file page)",
    "license": "See Commons file page",
    "description": "Discord wordmark for the platform culture entry.",
    "date": "2015",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Discord",
    "title": "Discord Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Discord",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Discord Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Discord",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
