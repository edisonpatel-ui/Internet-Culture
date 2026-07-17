import type { BaseEntry, BrainrotRanking } from "@/types";

export const trends: BaseEntry[] = [
  {
    id: "t1",
    slug: "sigma-grindset",
    title: "Sigma Grindset",
    category: "trend",
    description:
      "A parody of hustle culture reframed as lone-wolf alpha energy, endlessly remixed on TikTok.",
    imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    scores: { relevance: 72, brainrot: 68, cringe: 81 },
    addedAt: "2026-07-01",
    views: 284000,
    trendDirection: "declining",
  },
  {
    id: "t2",
    slug: "skibidi-toilet",
    title: "Skibidi Toilet",
    category: "brainrot",
    description:
      "Surreal YouTube Shorts series featuring singing toilet heads — peak Gen Alpha internet lore.",
    imageGradient: "from-cyan-500 via-blue-500 to-indigo-600",
    scores: { relevance: 88, brainrot: 95, cringe: 74 },
    addedAt: "2026-06-15",
    views: 1200000,
    trendDirection: "stable",
  },
  {
    id: "t3",
    slug: "demure-mindful",
    title: "Very Demure, Very Mindful",
    category: "trend",
    description:
      "TikTok catchphrase about understated elegance that became ironic workplace satire overnight.",
    imageGradient: "from-rose-500 via-pink-500 to-purple-500",
    scores: { relevance: 91, brainrot: 42, cringe: 38 },
    addedAt: "2026-07-08",
    views: 890000,
    trendDirection: "rising",
  },
  {
    id: "t4",
    slug: "brat-summer",
    title: "Brat Summer",
    category: "event",
    description:
      "Charli XCX's lime-green album era that defined a chaotic, party-forward cultural moment.",
    imageGradient: "from-lime-400 via-green-400 to-emerald-500",
    scores: { relevance: 85, brainrot: 55, cringe: 29 },
    addedAt: "2026-06-20",
    views: 650000,
    trendDirection: "declining",
  },
  {
    id: "t5",
    slug: "looksmaxxing",
    title: "Looksmaxxing",
    category: "trend",
    description:
      "Self-improvement subculture focused on appearance optimization, debated across Reddit and TikTok.",
    imageGradient: "from-amber-500 via-orange-500 to-red-500",
    scores: { relevance: 78, brainrot: 61, cringe: 67 },
    addedAt: "2026-07-05",
    views: 420000,
    trendDirection: "rising",
  },
  {
    id: "t6",
    slug: "mewing",
    title: "Mewing",
    category: "trend",
    description:
      "Tongue posture technique turned meme — everyone claims it changed their jawline.",
    imageGradient: "from-teal-400 via-cyan-500 to-blue-500",
    scores: { relevance: 69, brainrot: 73, cringe: 79 },
    addedAt: "2026-06-28",
    views: 380000,
    trendDirection: "stable",
  },
  {
    id: "t7",
    slug: "ohio-final-boss",
    title: "Ohio Final Boss",
    category: "meme",
    description:
      "Hyperbolic 'only in Ohio' lore escalated to final-boss-tier absurdity across meme pages.",
    imageGradient: "from-red-600 via-rose-500 to-orange-400",
    scores: { relevance: 82, brainrot: 89, cringe: 71 },
    addedAt: "2026-07-10",
    views: 510000,
    trendDirection: "rising",
  },
  {
    id: "t8",
    slug: "girl-dinner",
    title: "Girl Dinner",
    category: "trend",
    description:
      "Snack-plate meals posted as aesthetic chaos — relatable, debated, endlessly duplicated.",
    imageGradient: "from-fuchsia-500 via-violet-500 to-indigo-500",
    scores: { relevance: 64, brainrot: 35, cringe: 44 },
    addedAt: "2026-05-12",
    views: 290000,
    trendDirection: "declining",
  },
  {
    id: "t9",
    slug: "fanum-tax",
    title: "Fanum Tax",
    category: "slang",
    description:
      "Stealing a bite of your friend's food — streamer slang that crossed into mainstream vocab.",
    imageGradient: "from-yellow-400 via-amber-400 to-orange-400",
    scores: { relevance: 76, brainrot: 58, cringe: 52 },
    addedAt: "2026-07-02",
    views: 340000,
    trendDirection: "stable",
  },
  {
    id: "t10",
    slug: "rizz",
    title: "Rizz",
    category: "slang",
    description:
      "Short for charisma — the ultimate compliment (or roast) for someone's flirting game.",
    imageGradient: "from-indigo-500 via-purple-500 to-pink-500",
    scores: { relevance: 94, brainrot: 48, cringe: 33 },
    addedAt: "2026-06-01",
    views: 980000,
    trendDirection: "stable",
  },
  {
    id: "t11",
    slug: "gyatt",
    title: "Gyatt",
    category: "slang",
    description:
      "Exclamation of surprise, often ironic — a staple of streamer and TikTok comment sections.",
    imageGradient: "from-pink-500 via-rose-400 to-red-400",
    scores: { relevance: 87, brainrot: 77, cringe: 86 },
    addedAt: "2026-07-09",
    views: 720000,
    trendDirection: "rising",
  },
  {
    id: "t12",
    slug: "chicken-jockey",
    title: "Chicken Jockey",
    category: "meme",
    description:
      "Minecraft movie moment that broke the internet — spontaneous theater reactions went viral.",
    imageGradient: "from-green-500 via-lime-400 to-yellow-300",
    scores: { relevance: 96, brainrot: 84, cringe: 45 },
    addedAt: "2026-07-12",
    views: 2100000,
    trendDirection: "new",
  },
  // ── Batch 2 — New Trends ──────────────────────────────────────────────
  {
    id: "t13",
    slug: "old-money",
    title: "Old Money",
    category: "trend",
    description:
      "The refined fashion aesthetic of inherited wealth — polo shirts, quiet luxury, boat shoes, and timeless classics that dominated TikTok from 2022–2024.",
    imageGradient: "from-amber-700 via-yellow-700 to-stone-600",
    scores: { relevance: 85, brainrot: 22, cringe: 18 },
    addedAt: "2026-07-16",
    historicalDate: "2022-06-01",
    views: 1800000,
    trendDirection: "declining",
    tags: ["fashion", "aesthetic", "tiktok", "luxury", "style", "2022", "2023", "2024"],
    origin:
      "Emerged on TikTok fashion communities as a counter-aesthetic to flashy new money and streetwear. Characterized by understated wealth — classic cuts, neutral tones (beige, cream, navy, hunter green), vintage prep school styling, and 'quiet luxury.' Related to the broader 'stealth wealth' and 'quiet luxury' aesthetics that followed.",
    sources: [
      {
        title: "Old Money Aesthetic — Know Your Meme",
        url: "https://knowyourmeme.com/memes/old-money-aesthetic",
        domain: "knowyourmeme.com",
      },
    ],
  },
  {
    id: "t14",
    slug: "one-chip-challenge",
    title: "One Chip Challenge",
    category: "event",
    description:
      "Paqui's infamous coffin-boxed chip — so spicy it put people in hospitals and was pulled from shelves after a teenager's death in 2023.",
    imageGradient: "from-red-600 via-orange-600 to-yellow-500",
    scores: { relevance: 82, brainrot: 65, cringe: 38 },
    addedAt: "2026-07-16",
    views: 2800000,
    trendDirection: "declining",
    tags: ["challenge", "food", "spicy", "tiktok", "viral", "paqui", "2023"],
  },
];

export function getTrendBySlug(slug: string): BaseEntry | undefined {
  return trends.find((t) => t.slug === slug);
}

export function getTrendingToday(): BaseEntry[] {
  return [...trends]
    .sort((a, b) => b.scores.relevance - a.scores.relevance)
    .slice(0, 6);
}

export function getRisingFastest(): BaseEntry[] {
  return trends
    .filter((t) => t.trendDirection === "rising")
    .sort((a, b) => b.views - a.views);
}

export function getDecliningTrends(): BaseEntry[] {
  return trends.filter((t) => t.trendDirection === "declining");
}

export function getNewTrends(): BaseEntry[] {
  return trends.filter((t) => t.trendDirection === "new");
}

export function getMostViewed(): BaseEntry[] {
  return [...trends].sort((a, b) => b.views - a.views);
}

export function getRecentlyAdded(): BaseEntry[] {
  return [...trends].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

export function getPopularMemes(): BaseEntry[] {
  return trends
    .filter((t) => t.category === "meme")
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getInternetSlang(): BaseEntry[] {
  return trends
    .filter((t) => t.category === "slang")
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getBrainrotRankingsFromTrends(): BrainrotRanking[] {
  return [...trends]
    .sort((a, b) => b.scores.brainrot - a.scores.brainrot)
    .map((t, i) => ({
      rank: i + 1,
      slug: t.slug,
      title: t.title,
      brainrotScore: t.scores.brainrot,
      category: t.category,
    }));
}

export function getCringeRankings(): BaseEntry[] {
  return [...trends].sort((a, b) => b.scores.cringe - a.scores.cringe);
}

export function getFastestGrowing(): BaseEntry[] {
  return trends
    .filter((t) => t.trendDirection === "rising" || t.trendDirection === "new")
    .sort((a, b) => b.views - a.views);
}

export function getMostInfluential(): BaseEntry[] {
  return [...trends].sort(
    (a, b) => (b.scores.relevance * b.views) - (a.scores.relevance * a.views)
  );
}

export function getMostUnderrated(): BaseEntry[] {
  return [...trends]
    .filter((t) => t.scores.relevance >= 70 && t.views < 400000)
    .sort((a, b) => b.scores.relevance - a.scores.relevance);
}

export function getTrendsByCategory(category: string): BaseEntry[] {
  return trends.filter((t) => t.category === category);
}

export function getAllSearchable(): BaseEntry[] {
  return trends;
}

export function getAllTrends(): BaseEntry[] {
  return trends;
}

export function getAllTrendSlugs(): string[] {
  return trends.map((t) => t.slug);
}
