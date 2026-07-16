import type { EventEntry } from "@/types";

export const events: EventEntry[] = [
  {
    id: "e1",
    slug: "brat-summer",
    title: "Brat Summer",
    category: "event",
    description:
      "Charli XCX's lime-green album era that defined a chaotic, party-forward cultural movement in 2024.",
    imageGradient: "from-lime-400 via-green-400 to-emerald-500",
    scores: { relevance: 85, brainrot: 55, cringe: 29 },
    addedAt: "2026-06-20",
    views: 650000,
    trendDirection: "declining",
    platform: "TikTok, X, Instagram",
    impact:
      "Redefined how music eras become internet personalities. 'Brat' became a political endorsement, a beauty aesthetic, and a lifestyle philosophy simultaneously.",
    highlights: [
      "Kamala Harris's campaign used 'brat' branding, endorsed by Charli XCX",
      "The lime green became one of the most recognizable brand colors of 2024",
      "\"Brat girl\" became a recognizable archetype across fashion and music",
      "Sparked debate about what 'brat' actually means across generations",
    ],
    relatedSlugs: ["delulu", "slay"],
    tags: ["music", "charli xcx", "2024", "album era", "aesthetic"],
  },
  {
    id: "e2",
    slug: "minecraft-movie-premiere",
    title: "Minecraft Movie Premiere",
    category: "event",
    description:
      "The A Minecraft Movie opening weekend became a live theatrical meme event — audiences went feral for the Chicken Jockey.",
    imageGradient: "from-green-500 via-lime-400 to-yellow-300",
    scores: { relevance: 94, brainrot: 82, cringe: 40 },
    addedAt: "2026-07-12",
    views: 1800000,
    trendDirection: "new",
    platform: "Theaters, TikTok, YouTube",
    impact:
      "Redefined the movie premiere experience for Gen Alpha. Theater reaction compilations became their own genre of content, spawning a new form of participatory cinema.",
    highlights: [
      "Theater audiences screaming, standing, and throwing popcorn at the Chicken Jockey scene",
      "IMAX screenings sold out in minutes across multiple cities",
      "TikTok compilations of theater reactions hit 500M+ total views",
      "'Chicken Jockey' became the shorthand for unexpected viral cinema moments",
    ],
    relatedSlugs: ["chicken-jockey", "skibidi-toilet"],
    tags: ["minecraft", "movie", "cinema", "gen alpha", "jack black"],
  },
  {
    id: "e3",
    slug: "dupe-economy",
    title: "The Dupe Economy",
    category: "event",
    description:
      "The cultural moment when buying dupes — knockoff luxury goods — became not just accepted but celebrated.",
    imageGradient: "from-amber-400 via-yellow-400 to-orange-400",
    scores: { relevance: 88, brainrot: 32, cringe: 22 },
    addedAt: "2026-06-10",
    views: 540000,
    trendDirection: "rising",
    platform: "TikTok, YouTube, Reddit",
    impact:
      "Shifted consumer culture. The stigma around knockoffs flipped — finding a great dupe became a flex. Brands were forced to respond as their cachet eroded.",
    highlights: [
      "Stanley tumbler dupes from Amazon outsold the originals in some categories",
      "'Dupe culture' declared by major fashion outlets as the dominant consumer trend",
      "Luxury brands started releasing budget lines in response to dupe demand",
      "Influencer 'dupe hauls' became a dominant TikTok content format",
    ],
    relatedSlugs: ["girl-dinner", "sigma-grindset"],
    tags: ["consumer culture", "fashion", "luxury", "budget", "2024"],
  },
  {
    id: "e4",
    slug: "ai-chatbot-wars",
    title: "AI Chatbot Wars",
    category: "event",
    description:
      "The year AI chatbots became a cultural battleground — memes, debates, and existential dread about robots stealing jobs.",
    imageGradient: "from-slate-600 via-zinc-500 to-gray-400",
    scores: { relevance: 96, brainrot: 45, cringe: 38 },
    addedAt: "2026-07-01",
    views: 2300000,
    trendDirection: "stable",
    platform: "X, Reddit, YouTube, everywhere",
    impact:
      "AI became the defining cultural and economic anxiety of the era. Every industry debated replacement. The discourse shaped elections, legislation, and an entirely new class of internet humor.",
    highlights: [
      "ChatGPT became the fastest product to reach 100M users in history",
      "AI slop became a recognized term for low-effort AI-generated content",
      "Writers, artists, and coders all fought back against AI replacement",
      "AI hallucinations spawned a genre of screenshots shared as cautionary humor",
    ],
    relatedSlugs: ["sigma-grindset"],
    tags: ["AI", "chatgpt", "technology", "jobs", "culture war"],
  },
  {
    id: "e5",
    slug: "short-form-takeover",
    title: "Short-Form Video Takeover",
    category: "event",
    description:
      "How TikTok, Reels, and YouTube Shorts rewired attention spans and fundamentally changed how culture spreads.",
    imageGradient: "from-fuchsia-600 via-pink-500 to-rose-400",
    scores: { relevance: 99, brainrot: 78, cringe: 55 },
    addedAt: "2026-05-20",
    views: 3100000,
    trendDirection: "stable",
    platform: "TikTok, Instagram, YouTube",
    impact:
      "Permanently altered how trends are born and die. A meme can now go from zero to mainstream in 48 hours and be dead within a week. The entire internet culture lifecycle accelerated.",
    highlights: [
      "Average trend lifespan dropped from 3 weeks to under 5 days",
      "TikTok became the dominant search engine for Gen Z, surpassing Google for discovery",
      "Attention-span discourse became its own major cultural conversation",
      "The 'brain-rot' generation emerged as a response to short-form saturation",
    ],
    relatedSlugs: ["skibidi-toilet", "brainrot", "rizz"],
    tags: ["tiktok", "social media", "attention span", "gen z", "gen alpha"],
  },
];

export function getEventBySlug(slug: string): EventEntry | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}

export function getRecentEvents(): EventEntry[] {
  return [...events].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
}

export function getRelatedEvents(slugs: string[]): EventEntry[] {
  return events.filter((e) => slugs.includes(e.slug));
}
