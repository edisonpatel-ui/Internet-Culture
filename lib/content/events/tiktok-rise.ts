import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e7",
  slug: "tiktok-rise",
  title: "TikTok's Rise",
  category: "event",
  description:
    "How a Chinese app swallowed the internet and redefined how culture, trends, music, and language spread globally.",
  imageGradient: "from-pink-600 via-fuchsia-500 to-purple-600",
  scores: { relevance: 97, brainrot: 70, cringe: 40 },
  addedAt: "2026-07-16",
  historicalDate: "2018-08-02",
  views: 2800000,
  trendDirection: "stable",
  platform: "TikTok",
  impact:
    "TikTok fundamentally changed how trends are born, spread, and die. Its recommendation algorithm — not follower counts — determines what goes viral. This shifted cultural power from established creators to anyone with a phone and an idea.",
  highlights: [
    "ByteDance launched TikTok internationally in September 2017",
    "Merged with Musical.ly in August 2018, inheriting its US creator base",
    "Became the most downloaded app in the US in Q1 2018",
    "COVID-19 lockdowns in 2020 drove explosive growth worldwide",
    "Triggered repeated US ban attempts and global regulatory scrutiny from 2020 onward",
  ],
  relatedSlugs: ["short-form-takeover", "vine-shutdown", "rizz"],
  tags: ["tiktok", "social media", "algorithm", "short-form video", "viral", "gen z"],
  sources: [
    {
      title: "TikTok — Wikipedia",
      url: "https://en.wikipedia.org/wiki/TikTok",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
