import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr2",
  slug: "dafuq-boom",
  title: "DaFuq!?Boom!",
  category: "creator",
  description:
    "Ukrainian YouTube animator Alexey Gerasimov (DaFuq!?Boom!), best known for Skibidi Toilet — a Garry’s Mod / Source Filmmaker series that became a core Gen Alpha meme lore cycle in 2023–2025.",
  imageGradient: "from-cyan-500 via-blue-600 to-indigo-700",
  scores: { relevance: 87, influence: 74, cringe: 65, brainrot: 98 },
  addedAt: "2026-07-02",
  views: 310000,
  trendDirection: "stable",
  tags: ["animation", "gmod", "youtube", "gen-alpha", "skibidi", "brainrot"],
  careerStart: "2019",
  platforms: [
    {
      platform: "youtube",
      handle: "DaFuq!?Boom!",
      url: "https://www.youtube.com/@DaFuqBoom",
    },
  ],
  notableMoments: [
    "Launched Skibidi Toilet on YouTube in February 2023",
    "Released a rapid run of short episodes through 2023–2024",
    "Skibidi Toilet became a major Gen Alpha reference point across YouTube and short-form platforms",
    "Series is built in Garry’s Mod using Half-Life 2 assets",
  ],
  relatedSlugs: [
    "skibidi-toilet",
    "brainrot",
    "ohio-final-boss",
    "tung-tung-tung-sahur",
    "short-form-takeover",
  ],
  relationships: {
    originated: ["skibidi-toilet"],
    relatedTo: ["brainrot", "ohio-final-boss", "tung-tung-tung-sahur"],
    sameEra: ["short-form-takeover"],
  },
  // No reliable CC portrait found. Featured uses the defining work (Skibidi
  // Toilet Episode 1) — official channel upload, oembed-verified.
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/tzD9OxAHtzU/hqdefault.jpg",
      title: "skibidi toilet Episode 1 — DaFuq!?Boom! channel",
      source: "YouTube / DaFuq!?Boom!",
      sourceUrl: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      platform: "youtube",
      attribution: "DaFuq!?Boom!",
      license: "YouTube Standard License",
      description:
        "Official Episode 1 thumbnail from DaFuq!?Boom!'s channel — the work that defines this creator's cultural impact.",
      date: "2023-02-07",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      title: "skibidi toilet — Episode 1 (official)",
      source: "YouTube / DaFuq!?Boom!",
      sourceUrl: "https://www.youtube.com/watch?v=tzD9OxAHtzU",
      platform: "youtube",
      attribution: "DaFuq!?Boom!",
      license: "YouTube Standard License",
      description: "Official origin short of Skibidi Toilet by DaFuq!?Boom!",
      date: "2023-02-07",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@DaFuqBoom",
      title: "DaFuq!?Boom! — YouTube channel",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@DaFuqBoom",
      platform: "youtube",
      attribution: "DaFuq!?Boom!",
      description: "Official DaFuq!?Boom! YouTube channel.",
      verified: true,
    },
  ],
  sources: [
    {
      title: "DaFuq!?Boom! — YouTube Channel",
      url: "https://www.youtube.com/@DaFuqBoom",
      domain: "youtube.com",
    },
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
