import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s50",
  slug: "ez",
  title: "EZ",
  category: "slang",
  description:
    "Gaming and internet shorthand for 'easy' — boast, joke, or ironic flex after a win (or a loss).",
  imageGradient: "from-lime-400 via-green-500 to-zinc-800",
  scores: { relevance: 78, influence: 72, cringe: 55, brainrot: 35 },
  addedAt: "2026-07-18",
  historicalDate: "2000-01-01",
  views: 4200000,
  trendDirection: "stable",
  tags: ["gaming", "chat", "esports", "shorthand", "classic"],
  definition:
    "EZ (also typed 'ez') means 'easy.' In multiplayer games and chats it is a post-match taunt or joke — claiming the win was effortless. Can be sincere flex, ironic after a sweaty fight, or sarcastic, after a loss ('ez' as salt). Closely tied to online gaming etiquette culture alongside GG / GG EZ.",
  origin:
    "Shortening of 'easy' in English internet and gaming chat since early online multiplayer (2000s LAN / IRC / in-game chat era). Became especially visible in competitive FPS and MOBAs as 'gg ez' — a sportsmanship violation on many servers because it reads as disrespectful. No single inventor; standard gamer shorthand documented across forums, Twitch chat, and esports discourse.",
  usageExamples: [
    "Clutch win in ranked: 'ez'",
    "Teammate spam after a stomp: 'gg ez'",
    "Ironic after barely surviving: 'that was ez fr'",
  ],
  relatedSlugs: ["geeg", "w-dub", "l", "goat", "ratio"],
  relationships: {
    relatedSlang: ["geeg", "w-dub", "l", "goat", "ratio"],
    community: ["geeg", "w-dub"],
  },
  sources: [
    {
      title: "GG — Know Your Meme (related gaming chat culture)",
      url: "https://knowyourmeme.com/memes/gg",
      domain: "knowyourmeme.com",
    },
    {
      title: "EZ — Urban Dictionary",
      url: "https://www.urbandictionary.com/define.php?term=EZ",
      domain: "urbandictionary.com",
    },
  ],
};

export default entry;
