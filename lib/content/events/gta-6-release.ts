import type { EventEntry } from "@/types";

const entry: EventEntry = {
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
};

export default entry;
