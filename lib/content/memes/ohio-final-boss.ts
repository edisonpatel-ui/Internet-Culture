import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m2",
  slug: "ohio-final-boss",
  title: "Ohio Final Boss",
  category: "meme",
  description:
    "The ultimate 'only in Ohio' creature — absurdist lore taken to its logical extreme.",
  imageGradient: "from-red-600 via-rose-500 to-orange-400",
  scores: { relevance: 82, brainrot: 89, cringe: 71 },
  addedAt: "2026-07-10",
  views: 510000,
  trendDirection: "rising",
  meaning:
    "A fictional supervillain embodying Ohio's meme reputation for bizarre, unexplainable events.",
  origin:
    "Grew out of the 'Only in Ohio' format on TikTok, which packages bizarre or surreal content under the premise that Ohio is uniquely strange. As the format escalated, creators began adding fictional creatures and lore — eventually producing the 'final boss' framing, treating Ohio absurdity as an RPG-style climactic enemy.",
  timeline: [
    { date: "2022–2023", event: "'Only in Ohio' TikTok format goes mainstream" },
    { date: "2024", event: "Meme escalates to 'Final Boss' tier edits and lore threads" },
    { date: "2025–2026", event: "'Ohio Final Boss' becomes shorthand for any peak internet absurdity" },
  ],
  examples: [
    "Ohio final boss just spawned at my local Walmart",
    "Defeating the Ohio final boss is this generation's Dark Souls",
    "Bro lives in Ohio — he's fighting the final boss IRL",
  ],
  relatedSlugs: ["skibidi-toilet", "chicken-jockey"],
  // Lore/format meme with no single canonical CC image — reference only.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/ohio-final-boss",
      title: "Ohio Final Boss — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/ohio-final-boss",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Only in Ohio / Final Boss lore format.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Ohio Final Boss — Know Your Meme",
      url: "https://knowyourmeme.com/memes/ohio-final-boss",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
