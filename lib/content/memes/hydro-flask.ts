import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m136",
  slug: "hydro-flask",
  title: "Hydro Flask",
  category: "meme",
  description:
    "The reusable water bottle that became a VSCO Girl totem — clanking metal straws, sticker stacks, and shorthand for a 2019 aesthetic.",
  imageGradient: "from-teal-400 via-cyan-300 to-slate-200",
  scores: { relevance: 55, influence: 60, cringe: 48, brainrot: 42 },
  addedAt: "2026-07-23",
  historicalDate: "2019-06-01",
  views: 2100000,
  trendDirection: "declining",
  tags: ["vsco-girl", "2019", "tiktok", "brand", "aesthetic", "environment"],
  meaning:
    "Memes about Hydro Flask metal water bottles as status objects — covered in stickers, paired with scrunchies and 'sksksk' humor. Represented eco-conscious performativity and teen trend identity on TikTok. Also used ironically to mock any overpriced reusable bottle culture.",
  origin:
    "Hydro Flask bottles existed for outdoor markets years earlier, but 2019's VSCO Girl meme cluster on TikTok — documented by Know Your Meme and major outlets — turned the pastel bottle into a visual punchline. The 'clank' of dropping a Hydro Flask in class became its own audio joke. The brand benefited from unpaid meme marketing while also symbolizing peak aesthetic conformity.",
  timeline: [
    { date: "2009", event: "Hydro Flask company founded in the Pacific Northwest" },
    { date: "Summer 2019", event: "VSCO Girl TikTok trend pairs Hydro Flask with scrunchies and Birkenstocks" },
    { date: "2019", event: "Parody videos and 'and I oop' audio memes peak" },
    { date: "2020s", event: "Aesthetic fades; bottle remains a generic reusable-bottle meme stand-in" },
  ],
  examples: [
    "VSCO Girl checklist meme: Hydro Flask, scrunchie, save the turtles",
    "ASMR joke: Hydro Flask hitting classroom floor",
    "Sticker-covered bottle as personality trait in teen comedy skits",
  ],
  relatedSlugs: ["dupe-economy", "crumbl-cookie", "prime-hydration", "labubu"],
  relationships: {
    sameEra: ["crumbl-cookie"],
    relatedEvent: ["dupe-economy"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/vsco-girl",
      title: "VSCO Girl — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/vsco-girl",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "2019 aesthetic meme cluster including Hydro Flask totems.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Hydro_Flask",
      title: "Hydro Flask — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Hydro_Flask",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Brand history and VSCO Girl cultural moment.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "VSCO Girl — Know Your Meme",
      url: "https://knowyourmeme.com/memes/vsco-girl",
      domain: "knowyourmeme.com",
    },
    {
      title: "Hydro Flask — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Hydro_Flask",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
