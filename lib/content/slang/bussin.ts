import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s8",
  slug: "bussin",
  title: "Bussin",
  category: "slang",
  description: "Really good — usually describing food.",
  imageGradient: "from-orange-400 via-red-400 to-rose-500",
  scores: { relevance: 71, brainrot: 38, cringe: 47 },
  addedAt: "2026-06-10",
  views: 220000,
  trendDirection: "declining",
  definition:
    "Slang for extremely good, delicious, or impressive. Most commonly used for food but applies broadly.",
  origin:
    "AAVE popularized through TikTok food reviews and mukbang content in the early 2020s.",
  usageExamples: [
    "This burrito is bussin bussin",
    "Not bussin — wouldn't recommend",
    "Bussin fr fr no cap",
  ],
  relatedSlugs: ["no-cap", "based"],
  sources: [
    {
      title: "Bussin — Know Your Meme",
      url: "https://knowyourmeme.com/memes/bussin",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
