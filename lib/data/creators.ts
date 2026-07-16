import type { CreatorEntry } from "@/types";

export const creators: CreatorEntry[] = [
  {
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
    relatedSlugs: ["rizz", "fanum-tax"],
    sources: [
      {
        title: "Kai Cenat breaks Twitch all-time subscriber record",
        domain: "variety.com",
      },
    ],
  },
  {
    id: "cr2",
    slug: "dafuq-boom",
    title: "DaFuq!?Boom!",
    category: "creator",
    description:
      "Ukrainian YouTube animator who created Skibidi Toilet — the defining Gen Alpha internet mythology.",
    imageGradient: "from-cyan-500 via-blue-600 to-indigo-700",
    scores: { relevance: 87, brainrot: 98, cringe: 65 },
    addedAt: "2026-07-02",
    views: 310000,
    trendDirection: "stable",
    tags: ["animation", "gmod", "youtube", "gen-alpha", "skibidi"],
    careerStart: "2019",
    platforms: [
      {
        platform: "youtube",
        handle: "DaFuq!?Boom!",
        url: "https://www.youtube.com/@DaFuqBoom",
      },
    ],
    notableMoments: [
      "Launched Skibidi Toilet series in February 2023",
      "Produced hundreds of episodes within a single year",
      "Created the dominant Gen Alpha internet mythology of 2023–2025",
      "Series uses Garry's Mod and Half-Life 2 assets",
    ],
    relatedSlugs: ["skibidi-toilet"],
  },
  {
    id: "cr3",
    slug: "jools-lebron",
    title: "Jools Lebron",
    category: "creator",
    description:
      "TikTok creator who launched 'very demure, very mindful' into mainstream culture in 2024.",
    imageGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    scores: { relevance: 79, brainrot: 32, cringe: 12 },
    addedAt: "2026-07-03",
    views: 195000,
    trendDirection: "declining",
    tags: ["tiktok", "viral", "phrase", "demure"],
    careerStart: "2024",
    platforms: [
      {
        platform: "tiktok",
        handle: "@joolieannie",
        url: "https://www.tiktok.com/@joolieannie",
      },
    ],
    notableMoments: [
      "Posted the original 'very demure, very mindful' TikTok in August 2024",
      "Phrase spread rapidly to brand marketing, news segments, and political commentary",
      "Became one of the most-quoted TikTok phrases of 2024",
    ],
    relatedSlugs: ["demure-mindful"],
  },
  {
    id: "cr4",
    slug: "mrbeast",
    title: "MrBeast",
    category: "creator",
    description:
      "The most-subscribed individual creator on YouTube — known for large-scale philanthropy, stunts, and record-breaking productions.",
    imageGradient: "from-yellow-400 via-amber-500 to-orange-500",
    scores: { relevance: 98, brainrot: 38, cringe: 22 },
    addedAt: "2026-07-01",
    views: 860000,
    trendDirection: "stable",
    tags: ["youtube", "philanthropy", "stunts", "feastables"],
    careerStart: "2012",
    platforms: [
      {
        platform: "youtube",
        handle: "MrBeast",
        url: "https://www.youtube.com/@MrBeast",
      },
      {
        platform: "instagram",
        handle: "@mrbeast",
        url: "https://www.instagram.com/mrbeast",
      },
      {
        platform: "x",
        handle: "@MrBeast",
        url: "https://x.com/MrBeast",
      },
    ],
    followers: {
      youtube: "~350M+",
    },
    notableMoments: [
      "Became the most-subscribed individual YouTube channel",
      "Founded Feastables chocolate brand",
      "Produced Beast Games — a reality competition show on Amazon Prime",
      "Philanthropic productions have distributed tens of millions in prizes and donations",
    ],
    sources: [
      {
        title: "MrBeast's YouTube Channel",
        domain: "youtube.com",
        url: "https://www.youtube.com/@MrBeast",
      },
    ],
  },
  {
    id: "cr5",
    slug: "ishowspeed",
    title: "IShowSpeed",
    category: "creator",
    description:
      "Unpredictable live streamer known for chaotic reactions, viral clips, and a passionate connection to soccer culture.",
    imageGradient: "from-red-500 via-rose-500 to-pink-600",
    scores: { relevance: 89, brainrot: 84, cringe: 58 },
    addedAt: "2026-07-04",
    views: 385000,
    trendDirection: "rising",
    tags: ["streaming", "youtube", "viral", "soccer", "chaos"],
    careerStart: "2016",
    platforms: [
      {
        platform: "youtube",
        handle: "IShowSpeed",
        url: "https://www.youtube.com/@ishowspeed",
      },
      {
        platform: "tiktok",
        handle: "@ishowspeed",
        url: "https://www.tiktok.com/@ishowspeed",
      },
    ],
    followers: {
      youtube: "~25M+",
    },
    notableMoments: [
      "Known for explosive live stream reactions that consistently generate viral clips",
      "Strong public association with Cristiano Ronaldo and soccer culture",
      "Traveled to Portugal and met Ronaldo — widely covered moment",
      "Multiple high-profile collaborations with international creators",
    ],
  },
];

export function getCreatorBySlug(slug: string): CreatorEntry | undefined {
  return creators.find((c) => c.slug === slug);
}

export function getAllCreatorSlugs(): string[] {
  return creators.map((c) => c.slug);
}

export function getAllCreators(): CreatorEntry[] {
  return creators;
}

export function getRelatedCreators(slugs: string[]): CreatorEntry[] {
  return creators.filter((c) => slugs.includes(c.slug));
}
