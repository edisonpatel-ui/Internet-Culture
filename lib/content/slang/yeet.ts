import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s10",
  slug: "yeet",
  title: "Yeet",
  category: "slang",
  description: "To throw something with force — or just a general exclamation of enthusiasm.",
  imageGradient: "from-green-500 via-emerald-500 to-teal-400",
  scores: { relevance: 75, influence: 72, cringe: 68, brainrot: 58 },
  addedAt: "2026-07-16",
  historicalDate: "2014-02-01",
  views: 820000,
  trendDirection: "declining",
  tags: ["vine", "classic", "exclamation", "gen z", "2014"],
  definition:
    "Yeet means to throw something hard and far — or to shout 'YEET!' while doing something forceful or celebratory. As a verb: 'I yeeted it across the room.' As an interjection: a loud burst of hype or commitment. It broke out on Vine in 2014 and later entered dictionaries as mainstream slang.",
  origin:
    "Viral on Vine around 2014 (notably a clip of a dance move yelled as 'yeet'), then stuck as internet slang for chucking objects or hyping an action. Merriam-Webster added it in 2022.",
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
