import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s13",
  slug: "mid",
  title: "Mid",
  category: "slang",
  description: "Mediocre, average, unremarkable — the internet's most dismissive single-syllable review.",
  imageGradient: "from-zinc-500 via-gray-400 to-zinc-400",
  scores: { relevance: 85, influence: 85, cringe: 22, brainrot: 35 },
  addedAt: "2026-07-16",
  historicalDate: "2021-01-01",
  views: 1200000,
  trendDirection: "stable",
  tags: ["gaming", "review", "gen z", "dismissive", "quality"],
  definition:
    "Describes something as mediocre, average, or thoroughly underwhelming. Short for 'middle tier.' Used as a one-word dismissal — implies something is not bad enough to criticize in detail, but not good enough to praise.",
  origin:
    "Originated in competitive gaming culture where players are rated as top, mid (middle), or bot (bottom) tier. Entered general internet slang around 2021–2022, quickly becoming one of the most-used Gen Z verdicts for food, media, events, and everything in between.",
  usageExamples: [
    "I saw that movie everyone's been hyping — it was mid",
    "Honestly mid burger, nothing special",
    "The album isn't bad, it's just deeply mid",
  ],
  relatedSlugs: ["no-cap", "bussin"],
  sources: [
    {
      title: "Mid — Wiktionary",
      url: "https://en.wiktionary.org/wiki/Mid",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
