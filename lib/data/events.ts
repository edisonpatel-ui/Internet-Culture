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
    sources: [
      {
        title: "Brat (album) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Brat_(album)",
        domain: "en.wikipedia.org",
      },
    ],
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
    sources: [
      {
        title: "A Minecraft Movie — Wikipedia",
        url: "https://en.wikipedia.org/wiki/A_Minecraft_Movie",
        domain: "en.wikipedia.org",
      },
    ],
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
    sources: [
      {
        title: "ChatGPT — Wikipedia",
        url: "https://en.wikipedia.org/wiki/ChatGPT",
        domain: "en.wikipedia.org",
      },
    ],
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
  // ── Historical Platform Events ──────────────────────────────────────────
  {
    id: "e6",
    slug: "vine-shutdown",
    title: "Vine Shutdown",
    category: "event",
    description:
      "Twitter's decision to shut down Vine in 2016 ended the first great short-form video era and scattered a generation of creators who went on to dominate YouTube and TikTok.",
    imageGradient: "from-lime-500 via-green-500 to-emerald-600",
    scores: { relevance: 82, brainrot: 40, cringe: 15 },
    addedAt: "2026-07-16",
    historicalDate: "2017-01-17",
    views: 890000,
    trendDirection: "declining",
    platform: "Vine, Twitter",
    impact:
      "Vine's closure proved that even culturally essential platforms are not permanent. The creators it produced — Logan Paul, King Bach, David Dobrik, Lele Pons — became the first cohort of internet-native superstars and defined the creator economy that followed.",
    highlights: [
      "Twitter acquired Vine in October 2012 before it had even launched publicly",
      "Vine launched on January 24, 2013 — 6-second looping videos",
      "Twitter announced the shutdown on October 27, 2016",
      "Vine went offline on January 17, 2017 — archives were preserved",
      "Many Vine creators immediately migrated to YouTube and later TikTok",
    ],
    relatedSlugs: ["short-form-takeover", "yeet"],
    tags: ["vine", "twitter", "short-form video", "creators", "2016", "2017"],
    sources: [
      {
        title: "Vine — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Vine_(service)",
        domain: "en.wikipedia.org",
      },
    ],
  },
  {
    id: "e7",
    slug: "tiktok-rise",
    title: "TikTok's Rise",
    category: "event",
    description:
      "How a Chinese app swallowed the internet and redefined how culture, trends, music, and language spread globally.",
    imageGradient: "from-pink-600 via-fuchsia-500 to-purple-600",
    scores: { relevance: 97, brainrot: 70, cringe: 40 },
    addedAt: "2026-07-16",
    historicalDate: "2018-08-02",
    views: 2800000,
    trendDirection: "stable",
    platform: "TikTok",
    impact:
      "TikTok fundamentally changed how trends are born, spread, and die. Its recommendation algorithm — not follower counts — determines what goes viral. This shifted cultural power from established creators to anyone with a phone and an idea.",
    highlights: [
      "ByteDance launched TikTok internationally in September 2017",
      "Merged with Musical.ly in August 2018, inheriting its US creator base",
      "Became the most downloaded app in the US in Q1 2018",
      "COVID-19 lockdowns in 2020 drove explosive growth worldwide",
      "Triggered repeated US ban attempts and global regulatory scrutiny from 2020 onward",
    ],
    relatedSlugs: ["short-form-takeover", "vine-shutdown", "rizz"],
    tags: ["tiktok", "social media", "algorithm", "short-form video", "viral", "gen z"],
    sources: [
      {
        title: "TikTok — Wikipedia",
        url: "https://en.wikipedia.org/wiki/TikTok",
        domain: "en.wikipedia.org",
      },
    ],
  },
  // ── Batch 2 — Major Internet Events ────────────────────────────────────
  {
    id: "e8",
    slug: "ice-bucket-challenge",
    title: "Ice Bucket Challenge",
    category: "event",
    description:
      "The viral charity campaign that swept the internet in summer 2014 — dump ice water, challenge three friends, raise awareness and money for ALS.",
    imageGradient: "from-sky-400 via-blue-500 to-indigo-600",
    scores: { relevance: 79, brainrot: 28, cringe: 15 },
    addedAt: "2026-07-16",
    historicalDate: "2014-08-01",
    views: 3200000,
    trendDirection: "declining",
    platform: "Facebook, YouTube, Twitter",
    impact:
      "One of the first viral internet campaigns to prove that social media virality and charitable giving could combine at global scale. The challenge raised over $115 million for ALS research in a matter of weeks and directly funded the discovery of a gene variant linked to the disease.",
    highlights: [
      "Started in summer 2014 through ALS patient communities, with Pat Quinn and Pete Frates — both living with ALS — playing key roles in spreading the challenge",
      "Participants filmed themselves dumping ice water over their heads and challenged three others to do the same within 24 hours or donate to ALS research",
      "Celebrities including Bill Gates, Mark Zuckerberg, and Tim Cook participated",
      "Raised over $115 million for the ALS Association in weeks — a record for the organization",
      "In 2016, researchers announced the discovery of the NEK1 gene variant linked to ALS — funded in part by Ice Bucket Challenge donations",
    ],
    relatedSlugs: ["short-form-takeover", "vine-shutdown"],
    tags: ["charity", "viral", "als", "2014", "challenge", "facebook", "celebrity", "fundraising"],
    sources: [
      {
        title: "Ice Bucket Challenge — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Ice_Bucket_Challenge",
        domain: "en.wikipedia.org",
      },
      {
        title: "Ice Bucket Challenge — Know Your Meme",
        url: "https://knowyourmeme.com/memes/ice-bucket-challenge",
        domain: "knowyourmeme.com",
      },
    ],
  },
  {
    id: "e9",
    slug: "coldplay-kiss-cam",
    title: "Coldplay Kiss Cam",
    category: "event",
    description:
      "The 2025 Coldplay concert kiss cam moment that went globally viral — a couple caught on camera became the subject of one of the year's biggest public relationship dramas.",
    imageGradient: "from-yellow-400 via-amber-400 to-orange-400",
    scores: { relevance: 86, brainrot: 48, cringe: 42 },
    addedAt: "2026-07-16",
    historicalDate: "2025-06-01",
    views: 4800000,
    trendDirection: "declining",
    platform: "X, TikTok, YouTube",
    impact:
      "Demonstrated how instantly a private moment in a public arena can become global news and a cultural flashpoint. Reignited debates about public accountability, workplace relationships, and the nature of internet pile-ons and viral shaming.",
    highlights: [
      "At a Coldplay concert in 2025, a kiss cam moment captured a couple who appeared to react awkwardly when the camera focused on them",
      "The clip spread globally on X and TikTok within hours of being filmed and shared",
      "Internet communities identified the individuals — the story developed significant professional consequences for those involved",
      "The incident sparked widespread discussion about privacy in public spaces, accountability, and the speed of viral internet culture",
    ],
    relatedSlugs: ["short-form-takeover", "brat-summer"],
    tags: ["viral", "concert", "coldplay", "2025", "kiss cam", "accountability", "social media"],
    sources: [],
  },
  {
    id: "e10",
    slug: "gta-6-release",
    title: "GTA 6",
    category: "event",
    description:
      "The most anticipated video game of the decade — Grand Theft Auto VI broke trailer records before it even launched and became a cultural event in its own right.",
    imageGradient: "from-orange-500 via-red-500 to-rose-600",
    scores: { relevance: 95, brainrot: 60, cringe: 25 },
    addedAt: "2026-07-16",
    historicalDate: "2023-12-04",
    views: 6200000,
    trendDirection: "stable",
    platform: "PlayStation, Xbox, PC",
    impact:
      "Demonstrated that major video game releases are now as culturally significant as blockbuster films. The GTA 6 announcement cycle generated years of cultural content — memes, speculation, and discourse — before the game itself was available to play.",
    highlights: [
      "Trailer 1 released December 4, 2023 — broke YouTube records for views in 24 hours for a game trailer",
      "Featured Lucia, the first female protagonist in a mainline GTA game",
      "Set in Leonida — a fictional version of Florida, primarily centered on Vice City (Miami)",
      "Florida woman memes inspired by the trailer setting went viral immediately after the reveal",
    ],
    relatedSlugs: ["ai-chatbot-wars", "short-form-takeover"],
    participants: ["Rockstar Games"],
    tags: ["gaming", "rockstar", "gta", "playstation", "xbox", "2023", "2025", "vice city"],
    sources: [
      {
        title: "Grand Theft Auto VI — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI",
        domain: "en.wikipedia.org",
      },
    ],
  },
  {
    id: "e11",
    slug: "one-chip-challenge",
    title: "One Chip Challenge",
    category: "event",
    description:
      "Paqui's infamous coffin-boxed chip — so spicy it put people in hospitals and was pulled from shelves following a teenager's death in 2023.",
    imageGradient: "from-red-600 via-orange-600 to-yellow-500",
    scores: { relevance: 82, brainrot: 65, cringe: 38 },
    addedAt: "2026-07-16",
    historicalDate: "2023-09-01",
    views: 2800000,
    trendDirection: "declining",
    platform: "TikTok, YouTube",
    impact:
      "Became one of the most discussed viral food challenges of the decade — raising urgent questions about content creator responsibility, food safety regulations, and the gamification of danger in social media culture. The challenge's tragic end led Paqui to withdraw the product entirely.",
    highlights: [
      "Paqui's One Chip Challenge featured a single chip coated in Carolina Reaper and Naga Viper peppers, sold in a coffin-shaped box",
      "Participants filmed themselves eating the chip and competing to see how long they could last without drinking anything",
      "Videos of participants in visible distress spread across TikTok and YouTube as both entertainment and cautionary content",
      "In September 2023, 14-year-old Harris Wolobah became ill at school after eating the chip and later died — the medical examiner noted the chip as a contributing factor",
      "Paqui voluntarily pulled the product from store shelves nationwide following the tragedy",
    ],
    relatedSlugs: ["short-form-takeover"],
    tags: ["challenge", "food", "spicy", "tiktok", "viral", "paqui", "2023", "safety"],
    sources: [
      {
        title: "One Chip Challenge — Know Your Meme",
        url: "https://knowyourmeme.com/memes/one-chip-challenge",
        domain: "knowyourmeme.com",
      },
    ],
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

export function getAllEvents(): EventEntry[] {
  return events;
}
