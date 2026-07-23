import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m126",
  slug: "stonks",
  title: "Stonks",
  category: "meme",
  description:
    "Meme Man in front of a rising stock chart with the misspelled caption STONKS — the ironic finance bro reaction for gains that make no sense.",
  imageGradient: "from-orange-500 via-amber-400 to-yellow-300",
  scores: { relevance: 75, influence: 70, cringe: 35, brainrot: 52 },
  addedAt: "2026-07-23",
  historicalDate: "2017-06-01",
  views: 4100000,
  trendDirection: "stable",
  tags: ["meme-man", "finance", "wallstreetbets", "2017", "irony", "template"],
  meaning:
    "An image macro pairing the 3D-rendered Meme Man head with a stock market graphic and the word 'STONKS' (a deliberate misspelling of 'stocks'). Signals ironic celebration of financial decisions that are obviously bad — or unexpectedly good. The joke is confident ignorance dressed up as Wall Street wisdom.",
  origin:
    "Know Your Meme traces the earliest Stonks post to a Facebook group in June 2017. Meme Man — the surreal 3D head — was already an established character; adding a rising chart and misspelled caption created a durable finance meme. The format exploded again in 2021 when Reddit's r/wallstreetbets GameStop frenzy brought 'stonks' language into mainstream news.",
  timeline: [
    { date: "Jun 2017", event: "Earliest documented Stonks macro on Facebook" },
    { date: "2018–2019", event: "Spreads on Reddit alongside Not Stonks reverse variants" },
    { date: "Jan 2021", event: "GameStop / WSB mania revives Stonks at mainstream scale" },
    { date: "2021+", event: "'Not Stonks' and derivative charts remain common" },
  ],
  examples: [
    "Stonks meme after buying the top of a crypto pump",
    "Not Stonks when a portfolio drops after overconfidence",
    "WSB thread screenshot + Stonks for a YOLO trade",
  ],
  relatedSlugs: ["expanding-brain", "surprised-pikachu", "this-is-fine", "doge"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/stonks",
      title: "Stonks — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/stonks",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Meme Man finance macro origin and WSB revival.",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/meme-man",
      title: "Meme Man — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/meme-man",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Character behind the Stonks template.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Stonks — Know Your Meme",
      url: "https://knowyourmeme.com/memes/stonks",
      domain: "knowyourmeme.com",
    },
    {
      title: "Meme Man — Know Your Meme",
      url: "https://knowyourmeme.com/memes/meme-man",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
