import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s44",
  slug: "deadass",
  title: "Deadass",
  category: "slang",
  description:
    "Emphatic slang meaning 'seriously' or 'for real' — used to stress honesty or intensity.",
  imageGradient: "from-red-700 via-rose-600 to-pink-500",
  scores: { relevance: 80, influence: 80, cringe: 15, brainrot: 22 },
  addedAt: "2026-07-18",
  historicalDate: "2000-01-01",
  views: 900000,
  trendDirection: "stable",
  tags: ["aave", "nyc", "gen z", "emphasis", "tiktok"],
  definition:
    "Deadass means 'I'm serious' / 'for real' — an intensifier that confirms sincerity or disbelief. Can stand alone ('Deadass?') as a question, or modify a claim ('I deadass forgot'). Closely related to no cap in function, with stronger New York / AAVE roots in popular usage.",
  origin:
    "Longstanding AAVE / New York City slang that spread nationally through hip-hop, Vine, Twitter, and TikTok. Know Your Meme documents its mainstream internet adoption as an emphatic particle.",
  usageExamples: [
    "Deadass thought the exam was tomorrow",
    "You got the job? Deadass?",
    "I'm deadass not going to that party",
  ],
  relatedSlugs: ["no-cap", "bet", "high-key-low-key", "type-shii"],
  relationships: {
    relatedSlang: ["no-cap", "bet", "type-shii"],
  },
  sources: [
    {
      title: "Deadass — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Deadass",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
