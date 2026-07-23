import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m101",
  slug: "baby-shark",
  title: "Baby Shark",
  category: "meme",
  description:
    "Pinkfong's earworm kids' song and dance that became one of YouTube's most-watched videos and a global parent nightmare.",
  imageGradient: "from-cyan-400 via-sky-400 to-blue-500",
  scores: { relevance: 70, influence: 85, cringe: 72, brainrot: 68 },
  addedAt: "2026-07-23",
  historicalDate: "2016-06-17",
  views: 14000000000,
  trendDirection: "stable",
  tags: ["pinkfong", "youtube", "kids", "2016", "viral", "earworm"],
  meaning:
    "More than a song — Baby Shark is cultural shorthand for inescapable children's content, algorithm-driven virality, and the moment kid media broke out of nurseries into mainstream memes. Adults ironically (or painfully) reference the 'doo doo doo' chorus, the hand motions, and the sheer scale of its YouTube dominance.",
  origin:
    "South Korean education brand Pinkfong released 'Baby Shark' on YouTube on June 17, 2016. The catchy repetitive lyrics and simple dance moves made it a staple for toddlers; a 2016 viral dance video and relentless YouTube recommendations pushed it global. By 2020 it became one of the most-viewed YouTube videos of all time. Know Your Meme and Billboard document its spread from kids' content to meme status among adults.",
  timeline: [
    { date: "Jun 2016", event: "Pinkfong uploads 'Baby Shark' music video to YouTube" },
    { date: "2017–2018", event: "Dance challenge and kindergarten ubiquity; spreads to Southeast Asia and US" },
    { date: "Nov 2020", event: "Video surpasses 7 billion YouTube views — among platform's most-watched" },
    { date: "2021–2022", event: "Adult ironic memes, remixes, and 'brain rot for toddlers' commentary" },
    { date: "2023+", event: "Remains a benchmark for kid-content virality and earworm memes" },
  ],
  examples: [
    "Parents hearing 'Baby Shark' for the 400th time today",
    "Office meme: 'Let's do Baby Shark' as torture humor",
    "Ranking songs by brainworm level — Baby Shark at the top",
  ],
  relatedSlugs: ["gangnam-style", "nyan-cat", "hamster-dance"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/XqZsoesa55w/hqdefault.jpg",
      title: "Baby Shark Dance — Pinkfong official video thumbnail",
      source: "YouTube / Pinkfong",
      sourceUrl: "https://www.youtube.com/watch?v=XqZsoesa55w",
      platform: "youtube",
      attribution: "Pinkfong Company",
      description: "Thumbnail from Pinkfong's official Baby Shark Dance upload.",
      date: "2016",
      verified: false,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=XqZsoesa55w",
      title: "Baby Shark Dance — Pinkfong",
      source: "YouTube / Pinkfong",
      sourceUrl: "https://www.youtube.com/watch?v=XqZsoesa55w",
      platform: "youtube",
      attribution: "Pinkfong Company",
      description: "The original viral Baby Shark music video.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/baby-shark",
      title: "Baby Shark — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/baby-shark",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Baby Shark — Know Your Meme",
      url: "https://knowyourmeme.com/memes/baby-shark",
      domain: "knowyourmeme.com",
    },
    {
      title: "Baby Shark — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Baby_Shark",
      domain: "en.wikipedia.org",
    },
    {
      title: "How 'Baby Shark' became a global phenomenon — BBC",
      url: "https://www.bbc.com/news/world-asia-45881058",
      domain: "bbc.com",
    },
  ],
};

export default entry;
