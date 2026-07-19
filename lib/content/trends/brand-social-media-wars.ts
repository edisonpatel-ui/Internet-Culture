import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t30",
  slug: "brand-social-media-wars",
  title: "Brand Social Media Wars",
  category: "trend",
  description:
    "When corporate accounts roast each other (and users) — Wendy's-era brand voice as entertainment and marketing.",
  imageGradient: "from-red-500 via-orange-500 to-sky-500",
  scores: { relevance: 68, influence: 70, cringe: 40, brainrot: 35 },
  addedAt: "2026-07-19",
  historicalDate: "2017-01-01",
  views: 1900000,
  trendDirection: "stable",
  tags: ["brands","twitter","memes","marketing","wendys"],
  origin:
    "Mid-2010s Twitter brand accounts — especially Wendy's — popularized savage corporate reply culture. Brands competed for viral clapbacks, memes, and 'relatable' voices, turning marketing into spectator sport.",
  summary:
    "Internet culture meeting advertising: logos as characters. Related to influencer marketing but specifically about official brand accounts fighting in public.",
  relatedSlugs: ["influencer-marketing","twitter-x-transition","ratio","dupe-economy","performative"],
  relationships: {
  "relatedTo": [
    "influencer-marketing",
    "ratio",
    "dupe-economy",
    "performative"
  ],
  "relatedEvent": [
    "twitter-x-transition"
  ],
  "relatedSlang": [
    "ratio"
  ]
},
  media: [
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Wendy%27s#Advertising_and_social_media",
    "title": "Brand Social Media Wars — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Wendy%27s#Advertising_and_social_media",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Brand Social Media Wars — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Wendy%27s#Advertising_and_social_media",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Wendy's social media — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Wendy%27s#Advertising_and_social_media",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
