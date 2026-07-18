import type { CreatorEntry } from "@/types";

const entry: CreatorEntry = {
  id: "cr9",
  slug: "ksi",
  title: "KSI",
  category: "creator",
  description:
    "Olajide Olatunji — British YouTuber, rapper, and boxer who built one of the internet's most influential multi-hyphenate careers and co-founded Prime Hydration.",
  imageGradient: "from-yellow-500 via-amber-500 to-orange-500",
  scores: { relevance: 93, influence: 93, cringe: 28, brainrot: 52 },
  addedAt: "2026-07-16",
  views: 1100000,
  trendDirection: "stable",
  tags: ["youtube", "boxing", "music", "british", "sidemen", "prime hydration"],
  careerStart: "2009",
  platforms: [
    {
      platform: "youtube",
      handle: "KSI",
      url: "https://www.youtube.com/@KSI",
    },
    {
      platform: "x",
      handle: "@KSI",
      url: "https://x.com/KSI",
    },
    {
      platform: "instagram",
      handle: "@ksi",
      url: "https://www.instagram.com/ksi",
    },
  ],
  followers: {
    youtube: "~24M+",
  },
  notableMoments: [
    "Founded the Sidemen — one of YouTube's most influential creator groups (including Miniminter, Vikkstar123, TBJZL, Behzinga, Wroetoshaw, and Zerkaa)",
    "Fought Logan Paul twice: split draw (August 2018), KSI wins by majority decision (November 2019) — the first major creator boxing matches of the era",
    "Music career includes international chart entries including 'Holiday' (feat. Don Toliver) and 'Lighter'",
    "Co-founded Prime Hydration with Logan Paul in 2022 — became one of the fastest-growing sports drinks globally",
  ],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Wikimedia Commons — extracted from a CC BY YouTube video by Gymshark.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/JJ_Olatunji_(KSI)_1.jpg",
      title: "KSI (JJ Olatunji) — 2020",
      source: "Wikimedia Commons / Gymshark",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:JJ_Olatunji_(KSI)_1.jpg",
      platform: "wikimedia",
      attribution: "Gymshark (CC BY 3.0)",
      license: "CC BY 3.0",
      description: "JJ Olatunji (KSI) in 2020 — British YouTuber, rapper, boxer, and co-founder of Prime Hydration.",
      date: "2020",
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/KSI",
      title: "KSI — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/KSI",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Wikipedia article covering KSI's YouTube, music, boxing, and Prime Hydration career.",
      verified: false,
    },
  ],
  relatedSlugs: ["mrbeast", "pewdiepie"],
  sources: [
    {
      title: "KSI — YouTube Channel",
      url: "https://www.youtube.com/@KSI",
      domain: "youtube.com",
    },
    {
      title: "KSI — Wikipedia",
      url: "https://en.wikipedia.org/wiki/KSI",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
