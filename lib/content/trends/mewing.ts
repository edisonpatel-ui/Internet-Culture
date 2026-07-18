import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t6",
  slug: "mewing",
  title: "Mewing",
  category: "trend",
  description:
    "Tongue posture technique turned meme — everyone claims it changed their jawline.",
  imageGradient: "from-teal-400 via-cyan-500 to-blue-500",
  scores: { relevance: 69, brainrot: 73, cringe: 79 },
  addedAt: "2026-06-28",
  views: 380000,
  trendDirection: "stable",
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
};

export default entry;
