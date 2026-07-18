import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t6",
  slug: "mewing",
  title: "Mewing",
  category: "trend",
  description:
    "A tongue-posture technique from orthotropics that went viral as looksmaxxing advice — then became a joke about jawlines, silence, and 'mewing face.'",
  imageGradient: "from-teal-400 via-cyan-500 to-blue-500",
  scores: { relevance: 69, influence: 69, cringe: 79, brainrot: 73 },
  addedAt: "2026-06-28",
  views: 380000,
  trendDirection: "stable",
  tags: ["looksmaxxing", "tiktok", "jawline", "gen alpha", "sigma", "self-improvement"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: mewing tongue-posture diagram used in looksmaxxing TikToks.
  // Sources checked: Commons ("tongue posture mewing" — unrelated books/PDFs),
  // Know Your Meme. Medical stock would mislead as clinical dentistry content.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/mewing",
      title: "Mewing — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/mewing",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of mewing as looksmaxxing slang and viral TikTok practice.",
      date: "2019",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Mewing — Know Your Meme",
      url: "https://knowyourmeme.com/memes/mewing",
      domain: "knowyourmeme.com",
    },
    {
      title: "Looksmaxxing — Wikipedia (discusses mewing)",
      url: "https://en.wikipedia.org/wiki/Looksmaxxing",
      domain: "en.wikipedia.org",
    },
  ],
  relatedSlugs: ["looksmaxxing", "sigma", "sigma-grindset", "mogging", "aura"],
  relationships: {
    relatedTo: ["looksmaxxing", "mogging"],
    sameEra: ["sigma-grindset", "sigma"],
    community: ["looksmaxxing"],
  },
};

export default entry;
