import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m11",
  slug: "pepe",
  title: "Pepe the Frog",
  category: "meme",
  description:
    "The most versatile meme character in internet history — from webcomic frog to cultural icon to political controversy to ongoing reclamation.",
  imageGradient: "from-green-500 via-emerald-500 to-teal-500",
  scores: { relevance: 88, brainrot: 60, cringe: 35 },
  addedAt: "2026-07-16",
  historicalDate: "2005-01-01",
  views: 5100000,
  trendDirection: "stable",
  tags: ["classic", "4chan", "reaction", "imageboard", "animals", "matt furie"],
  meaning:
    "A green anthropomorphic frog created by artist Matt Furie. Originally a laid-back, good-natured character, Pepe evolved into thousands of variants conveying every possible emotion. Has been both weaponized as a hate symbol (2016) and continuously reclaimed as a positive image.",
  origin:
    "Created by Matt Furie in his 2005 webcomic 'Boy's Club.' A 2008 panel showing Pepe saying 'feels good man' was shared on 4chan, launching the meme. The image spread widely by 2009 as the 'Feels Guy' format.",
  timeline: [
    { date: "2005", event: "Matt Furie creates Pepe in the 'Boy's Club' webcomic" },
    { date: "2008", event: "'Feels Good Man' panel shared on 4chan — meme begins spreading" },
    {
      date: "2016",
      event:
        "Added to the Anti-Defamation League database of hate symbols following political appropriation",
    },
    {
      date: "2017",
      event: "Matt Furie kills Pepe in a comic strip in an attempt to reclaim the character",
    },
    {
      date: "2020",
      event: "'Feels Good Man' documentary released, chronicling Matt Furie's fight to reclaim Pepe",
    },
  ],
  examples: [
    "Feels good man [Pepe smiling]",
    "Feels bad man [Pepe crying]",
    "Sad Pepe / Happy Pepe — universally understood emotional shorthand",
  ],
  relatedSlugs: ["wojak", "trollface"],
  sources: [
    {
      title: "Pepe the Frog — Know Your Meme",
      url: "https://knowyourmeme.com/memes/pepe-the-frog",
      domain: "knowyourmeme.com",
    },
    {
      title: "Feels Good Man (2020 documentary) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Feels_Good_Man",
      domain: "en.wikipedia.org",
    },
    {
      title: "Pepe the Frog — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Pepe_the_Frog",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
