import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e4",
  slug: "ai-chatbot-wars",
  title: "AI Chatbot Wars",
  category: "event",
  description:
    "The year AI chatbots became a cultural battleground — memes, debates, and existential dread about robots stealing jobs.",
  imageGradient: "from-slate-600 via-zinc-500 to-gray-400",
  scores: { relevance: 96, brainrot: 45, cringe: 38 },
  addedAt: "2026-07-01",
  views: 2300000,
  trendDirection: "stable",
  platform: "X, Reddit, YouTube, everywhere",
  impact:
    "AI became the defining cultural and economic anxiety of the era. Every industry debated replacement. The discourse shaped elections, legislation, and an entirely new class of internet humor.",
  highlights: [
    "ChatGPT became the fastest product to reach 100M users in history",
    "AI slop became a recognized term for low-effort AI-generated content",
    "Writers, artists, and coders all fought back against AI replacement",
    "AI hallucinations spawned a genre of screenshots shared as cautionary humor",
  ],
  relatedSlugs: ["sigma-grindset"],
  tags: ["AI", "chatgpt", "technology", "jobs", "culture war"],
  sources: [
    {
      title: "ChatGPT — Wikipedia",
      url: "https://en.wikipedia.org/wiki/ChatGPT",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
