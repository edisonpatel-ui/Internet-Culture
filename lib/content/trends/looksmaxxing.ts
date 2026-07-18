import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t5",
  slug: "looksmaxxing",
  title: "Looksmaxxing",
  category: "trend",
  description:
    "An online self-improvement subculture focused on maximizing physical appearance — from skincare and gym routines to contested 'looksmax' jargon on Reddit and TikTok.",
  imageGradient: "from-amber-500 via-orange-500 to-red-500",
  scores: { relevance: 78, influence: 78, cringe: 67, brainrot: 61 },
  addedAt: "2026-07-05",
  views: 420000,
  trendDirection: "rising",
  tags: ["looksmaxxing", "mewing", "tiktok", "reddit", "self-improvement", "sigma"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: non-misleading looksmaxxing diagram. Sources checked: Commons/KYM.
  // Gym/selfie stock would mislead as generic fitness.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/looksmaxxing",
      title: "Looksmaxxing — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/looksmaxxing",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of looksmaxxing culture and related slang.",
      date: "2020",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Looksmaxxing — Know Your Meme",
      url: "https://knowyourmeme.com/memes/looksmaxxing",
      domain: "knowyourmeme.com",
    },
    {
      title: "Looksmaxxing — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Looksmaxxing",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["mewing", "sigma", "sigma-grindset", "mogging", "aura"],
  relationships: {
    relatedTo: ["mewing", "mogging"],
    relatedSlang: ["sigma", "aura"],
    sameEra: ["sigma-grindset"],
  },
};

export default entry;
