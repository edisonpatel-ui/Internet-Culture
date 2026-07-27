import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s68",
  slug: "hits-different",
  title: "Hits Different",
  category: "slang",
  description:
    "When something lands harder than usual — a song, meme, or meal that hits on another emotional level.",
  imageGradient: "from-violet-500 via-purple-500 to-fuchsia-500",
  scores: { relevance: 78, influence: 65, cringe: 20, brainrot: 15 },
  addedAt: "2026-07-23",
  views: 1050000,
  trendDirection: "stable",
  tags: ["tiktok", "music", "memes", "gen z", "2020s"],
  definition:
    "'Hits different' means something affects you more deeply or oddly than expected — usually positive but context-dependent. A breakup song 'hits different' at 2 a.m. Rainy-day coffee hits different. The phrase captures situational mood shifts rather than objective quality.",
  origin:
    "The construction spread through music Twitter and TikTok caption culture in the late 2010s as users described songs that feel more emotional in specific contexts (night drives, post-breakup, nostalgia). It became a template meme ('X hits different when Y').",
  usageExamples: [
    "This song hits different after the third listen.",
    "McDonald's hits different at midnight — do not ask why.",
    "Nostalgia edits hit different when you are the old person now.",
  ],
  relatedSlugs: ["its-giving", "main-character-energy", "fomo", "iconic"],
  sources: [
    {
      title: "Hits different — Urban Dictionary",
      url: "https://www.urbandictionary.com/define.php?term=hits%20different",
      domain: "urbandictionary.com",
    },
  ],
};

export default entry;
