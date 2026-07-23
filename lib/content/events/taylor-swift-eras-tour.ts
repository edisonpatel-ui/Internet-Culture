import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e41",
  slug: "taylor-swift-eras-tour",
  title: "Taylor Swift Eras Tour",
  category: "event",
  description:
    "Taylor Swift's 2023–2024 stadium tour — a record-breaking live phenomenon that reshaped ticketing, local economies, and friendship-bracelet fan culture online.",
  imageGradient: "from-purple-600 via-pink-500 to-amber-400",
  scores: { relevance: 92, influence: 95, cringe: 15, brainrot: 25 },
  addedAt: "2026-07-23",
  historicalDate: "2023-03-17",
  views: 8900000,
  trendDirection: "stable",
  tags: ["2023", "music", "taylor swift", "tour", "tiktok"],
  platform: "Stadiums, TikTok, Instagram, X",
  impact:
    "The Eras Tour opened in Glendale in March 2023 and became a moving city-block party: three-hour setlists spanning Swift's catalog, surprise songs, and bead-trading traditions documented nightly on TikTok. Ticketmaster's presale meltdown led to congressional scrutiny. Cities reported hotel and spending booms; \"Swiftie\" tourism became an economic story. Online, the tour proved how a pre-social artist could dominate algorithm culture through fan-generated clip networks.",
  highlights: [
    "March 17, 2023: The Eras Tour opened at State Farm Stadium in Glendale, Arizona",
    "Ticketmaster presale failures prompted a U.S. Senate hearing on competition and bots",
    "Tour gross passed $1 billion — among the highest-grossing concert runs ever reported",
    "Friendship bracelet trading and surprise-song clips became defining TikTok subcultures",
  ],
  relatedSlugs: ["tiktok-rise", "brat-summer", "instagram-culture", "creator-economy"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Taylor_Swift_The_Eras_Tour_Midnights_Era_Set_%2853109777579%29_%28cropped%29.jpg",
      title: "Taylor Swift — Eras Tour (2023)",
      source: "Wikimedia Commons / Paolo V",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Taylor_Swift_The_Eras_Tour_Midnights_Era_Set_(53109777579)_(cropped).jpg",
      platform: "wikimedia",
      attribution: "Paolo V (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "Taylor Swift performing the Midnights era set on the Eras Tour.",
      date: "2023-08-09",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/The_Eras_Tour",
      title: "The Eras Tour — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/The_Eras_Tour",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "The Eras Tour — Wikipedia",
      url: "https://en.wikipedia.org/wiki/The_Eras_Tour",
      domain: "en.wikipedia.org",
    },
    {
      title: "Ticketmaster Senate hearing — NPR",
      url: "https://www.npr.org/2023/01/31/1155030038/ticketmaster-taylor-swift-hearing-senate-judiciary-committee",
      domain: "npr.org",
    },
  ],
};

export default entry;
