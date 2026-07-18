import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s9",
  slug: "sus",
  title: "Sus",
  category: "slang",
  description: "Short for suspicious — popularized by Among Us in 2020 and now used everywhere.",
  imageGradient: "from-red-600 via-rose-500 to-pink-500",
  scores: { relevance: 88, influence: 88, cringe: 55, brainrot: 62 },
  addedAt: "2026-07-16",
  historicalDate: "2020-09-01",
  views: 1100000,
  trendDirection: "stable",
  tags: ["gaming", "among us", "social deduction", "2020", "gen z"],
  definition:
    "Short for 'suspicious.' Describes someone behaving in a way that seems deceptive, untrustworthy, or unusual. Entered mainstream vocabulary through the multiplayer game Among Us during the COVID-19 pandemic lockdowns of 2020.",
  origin:
    "While 'sus' as an abbreviation predates Among Us, the game's 2020 viral explosion made it ubiquitous. Players would accuse each other of being 'sus' (the impostor) and the word jumped from gaming into everyday speech worldwide.",
  usageExamples: [
    "That was kinda sus — where were you last period?",
    "Red is sus, vote them out",
    "Okay but that excuse is extremely sus",
  ],
  relatedSlugs: ["among-us-era", "no-cap", "npc", "great-meme-reset"],
  relationships: {
    relatedEvent: ["great-meme-reset"],
    sameEra: ["among-us-era"],
  },
  sources: [
    {
      title: "Sus — Know Your Meme",
      url: "https://knowyourmeme.com/memes/sus",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
