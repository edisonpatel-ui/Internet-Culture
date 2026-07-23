import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s84",
  slug: "vibe-check",
  title: "Vibe Check",
  category: "slang",
  description:
    "A quick read of someone's mood or energy — or the meme that bonks you for bad vibes.",
  imageGradient: "from-cyan-400 via-teal-400 to-green-400",
  scores: { relevance: 78, influence: 72, cringe: 30, brainrot: 35 },
  addedAt: "2026-07-23",
  views: 1100000,
  trendDirection: "stable",
  tags: ["memes", "twitter", "2020", "mental health", "humor"],
  definition:
    "A vibe check asks 'what's the energy here?' — checking in on mood or group atmosphere. The 2020 meme version flipped it into a surreal punishment: a character appears, assesses your vibes, and attacks if you fail. Both uses coexist: sincere wellness check-in and absurdist bonk meme.",
  origin:
    "Vibe check as mood assessment circulated on Twitter for years. In April 2020, a viral tweet paired the phrase with an image of a hand reaching from darkness — spawning edit chains, Discord jokes, and 'failed the vibe check' memes during early pandemic lockdown humor.",
  usageExamples: [
    "Quick vibe check — everyone good or are we spiraling?",
    "That tweet failed the vibe check immediately.",
    "Group chat vibe check: who is still awake at 3?",
  ],
  relatedSlugs: ["npc", "this-is-fine", "touch-grass", "main-character-energy"],
  sources: [
    {
      title: "Vibe Check — Know Your Meme",
      url: "https://knowyourmeme.com/memes/vibe-check",
      domain: "knowyourmeme.com",
    },
    {
      title: "Vibe check meme — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Vibe_check_(meme)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
