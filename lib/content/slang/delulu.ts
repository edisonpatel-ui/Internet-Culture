import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s5",
  slug: "delulu",
  title: "Delulu",
  category: "slang",
  description:
    "Delusional — usually about crushes, celebs, or unrealistic optimism.",
  imageGradient: "from-fuchsia-500 via-pink-400 to-rose-400",
  scores: { relevance: 83, brainrot: 44, cringe: 41 },
  addedAt: "2026-06-25",
  views: 560000,
  trendDirection: "rising",
  definition:
    "Short for delusional. Describes someone holding unrealistic beliefs, often about romantic scenarios or fandom fantasies.",
  origin:
    "K-pop and fandom Twitter shortened 'delusional.' TikTok adopted it for relatable crush and manifestation humor.",
  usageExamples: [
    "Delulu is the solulu (delusion is the solution)",
    "I'm delulu enough to think they'll text back tonight",
    "The delulu trance is strong today",
  ],
  relatedSlugs: ["rizz", "brat-summer"],
  sources: [
    {
      title: "Delulu — Know Your Meme",
      url: "https://knowyourmeme.com/memes/delulu",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
