import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t21",
  slug: "creator-economy",
  title: "Creator Economy",
  category: "trend",
  description:
    "The internet economy where individuals monetize audiences — ads, memberships, merch, brand deals — and platforms compete to host them.",
  imageGradient: "from-violet-500 via-fuchsia-600 to-amber-400",
  scores: { relevance: 88, influence: 92, cringe: 20, brainrot: 25 },
  addedAt: "2026-07-19",
  historicalDate: "2010-01-01",
  views: 4200000,
  trendDirection: "rising",
  tags: ["creator economy","youtube","tiktok","twitch","monetization"],
  origin:
    "Named in tech/business discourse of the late 2010s, the creator economy describes how YouTube, Twitch, TikTok, Patreon, and similar platforms turned audience attention into livelihoods. Culturally it reframed 'hobby content' as career infrastructure (Wikipedia: Creator economy).",
  summary:
    "Umbrella for how internet fame became a job market: AdSense eras, SubStack newsletters, TikTok Shop, Twitch subs. Related to influencer culture (the social performance) but focused on the economic system underneath.",
  relatedSlugs: ["influencer-culture","youtube-creator-era","streamer-culture","tiktok-rise","influencer-marketing","mrbeast"],
  relationships: {
  "relatedTo": [
    "influencer-culture",
    "youtube-creator-era",
    "streamer-culture",
    "influencer-marketing",
    "mrbeast"
  ],
  "relatedEvent": [
    "tiktok-rise",
    "youtube-rewind"
  ],
  "community": [
    "influencer-culture",
    "streamer-culture"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    "title": "YouTube logo — creator-economy platform mark",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:YouTube_Logo_2017.svg",
    "platform": "wikimedia",
    "attribution": "Google / YouTube (see Commons file page)",
    "license": "See Commons file page",
    "description": "YouTube mark representing the platform that pioneered scalable creator monetization.",
    "date": "2010",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Creator_economy",
    "title": "Creator Economy — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Creator_economy",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Creator Economy — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Creator_economy",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
