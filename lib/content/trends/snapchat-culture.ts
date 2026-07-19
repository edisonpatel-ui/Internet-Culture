import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t27",
  slug: "snapchat-culture",
  title: "Snapchat Culture",
  category: "trend",
  description:
    "Streaks, Stories, Bitmoji, and ephemeral selfies — the app that taught Gen Z disappearing photos and FOMO counters.",
  imageGradient: "from-yellow-300 via-yellow-400 to-zinc-900",
  scores: { relevance: 60, influence: 78, cringe: 35, brainrot: 30 },
  addedAt: "2026-07-19",
  historicalDate: "2011-09-01",
  views: 2800000,
  trendDirection: "stable",
  tags: ["snapchat","stories","streaks","gen z","ephemeral"],
  origin:
    "Snapchat (2011) made ephemeral messaging mainstream, then Stories (later copied by Instagram). Streaks gamified friendship maintenance; filters and Bitmoji shaped selfie culture (Wikipedia: Snapchat).",
  summary:
    "A platform culture of impermanence and daily obligation (streaks). Important precursor to Stories-everywhere and to teenage private-graph social life distinct from public Instagram grids.",
  relatedSlugs: ["instagram-culture","fomo","tiktok-rise","musical-ly","bereal-wave"],
  relationships: {
  "relatedTo": [
    "instagram-culture",
    "fomo",
    "bereal-wave"
  ],
  "relatedEvent": [
    "tiktok-rise",
    "musical-ly",
    "bereal-wave"
  ],
  "relatedSlang": [
    "fomo"
  ]
},
  media: [
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Snapchat",
    "title": "Snapchat Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Snapchat",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Snapchat Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Snapchat",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
