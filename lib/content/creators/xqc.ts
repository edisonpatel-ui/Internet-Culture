import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr20",
  slug: "xqc",
  title: "xQc",
  category: "creator",
  description:
    "French-Canadian streamer Félix Lengyel — former Overwatch League pro who became one of Twitch's most-watched creators, known for high-energy variety content, controversy, and a $100M Kick deal.",
  imageGradient: "from-blue-600 via-violet-500 to-purple-600",
  scores: { relevance: 87, brainrot: 68, cringe: 42 },
  addedAt: "2026-07-17",
  views: 2600000,
  trendDirection: "stable",
  tags: ["streaming", "twitch", "kick", "overwatch", "variety", "gambling", "french-canadian"],
  careerStart: "2014",
  platforms: [
    { platform: "twitch", handle: "xQc", url: "https://www.twitch.tv/xqc" },
    { platform: "youtube", handle: "xQcOW", url: "https://www.youtube.com/@xQcOW" },
  ],
  followers: {
    twitch: "~12M+",
    youtube: "~2M+",
  },
  notableMoments: [
    "Played as a tank main for Dallas Fuel and other teams in the Overwatch League (2018–2019)",
    "Multiple Twitch bans for controversial content — became one of the platform's most controversial figures",
    "Broke multiple Twitch concurrent viewership records",
    "Gambling streams controversy (2022) — promoted online gambling to millions of viewers, leading to industry-wide debate",
    "Signed a reported $70M–$100M deal with Kick streaming platform (2023), then returned to Twitch",
    "Livestreamed watching entire series and movies in 24-hour+ marathon sessions",
  ],
  relatedSlugs: ["ishowspeed", "caseoh"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/XQc_July_4_2023.jpg",
      title: "xQc — July 4, 2023",
      source: "Wikimedia Commons / Esfand (CC BY 3.0)",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:XQc_July_4_2023.jpg",
      platform: "wikimedia",
      attribution: "Esfand (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "xQc (Félix Lengyel) photographed on July 4, 2023.",
      date: "2023-07-04",
      verified: true,
    },
  ],
  sources: [
    {
      title: "xQc — Twitch",
      url: "https://www.twitch.tv/xqc",
      domain: "twitch.tv",
    },
    {
      title: "xQc — Wikipedia",
      url: "https://en.wikipedia.org/wiki/XQc",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
