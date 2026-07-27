import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s3",
  slug: "fanum-tax",
  title: "Fanum Tax",
  category: "slang",
  description:
    "Streamer slang for playfully taking a bite of someone else's food — named after AMP member Fanum and popularized alongside Kai Cenat's circle.",
  imageGradient: "from-yellow-400 via-amber-400 to-orange-400",
  scores: { relevance: 76, influence: 76, cringe: 52, brainrot: 58 },
  addedAt: "2026-07-02",
  views: 340000,
  trendDirection: "stable",
  tags: ["amp", "twitch", "streamer slang", "gen alpha", "fanum", "kai cenat"],
  definition:
    "Fanum tax means taking a bite or share of someone else's food (often without asking), framed as a joke 'tax' friends owe you for hanging out. People announce 'Fanum tax' before snatching fries or a slice. Named after Twitch/YouTube streamer Fanum (AMP), whose on-stream habit of taxing friends' meals became a clip and TikTok meme.",
  origin:
    "Fanum, a member of the AMP (Any Means Possible) creator collective with Kai Cenat and Duke Dennis, repeatedly took food from friends on stream and called it a tax. Compilations and TikTok spread the phrase into everyday friend-group humor alongside other AMP-era slang like rizz and gyatt.",
  usageExamples: [
    "Fanum tax incoming — hand over the fries",
    "You can't eat around me without paying the Fanum tax",
    "That's a 50% Fanum tax on that pizza slice",
  ],
  relatedSlugs: ["kai-cenat", "amp", "rizz", "gyatt", "duke-dennis", "glazing"],
  relationships: {
    popularizedBy: ["amp", "kai-cenat"],
    relatedSlang: ["rizz", "gyatt", "glazing"],
    community: ["duke-dennis"],
  },
  sources: [
    {
      title: "AMP (streamer collective) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/AMP_(streamer_collective)",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
