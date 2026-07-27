import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr44",
  slug: "technoblade",
  title: "Technoblade",
  category: "creator",
  personType: "Creator",
  description:
    "Alexander (Technoblade) — Minecraft PvP legend and Dream SMP member whose \"so long nerds\" farewell video after an cancer diagnosis became one of YouTube's most-watched tributes.",
  imageGradient: "from-red-700 via-rose-600 to-amber-500",
  scores: { relevance: 70, influence: 87, cringe: 35, brainrot: 30 },
  addedAt: "2026-07-23",
  views: 3200000,
  trendDirection: "stable",
  tags: ["minecraft", "youtube", "dream smp", "mcyt", "memorial"],
  careerStart: "2013",
  platforms: [
    { platform: "youtube", handle: "Technoblade", url: "https://www.youtube.com/@Technoblade" },
  ],
  followers: {
    youtube: "~15M+",
  },
  notableMoments: [
    "Dominant Minecraft Hypixel Skywars player known for skill and trash talk",
    "Dream SMP anarchist role brought him to Gen Z fandom mainstream",
    "August 2022 farewell video announced death from sarcoma — massive global tribute",
    "Minecraft added pig crown tribute skin honoring his \"Technoblade never dies\" legacy",
  ],
  relatedSlugs: ["dream", "tommyinnit", "wilbur-soot", "minecraft-movie-premiere"],
  relationships: {
    sameEra: ["dream", "tommyinnit", "wilbur-soot"],
    relatedEvent: ["minecraft-movie-premiere"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Technoblade",
      title: "Technoblade — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Technoblade",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "No verified CC portrait on Commons — Technoblade maintained partial anonymity.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Technoblade — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Technoblade",
      domain: "en.wikipedia.org",
    },
    {
      title: "Technoblade — YouTube",
      url: "https://www.youtube.com/@Technoblade",
      domain: "youtube.com",
    },
  ],
};

export default entry;
