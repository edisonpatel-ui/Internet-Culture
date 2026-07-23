import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e29",
  slug: "bed-bug-paris-panic",
  title: "Paris Bed Bug Panic (2023)",
  category: "event",
  description:
    "A late-2023 wave of fear and memes after reports of bed bugs on Paris Metro trains, cinemas, and Charles de Gaulle Airport went viral ahead of the 2024 Olympics.",
  imageGradient: "from-red-800 via-rose-700 to-amber-600",
  scores: { relevance: 55, influence: 62, cringe: 48, brainrot: 40 },
  addedAt: "2026-07-23",
  historicalDate: "2023-09-01",
  views: 890000,
  trendDirection: "declining",
  tags: ["2023", "paris", "public health", "tiktok", "travel"],
  platform: "TikTok, X, French TV, Reddit",
  impact:
    "Paris was already under global scrutiny with the Olympics approaching. When social clips showed insects on seats and in theaters, anxiety spread faster than verified infestation data. French officials and transit agencies responded publicly; dermatologists and pest experts flooded news segments. Online, the panic mixed genuine disgust with travel memes, \"check your hotel\" threads, and dark humor about Olympic visitors. It showed how a localized public-health scare could become international content within days.",
  highlights: [
    "September–October 2023: viral videos claimed bed bugs on Paris Metro lines, movie theaters, and airport seating",
    "French transport and tourism officials issued public reassurances and cleaning measures",
    "Coverage peaked ahead of the 2024 Paris Olympics, amplifying travel anxiety",
    "Spawned TikTok inspection tutorials, meme posts, and global news segments on urban pest resurgence",
  ],
  relatedSlugs: ["tiktok-rise", "reddit-culture", "brat-summer", "dupe-economy"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Bed_bug",
      title: "Bed bug — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Bed_bug",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Background on bed bug resurgence and public-health context.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Paris bed bug scare — The Guardian",
      url: "https://www.theguardian.com/world/2023/oct/03/paris-bed-bug-scare-france",
      domain: "theguardian.com",
    },
    {
      title: "Bed bugs in Paris — BBC News",
      url: "https://www.bbc.com/news/world-europe-66987654",
      domain: "bbc.com",
    },
  ],
};

export default entry;
