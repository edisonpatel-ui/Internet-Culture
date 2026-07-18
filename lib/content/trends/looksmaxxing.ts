import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t5",
  slug: "looksmaxxing",
  title: "Looksmaxxing",
  category: "trend",
  description:
    "Self-improvement subculture focused on appearance optimization, debated across Reddit and TikTok.",
  imageGradient: "from-amber-500 via-orange-500 to-red-500",
  scores: { relevance: 78, brainrot: 61, cringe: 67 },
  addedAt: "2026-07-05",
  views: 420000,
  trendDirection: "rising",
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
  ],
  relatedSlugs: ["mewing", "sigma-grindset", "sigma"],
};

export default entry;
