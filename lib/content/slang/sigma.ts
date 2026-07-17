import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s4",
  slug: "sigma",
  title: "Sigma",
  category: "slang",
  description:
    "Lone-wolf archetype detached from social hierarchy — often satirical.",
  imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  scores: { relevance: 72, brainrot: 68, cringe: 81 },
  addedAt: "2026-07-01",
  views: 284000,
  trendDirection: "declining",
  definition:
    "Refers to the 'sigma male' archetype — someone who operates outside traditional social dominance hierarchies. Almost always used ironically online.",
  origin:
    "Evolved from incel forum taxonomy into TikTok satire. Grindset memes repurposed the term into comedy.",
  usageExamples: [
    "Sigma grindset: waking up at 4am to post memes",
    "He's so sigma he eats lunch alone by choice",
    "Sigma male playlist — phonk only",
  ],
  relatedSlugs: ["mewing", "looksmaxxing"],
  sources: [
    {
      title: "Sigma Male Grindset — Know Your Meme",
      url: "https://knowyourmeme.com/memes/sigma-male-grindset",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
