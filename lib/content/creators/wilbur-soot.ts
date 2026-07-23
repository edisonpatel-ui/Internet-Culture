import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr48",
  slug: "wilbur-soot",
  title: "Wilbur Soot",
  category: "creator",
  personType: "Creator",
  description:
    "Will Gold (Wilbur Soot) — British YouTuber, musician, and Dream SMP writer whose \"Your New Boyfriend\" era and Sofar lore blended indie music with Minecraft fandom.",
  imageGradient: "from-indigo-600 via-violet-500 to-purple-700",
  scores: { relevance: 65, influence: 75, cringe: 38, brainrot: 42 },
  addedAt: "2026-07-23",
  views: 870000,
  trendDirection: "stable",
  tags: ["youtube", "music", "minecraft", "dream smp", "mcyt"],
  careerStart: "2013",
  platforms: [
    { platform: "youtube", handle: "Wilbur Soot", url: "https://www.youtube.com/@WilburSoot" },
    { platform: "twitch", handle: "wilbursoot", url: "https://www.twitch.tv/wilbursoot" },
  ],
  followers: {
    youtube: "~6M+",
  },
  notableMoments: [
    "SootHouse comedy collective preceded solo music and Minecraft crossover fame",
    "Dream SMP Pogtopia writing and performance drew music fans into MCYT",
    "\"Your New Boyfriend\" and \"Lmanberg\" era songs charted on Gen Z playlists",
    "Lovejoy band project expanded beyond Minecraft audience into indie live shows",
  ],
  relatedSlugs: ["dream", "tommyinnit", "technoblade", "minecraft-movie-premiere"],
  relationships: {
    sameEra: ["dream", "tommyinnit", "technoblade"],
    relatedEvent: ["minecraft-movie-premiere"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Wilbur_Soot",
      title: "Wilbur Soot — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Wilbur_Soot",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Wilbur Soot — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Wilbur_Soot",
      domain: "en.wikipedia.org",
    },
    {
      title: "Wilbur Soot — YouTube",
      url: "https://www.youtube.com/@WilburSoot",
      domain: "youtube.com",
    },
  ],
};

export default entry;
