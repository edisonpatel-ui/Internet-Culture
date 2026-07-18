import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m6",
  slug: "roman-empire-meme",
  title: "Roman Empire",
  category: "meme",
  description:
    "'How often do you think about the Roman Empire?' — the relationship test heard round the world.",
  imageGradient: "from-amber-600 via-yellow-600 to-orange-500",
  scores: { relevance: 45, brainrot: 28, cringe: 55 },
  addedAt: "2026-04-18",
  views: 320000,
  trendDirection: "declining",
  meaning:
    "A viral prompt asking men how frequently they think about the Roman Empire — spawned confessions and parodies.",
  origin:
    "Sparked by a viral September 2023 Instagram Reels trend where women asked their male partners how often they think about the Roman Empire. Men's unexpectedly frequent answers — 'every day,' 'at least once a week' — surprised many and turned the question into a widespread social experiment. Historians, classicists, and meme accounts piled on with genuine context and comedic takes.",
  timeline: [
    { date: "Sep 2023", event: "Trend starts on Instagram Reels — women asking men the Roman Empire question" },
    { date: "Oct 2023", event: "Peak mainstream media coverage — the New York Times, BBC, and others cover it" },
    { date: "2024+", event: "Format adapts: 'how often do you think about [X]' spawns variations across demographics" },
  ],
  examples: [
    "She asked about the Roman Empire — I showed her my playlist",
    "Thinking about the Roman Empire more than my savings account",
    "How often do you think about the Roman Empire? Twice a day at minimum",
  ],
  relatedSlugs: ["girl-dinner"],
  // Text/prompt meme — no single defining visual. Reference only.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/how-often-do-you-think-about-the-roman-empire",
      title: "How Often Do You Think About the Roman Empire — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/how-often-do-you-think-about-the-roman-empire",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the 2023 Roman Empire relationship-question trend.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "How Often Do You Think About the Roman Empire — Know Your Meme",
      url: "https://knowyourmeme.com/memes/how-often-do-you-think-about-the-roman-empire",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
