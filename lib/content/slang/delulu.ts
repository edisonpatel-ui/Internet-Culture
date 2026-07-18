import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s5",
  slug: "delulu",
  title: "Delulu",
  category: "slang",
  description:
    "Short for delusional — believing something unrealistic, especially about a crush, celebrity, or fantasy outcome.",
  imageGradient: "from-fuchsia-500 via-pink-400 to-rose-400",
  scores: { relevance: 83, influence: 83, cringe: 41, brainrot: 44 },
  addedAt: "2026-06-25",
  views: 560000,
  trendDirection: "rising",
  definition:
    "Delulu is short for delusional: holding an unrealistic belief, most often that a crush will notice you, that a celebrity ship is real, or that an unlikely fantasy will come true. Fans use it playfully ('delulu is the solulu') as well as critically. The word moved from K-pop/fandom Twitter into mainstream TikTok and Gen Z speech.",
  origin:
    "Shortened from 'delusional' in K-pop and fandom communities on Twitter. TikTok and broader Gen Z culture adopted it for crush humor, manifestation jokes, and self-aware wishful thinking.",
  usageExamples: [
    "Delulu is the solulu (delusion is the solution)",
    "I'm delulu enough to think they'll text back tonight",
    "The delulu trance is strong today",
  ],
  relatedSlugs: ["rizz", "brat-summer", "main-character-energy", "aura", "pookie"],
  relationships: {
    relatedSlang: ["rizz", "aura", "pookie", "main-character-energy"],
    relatedEvent: ["brat-summer"],
  },
  sources: [
    {
      title: "Delulu — Know Your Meme",
      url: "https://knowyourmeme.com/memes/delulu",
      domain: "knowyourmeme.com",
    },
    {
      title: "Delulu — Wiktionary",
      url: "https://en.wiktionary.org/wiki/delulu",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
