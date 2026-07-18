import type { EventEntry } from "@/types";

const entry: EventEntry = {
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
  // CONCEPT/AESTHETIC-FIRST: the defining visual is the lime-green Brat album
  // cover (copyrighted). A 2018 Charli XCX promo photo does not represent
  // "Brat Summer," so the lime gradient fallback is the correct hero.
  sources: [
    {
      title: "Brat (album) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Brat_(album)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
