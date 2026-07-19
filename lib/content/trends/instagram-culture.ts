import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t24",
  slug: "instagram-culture",
  title: "Instagram Culture",
  category: "trend",
  description:
    "Feed aesthetics, Stories, likes-as-status, and the filtered self — how Instagram trained a generation to perform photogenic life.",
  imageGradient: "from-fuchsia-500 via-orange-400 to-yellow-300",
  scores: { relevance: 80, influence: 88, cringe: 40, brainrot: 28 },
  addedAt: "2026-07-19",
  historicalDate: "2010-10-06",
  views: 4000000,
  trendDirection: "stable",
  tags: ["instagram","aesthetic","influencer","filters","social media"],
  origin:
    "Launched 2010, Instagram made square photos, filters, and later Stories/Reels the grammar of social aspiration. Culturally it incubated influencer norms, VSCO/Clean Girl looks, and anxiety about curated authenticity (Wikipedia: Instagram).",
  summary:
    "Platform culture distinct from TikTok's algorithm chaos: grid curation, aesthetic tribes, and brand-safe glamour. Parent habitat for influencer culture and many fashion aesthetics.",
  relatedSlugs: ["influencer-culture","clean-girl-aesthetic","y2k-revival","dark-academia","most-liked-egg","bereal-wave"],
  relationships: {
  "relatedTo": [
    "influencer-culture",
    "clean-girl-aesthetic",
    "y2k-revival",
    "dark-academia",
    "most-liked-egg"
  ],
  "relatedEvent": [
    "bereal-wave",
    "threads-launch"
  ],
  "community": [
    "influencer-culture"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    "title": "Instagram logo",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Instagram_logo_2022.svg",
    "platform": "wikimedia",
    "attribution": "Meta / Instagram (see Commons file page)",
    "license": "See Commons file page",
    "description": "Official Instagram mark for the platform culture entry.",
    "date": "2010",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Instagram",
    "title": "Instagram Culture — Wikipedia",
    "source": "Wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Instagram",
    "platform": "other",
    "attribution": "Wikipedia contributors",
    "license": "CC BY-SA 4.0",
    "description": "Encyclopedic background.",
    "verified": false
  }
],
  sources: [
  {
    "title": "Instagram Culture — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Instagram",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
