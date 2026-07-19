import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s16",
  slug: "aura",
  title: "Aura",
  category: "slang",
  description:
    "Someone's effortless cool or presence — often joked about as gaining or losing 'aura points.'",
  imageGradient: "from-violet-400 via-purple-400 to-indigo-500",
  scores: { relevance: 87, influence: 87, cringe: 18, brainrot: 32 },
  addedAt: "2026-07-16",
  historicalDate: "2024-01-01",
  views: 980000,
  trendDirection: "stable",
  tags: ["tiktok", "gen z", "personality", "cool", "2024", "vibes"],
  definition:
    "Aura means someone's perceived cool, mystery, or social presence — the vibe they give off without trying. Saying someone 'has aura' means they seem effortlessly compelling. Online, people also treat it like a score: cool or smooth actions are '+1000 aura,' while embarrassing ones are 'aura loss.' Broader than rizz (flirting skill); closer to overall presence.",
  origin:
    "Borrowed from spiritual/wellness talk about energy fields, then remixed by Gen Z TikTok and meme culture around 2024 into a jokey social metric ('aura points') for cool vs. cringe moments.",
  usageExamples: [
    "Silent guys with aura > loud guys with rizz",
    "I lost all my aura when I tripped in front of the entire class",
    "He walked into the room and the aura was immaculate",
  ],
  relatedSlugs: ["rizz", "sigma", "aura-farming", "locked-in", "glazing"],
  relationships: {
    relatedSlang: ["rizz", "sigma", "locked-in", "glazing"],
    relatedTo: ["aura-farming"],
  },
  sources: [
    {
      title: "Aura — Know Your Meme",
      url: "https://knowyourmeme.com/memes/aura",
      domain: "knowyourmeme.com",
    },
    {
      title: "aura — Wiktionary (slang)",
      url: "https://en.wiktionary.org/wiki/aura#English",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
