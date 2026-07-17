import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e5",
  slug: "short-form-takeover",
  title: "Short-Form Video Takeover",
  category: "event",
  description:
    "How TikTok, Reels, and YouTube Shorts rewired attention spans and fundamentally changed how culture spreads.",
  imageGradient: "from-fuchsia-600 via-pink-500 to-rose-400",
  scores: { relevance: 99, brainrot: 78, cringe: 55 },
  addedAt: "2026-05-20",
  views: 3100000,
  trendDirection: "stable",
  platform: "TikTok, Instagram, YouTube",
  impact:
    "Permanently altered how trends are born and die. A meme can now go from zero to mainstream in 48 hours and be dead within a week. The entire internet culture lifecycle accelerated.",
  highlights: [
    "Average trend lifespan dropped from 3 weeks to under 5 days",
    "TikTok became the dominant search engine for Gen Z, surpassing Google for discovery",
    "Attention-span discourse became its own major cultural conversation",
    "The 'brain-rot' generation emerged as a response to short-form saturation",
  ],
  relatedSlugs: ["skibidi-toilet", "brainrot", "rizz"],
  tags: ["tiktok", "social media", "attention span", "gen z", "gen alpha"],
};

export default entry;
