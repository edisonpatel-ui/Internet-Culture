import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr24",
  slug: "adin-ross",
  title: "Adin Ross",
  category: "creator",
  personType: "Creator",
  description:
    "American Kick/Twitch streamer known for NBA 2K roots, celebrity collabs, and high-drama livestream culture.",
  imageGradient: "from-green-500 via-emerald-500 to-teal-600",
  scores: { relevance: 82, influence: 83, cringe: 60, brainrot: 55 },
  addedAt: "2026-07-17",
  views: 980000,
  trendDirection: "stable",
  tags: ["kick", "twitch", "streaming", "nba-2k", "celebrity", "controversy"],
  careerStart: "2014",
  platforms: [
    {
      platform: "twitch",
      handle: "AdinRoss",
      url: "https://www.twitch.tv/adinross",
    },
    {
      platform: "youtube",
      handle: "Adin Live",
      url: "https://www.youtube.com/@AdinLive",
    },
  ],
  followers: {
    twitch: "~7M",
    youtube: "~4.6M",
  },
  notableMoments: [
    "Broke out streaming NBA 2K and wager content; early association with Always Excelling / Bronny James circles",
    "Became one of Kick's flagship signings after a 2023 Twitch permanent ban for hateful conduct (ban later lifted in 2025); Kick channel: kick.com/adinross",
    "Hosted a high-viewership 2024 livestream interview with Donald Trump",
    "Frequent flashpoint streamer for celebrity guests, stunts, and platform-moderation drama",
  ],
  relatedSlugs: ["kai-cenat", "ishowspeed", "xqc", "glazing"],
  media: [
    // AI suggested — Commons still (CC BY 3.0)
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Adin_Ross_in_2025.png",
      title: "Adin Ross (2025)",
      source: "Wikimedia Commons / LOU WOP",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Adin_Ross_in_2025.png",
      platform: "wikimedia",
      attribution: "LOU WOP (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Adin Ross in May 2025 — Kick/Twitch streamer and YouTuber.",
      date: "2025-05-12",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Adin_Ross",
      title: "Adin Ross — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Adin_Ross",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Career overview, platform moves, and documented controversies.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://kick.com/adinross",
      title: "Adin Ross — Kick",
      source: "Kick",
      sourceUrl: "https://kick.com/adinross",
      platform: "other",
      attribution: "Adin Ross",
      description: "Primary livestream channel on Kick.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Adin Ross — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Adin_Ross",
      domain: "en.wikipedia.org",
    },
    {
      title: "Adin Ross' Twitch Account Reportedly Unbanned After 2 Years — Complex",
      url: "https://www.complex.com/pop-culture/a/alex-ocho/adin-ross-twitch-account-unbanned-after-2-years",
      domain: "complex.com",
    },
    {
      title: "Adin Ross addresses Kai Cenat beef in Twitch return — Dexerto",
      url: "https://www.dexerto.com/twitch/adin-ross-addresses-kai-cenat-beef-and-his-toxic-fans-in-twitch-return-3173822/",
      domain: "dexerto.com",
    },
  ],
};

export default entry;
