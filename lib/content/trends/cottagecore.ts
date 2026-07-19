import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t18",
  slug: "cottagecore",
  title: "Cottagecore",
  category: "trend",
  description:
    "The Tumblr-to-TikTok aesthetic that romanticizes cottages, baking, meadows, and soft rural fantasy as an escape from digital burnout.",
  imageGradient: "from-lime-200 via-emerald-300 to-amber-200",
  scores: { relevance: 65, influence: 72, cringe: 25, brainrot: 20 },
  addedAt: "2026-07-19",
  historicalDate: "2018-04-01",
  views: 2200000,
  trendDirection: "stable",
  tags: ["aesthetic","tumblr","tiktok","fashion","lifestyle"],
  origin:
    "Moodboards romanticizing nature, whimsical clothing, and homesteading rose on Tumblr around 2018, then surged on TikTok during pandemic lockdowns as cottagecore — a soft pastoral fantasy aesthetic (Know Your Meme, Wikipedia).",
  summary:
    "Cottagecore is less a farm guide than a vibe: linen dresses, wildflowers, sourdough, and imagined countryside calm. It sits beside Dark Academia and Clean Girl as a major late-2010s/2020s internet aesthetic tribe.",
  relatedSlugs: ["dark-academia","clean-girl-aesthetic","y2k-revival","tumblr","tiktok-rise"],
  relationships: {
  "sameEra": [
    "dark-academia",
    "clean-girl-aesthetic",
    "y2k-revival"
  ],
  "relatedEvent": [
    "tumblr",
    "tiktok-rise"
  ],
  "relatedTo": [
    "clean-girl-aesthetic"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Anne_Hathaways_Cottage_1_%285662418953%29.jpg",
    "title": "Thatched cottage — cottagecore visual anchor",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Anne_Hathaways_Cottage_1_(5662418953).jpg",
    "platform": "wikimedia",
    "attribution": "See Commons file page",
    "license": "See Commons file page",
    "description": "Pastoral cottage imagery representing the romantic rural fantasy of cottagecore.",
    "date": "2018",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/cottagecore",
    "title": "Cottagecore — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/cottagecore",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Cultural documentation.",
    "date": "2018",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Cottagecore",
    "title": "Cottagecore — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Cottagecore",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Cottagecore — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Cottagecore",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Cottagecore — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/cottagecore",
    "domain": "knowyourmeme.com"
  }
],
};

export default entry;
