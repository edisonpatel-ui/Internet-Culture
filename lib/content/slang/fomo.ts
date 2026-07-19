import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s55",
  slug: "fomo",
  title: "FOMO",
  category: "slang",
  description:
    "Fear of missing out — the social anxiety that keeps you refreshing Stories, streaks, and drop calendars.",
  imageGradient: "from-yellow-400 via-orange-500 to-rose-500",
  scores: { relevance: 80, influence: 85, cringe: 40, brainrot: 25 },
  addedAt: "2026-07-19",
  historicalDate: "2004-01-01",
  views: 5200000,
  trendDirection: "stable",
  tags: ["slang","anxiety","social media","acronym","consumer"],
  definition:
    "FOMO means fear of missing out: anxiety that others are having rewarding experiences without you. Online it drives streak maintenance, limited drops, live events, and compulsive checking.",
  origin:
    "Popularized in early-2000s student/marketing discourse and later mainstreamed with social media feeds; documented as internet slang and psychology crossover term (Know Your Meme, Wikipedia).",
  usageExamples: [
  "I only opened the app out of FOMO",
  "Drop culture runs on FOMO",
  "Streaks are just FOMO with a counter"
],
  relatedSlugs: ["snapchat-culture","instagram-culture","dupe-economy","bereal-wave","unboxing-culture"],
  relationships: {
  "relatedTo": [
    "snapchat-culture",
    "instagram-culture",
    "dupe-economy",
    "bereal-wave",
    "unboxing-culture"
  ],
  "community": [
    "snapchat-culture",
    "instagram-culture"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://i.kym-cdn.com/entries/icons/original/000/016/685/fomo.jpg",
    "title": "FOMO — meme documentation cover",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/fomo",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "KYM cover imagery for FOMO slang documentation.",
    "date": "2004",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://knowyourmeme.com/memes/fomo",
    "title": "FOMO — Know Your Meme",
    "source": "Know Your Meme",
    "sourceUrl": "https://knowyourmeme.com/memes/fomo",
    "platform": "knowyourmeme",
    "attribution": "Know Your Meme / Literally Media",
    "description": "Slang documentation.",
    "date": "2004",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "title": "FOMO — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "FOMO — Know Your Meme",
    "url": "https://knowyourmeme.com/memes/fomo",
    "domain": "knowyourmeme.com"
  },
  {
    "title": "FOMO — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Fear_of_missing_out",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
