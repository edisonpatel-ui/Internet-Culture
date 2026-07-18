import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t14",
  slug: "clean-girl-aesthetic",
  title: "Clean Girl Aesthetic",
  category: "trend",
  description:
    "A 2022–2023 TikTok beauty and lifestyle trend defined by slicked-back buns, glowing skin, minimal gold jewelry, and the appearance of effortless, natural beauty.",
  imageGradient: "from-stone-300 via-amber-200 to-yellow-100",
  scores: { relevance: 72, brainrot: 22, cringe: 28 },
  addedAt: "2026-07-17",
  views: 1800000,
  trendDirection: "declining",
  tags: ["beauty", "tiktok", "aesthetic", "makeup", "fashion", "2022"],
  origin:
    "TikTok beauty communities, 2022. The aesthetic emerged as a reaction to heavily filtered, maximalist makeup trends — emphasizing 'no-makeup makeup,' gold hoop earrings, silk pillowcases, and wellness routines. Popularized by creators like Hailey Bieber and spread through TikTok's #cleangirl hashtag.",
  relatedSlugs: ["y2k-revival"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: slicked-bun Clean Girl still. Sources checked: Commons/Wikipedia
  // (no usable image); influencer CDNs forbidden. Stock beauty photos mislead.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      title: "Clean Girl Aesthetic — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Encyclopedia overview of the Clean Girl beauty/lifestyle aesthetic.",
      date: "2022",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Clean Girl Aesthetic — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Clean_girl_aesthetic",
      domain: "en.wikipedia.org",
    },
    {
      title: "What Is the Clean Girl Aesthetic? — Vogue",
      url: "https://www.vogue.com/article/clean-girl-aesthetic",
      domain: "vogue.com",
    },
  ],
};

export default entry;
