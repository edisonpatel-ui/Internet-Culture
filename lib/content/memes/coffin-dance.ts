import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m44",
  slug: "coffin-dance",
  title: "Coffin Dance",
  category: "meme",
  description:
    "Ghanaian pallbearers dancing with a coffin — the 2020 viral clip used as a humorous 'you're done' reaction.",
  imageGradient: "from-purple-800 via-violet-600 to-fuchsia-500",
  scores: { relevance: 72, influence: 72, cringe: 25, brainrot: 48 },
  addedAt: "2026-07-18",
  historicalDate: "2020-03-01",
  views: 6000000,
  trendDirection: "declining",
  tags: ["2020", "tiktok", "reaction", "covid-era", "ghana", "video"],
  meaning:
    "A video meme of dancers carrying a coffin in choreographed celebration. Online, it marks that someone, something, or a take is 'dead' — used after fails, roast moments, or ironic obituaries for trends.",
  origin:
    "Footage of Ghanaian dancing pallbearers (associated with groups like the Dadaawu Funeral Dancers) went massively viral in early 2020, often remixed with electronic tracks (notably Astronomia). It became one of the defining reaction videos of the early pandemic meme wave.",
  timeline: [
    { date: "Early 2020", event: "Pallbearer dance clips spread on Twitter/TikTok" },
    { date: "2020", event: "Paired with Astronomia and endless fail compilations" },
    { date: "2021+", event: "Usage declines but remains a recognizable 'you're dead' shorthand" },
  ],
  examples: [
    "Fail clip → cut to coffin dance",
    "Caption: 'my weekend plans after seeing the weather' + coffin dance",
  ],
  relatedSlugs: ["this-is-fine", "great-meme-reset", "rickroll", "harlem-shake"],
  relationships: {
    sameEra: ["great-meme-reset", "among-us-era"],
    relatedEvent: ["great-meme-reset"],
  },
  media: [
    // AI suggested — KYM coffin dance entry icon; human must verify
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/033/381/dancing_coffin.jpg",
      title: "Coffin Dance — dancing pallbearers",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/coffin-dance-dancing-pallbearers",
      platform: "knowyourmeme",
      attribution: "Viral pallbearer footage via Know Your Meme documentation",
      description: "Defining still of the dancing coffin / pallbearers meme.",
      date: "2020",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/coffin-dance-dancing-pallbearers",
      title: "Coffin Dance / Dancing Pallbearers — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl:
        "https://knowyourmeme.com/memes/coffin-dance-dancing-pallbearers",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "History of the coffin dance viral format.",
      date: "2020",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Coffin Dance / Dancing Pallbearers — Know Your Meme",
      url: "https://knowyourmeme.com/memes/coffin-dance-dancing-pallbearers",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
