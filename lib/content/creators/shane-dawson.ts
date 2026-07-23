import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr41",
  slug: "shane-dawson",
  title: "Shane Dawson",
  category: "creator",
  personType: "Creator",
  description:
    "Early YouTube sketch and conspiracy-era creator whose documentary pivots, beauty collaborations, and 2020 controversies marked a rise-and-reckoning arc in influencer history.",
  imageGradient: "from-neutral-700 via-zinc-600 to-stone-500",
  scores: { relevance: 50, influence: 85, cringe: 82, brainrot: 42 },
  addedAt: "2026-07-23",
  views: 1400000,
  trendDirection: "declining",
  tags: ["youtube", "documentary", "conspiracy", "beauty", "controversy"],
  careerStart: "2008",
  platforms: [
    { platform: "youtube", handle: "shane", url: "https://www.youtube.com/@shane" },
  ],
  followers: {
    youtube: "~20M+ (legacy channel)",
  },
  notableMoments: [
    "One of YouTube's earliest crossover stars with sketch comedy and song parodies",
    "Pivot to conspiracy and documentary series drew massive 2018–2019 viewership",
    "The Secret World of Jeffree Star series peaked beauty-doc influencer format",
    "Stepped back from YouTube amid 2020 resurfaced content and controversy",
  ],
  relatedSlugs: ["jeffree-star", "james-charles", "youtube-creator-era", "jake-paul"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Shane_Dawson",
      title: "Shane Dawson — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Shane_Dawson",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Shane Dawson — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Shane_Dawson",
      domain: "en.wikipedia.org",
    },
    {
      title: "shane — YouTube",
      url: "https://www.youtube.com/@shane",
      domain: "youtube.com",
    },
  ],
};

export default entry;
