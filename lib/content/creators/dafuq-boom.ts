import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr2",
  slug: "dafuq-boom",
  title: "DaFuq!?Boom!",
  category: "creator",
  description:
    "Ukrainian YouTube animator who created Skibidi Toilet — the defining Gen Alpha internet mythology.",
  imageGradient: "from-cyan-500 via-blue-600 to-indigo-700",
  scores: { relevance: 87, brainrot: 98, cringe: 65 },
  addedAt: "2026-07-02",
  views: 310000,
  trendDirection: "stable",
  tags: ["animation", "gmod", "youtube", "gen-alpha", "skibidi"],
  careerStart: "2019",
  platforms: [
    {
      platform: "youtube",
      handle: "DaFuq!?Boom!",
      url: "https://www.youtube.com/@DaFuqBoom",
    },
  ],
  notableMoments: [
    "Launched Skibidi Toilet series in February 2023",
    "Produced hundreds of episodes within a single year",
    "Created the dominant Gen Alpha internet mythology of 2023–2025",
    "Series uses Garry's Mod and Half-Life 2 assets",
  ],
  relatedSlugs: ["skibidi-toilet"],
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
  ],
};

export default entry;
