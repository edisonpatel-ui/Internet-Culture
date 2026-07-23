import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr46",
  slug: "tommyinnit",
  title: "TommyInnit",
  category: "creator",
  personType: "Creator",
  description:
    "Tom Simons (TommyInnit) — British Minecraft streamer and Dream SMP firestarter whose chaotic energy, live shows, and Gen Z fandom made him a face of MCYT culture.",
  imageGradient: "from-red-500 via-orange-400 to-yellow-300",
  scores: { relevance: 72, influence: 78, cringe: 45, brainrot: 55 },
  addedAt: "2026-07-23",
  views: 1450000,
  trendDirection: "stable",
  tags: ["minecraft", "youtube", "twitch", "dream smp", "mcyt"],
  careerStart: "2015",
  platforms: [
    { platform: "youtube", handle: "TommyInnit", url: "https://www.youtube.com/@TommyInnit" },
    { platform: "twitch", handle: "tommyinnit", url: "https://www.twitch.tv/tommyinnit" },
  ],
  followers: {
    youtube: "~12M+",
    twitch: "~7M+",
  },
  notableMoments: [
    "Dream SMP roleplay streams exploded his audience during 2020 lockdown",
    "TommyInnit & Friends live arena shows sold out in 2022 with MCYT guests",
    "Signature loud humor and rivalry arcs with Dream defined SMP clip culture",
    "Bridged British teen streamer aesthetic to global Minecraft fandom",
  ],
  relatedSlugs: ["dream", "technoblade", "wilbur-soot", "minecraft-movie-premiere"],
  relationships: {
    sameEra: ["dream", "technoblade", "wilbur-soot"],
    relatedEvent: ["minecraft-movie-premiere"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/TommyInnit",
      title: "TommyInnit — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/TommyInnit",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "TommyInnit — Wikipedia",
      url: "https://en.wikipedia.org/wiki/TommyInnit",
      domain: "en.wikipedia.org",
    },
    {
      title: "TommyInnit — YouTube",
      url: "https://www.youtube.com/@TommyInnit",
      domain: "youtube.com",
    },
  ],
};

export default entry;
