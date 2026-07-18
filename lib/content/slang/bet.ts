import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s45",
  slug: "bet",
  title: "Bet",
  category: "slang",
  description:
    "A quick agreement or challenge acknowledgment — 'okay,' 'deal,' or 'you're on.'",
  imageGradient: "from-yellow-500 via-amber-500 to-orange-500",
  scores: { relevance: 88, brainrot: 18, cringe: 10 },
  addedAt: "2026-07-18",
  historicalDate: "1990-01-01",
  views: 2000000,
  trendDirection: "stable",
  tags: ["aave", "agreement", "gen z", "tiktok", "texting"],
  definition:
    "Bet is a versatile affirmational slang word. As agreement it means 'okay / sounds good / I'm down.' As a challenge response it means 'you're on.' Tone is casual and confident — shorter and cooler than 'okay' or 'alright.'",
  origin:
    "Rooted in AAVE and broader American slang for accepting a wager or deal; mainstreamed online through texting, Vine, Twitter, and TikTok as an all-purpose affirmative. Dictionary and culture coverage treat it as established internet-era slang.",
  usageExamples: [
    "You free at 8? — Bet",
    "I bet I can beat your score",
    "Pull up later. Bet.",
  ],
  relatedSlugs: ["no-cap", "deadass", "w-dub", "locked-in", "say-wallahi-bro"],
  relationships: {
    relatedSlang: ["no-cap", "deadass", "locked-in"],
  },
  sources: [
    {
      title: "bet — Dictionary.com slang",
      url: "https://www.dictionary.com/e/slang/bet/",
      domain: "dictionary.com",
    },
  ],
};

export default entry;
