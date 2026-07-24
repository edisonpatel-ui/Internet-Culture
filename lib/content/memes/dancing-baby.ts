import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m132",
  slug: "dancing-baby",
  title: "Dancing Baby",
  category: "meme",
  description:
    "The 1996 Baby Cha-Cha viral 3D animation — one of the first GIFs to email inboxes worldwide and a landmark of pre-social viral video.",
  imageGradient: "from-sky-300 via-blue-200 to-pink-200",
  scores: { relevance: 28, influence: 92, cringe: 40, brainrot: 35 },
  addedAt: "2026-07-23",
  historicalDate: "1996-01-01",
  views: 3500000,
  trendDirection: "declining",
  tags: ["1990s", "gif", "classic", "proto-meme", "email", "3d"],
  meaning:
    "A looping 3D animation of a diapered baby doing the cha-cha — also called Baby Cha-Cha or Oogachaka Baby. Symbol of early internet virality: forwarded emails, forum signatures, and TV references to 'that dancing baby.' Distinct from the 'first meme' debate — this is a specific 1990s file, not a print cartoon.",
  origin:
    "Created as a demo by character animator Michael Girard and propagated through Autodesk/Kinetix circles before spreading via email chains in 1996. Know Your Meme and Wikipedia note its appearance on Ally McBeal in 1998 as proof it crossed into mainstream TV. The GIF format — small, loopable, bizarre — set the template for decades of viral clips.",
  timeline: [
    { date: "1996", event: "Baby Cha-Cha animation spreads through email forwards" },
    { date: "1998", event: "Featured on Ally McBeal; mainstream news covers the fad" },
    { date: "2000s", event: "Becomes shorthand for '90s internet weirdness' in nostalgia posts" },
    { date: "2010s+", event: "Referenced in 'first viral video' lists alongside Hamster Dance" },
  ],
  examples: [
    "Nostalgia thread: 'remember when this was in every email?'",
    "Comparing a new viral loop to 'Dancing Baby energy'",
    "Ally McBeal clip edits in retro internet compilations",
  ],
  relatedSlugs: ["first-meme", "hamster-dance", "numa-numa", "badger-badger-badger"],
  relationships: {
    sameEra: ["hamster-dance", "all-your-base-are-belong-to-us"],
    relatedTo: ["first-meme"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/dancing-baby",
      title: "Dancing Baby — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/dancing-baby",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "1996 Baby Cha-Cha origin and Ally McBeal moment.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Dancing_baby",
      title: "Dancing baby — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Dancing_baby",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic history of the 1996 viral animation.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Dancing Baby — Know Your Meme",
      url: "https://knowyourmeme.com/memes/dancing-baby",
      domain: "knowyourmeme.com",
    },
    {
      title: "Dancing baby — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Dancing_baby",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
