import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s7",
  slug: "no-cap",
  title: "No Cap",
  category: "slang",
  description: "No lie — for real, for real.",
  imageGradient: "from-blue-500 via-indigo-500 to-violet-500",
  scores: { relevance: 79, brainrot: 31, cringe: 25 },
  addedAt: "2026-05-15",
  views: 290000,
  trendDirection: "stable",
  definition:
    "Means 'no lie' or 'for real.' 'Cap' means a lie; 'no cap' emphasizes truthfulness.",
  origin:
    "Atlanta hip-hop scene. Young Thug and others popularized 'cap' in lyrics; 'no cap' followed in the late 2010s.",
  usageExamples: [
    "That concert was fire, no cap",
    "No cap? (seeking confirmation)",
    "Stop capping — we know you're exaggerating",
  ],
  relatedSlugs: ["bussin", "based"],
  sources: [
    {
      title: "No Cap — Know Your Meme",
      url: "https://knowyourmeme.com/memes/no-cap",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
