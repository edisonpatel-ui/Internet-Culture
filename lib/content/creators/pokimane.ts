import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr8",
  slug: "pokimane",
  title: "Pokimane",
  category: "creator",
  description:
    "Imane Anys — one of the most-followed streamers on Twitch and a defining voice in discussions about parasocial relationships in online creator culture.",
  imageGradient: "from-violet-500 via-purple-500 to-indigo-600",
  scores: { relevance: 91, brainrot: 35, cringe: 22 },
  addedAt: "2026-07-16",
  views: 870000,
  trendDirection: "stable",
  tags: ["twitch", "streaming", "gaming", "league of legends", "offline-tv"],
  careerStart: "2013",
  platforms: [
    {
      platform: "twitch",
      handle: "pokimane",
      url: "https://www.twitch.tv/pokimane",
    },
    {
      platform: "youtube",
      handle: "Pokimane",
      url: "https://www.youtube.com/@pokimane",
    },
  ],
  followers: {
    twitch: "~9M+",
  },
  notableMoments: [
    "One of the most-followed female streamers on Twitch for multiple consecutive years",
    "Founding member of OfflineTV — one of the most prominent content creator collectives in streaming culture",
    "Central figure in ongoing public discourse about parasocial relationships and the dynamics of streamer-audience culture",
    "Has spoken publicly about managing audience expectations and the challenges of personal boundaries as a public figure",
  ],
  relatedSlugs: ["kai-cenat", "ninja"],
  sources: [
    {
      title: "Pokimane — Twitch Channel",
      url: "https://www.twitch.tv/pokimane",
      domain: "twitch.tv",
    },
    {
      title: "Pokimane — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Pokimane",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
