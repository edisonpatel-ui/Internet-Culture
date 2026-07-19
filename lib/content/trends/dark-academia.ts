import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t19",
  slug: "dark-academia",
  title: "Dark Academia",
  category: "trend",
  description:
    "The Instagram/TikTok aesthetic of libraries, tweed, classics, and moody campus romance — studying as vibes.",
  imageGradient: "from-stone-800 via-amber-900 to-stone-600",
  scores: { relevance: 62, influence: 70, cringe: 28, brainrot: 22 },
  addedAt: "2026-07-19",
  historicalDate: "2017-01-01",
  views: 2000000,
  trendDirection: "stable",
  tags: ["aesthetic","instagram","tiktok","books","fashion"],
  origin:
    "Dark Academia grew on Instagram and Tumblr as a literature/boarding-school-inspired aesthetic — gothic architecture, classic novels, autumn layers — then scaled on TikTok (Know Your Meme, Wikipedia).",
  summary:
    "A consumer-facing identity trend: looking like you read by candlelight. Related to Old Money/quiet luxury in its nostalgia for elite institutions, but darker, bookish, and more romantic than prep.",
  relatedSlugs: ["cottagecore","old-money","clean-girl-aesthetic","instagram-culture","tumblr"],
  relationships: {
  "sameEra": [
    "cottagecore",
    "old-money",
    "clean-girl-aesthetic"
  ],
  "relatedTo": [
    "instagram-culture",
    "old-money"
  ],
  "relatedEvent": [
    "tumblr"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/7/76/Kutn%C3%A1_Hora_-_View_North_on_Gothic_spiral_staircase.jpg",
    "title": "Gothic staircase — dark academia atmosphere",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Kutná_Hora_-_View_North_on_Gothic_spiral_staircase.jpg",
    "platform": "wikimedia",
    "attribution": "See Commons file page",
    "license": "See Commons file page",
    "description": "Gothic architectural imagery associated with the dark academia aesthetic.",
    "date": "2017",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/dark-academia",
    "title": "Dark Academia — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/dark-academia",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Cultural documentation.",
    "date": "2017",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Dark_academia",
    "title": "Dark Academia — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Dark_academia",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Dark Academia — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Dark_academia",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Dark Academia — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/dark-academia",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
