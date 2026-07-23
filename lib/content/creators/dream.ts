import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr25",
  slug: "dream",
  title: "Dream / Dream SMP",
  category: "creator",
  personType: "Creator",
  description:
    "Minecraft YouTuber whose Dream SMP server became a Gen Z storytelling phenomenon — manhunts, lore, and face-reveal era fame.",
  imageGradient: "from-green-500 via-lime-400 to-emerald-600",
  scores: { relevance: 80, influence: 80, cringe: 30, brainrot: 42 },
  addedAt: "2026-07-18",
  views: 2800000,
  trendDirection: "stable",
  tags: ["minecraft", "youtube", "dream-smp", "manhunt", "gen-z"],
  careerStart: "2019",
  platforms: [
    {
      platform: "youtube",
      handle: "Dream",
      url: "https://www.youtube.com/@Dream",
    },
  ],
  followers: {
    youtube: "Tens of millions across channels (era-dependent)",
  },
  notableMoments: [
    "Minecraft Manhunt videos reached tens of millions of YouTube views around 2020",
    "Dream SMP (2020–2023) turned Minecraft roleplay into serialized internet lore",
    "Collaborated with a generation of MCYT creators; face reveal era shifted the brand",
    "Became a defining Minecraft creator for Gen Z fandom culture",
  ],
  relatedSlugs: [
    "minecraft-movie-premiere",
    "chicken-jockey",
    "mrbeast",
    "great-meme-reset",
  ],
  relationships: {
    relatedEvent: ["minecraft-movie-premiere", "great-meme-reset"],
    sameEra: ["among-us-era"],
  },
  media: [
    // AI suggested — Dream at VidCon 2023 (Commons); human must verify
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Dream_at_VidCon_Anaheim_2023.png",
      title: "Dream at VidCon Anaheim 2023",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Dream_at_VidCon_Anaheim_2023.png",
      platform: "wikimedia",
      attribution: "Photograph on Wikimedia Commons (see file page)",
      license: "See Commons file page",
      description: "Dream appearing publicly at VidCon Anaheim 2023.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.youtube.com/@Dream",
      title: "Dream — YouTube",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/@Dream",
      platform: "youtube",
      attribution: "Dream",
      description: "Primary YouTube channel.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Dream_(YouTuber)",
      title: "Dream (YouTuber) — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Dream_(YouTuber)",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Biography covering Manhunt, Dream SMP, and career milestones.",
      date: "2020",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Dream (YouTuber) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Dream_(YouTuber)",
      domain: "en.wikipedia.org",
    },
    {
      title: "Dream — YouTube",
      url: "https://www.youtube.com/@Dream",
      domain: "youtube.com",
    },
  ],
};

export default entry;
