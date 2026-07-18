import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m57",
  slug: "du-bist-gut-genug",
  title: "Du bist gut genug",
  category: "meme",
  description:
    "The 2026 German 'Gut Genug' chorus earworm — falsetto 'Du bist gut genug' edits, Cleveland Jr. comparisons, and TikTok loops.",
  imageGradient: "from-violet-500 via-purple-600 to-fuchsia-500",
  scores: { relevance: 88, influence: 48, cringe: 35, brainrot: 70 },
  addedAt: "2026-07-18",
  historicalDate: "2026-05-22",
  views: 1500000,
  trendDirection: "rising",
  tags: ["tiktok", "2026", "music", "germany", "earworm", "edit"],
  meaning:
    "A song-clip meme built on Blumengarten / KitschKrieg / Shirin David's 'Gut Genug.' The looping falsetto line 'Du bist gut genug' ('You are good enough') became an edit sound — often paired with Cleveland Jr. clips for the vocal resemblance, plus misheard-lyric jokes.",
  origin:
    "Gut Genug released late May 2026; a June 2026 TikTok clip of Rayan Djima's chorus went multi-million views. English-speaking TikTok and Reels turned the line into edits and Cleveland Show mashups (Know Your Meme, Wikipedia 'Gut genug').",
  timeline: [
    { date: "May 2026", event: "'Gut Genug' song and music video released in Germany" },
    { date: "Jun 2, 2026", event: "Chorus clip posts explode on TikTok" },
    { date: "Jun 2026", event: "Cleveland Jr. edits and loop remixes go international" },
    { date: "Jun 2026+", event: "Misheard-lyric and motivational-edit variants spread" },
  ],
  examples: [
    "Looping only the 'Du bist gut genug' falsetto as a sound",
    "Cleveland Jr. rap-battle clips dubbed with the chorus",
    "Caption: 'when the German song heals your ego'",
  ],
  relatedSlugs: ["short-form-takeover", "tiktok-rise", "looksmaxxing"],
  relationships: {
    relatedEvent: ["short-form-takeover", "tiktok-rise"],
    relatedTo: ["looksmaxxing"],
  },
  media: [
    // AI suggested — KYM cover for the song meme
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/056/946/dubistcover.jpg",
      title: "Du bist gut genug — meme cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/du-bist-gut-genug",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover art for the Du bist gut genug / Gut Genug viral song meme.",
      date: "2026",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/du-bist-gut-genug",
      title: "Du Bist Gut Genug — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/du-bist-gut-genug",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Song origin and TikTok edit spread.",
      date: "2026",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Gut_genug",
      title: "Gut genug — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Gut_genug",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Song chart performance and meme notes.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Du Bist Gut Genug — Know Your Meme",
      url: "https://knowyourmeme.com/memes/du-bist-gut-genug",
      domain: "knowyourmeme.com",
    },
    {
      title: "Gut genug — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gut_genug",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
