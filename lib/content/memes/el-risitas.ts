import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m33",
  slug: "el-risitas",
  title: "El Risitas",
  category: "meme",
  description:
    "Spanish comedian Juan Joya Borja — whose uncontrollable laugh became a global reaction clip and 'modern problems require modern solutions' meme format.",
  imageGradient: "from-yellow-500 via-amber-500 to-orange-600",
  scores: { relevance: 70, influence: 70, cringe: 22, brainrot: 48 },
  addedAt: "2026-07-17",
  historicalDate: "2007-01-01",
  views: 3900000,
  trendDirection: "stable",
  tags: ["reaction", "spain", "laugh", "youtube", "classic", "interview"],
  meaning:
    "Clips of Juan Joya Borja ('El Risitas') laughing hysterically during Spanish TV interviews are used as reaction videos. A popular subtitle format overlays English captions (often about tech or modern life) while he laughs — sometimes summarized as 'modern problems require modern solutions.'",
  origin:
    "Juan Joya Borja (1956–2021) was a Spanish comedian known for appearances with interviewer Jesús Quintero. Years later, YouTube uploads of his distinctive toothless laugh spread internationally, spawning captioned remixes across Reddit, Twitter, and meme pages.",
  timeline: [
    { date: "2000s", event: "El Risitas appears on Spanish television with Jesús Quintero" },
    { date: "2015–2017", event: "Laughing interview clips go globally viral with English subtitle remixes" },
    { date: "2010s–2020s", event: "'Modern problems' caption format becomes a lasting reaction template" },
    { date: "Apr 2021", event: "Juan Joya Borja dies — internet tributes recirculate classic clips" },
  ],
  examples: [
    "Me explaining my budget after shopping [El Risitas laugh]",
    "Modern problems require modern solutions [Risitas subtitle edit]",
    "When the bug fixes itself and you don't know why",
  ],
  relatedSlugs: ["woman-yelling-at-cat", "harlem-shake"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Risitas.jpg",
      title: "Juan Joya Borja (El Risitas) — 2015",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Risitas.jpg",
      platform: "wikimedia",
      attribution: "Alflink999 (CC BY-SA 4.0)",
      license: "CC BY-SA 4.0",
      description:
        "Portrait of Juan Joya Borja, the Spanish comedian whose laugh became the El Risitas meme.",
      date: "2015-08-06",
      verified: true,
    },
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Risitas_%28headshot%29.jpg",
      title: "El Risitas — headshot crop",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Risitas_(headshot).jpg",
      platform: "wikimedia",
      attribution: "Alflink999 (CC BY-SA 4.0); extracted from Risitas.jpg",
      license: "CC BY-SA 4.0",
      description: "Closer crop of El Risitas used widely in biographical coverage.",
      date: "2015",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/el-risitas",
      title: "El Risitas — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/el-risitas",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the viral laugh clips and subtitle remix formats.",
      date: "2015",
      verified: true,
    },
  ],
  sources: [
    {
      title: "El Risitas — Know Your Meme",
      url: "https://knowyourmeme.com/memes/el-risitas",
      domain: "knowyourmeme.com",
    },
    {
      title: "El Risitas — Wikipedia",
      url: "https://en.wikipedia.org/wiki/El_Risitas",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
