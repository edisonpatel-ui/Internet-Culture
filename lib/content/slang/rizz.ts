import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s1",
  slug: "rizz",
  title: "Rizz",
  category: "slang",
  description:
    "Charisma, especially in flirting — the gold standard of social game.",
  imageGradient: "from-indigo-500 via-purple-500 to-pink-500",
  scores: { relevance: 94, brainrot: 48, cringe: 33 },
  addedAt: "2026-06-01",
  views: 980000,
  trendDirection: "stable",
  definition:
    "Short for charisma. Used to describe someone's ability to charm or flirt successfully. Can be used sincerely or ironically.",
  origin:
    "Popularized by Kai Cenat and Twitch streamer culture. Spread from gaming communities to mainstream TikTok by 2023.",
  usageExamples: [
    "He's got unlimited rizz — how does he do it?",
    "W rizz / L rizz (win/loss charisma)",
    "I lost all my rizz the moment I said 'hello fellow kids'",
  ],
  relatedSlugs: ["gyatt", "fanum-tax"],
  sources: [
    {
      title: "Rizz — Know Your Meme",
      url: "https://knowyourmeme.com/memes/rizz",
      domain: "knowyourmeme.com",
    },
    {
      title: "Oxford University Press Word of the Year 2023: rizz",
      url: "https://languages.oup.com/word-of-the-year/2023/",
      domain: "oup.com",
    },
  ],
};

export default entry;
