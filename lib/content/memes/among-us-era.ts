import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m45",
  slug: "among-us-era",
  title: "Among Us Meme Era",
  category: "meme",
  description:
    "The 2020 Among Us boom — crewmate impostor jokes, 'sus,' emergency meetings, and endless fan content.",
  imageGradient: "from-red-600 via-rose-500 to-orange-400",
  scores: { relevance: 74, brainrot: 55, cringe: 35 },
  addedAt: "2026-07-18",
  historicalDate: "2020-08-01",
  views: 7000000,
  trendDirection: "declining",
  tags: ["among-us", "2020", "gaming", "sus", "tiktok", "twitch"],
  meaning:
    "A catch-all for the meme culture around InnerSloth's Among Us during its 2020 explosion: calling things 'sus,' impostor jokes, 'emergency meeting' edits, and the bean-shaped crewmates as reaction avatars. The game became a shared language for betrayal and group chaos.",
  origin:
    "Among Us (2018) exploded in popularity in mid-to-late 2020 via Twitch streamers and TikTok. Memes, fan animations, and slang (especially 'sus') flooded every platform, defining a distinct COVID-era gaming meme moment.",
  timeline: [
    { date: "2018", event: "Among Us released with modest audience" },
    { date: "Summer–Fall 2020", event: "Streamer-driven boom; memes go mainstream" },
    { date: "2021+", event: "Peak fades; 'sus' and crewmate imagery remain in the lexicon" },
  ],
  examples: [
    "Someone acting weird in a group chat: 'kinda sus'",
    "Emergency meeting edits over everyday arguments",
  ],
  relatedSlugs: ["sus", "great-meme-reset", "coffin-dance", "npc", "brainrot"],
  relationships: {
    relatedSlang: ["sus"],
    sameEra: ["coffin-dance", "great-meme-reset"],
    relatedEvent: ["great-meme-reset"],
  },
  media: [
    // AI suggested — KYM Among Us entry icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/035/151/among_us.jpg",
      title: "Among Us — crewmate meme imagery",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/among-us",
      platform: "knowyourmeme",
      attribution: "InnerSloth / via Know Your Meme documentation",
      description: "Representative Among Us crewmate visual from the meme era.",
      date: "2020",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/among-us",
      title: "Among Us — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/among-us",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of Among Us meme culture.",
      date: "2020",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Among Us — Know Your Meme",
      url: "https://knowyourmeme.com/memes/among-us",
      domain: "knowyourmeme.com",
    },
    {
      title: "Among Us — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Among_Us",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
