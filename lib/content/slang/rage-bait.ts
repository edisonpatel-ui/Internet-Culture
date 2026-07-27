import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s74",
  slug: "rage-bait",
  title: "Rage Bait",
  category: "slang",
  description:
    "Content engineered to make you angry enough to engage — the cousin of clickbait, optimized for quote-tweets.",
  imageGradient: "from-red-600 via-orange-600 to-red-700",
  scores: { relevance: 88, influence: 75, cringe: 50, brainrot: 40 },
  addedAt: "2026-07-23",
  views: 1300000,
  trendDirection: "rising",
  tags: ["twitter", "youtube", "algorithm", "2020s", "outrage"],
  definition:
    "Rage bait is posts, thumbnails, or takes designed to trigger outrage so you comment, share, or dunk on them — feeding the algorithm. Unlike accidental bad takes, rage bait is often deliberate ('unpopular opinion' threads, inflammatory thumbnails). Calling something rage bait is a way to refuse engagement.",
  origin:
    "The term merged 'rage' forum culture with 'clickbait' as Twitter/X and YouTube reward engagement over nuance in the 2020s. Creators and brands learned that controversy drives distribution; users coined 'rage bait' to label posts they suspected were farming outrage on purpose.",
  usageExamples: [
    "Do not quote-tweet that — pure rage bait.",
    "The thumbnail said 'WORST GENERATION' — classic rage bait.",
    "He posts rage bait every Monday for the engagement spike.",
  ],
  relatedSlugs: ["clickbait", "ratio", "performative", "brand-social-media-wars"],
  relationships: {
    relatedSlang: ["clickbait"],
  },
  sources: [
    {
      title: "Clickbait — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clickbait",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
