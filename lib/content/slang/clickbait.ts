import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s75",
  slug: "clickbait",
  title: "Clickbait",
  category: "slang",
  description:
    "Headlines and thumbnails that promise more than they deliver — the original engagement hack of the feed era.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 90, influence: 85, cringe: 55, brainrot: 25 },
  addedAt: "2026-07-23",
  historicalDate: "2006-01-01",
  views: 2800000,
  trendDirection: "stable",
  tags: ["youtube", "journalism", "advertising", "2000s", "algorithm"],
  definition:
    "Clickbait is any title, thumbnail, or preview designed to maximize clicks through curiosity gaps, shock, or misleading promises — 'You won't BELIEVE...' The word is neutral-descriptive but usually negative: the content rarely matches the hype. Modern variants include thumbnail faces, red circles, and listicle slugs optimized for Facebook and YouTube.",
  origin:
    "Digital publishers in the late 2000s–early 2010s (Upworthy, BuzzFeed-era Facebook) industrialized curiosity-gap headlines. YouTube's recommendation system rewarded extreme thumbnails by the mid-2010s. 'Clickbait' entered everyday speech as users learned to recognize the pattern.",
  usageExamples: [
    "The video was two minutes of nothing — total clickbait.",
    "That news alert was clickbait; read the actual article.",
    "Red arrow on the thumbnail? Instant clickbait alarm.",
  ],
  relatedSlugs: ["rage-bait", "influencer-marketing", "youtube-creator-era", "ratio"],
  relationships: {
    relatedSlang: ["rage-bait"],
  },
  sources: [
    {
      title: "Clickbait — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clickbait",
      domain: "en.wikipedia.org",
    },
    {
      title: "Clickbait — Merriam-Webster",
      url: "https://www.merriam-webster.com/dictionary/clickbait",
      domain: "merriam-webster.com",
    },
  ],
};

export default entry;
