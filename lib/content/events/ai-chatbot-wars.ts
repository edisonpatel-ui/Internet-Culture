import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e4",
  slug: "ai-chatbot-wars",
  title: "AI Chatbot Wars",
  category: "event",
  description:
    "The mid-2020s fight over AI chatbots — especially after ChatGPT’s late-2022 launch — when memes, job fears, and tool debates flooded X, Reddit, and YouTube.",
  imageGradient: "from-slate-600 via-zinc-500 to-gray-400",
  scores: { relevance: 96, influence: 96, cringe: 38, brainrot: 45 },
  addedAt: "2026-07-01",
  views: 2300000,
  trendDirection: "stable",
  platform: "X, Reddit, YouTube, everywhere",
  impact:
    "After ChatGPT went mainstream, AI stopped feeling like a niche tech topic. People argued about whether chatbots would replace writers, artists, and coders. Screenshots of weird wrong answers — hallucinations — became a humor format. Terms like “AI slop” named the flood of low-effort generated content. The debate showed up in news, workplace policy, and politics, and it still shapes how people talk about new AI products online.",
  highlights: [
    "OpenAI launched ChatGPT publicly on November 30, 2022",
    "ChatGPT became the fastest product to reach 100M users in history",
    "AI slop became a recognized term for low-effort AI-generated content",
    "Writers, artists, and coders pushed back against AI replacement fears",
    "AI hallucinations spawned a genre of screenshots shared as cautionary humor",
  ],
  relatedSlugs: [
    "twitter-x-transition",
    "short-form-takeover",
    "influencer-culture",
    "ai-generated-content-boom",
    "shrimp-jesus",
  ],
  tags: ["AI", "chatgpt", "technology", "jobs", "culture war"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    // Defining visual: ChatGPT product mark (the face of the chatbot-wars era).
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg",
      title: "ChatGPT — official logo",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:ChatGPT-Logo.svg",
      platform: "wikimedia",
      attribution: "OpenAI (public domain / PD-textlogo)",
      license: "Public domain",
      description:
        "Official ChatGPT logo — the product that catalyzed mainstream AI chatbot culture.",
      date: "2022",
      verified: false,
    },
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/97/OpenAI_logo_2025.svg",
      title: "OpenAI — 2025 wordmark / symbol",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:OpenAI_logo_2025.svg",
      platform: "wikimedia",
      attribution: "OpenAI (public domain)",
      license: "Public domain",
      description: "OpenAI brand mark associated with ChatGPT and the AI platform race.",
      date: "2025",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/ChatGPT",
      title: "ChatGPT — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/ChatGPT",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Launch history, cultural impact, and product timeline for ChatGPT.",
      date: "2022",
      verified: false,
    },
  ],
  sources: [
    {
      title: "ChatGPT — Wikipedia",
      url: "https://en.wikipedia.org/wiki/ChatGPT",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
