import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m51",
  slug: "dat-boi",
  title: "Dat Boi",
  category: "meme",
  description:
    "The 2016 green frog on a unicycle — 'here come dat boi! o shit waddup!' — peak absurdist Tumblr/Twitter meme energy.",
  imageGradient: "from-green-400 via-lime-500 to-emerald-600",
  scores: { relevance: 52, influence: 70, cringe: 35, brainrot: 72 },
  addedAt: "2026-07-18",
  historicalDate: "2016-04-03",
  views: 3200000,
  trendDirection: "declining",
  tags: ["2016", "absurd", "frog", "tumblr", "classic", "vine-era"],
  meaning:
    "A self-contained absurdist character: a low-res unicycling frog greeted with 'here come dat boi!' / 'o shit waddup.' The joke is the frog itself — no nostalgia template required — which made it a mascot of mid-2010s surreal meme culture.",
  origin:
    "The frog asset comes from Animation Factory clip art (designer Josh Doohen). Caption culture grew from Pac-Man 'here come dat boi' posts on Tumblr (2015). Facebook page Fresh Memes About the Mojave Desert paired frog + caption in April 2016; Twitter and Reddit (/r/me_irl) pushed it mainstream (Know Your Meme, Wikipedia).",
  timeline: [
    { date: "2014–15", event: "'Dat Boi' name jokes and Pac-Man caption posts circulate" },
    { date: "Apr 2016", event: "Unicycle frog + caption explode on Facebook and Twitter" },
    { date: "May–Jun 2016", event: "Mainstream coverage; brand tweets; music videos" },
    { date: "Mar 2017", event: "/r/me_irl renaissance and 'o shit waddap' frontpage stunt" },
    { date: "Sep 2017", event: "Coordinated 'Dat Boi Renaissance' on Reddit" },
  ],
  examples: [
    "Posting the frog alone with 'here come dat boi!!!!!'",
    "'o shit waddup' as a greeting reply under any arrival joke",
    "Brand accounts awkwardly tweeting the frog in 2016",
  ],
  relatedSlugs: ["pepe", "doge", "nyan-cat", "vine-shutdown"],
  relationships: {
    sameEra: ["doge", "nyan-cat", "vine-shutdown"],
    sameFormat: ["pepe"],
    community: ["pepe"],
  },
  media: [
    // AI suggested — KYM icon is the defining frog still
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/020/401/HereDatBoi.jpg",
      title: "Dat Boi — frog on a unicycle",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/dat-boi",
      platform: "knowyourmeme",
      attribution: "Animation Factory frog asset (via Know Your Meme documentation)",
      description: "The classic green frog unicycle image associated with Dat Boi.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/dat-boi",
      title: "Dat Boi — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/dat-boi",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Full origin and Reddit revival history.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Dat_Boi",
      title: "Dat Boi — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Dat_Boi",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic summary of the Animation Factory frog meme.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Dat Boi — Know Your Meme",
      url: "https://knowyourmeme.com/memes/dat-boi",
      domain: "knowyourmeme.com",
    },
    {
      title: "Dat Boi — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Dat_Boi",
      domain: "en.wikipedia.org",
    },
    {
      title: "Dat boi, explained — Vox",
      url: "https://www.vox.com/2016/5/27/11791220/dat-boi-meme",
      domain: "vox.com",
    },
  ],
};

export default entry;
