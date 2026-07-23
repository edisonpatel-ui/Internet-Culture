import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr39",
  slug: "jenna-marbles",
  title: "Jenna Marbles",
  category: "creator",
  personType: "Creator",
  description:
    "Jenna Mourey (Jenna Marbles) — early YouTube comedy star whose absurdist vlogs and \"What Are You Doing?\" energy influenced a decade of creator humor before her 2020 exit.",
  imageGradient: "from-yellow-300 via-amber-200 to-orange-300",
  scores: { relevance: 52, influence: 88, cringe: 35, brainrot: 40 },
  addedAt: "2026-07-23",
  views: 1300000,
  trendDirection: "declining",
  tags: ["youtube", "comedy", "vlogs", "2010s", "legacy"],
  careerStart: "2010",
  platforms: [
    { platform: "youtube", handle: "JennaMarbles", url: "https://www.youtube.com/@JennaMarbles" },
  ],
  followers: {
    youtube: "~20M+ (legacy channel)",
  },
  notableMoments: [
    "\"How to Trick People Into Thinking You're Good Looking\" launched her to early YouTube stardom",
    "Years of weekly comedy vlogs with dogs Kermit and Peach as co-stars",
    "Announced indefinite YouTube hiatus in June 2020 amid past video resurfacing",
    "Cited by later creators as a foundational influence on YouTube comedy tone",
  ],
  relatedSlugs: ["youtube-creator-era", "pewdiepie", "markiplier", "influencer-culture"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/1/11/RISE_-_Jenna_Marbles_01_%28cropped%29.jpg",
      title: "Jenna Marbles at RISE 2018",
      source: "Wikimedia Commons / RISE / Harry Murphy",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:RISE_-_Jenna_Marbles_01_(cropped).jpg",
      platform: "wikimedia",
      attribution: "Harry Murphy / RISE via Sportsfile (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Jenna Marbles on stage at RISE conference, Hong Kong 2018.",
      date: "2018-07-12",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Jenna_Marbles",
      title: "Jenna Marbles — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Jenna_Marbles",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Jenna Marbles — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Jenna_Marbles",
      domain: "en.wikipedia.org",
    },
    {
      title: "Jenna Marbles — YouTube",
      url: "https://www.youtube.com/@JennaMarbles",
      domain: "youtube.com",
    },
  ],
};

export default entry;
