import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s43",
  slug: "npc",
  title: "NPC",
  category: "slang",
  description:
    "Calling someone an NPC means they seem scripted, basic, or incapable of original thought — like a background video-game character.",
  imageGradient: "from-stone-600 via-neutral-500 to-zinc-600",
  scores: { relevance: 84, influence: 84, cringe: 45, brainrot: 62 },
  addedAt: "2026-07-18",
  historicalDate: "2016-01-01",
  views: 1500000,
  trendDirection: "stable",
  tags: ["wojak", "4chan", "tiktok", "insult", "gaming-metaphor"],
  definition:
    "NPC (non-player character) is slang for a person who appears to follow social scripts without independent opinions — repeating viral phrases, trends, or talking points like a game character on a loop. Used as an insult for blandness, conformity, or lack of self-awareness. Distinct from NPC streaming (creators who roleplay as NPCs on livestream).",
  origin:
    "Borrowed from gaming terminology and popularized in meme culture via NPC Wojak and related 2010s imageboard discourse, then mainstreamed on Twitter/X and TikTok as a shorthand insult for people who seem automated or unoriginal.",
  usageExamples: [
    "Bro only says TikTok sounds out loud — absolute NPC behavior",
    "Don't be an NPC, form your own opinion",
    "The comments are full of NPCs copy-pasting the same joke",
  ],
  relatedSlugs: ["npc-streaming", "wojak", "sigma", "brainrot", "cringe"],
  relationships: {
    relatedSlang: ["sigma", "cringe", "brainrot"],
    sameFormat: ["npc-streaming", "wojak"],
  },
  sources: [
    {
      title: "NPC — Wiktionary",
      url: "https://en.wiktionary.org/wiki/NPC",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
