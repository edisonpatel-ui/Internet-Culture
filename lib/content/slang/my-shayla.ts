import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s48",
  slug: "my-shayla",
  title: "My Shayla",
  category: "slang",
  description:
    "TikTok slang for someone or something you love with overwhelming affection — from Tyrese Gibson's tearful 'Oh my god, my Shayla.'",
  imageGradient: "from-rose-400 via-pink-500 to-amber-400",
  scores: { relevance: 84, influence: 50, cringe: 42, brainrot: 48 },
  addedAt: "2026-07-18",
  historicalDate: "2017-11-01",
  views: 1800000,
  trendDirection: "rising",
  tags: ["tiktok", "gen z", "affection", "2024", "2025", "sound"],
  definition:
    "My Shayla is affectionate slang for a person, pet, or thing you love intensely — often after a moment of annoyance melts into soft recognition. Online it can be sincere or playfully dramatic: 'that's my Shayla' means that's my beloved.",
  origin:
    "From a November 2017 Instagram video by actor Tyrese Gibson during a custody dispute over his daughter Shayla, where he tearfully says 'Oh my god, my Shayla.' Stills circulated as 'Crying Tyrese' reactions; the specific line exploded as a TikTok sound in late 2024, reframed as cute/affectionate meme slang (Know Your Meme, Dexerto). The original context was painful — modern usage is usually detached from that custody moment.",
  usageExamples: [
    "Looking at your dog after they destroy a shoe: 'my Shayla…'",
    "Caption under a partner's childhood photo: 'oh my god my Shayla'",
    "Calling a comfort show character 'my Shayla' in the comments",
  ],
  relatedSlugs: ["pookie", "delulu", "its-giving", "demure-mindful"],
  relationships: {
    relatedSlang: ["pookie", "delulu", "its-giving"],
    relatedTo: ["demure-mindful"],
    community: ["pookie"],
  },
  media: [
    // AI suggested — KYM cover; human should confirm before verified:true
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/052/499/my-shayla-meme.jpg",
      title: "My Shayla — meme documentation cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/my-shayla",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Cover image documenting the My Shayla TikTok slang/meme (originated from Tyrese Gibson's viral clip).",
      date: "2024",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/my-shayla",
      title: "My Shayla — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/my-shayla",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin clip and late-2024 TikTok slang revival.",
      date: "2024",
      verified: false,
    },
  ],
  sources: [
    {
      title: "My — Wiktionary",
      url: "https://en.wiktionary.org/wiki/My",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
