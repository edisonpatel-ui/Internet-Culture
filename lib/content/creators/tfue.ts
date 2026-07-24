import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr45",
  slug: "tfue",
  title: "Tfue",
  category: "creator",
  personType: "Creator",
  description:
    "Turner Tenney (Tfue) — Fortnite esports champion and Twitch streamer whose FaZe Clan contract lawsuit and high-skill gameplay made him a defining 2018–2019 gaming celebrity.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 68, influence: 80, cringe: 40, brainrot: 38 },
  addedAt: "2026-07-23",
  views: 980000,
  trendDirection: "declining",
  tags: ["twitch", "fortnite", "esports", "faze", "streaming"],
  careerStart: "2014",
  platforms: [
    { platform: "twitch", handle: "Tfue", url: "https://www.twitch.tv/tfue" },
    { platform: "youtube", handle: "Tfue", url: "https://www.youtube.com/@Tfue" },
  ],
  followers: {
    twitch: "~11M+",
    youtube: "~12M+",
  },
  notableMoments: [
    "Won Fortnite World Cup solo qualifiers and dominated early competitive scene",
    "Public legal battle with FaZe Clan over contract terms spotlighted creator rights",
    "Peak Fortnite viewership rivaled Ninja during 2018–2019 boom",
    "Transitioned toward variety streaming as Fortnite hype cooled",
  ],
  relatedSlugs: ["ninja", "shroud", "xqc", "great-meme-reset"],
  media: [
    // AI suggested — group photo including Tfue (CC BY 3.0). Human must verify.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Caspar_Lee%2C_Tfue_and_Mini_Ladd_in_2018.jpg",
      title: "Tfue with Caspar Lee and Mini Ladd (2018)",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Caspar_Lee,_Tfue_and_Mini_Ladd_in_2018.jpg",
      platform: "wikimedia",
      attribution: "Leon Lush (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "Tfue (center) with Caspar Lee and Mini Ladd in 2018.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Tfue",
      title: "Tfue — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Tfue",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Tfue — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Tfue",
      domain: "en.wikipedia.org",
    },
    {
      title: "Tfue — Twitch",
      url: "https://www.twitch.tv/tfue",
      domain: "twitch.tv",
    },
  ],
};

export default entry;
