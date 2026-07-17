import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m15",
  slug: "rage-comics",
  title: "Rage Comics",
  category: "meme",
  description:
    "The original internet storytelling format — stick-figure comics with expressive face characters that defined 2010-era meme culture.",
  imageGradient: "from-red-600 via-rose-500 to-red-400",
  scores: { relevance: 70, brainrot: 48, cringe: 55 },
  addedAt: "2026-07-16",
  historicalDate: "2008-01-01",
  views: 2600000,
  trendDirection: "declining",
  tags: ["classic", "4chan", "reddit", "storytelling", "reaction", "imageboard"],
  meaning:
    "Multi-panel comics using expressive stick-figure characters — Rage Guy, Forever Alone, Trollface, Me Gusta — to tell relatable or humorous stories. Each character represented a specific emotion or social archetype.",
  origin:
    "The original Rage Guy ('FFFUUUUU') comic was posted to 4chan's /b/ board around 2008. Reddit's r/fffffffuuuuuuuuuuuu subreddit (created 2009) massively spread the format. Online tools enabled anyone to build and share comics instantly.",
  timeline: [
    { date: "~2008", event: "Original 'Rage Guy' (FUUUUU) comic posted to 4chan" },
    {
      date: "2009",
      event:
        "Reddit's r/fffffffuuuuuuuuuuuu subreddit created — format spreads to the wider internet",
    },
    {
      date: "2010–2011",
      event:
        "Peak era: Memegenerator, Cheezburger Network, and FunnyJunk spread the format worldwide",
    },
    {
      date: "2012",
      event: "Format considered dated; 'this is so 2010' becomes common mockery",
    },
    {
      date: "2020s",
      event:
        "Ironic revival — Trollge and remixed rage comic formats return in Gen Z content",
    },
  ],
  examples: [
    "Me: I'll just have one cookie — Rage Guy face",
    "Forever Alone — goes to movies alone, eats dinner alone, talks to himself",
    "Me Gusta — enjoying something you absolutely should not enjoy",
  ],
  relatedSlugs: ["trollface", "pepe"],
  sources: [
    {
      title: "Rage Comics — Know Your Meme",
      url: "https://knowyourmeme.com/memes/rage-comics",
      domain: "knowyourmeme.com",
    },
    {
      title: "Rage Comics — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Rage_comic",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
