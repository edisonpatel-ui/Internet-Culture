import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr14",
  slug: "caseoh",
  title: "CaseOh",
  category: "creator",
  description:
    "Chaotic gaming streamer known for his self-deprecating humor, unfiltered personality, and a distinctively large frame — building a massive audience on YouTube and Twitch through pure comedic authenticity.",
  imageGradient: "from-blue-600 via-indigo-500 to-purple-600",
  scores: { relevance: 83, brainrot: 70, cringe: 35 },
  addedAt: "2026-07-17",
  views: 1800000,
  trendDirection: "rising",
  tags: ["gaming", "youtube", "twitch", "humor", "streaming", "viral"],
  careerStart: "2020",
  platforms: [
    { platform: "youtube", handle: "CaseOh", url: "https://www.youtube.com/@CaseOh" },
    { platform: "twitch", handle: "caseoh_", url: "https://www.twitch.tv/caseoh_" },
  ],
  followers: {
    youtube: "~6M+",
    twitch: "~3M+",
  },
  notableMoments: [
    "Viral 'just 5 more minutes' running joke about endlessly extending gaming sessions",
    "Known for honest commentary about his lifestyle and refusing to conform to fitness influencer norms",
    "Collaborations with other popular streamers including Kai Cenat and Adin Ross",
    "Multiple viral compilation clips that drove rapid subscriber growth in 2023–2024",
  ],
  relatedSlugs: ["ishowspeed"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/CaseOh.jpg",
      title: "CaseOh — Wikimedia Commons",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:CaseOh.jpg",
      platform: "wikimedia",
      attribution: "Wikimedia Commons contributors",
      license: "CC BY-SA 4.0",
      description: "CaseOh, gaming streamer known for chaotic content and viral moments on YouTube and Twitch.",
      date: "2024",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/CaseOh",
      title: "CaseOh — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/CaseOh",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering CaseOh's gaming streaming career and viral moments.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "CaseOh — YouTube",
      url: "https://www.youtube.com/@CaseOh",
      domain: "youtube.com",
    },
    {
      title: "CaseOh — Wikipedia",
      url: "https://en.wikipedia.org/wiki/CaseOh",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
