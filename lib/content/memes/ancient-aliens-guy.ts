import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m100",
  slug: "ancient-aliens-guy",
  title: "Ancient Aliens Guy",
  category: "meme",
  description:
    "Giorgio A. Tsoukalos from History Channel's Ancient Aliens — the wild-haired presenter whose gesture means 'aliens did it.'",
  imageGradient: "from-amber-600 via-yellow-500 to-orange-400",
  scores: { relevance: 75, influence: 80, cringe: 35, brainrot: 38 },
  addedAt: "2026-07-23",
  historicalDate: "2010-04-20",
  views: 4500000,
  trendDirection: "stable",
  tags: ["ancient-aliens", "reaction", "history-channel", "2010s", "conspiracy", "classic"],
  meaning:
    "A reaction image and caption format attributing any unexplained phenomenon to ancient astronauts. The still of Giorgio Tsoukalos gesturing with spiked hair is pasted over history, science, or everyday mysteries with text like 'Aliens.' It mocks (and celebrates) the leap from evidence to extraterrestrial explanation.",
  origin:
    "Giorgio A. Tsoukalos is a Swiss-born television presenter and ancient-astronaut proponent who became the face of Ancient Aliens on the History Channel; the series premiered in April 2010. Meme use of his expressive gestures and hair spread on Reddit, Tumblr, and Imgur in the early 2010s as the show gained a cult following. Know Your Meme documents the 'Ancient Aliens' meme format as one of the decade's durable reaction templates.",
  timeline: [
    { date: "Apr 2010", event: "Ancient Aliens premieres on History Channel" },
    { date: "2011–2013", event: "Tsoukalos reaction images spread on Reddit and Tumblr" },
    { date: "2013", event: "Meme Generator and quick-caption formats popularize 'Aliens' overlay" },
    { date: "2015+", event: "Becomes a mainstream shorthand for absurd causal leaps" },
    { date: "2020s", event: "Still used whenever someone over-explains with conspiracy energy" },
  ],
  examples: [
    "Pyramids exist → [Ancient Aliens Guy] Aliens.",
    "I lost my keys — must be ancient astronauts",
    "Captioning any historical mystery with Tsoukalos and 'Aliens'",
  ],
  relatedSlugs: ["philosoraptor", "expanding-brain", "is-this-a-pigeon"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Giorgio_Tsoukalos_%28crop%29.jpg",
      title: "Giorgio A. Tsoukalos — Ancient Aliens presenter",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Giorgio_Tsoukalos_(crop).jpg",
      platform: "wikimedia",
      attribution: "Gage Skidmore / CC BY-SA 3.0",
      license: "CC BY-SA 3.0",
      description:
        "Portrait of Giorgio Tsoukalos, whose Ancient Aliens appearances define the meme.",
      date: "2010",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/ancient-aliens",
      title: "Ancient Aliens — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/ancient-aliens",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Ancient Aliens meme format and spread.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Ancient Aliens — Know Your Meme",
      url: "https://knowyourmeme.com/memes/ancient-aliens",
      domain: "knowyourmeme.com",
    },
    {
      title: "Ancient Aliens — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ancient_Aliens",
      domain: "en.wikipedia.org",
    },
    {
      title: "Giorgio A. Tsoukalos — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Giorgio_A._Tsoukalos",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
