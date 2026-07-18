import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m4",
  slug: "distorted-meme-face",
  title: "Distorted Meme Face",
  category: "meme",
  description:
    "Deep-fried, stretched reaction faces used to convey unhinged emotional responses.",
  imageGradient: "from-purple-600 via-violet-500 to-fuchsia-400",
  scores: { relevance: 70, brainrot: 62, cringe: 58 },
  addedAt: "2026-06-22",
  views: 180000,
  trendDirection: "stable",
  meaning:
    "An exaggerated, warped facial expression edited onto reaction memes to signal chaos or disbelief.",
  origin:
    "Evolved from deep-fried meme culture on Reddit and Instagram meme pages in the late 2010s.",
  timeline: [
    { date: "2018", event: "Deep-fried meme era on r/deepfriedmemes" },
    { date: "2022", event: "TikTok distortion filters revive format" },
    { date: "2026", event: "Still used in ironic reaction edits" },
  ],
  examples: [
    "Me when the professor says 'pop quiz' [distorted face]",
    "That face when you Fanum tax the wrong person",
  ],
  relatedSlugs: ["wojak", "rage-comics"],
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: clean encyclopedic deep-fry still. Sources checked: Commons (abrasive
  // examples fail hero appropriateness), KYM. No clean canonical exists.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/deep-fried-memes",
      title: "Deep Fried Memes — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/deep-fried-memes",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Documentation of deep-fried / distorted reaction-face meme aesthetics.",
      date: "2017",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Deep Fried Memes — Know Your Meme",
      url: "https://knowyourmeme.com/memes/deep-fried-memes",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
