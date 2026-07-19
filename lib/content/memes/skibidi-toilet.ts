import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m3",
  slug: "skibidi-toilet",
  title: "Skibidi Toilet",
  category: "meme",
  description:
    "DaFuq!?Boom!'s surreal YouTube series of toilet-headed characters vs. camera-heads — the defining Gen Alpha brainrot mythology of the 2020s.",
  imageGradient: "from-cyan-500 via-blue-500 to-indigo-600",
  scores: { relevance: 88, influence: 76, cringe: 74, brainrot: 95 },
  addedAt: "2026-06-15",
  views: 1200000,
  trendDirection: "stable",
  tags: ["brainrot", "gen alpha", "youtube", "gmod", "dafuq boom", "short-form"],
  meaning:
    "A YouTube series featuring singing toilet heads battling camera-headed figures — pure absurdist brainrot entertainment that became Gen Alpha cultural shorthand.",
  origin:
    "Created by DaFuq!?Boom! on YouTube using Garry's Mod (GMod) — a physics sandbox game that allows custom character and scene creation. The first episode dropped in February 2023. Short-form episodes escalated rapidly, building into a full serialized narrative involving toilet-headed beings and camera-headed humans. The series spread through YouTube Shorts and schoolyard word-of-mouth.",
  timeline: [
    { date: "Feb 2023", event: "DaFuq!?Boom! uploads the first Skibidi Toilet episode" },
    { date: "Mid-2023", event: "Series explodes — hundreds of millions of views across episodes" },
    { date: "2024", event: "Gen Alpha obsession peaks — the series becomes the dominant youth internet mythology" },
    { date: "2025–2026", event: "Remains the primary benchmark for Gen Alpha brainrot content" },
  ],
  examples: [
    "My little brother speaks exclusively in Skibidi references",
    "Skibidi toilet is the modern equivalent of Annoying Orange",
    "Brainrot level: Skibidi tier",
  ],
  relatedSlugs: [
    "dafuq-boom",
    "ohio-final-boss",
    "chicken-jockey",
    "brainrot",
    "tung-tung-tung-sahur",
    "npc-streaming",
  ],
  relationships: {
    popularizedBy: ["dafuq-boom"],
    relatedSlang: ["brainrot"],
    relatedTo: ["ohio-final-boss", "tung-tung-tung-sahur", "chicken-jockey"],
    sameEra: ["npc-streaming"],
  },
  // Phase 7 — optional cultural intelligence (internal; not a public UI field)
  intelligence: {
    era: ["gen-alpha", "short-form"],
    originPlatform: "youtube-shorts",
    culturalCategory: ["meme", "brainrot", "serialized-web-series"],
    audience: ["gen-alpha", "gen-z"],
    formatType: "animated-meme",
    signals: ["Brainrot", "Gen Alpha", "Short-form video", "YouTube Shorts"],
  },
  affiliateProduct: {
    name: "Skibidi Toilet Figure",
    description: "Collectible figure — affiliate link coming soon.",
    priceLabel: "$19.99",
  },
  // VIDEO-FIRST: the series itself is the defining media — official Episode 1
  // thumbnail + embed. Do not use unrelated photos of the creator or cosplay.
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/tzD9OxAHtzU/hqdefault.jpg",
      title: "skibidi toilet — Episode 1 thumbnail (Feb 2023)",
      source: "YouTube / skibidi (DaFuq!?Boom!)",
      sourceUrl: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      platform: "youtube",
      attribution: "DaFuq!?Boom! / skibidi channel",
      license: "YouTube Standard License",
      description:
        "Official Episode 1 thumbnail — the first Skibidi Toilet short that launched the series in February 2023.",
      date: "2023-02-07",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      title: "skibidi toilet — Episode 1 (official)",
      source: "YouTube / skibidi (DaFuq!?Boom!)",
      sourceUrl: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      platform: "youtube",
      attribution: "DaFuq!?Boom! / skibidi channel",
      license: "YouTube Standard License",
      description:
        "Official Episode 1 of Skibidi Toilet — the origin short of the Gen Alpha series created by DaFuq!?Boom!",
      date: "2023-02-07",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@DaFuqBoom",
      title: "DaFuq!?Boom! — official YouTube channel",
      source: "YouTube / DaFuq!?Boom!",
      sourceUrl: "https://www.youtube.com/@DaFuqBoom",
      platform: "youtube",
      attribution: "DaFuq!?Boom!",
      description: "Official creator channel for the Skibidi Toilet series.",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/skibidi-toilet",
      title: "Skibidi Toilet — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/skibidi-toilet",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Series history, episodes, and cultural impact documentation.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Skibidi Toilet — Know Your Meme",
      url: "https://knowyourmeme.com/memes/skibidi-toilet",
      domain: "knowyourmeme.com",
    },
    {
      title: "Skibidi Toilet — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Skibidi_Toilet",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
