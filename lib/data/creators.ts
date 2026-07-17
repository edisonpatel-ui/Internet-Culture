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
    sources: [
      {
        title: "DaFuq!?Boom! — YouTube Channel",
        url: "https://www.youtube.com/@DaFuqBoom",
        domain: "youtube.com",
      },
    ],
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
    sources: [
      {
        title: "Jools Lebron — TikTok",
        url: "https://www.tiktok.com/@joolieannie",
        domain: "tiktok.com",
      },
    ],
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
        title: "MrBeast — YouTube Channel",
        url: "https://www.youtube.com/@MrBeast",
        domain: "youtube.com",
      },
      {
        title: "MrBeast — Wikipedia",
        url: "https://en.wikipedia.org/wiki/MrBeast",
        domain: "en.wikipedia.org",
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
    sources: [
      {
        title: "IShowSpeed — YouTube Channel",
        url: "https://www.youtube.com/@ishowspeed",
        domain: "youtube.com",
      },
    ],
  },
  {
    id: "cr6",
    slug: "pewdiepie",
    title: "PewDiePie",
    category: "creator",
    description:
      "Felix Kjellberg — Swedish YouTuber who held the most-subscribed individual channel title for years and defined the gaming commentary era of YouTube.",
    imageGradient: "from-red-600 via-rose-500 to-orange-400",
    scores: { relevance: 92, brainrot: 45, cringe: 30 },
    addedAt: "2026-07-16",
    views: 1200000,
    trendDirection: "stable",
    tags: ["youtube", "gaming", "commentary", "swedish", "video essays"],
    careerStart: "2010",
    platforms: [
      {
        platform: "youtube",
        handle: "PewDiePie",
        url: "https://www.youtube.com/@PewDiePie",
      },
    ],
    followers: {
      youtube: "~110M+",
    },
    notableMoments: [
      "Most-subscribed individual YouTube channel from 2013 through multiple years",
      "'Subscribe to PewDiePie' campaign against T-Series in 2018–2019 — a defining YouTube cultural moment",
      "Transitioned from gaming commentary to meme reviews, commentary, and video essays",
      "Married Marzia Bisognin in 2019",
    ],
    relatedSlugs: ["harlem-shake", "doge"],
    sources: [
      {
        title: "PewDiePie — YouTube Channel",
        url: "https://www.youtube.com/@PewDiePie",
        domain: "youtube.com",
      },
      {
        title: "PewDiePie — Wikipedia",
        url: "https://en.wikipedia.org/wiki/PewDiePie",
        domain: "en.wikipedia.org",
      },
    ],
  },
  // ── Batch 2 — Creators ──────────────────────────────────────────────────
  {
    id: "cr7",
    slug: "markiplier",
    title: "Markiplier",
    category: "creator",
    description:
      "Mark Fischbach — YouTube's most recognizable horror game narrator, known for dramatic reactions, emotional storytelling, and record-breaking charity work.",
    imageGradient: "from-rose-600 via-red-700 to-rose-800",
    scores: { relevance: 90, brainrot: 38, cringe: 20 },
    addedAt: "2026-07-16",
    views: 980000,
    trendDirection: "stable",
    tags: ["youtube", "gaming", "horror", "charity", "lets-play", "indie"],
    careerStart: "2012",
    platforms: [
      {
        platform: "youtube",
        handle: "Markiplier",
        url: "https://www.youtube.com/@markiplier",
      },
      {
        platform: "twitch",
        handle: "markiplier",
        url: "https://www.twitch.tv/markiplier",
      },
    ],
    followers: {
      youtube: "~35M+",
    },
    notableMoments: [
      "Horror gaming pioneer — his FNAF and Amnesia playthroughs defined the horror genre on YouTube",
      "'Unus Annus' — a channel created with CrankGameplays that produced one video per day for a year, then deleted everything permanently on schedule (2019–2020)",
      "Multiple charity livestreams raising millions of dollars for various organizations",
      "Wrote, directed, and starred in 'Iron Lung' (2023), an adaptation of the indie horror game",
    ],
    relatedSlugs: ["pewdiepie", "ninja"],
    sources: [
      {
        title: "Markiplier — YouTube Channel",
        url: "https://www.youtube.com/@markiplier",
        domain: "youtube.com",
      },
      {
        title: "Markiplier — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Markiplier",
        domain: "en.wikipedia.org",
      },
    ],
  },
  {
    id: "cr8",
    slug: "pokimane",
    title: "Pokimane",
    category: "creator",
    description:
      "Imane Anys — one of the most-followed streamers on Twitch and a defining voice in discussions about parasocial relationships in online creator culture.",
    imageGradient: "from-violet-500 via-purple-500 to-indigo-600",
    scores: { relevance: 91, brainrot: 35, cringe: 22 },
    addedAt: "2026-07-16",
    views: 870000,
    trendDirection: "stable",
    tags: ["twitch", "streaming", "gaming", "league of legends", "offline-tv"],
    careerStart: "2013",
    platforms: [
      {
        platform: "twitch",
        handle: "pokimane",
        url: "https://www.twitch.tv/pokimane",
      },
      {
        platform: "youtube",
        handle: "Pokimane",
        url: "https://www.youtube.com/@pokimane",
      },
    ],
    followers: {
      twitch: "~9M+",
    },
    notableMoments: [
      "One of the most-followed female streamers on Twitch for multiple consecutive years",
      "Founding member of OfflineTV — one of the most prominent content creator collectives in streaming culture",
      "Central figure in ongoing public discourse about parasocial relationships and the dynamics of streamer-audience culture",
      "Has spoken publicly about managing audience expectations and the challenges of personal boundaries as a public figure",
    ],
    relatedSlugs: ["kai-cenat", "ninja"],
    sources: [
      {
        title: "Pokimane — Twitch Channel",
        url: "https://www.twitch.tv/pokimane",
        domain: "twitch.tv",
      },
      {
        title: "Pokimane — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Pokimane",
        domain: "en.wikipedia.org",
      },
    ],
  },
  {
    id: "cr9",
    slug: "ksi",
    title: "KSI",
    category: "creator",
    description:
      "Olajide Olatunji — British YouTuber, rapper, and boxer who built one of the internet's most influential multi-hyphenate careers and co-founded Prime Hydration.",
    imageGradient: "from-yellow-500 via-amber-500 to-orange-500",
    scores: { relevance: 93, brainrot: 52, cringe: 28 },
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
  },
  {
    id: "cr10",
    slug: "ninja",
    title: "Ninja",
    category: "creator",
    description:
      "Tyler Blevins — the streamer who made Fortnite a cultural phenomenon and became the most-recognized name in gaming content.",
    imageGradient: "from-blue-500 via-cyan-500 to-sky-400",
    scores: { relevance: 92, brainrot: 40, cringe: 25 },
    addedAt: "2026-07-16",
    views: 1050000,
    trendDirection: "stable",
    tags: ["twitch", "youtube", "fortnite", "gaming", "competitive", "streaming"],
    careerStart: "2011",
    platforms: [
      {
        platform: "twitch",
        handle: "Ninja",
        url: "https://www.twitch.tv/Ninja",
      },
      {
        platform: "youtube",
        handle: "Ninja",
        url: "https://www.youtube.com/@Ninja",
      },
    ],
    followers: {
      twitch: "~19M+",
    },
    notableMoments: [
      "Most-followed Twitch streamer by 2018 — driven by Fortnite's mainstream explosion",
      "Played Fortnite with Drake and Travis Scott in March 2018 — broke concurrent viewer streaming records at the time",
      "Signed an exclusive deal with Microsoft's Mixer streaming platform in 2019; Mixer shut down in July 2020",
      "Publicly announced a melanoma diagnosis in 2024 and spoke openly about treatment and early detection",
    ],
    relatedSlugs: ["mrbeast", "kai-cenat", "pewdiepie"],
    sources: [
      {
        title: "Ninja — Twitch Channel",
        url: "https://www.twitch.tv/Ninja",
        domain: "twitch.tv",
      },
      {
        title: "Tyler Blevins (Ninja) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Tyler_Blevins",
        domain: "en.wikipedia.org",
      },
    ],
  },
  {
    id: "cr11",
    slug: "duke-dennis",
    title: "Duke Dennis",
    category: "creator",
    description:
      "NBA 2K YouTuber and core AMP collective member who built a massive following through gaming content and group entertainment.",
    imageGradient: "from-red-600 via-rose-600 to-pink-600",
    scores: { relevance: 80, brainrot: 60, cringe: 30 },
    addedAt: "2026-07-16",
    views: 580000,
    trendDirection: "stable",
    tags: ["youtube", "gaming", "nba 2k", "amp", "basketball", "vlog"],
    careerStart: "2019",
    platforms: [
      {
        platform: "youtube",
        handle: "Duke Dennis Gaming",
        url: "https://www.youtube.com/@DukeDennis",
      },
      {
        platform: "twitch",
        handle: "DukeDennis",
        url: "https://www.twitch.tv/dukedennis",
      },
    ],
    followers: {
      youtube: "~7M+",
    },
    notableMoments: [
      "Core member of AMP (Any Means Possible) — the content collective including Kai Cenat, Fanum, Agent00, Chrisnxtdoor, and ImDavisss",
      "Built one of the largest NBA 2K audiences on YouTube through entertaining and skilled gameplay",
      "AMP group content became some of the most-watched collaborative gaming and vlog content of the era",
    ],
    relatedSlugs: ["kai-cenat"],
    sources: [
      {
        title: "Duke Dennis — YouTube Channel",
        url: "https://www.youtube.com/@DukeDennis",
        domain: "youtube.com",
      },
    ],
  },
  {
    id: "cr12",
    slug: "jynxzi",
    title: "Jynxzi",
    category: "creator",
    description:
      "Nicholas Stewart — the Rainbow Six Siege streamer who built a massive Twitch audience through high-level gameplay and an entertaining personality.",
    imageGradient: "from-orange-500 via-amber-500 to-yellow-400",
    scores: { relevance: 82, brainrot: 48, cringe: 25 },
    addedAt: "2026-07-16",
    views: 640000,
    trendDirection: "rising",
    tags: ["twitch", "rainbow six siege", "gaming", "fps", "streaming"],
    careerStart: "2021",
    platforms: [
      {
        platform: "twitch",
        handle: "Jynxzi",
        url: "https://www.twitch.tv/jynxzi",
      },
      {
        platform: "youtube",
        handle: "Jynxzi",
        url: "https://www.youtube.com/@jynxzi",
      },
    ],
    followers: {
      twitch: "~7M+",
    },
    notableMoments: [
      "One of the most-watched Rainbow Six Siege streamers on Twitch",
      "Known for combining high-level competitive gameplay with a highly entertaining stream personality",
      "Rapid growth made him one of the fastest-rising gaming streamers in 2022–2023",
    ],
    relatedSlugs: ["kai-cenat", "ninja"],
    sources: [
      {
        title: "Jynxzi — Twitch Channel",
        url: "https://www.twitch.tv/jynxzi",
        domain: "twitch.tv",
      },
    ],
  },
  {
    id: "cr13",
    slug: "sketch",
    title: "Sketch",
    category: "creator",
    description:
      "A gaming and lifestyle content creator known for Roblox content on YouTube and Twitch.",
    imageGradient: "from-blue-400 via-sky-400 to-cyan-400",
    scores: { relevance: 72, brainrot: 45, cringe: 28 },
    addedAt: "2026-07-16",
    views: 380000,
    trendDirection: "stable",
    tags: ["youtube", "roblox", "gaming", "streaming"],
    careerStart: "2020",
    platforms: [
      {
        platform: "youtube",
        handle: "SketchYT",
      },
    ],
    notableMoments: [
      "Known for Roblox gaming content and interactive entertainment on YouTube",
    ],
    relatedSlugs: ["duke-dennis"],
    sources: [],
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
