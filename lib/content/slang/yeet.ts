import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s10",
  slug: "yeet",
  title: "Yeet",
  category: "slang",
  description: "To throw something with force — or just a general exclamation of enthusiasm.",
  imageGradient: "from-green-500 via-emerald-500 to-teal-400",
  scores: { relevance: 75, brainrot: 58, cringe: 68 },
  addedAt: "2026-07-16",
  historicalDate: "2014-02-01",
  views: 820000,
  trendDirection: "declining",
  tags: ["vine", "classic", "exclamation", "gen z", "2014"],
  definition:
    "A versatile exclamation — used when throwing something, achieving a goal, or as a general expression of excitement. Can function as a verb ('I yeeted it into the bin') or an interjection ('YEET!'). Added to Merriam-Webster dictionary in September 2022.",
  origin:
    "Popularized by a 2014 Vine video where a person performed a dance move called 'yeet.' The word had earlier uses meaning to throw something with force or as an exclamation. Its viral Vine context made it mainstream.",
  usageExamples: [
    "YEET — throws phone across room",
    "I just yeeted my homework into the bin",
    "Yeet or be yeeted",
  ],
  relatedSlugs: ["no-cap", "bussin"],
  sources: [
    {
      title: "Yeet — Know Your Meme",
      url: "https://knowyourmeme.com/memes/yeet",
      domain: "knowyourmeme.com",
    },
    {
      title: "Yeet — Merriam-Webster",
      url: "https://www.merriam-webster.com/dictionary/yeet",
      domain: "merriam-webster.com",
    },
  ],
};

export default entry;
