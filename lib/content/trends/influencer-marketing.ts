import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t29",
  slug: "influencer-marketing",
  title: "Influencer Marketing",
  category: "trend",
  description:
    "When brands pay creators for trust — #ad disclosures, affiliate links, and the soft commercialization of the feed.",
  imageGradient: "from-rose-400 via-pink-500 to-amber-400",
  scores: { relevance: 84, influence: 88, cringe: 50, brainrot: 25 },
  addedAt: "2026-07-19",
  historicalDate: "2010-01-01",
  views: 3100000,
  trendDirection: "stable",
  tags: ["marketing","influencer","brand","sponsorship","ads"],
  origin:
    "As influencer culture matured, brands shifted spend from banner ads to creator partnerships. #ad / gifted norms, FTC scrutiny, and affiliate economies became part of internet vernacular (Wikipedia: Influencer marketing).",
  summary:
    "The business practice attached to influencer culture: sponsored posts, ambassador deals, TikTok Shop. Culturally significant because audiences learned to spot (and meme) the sell.",
  relatedSlugs: ["influencer-culture","creator-economy","dupe-economy","unboxing-culture","brand-social-media-wars","instagram-culture"],
  relationships: {
  "relatedTo": [
    "influencer-culture",
    "creator-economy",
    "dupe-economy",
    "unboxing-culture",
    "brand-social-media-wars",
    "instagram-culture"
  ],
  "community": [
    "influencer-culture",
    "creator-economy"
  ]
},
  media: [
  {
    "role": "featured",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    "title": "Instagram logo — influencer marketing surface",
    "source": "Wikimedia Commons",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Instagram_logo_2022.svg",
    "platform": "wikimedia",
    "attribution": "Meta / Instagram (see Commons file page)",
    "license": "See Commons file page",
    "description": "Instagram mark as the classic surface for sponsored influencer marketing.",
    "date": "2010",
    "verified": false
  },
  {
    "role": "reference",
    "type": "embed",
    "url": "https://en.wikipedia.org/wiki/Influencer_marketing",
    "title": "Influencer Marketing — Wikipedia",
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
    "title": "Influencer Marketing — Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Influencer_marketing",
    "domain": "en.wikipedia.org"
  }
],
};

export default entry;
