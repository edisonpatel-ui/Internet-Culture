import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m63",
  slug: "tel-aviv-impressed",
  title: "Tel Aviv Impressed",
  category: "meme",
  description:
    "A blank-faced Netanyahu still captioned '*Tel Aviv Impressed*' — an Ohio Impressed-style reaction for content read as 'spiritually Israeli.'",
  imageGradient: "from-blue-600 via-sky-500 to-white",
  scores: { relevance: 58, influence: 42, cringe: 48, brainrot: 55 },
  addedAt: "2026-07-18",
  historicalDate: "2023-10-01",
  views: 900000,
  trendDirection: "stable",
  tags: ["reaction", "ohio impressed", "format", "2020s", "politics"],
  meaning:
    "A reaction-image format: a blank expression from Israeli Prime Minister Benjamin Netanyahu captioned '*Tel Aviv Impressed*,' modeled on the Ohio Impressed / King Von reaction series. Used online as a deadpan reaction to content perceived as aligned with Israeli aesthetics, politics, or discourse — especially around mid-2020s Israel–Hamas conflict commentary (Know Your Meme).",
  origin:
    "Derived from the Ohio Impressed reaction template (itself part of the broader 'Ohio' / Squid Game-edit reaction lineage). The Tel Aviv variant swaps in a Netanyahu still and Tel Aviv as the place-name caption; documented on Know Your Meme as a political-reaction spin on that format.",
  timeline: [
    { date: "Early 2020s", event: "Ohio / Ohio Impressed reaction images circulate widely" },
    { date: "2023–2024", event: "Tel Aviv Impressed variant spreads as conflict-related reaction format" },
    { date: "2024+", event: "Continues as niche political reaction alongside other place-name Impressed edits" },
  ],
  examples: [
    "Commenting '*Tel Aviv Impressed*' under a clip with Israeli flags or aesthetics",
    "Pairing the blank Netanyahu still with unrelated 'spiritually Israeli' vibes",
    "Format cousins: Ohio Impressed, other city-name Impressed reactions",
  ],
  relatedSlugs: ["ohio-final-boss", "this-is-fine", "hide-the-pain-harold"],
  relationships: {
    sameFormat: ["ohio-final-boss"],
    relatedTo: ["this-is-fine", "hide-the-pain-harold"],
  },
  media: [
    // AI suggested — KYM cover; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/056/555/cover_(5).jpg",
      title: "Tel Aviv Impressed — reaction cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/tel-aviv-impressed",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover still documenting the Tel Aviv Impressed reaction format.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/tel-aviv-impressed",
      title: "Tel Aviv Impressed — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/tel-aviv-impressed",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Format origin and usage as Ohio Impressed derivative.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Tel Aviv Impressed — Know Your Meme",
      url: "https://knowyourmeme.com/memes/tel-aviv-impressed",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
