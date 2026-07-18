import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr1",
  slug: "kai-cenat",
  title: "Kai Cenat",
  category: "creator",
  description:
    "Record-breaking Twitch streamer and cultural architect of modern internet slang.",
  imageGradient: "from-orange-500 via-red-500 to-rose-600",
  scores: { relevance: 94, brainrot: 65, cringe: 28 },
  addedAt: "2026-07-01",
  views: 420000,
  trendDirection: "stable",
  tags: ["streaming", "twitch", "slang", "gaming", "amp"],
  careerStart: "2019",
  platforms: [
    {
      platform: "twitch",
      handle: "KaiCenat",
      url: "https://www.twitch.tv/kaicenat",
    },
    {
      platform: "youtube",
      handle: "Kai Cenat",
      url: "https://www.youtube.com/@KaiCenat",
    },
  ],
  followers: {
    twitch: "~7M",
    youtube: "~8M",
  },
  notableMoments: [
    "Set the all-time Twitch subscriber record (2023)",
    "Hosted Mafiathon — a multi-day charity subathon event",
    "Central to popularizing 'rizz' and 'fanum tax' in mainstream vocabulary",
    "Co-founder of the AMP (Any Means Possible) content collective",
  ],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Previous Kai_Cenat_2024.jpg upload path became unreliable (404).
    // Replaced with the stable 2023 cropped portrait used on Wikipedia.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Kai_Cenat_2023_%28cropped%29.jpg",
      title: "Kai Cenat (2023)",
      source: "Wikimedia Commons / MILLION DOLLAZ WORTH OF GAME",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kai_Cenat_2023_(cropped).jpg",
      platform: "wikimedia",
      attribution: "MILLION DOLLAZ WORTH OF GAME (CC BY 3.0)",
      license: "CC BY 3.0",
      description:
        "Kai Cenat in 2023 — the record-breaking Twitch streamer and AMP co-founder.",
      date: "2023-12-15",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Kai_Cenat",
      title: "Kai Cenat — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Kai_Cenat",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering Kai Cenat's streaming career and AMP collective.",
      verified: false,
    },
  ],
  relatedSlugs: ["rizz", "fanum-tax", "amp", "glazing"],
  sources: [
    {
      title: "Kai Cenat — Twitch Channel",
      url: "https://www.twitch.tv/kaicenat",
      domain: "twitch.tv",
    },
    {
      title: "Kai Cenat breaks Twitch all-time subscriber record",
      domain: "variety.com",
    },
    {
      title: "Kai Cenat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Kai_Cenat",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
