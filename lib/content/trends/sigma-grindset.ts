import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t1",
  slug: "sigma-grindset",
  title: "Sigma Grindset",
  category: "trend",
  description:
    "A parody of hustle culture reframed as lone-wolf alpha energy, endlessly remixed on TikTok.",
  imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  scores: { relevance: 72, brainrot: 68, cringe: 81 },
  addedAt: "2026-07-01",
  views: 284000,
  trendDirection: "declining",
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: ironic sigma hustle-edit still (often Bateman montage style).
  // Sources checked: Commons Patrick Bateman cosplay (comic-con — not the meme),
  // Know Your Meme. Cosplay / film stills would mislead as American Psycho fandom.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/sigma-male",
      title: "Sigma Male — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/sigma-male",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Documentation of sigma-male / grindset meme culture and its ironic TikTok era.",
      date: "2018",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Sigma Male — Know Your Meme",
      url: "https://knowyourmeme.com/memes/sigma-male",
      domain: "knowyourmeme.com",
    },
  ],
  relatedSlugs: ["sigma", "looksmaxxing", "mewing"],
};

export default entry;
