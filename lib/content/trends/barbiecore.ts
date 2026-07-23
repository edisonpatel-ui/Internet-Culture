import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t33",
  slug: "barbiecore",
  title: "Barbiecore",
  category: "trend",
  description:
    "Hot pink, plastic glamour, and Mattel nostalgia as a fashion and film moment — peaked with Barbie (2023).",
  imageGradient: "from-pink-400 via-rose-400 to-fuchsia-500",
  scores: { relevance: 82, influence: 75, cringe: 40, brainrot: 25 },
  addedAt: "2026-07-23",
  historicalDate: "2023-01-01",
  views: 2100000,
  trendDirection: "stable",
  tags: ["fashion", "film", "pink", "aesthetic", "2020s"],
  origin:
    "Barbiecore named the hot-pink, hyper-feminine aesthetic tied to Greta Gerwig's Barbie (2023) marketing blitz — Pantone-branded pink, Y2K callbacks, and Instagram grids turning monochromatic. The look drew on earlier pink waves (Valentino pink, Legally Blonde nostalgia) but synchronized with a global movie event (Barbenheimer summer).",
  summary:
    "Barbiecore is hot pink as identity: dresses, nails, filters, and brand collabs riding Mattel's moment. It sits next to coquette and Y2K revival but is louder and more commercial — fashion as movie tie-in and selfie backdrop.",
  relatedSlugs: ["coquette-aesthetic", "y2k-revival", "barbenheimer", "clean-girl-aesthetic"],
  relationships: {
    relatedTo: ["coquette-aesthetic", "y2k-revival"],
    relatedEvent: ["barbenheimer"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Barbiecore",
      title: "Barbiecore — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Barbiecore",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic background on the aesthetic.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Barbiecore — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barbiecore",
      domain: "en.wikipedia.org",
    },
    {
      title: "Barbie (film) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barbie_(film)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
