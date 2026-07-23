import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e32",
  slug: "crypto-collapse-scandals",
  title: "Crypto Collapse & Scandals",
  category: "event",
  description:
    "The 2022–2023 cascade of crypto bankruptcies and fraud cases — FTX, Terra/Luna, Celsius — that turned \"Web3\" hype into cautionary memes and congressional hearings.",
  imageGradient: "from-emerald-700 via-teal-600 to-slate-800",
  scores: { relevance: 70, influence: 85, cringe: 55, brainrot: 35 },
  addedAt: "2026-07-23",
  historicalDate: "2022-05-01",
  views: 2100000,
  trendDirection: "stable",
  tags: ["crypto", "ftx", "2022", "finance", "scandal"],
  platform: "Twitter, Reddit, YouTube, Discord",
  impact:
    "After years of influencer-promoted coins and \"not financial advice\" threads, Terra's May 2022 collapse wiped billions and shook stablecoin faith. Celsius, Voyager, and BlockFi froze withdrawals; FTX imploded in November 2022 with Sam Bankman-Fried facing fraud charges. Reddit and Twitter filled with loss screenshots, \"trust me bro\" jokes, and congressional hearing clips. The era rewired how mainstream audiences saw crypto marketing — especially celebrity endorsements and NFT tie-ins.",
  highlights: [
    "May 2022: TerraUSD and Luna collapse erased tens of billions in market value",
    "Summer 2022: Celsius, Voyager, and other platforms halted withdrawals",
    "November 2022: FTX filed for bankruptcy; Sam Bankman-Fried was later convicted of fraud",
    "Spawned congressional hearings, meme discourse, and skepticism toward influencer crypto promos",
  ],
  relatedSlugs: ["gamestop-wallstreetbets", "nft-boom-bored-ape", "reddit-culture", "influencer-culture"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Bankruptcy_of_FTX",
      title: "Bankruptcy of FTX — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Bankruptcy_of_FTX",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Bankruptcy of FTX — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Bankruptcy_of_FTX",
      domain: "en.wikipedia.org",
    },
    {
      title: "Terra (LUNA) crash — BBC News",
      url: "https://www.bbc.com/news/technology-61475055",
      domain: "bbc.com",
    },
  ],
};

export default entry;
