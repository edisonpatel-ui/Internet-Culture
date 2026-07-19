import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t20",
  slug: "influencer-culture",
  title: "Influencer Culture",
  category: "trend",
  description:
    "The internet habit of treating followings as social power — lifestyle curation, parasocial fame, and the soft sell of everyday aspiration.",
  imageGradient: "from-pink-400 via-rose-500 to-violet-600",
  scores: { relevance: 85, influence: 90, cringe: 45, brainrot: 30 },
  addedAt: "2026-07-19",
  historicalDate: "2010-01-01",
  views: 4800000,
  trendDirection: "stable",
  tags: ["influencer","instagram","tiktok","youtube","parasocial"],
  origin:
    "As blogs and Instagram scaled in the 2010s, 'influencer' labeled creators whose audiences could move products and taste. The culture includes aspirational feeds, haul videos, brand trips, and backlash against inauthenticity (Wikipedia: Influencer marketing / creator discourse).",
  summary:
    "Influencer culture is the social layer of the creator economy: not just making content, but performing a desirable life that brands and fans treat as authority. Distinct from pure streamer live culture and from the business practice of influencer marketing.",
  relatedSlugs: ["creator-economy","influencer-marketing","instagram-culture","tiktok-rise","performative","mrbeast"],
  relationships: {
  "relatedTo": [
    "creator-economy",
    "influencer-marketing",
    "instagram-culture",
    "performative",
    "mrbeast"
  ],
  "relatedEvent": [
    "tiktok-rise"
  ],
  "sameEra": [
    "creator-economy"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    "title": "Instagram logo — influencer-era platform mark",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Instagram_logo_2022.svg",
    "platform": "wikimedia",
    "attribution": "Meta / Instagram (see Commons file page)",
    "license": "See Commons file page",
    "description": "Instagram mark representing the platform most associated with classic influencer culture.",
    "date": "2010",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Influencer_marketing",
    "title": "Influencer Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Influencer_marketing",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Influencer Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Influencer_marketing",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Internet celebrity — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Internet_celebrity",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
