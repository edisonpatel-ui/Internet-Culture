import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s18",
  slug: "chopped",
  title: "Chopped",
  category: "slang",
  description:
    "Ugly, unattractive, or simply not impressive — a dismissive verdict from Black internet culture.",
  imageGradient: "from-red-500 via-rose-500 to-pink-500",
  scores: { relevance: 68, brainrot: 40, cringe: 48 },
  addedAt: "2026-07-16",
  views: 410000,
  trendDirection: "stable",
  tags: ["aave", "appearance", "dismissive", "internet culture"],
  definition:
    "Used to describe someone or something as unattractive, poorly made, or generally lacking in quality. Rooted in African American Vernacular English (AAVE). Can refer to physical appearance, the quality of work, or a general dismissal.",
  origin:
    "Rooted in AAVE slang and spread through Black internet communities on Twitter, TikTok, and Instagram. Usage expanded broadly across internet culture through the early 2020s.",
  usageExamples: [
    "That haircut is chopped — he needs to go back",
    "Why is this design so chopped? A professional made this?",
    "I'm not chopped, I just had a bad game",
  ],
  relatedSlugs: ["mid", "l"],
  sources: [
    {
      title: "Chopped (Slang) — Know Your Meme",
      url: "https://knowyourmeme.com/memes/chopped",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
