import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s64",
  slug: "girl-boss",
  title: "Girl Boss",
  category: "slang",
  description:
    "A woman celebrated for career hustle — later ironized as hollow corporate feminism and 'gaslight, gatekeep, girlboss.'",
  imageGradient: "from-pink-500 via-rose-400 to-fuchsia-500",
  scores: { relevance: 75, influence: 78, cringe: 70, brainrot: 15 },
  addedAt: "2026-07-23",
  historicalDate: "2014-01-01",
  views: 1600000,
  trendDirection: "declining",
  tags: ["feminism", "corporate", "instagram", "2010s", "irony"],
  definition:
    "Girl boss (or #GirlBoss) originally meant a woman building her own business or career on her terms — aspirational, pink-branded, hustle-culture feminism. By the late 2010s it became a punchline for performative empowerment (Scamanda, Theranos discourse, 'gaslight, gatekeep, girlboss' memes). Used sincerely it is a compliment; used ironically it mocks empty slogans over structural change.",
  origin:
    "Sophia Amoruso's 2014 book and hashtag #GirlBoss popularized the term through Nasty Gal and a wave of millennial 'she CEO' Instagram culture. The phrase peaked mid-2010s, then collapsed into meme irony after high-profile female-led startup scandals and broader backlash to 'feminism that looks like a LinkedIn post.'",
  usageExamples: [
    "She left corporate to start her own studio — total girl boss move.",
    "That motivational poster is peak 2016 girl boss energy.",
    "Gaslight, gatekeep, girlboss — the meme wrote itself.",
  ],
  relatedSlugs: ["girl-math", "main-character-energy", "performative", "sigma"],
  sources: [
    {
      title: "Girlboss — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Girlboss",
      domain: "en.wikipedia.org",
    },
    {
      title: "Girl Boss — Know Your Meme",
      url: "https://knowyourmeme.com/memes/girlboss",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
