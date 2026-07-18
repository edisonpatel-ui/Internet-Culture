import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t8",
  slug: "girl-dinner",
  title: "Girl Dinner",
  category: "trend",
  description:
    "Snack-plate meals posted as aesthetic chaos — relatable, debated, endlessly duplicated.",
  imageGradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
  scores: { relevance: 64, brainrot: 35, cringe: 44 },
  addedAt: "2026-05-12",
  views: 290000,
  trendDirection: "declining",
  // Visual aesthetic, but no CC plate photo that clearly is "Girl Dinner"
  // without looking like generic food stock. Gradient + reference is correct.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/girl-dinner",
      title: "Girl Dinner — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/girl-dinner",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and spread of the Girl Dinner snack-plate aesthetic.",
      date: "2023",
      verified: true,
    },
  ],
};

export default entry;
