import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t28",
  slug: "unboxing-culture",
  title: "Unboxing Culture",
  category: "trend",
  description:
    "The ritual of filming a package open — ASMR cardboard, haul energy, and product revelation as entertainment.",
  imageGradient: "from-amber-400 via-orange-500 to-rose-500",
  scores: { relevance: 72, influence: 75, cringe: 40, brainrot: 35 },
  addedAt: "2026-07-19",
  historicalDate: "2006-01-01",
  views: 2500000,
  trendDirection: "stable",
  tags: ["youtube","unboxing","consumer","asmr","haul"],
  origin:
    "Early YouTube tech and toy unboxings (mid-late 2000s) proved that opening a product could be content. The format scaled into beauty hauls, mystery boxes, and TikTok 'what's in the box' commerce (Wikipedia: Unboxing).",
  summary:
    "Consumer culture as theater: anticipation, first impressions, and sponsorship-friendly close-ups. Sits next to influencer marketing and dupe/haul culture.",
  relatedSlugs: ["influencer-culture","influencer-marketing","dupe-economy","youtube-creator-era","creator-economy"],
  relationships: {
  "relatedTo": [
    "influencer-culture",
    "influencer-marketing",
    "dupe-economy",
    "youtube-creator-era",
    "creator-economy"
  ],
  "community": [
    "influencer-culture"
  ]
},
  media: [
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Unboxing",
    "title": "Unboxing Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Unboxing",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Unboxing Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Unboxing",
    "domain": "en.wikipedia.org"
  },
  {
    "title": "Unboxing — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Unboxing",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
