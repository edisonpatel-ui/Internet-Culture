import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e21",
  slug: "yanny-vs-laurel",
  title: "Yanny vs Laurel",
  category: "event",
  description:
    "The May 2018 audio clip that split the internet — half heard 'Yanny,' half heard 'Laurel' — a viral perceptual illusion.",
  imageGradient: "from-blue-400 via-indigo-500 to-violet-600",
  scores: { relevance: 45, influence: 70, cringe: 20, brainrot: 40 },
  addedAt: "2026-07-18",
  historicalDate: "2018-05-11",
  views: 4000000,
  trendDirection: "declining",
  tags: ["2018", "audio", "illusion", "viral", "twitter", "debate"],
  platform: "Instagram, Reddit, Twitter, YouTube",
  impact:
    "Turned a low-quality pronunciation clip into a global argument overnight. Celebrity polls, White House jokes, and science explainers followed — a textbook 'dress color' moment for sound, proving ambiguous media could dominate feeds as shared identity tests.",
  highlights: [
    "May 11, 2018: High-school student Katie Hetzel posts the ambiguous clip on Instagram",
    "May 12: Reddit + influencer Twitter posts push it mainstream",
    "Twitter polls (~500k+ votes) roughly split Yanny vs Laurel listeners",
    "Scientists and outlets explain frequency perception; pitch tools let people hear both",
  ],
  relatedSlugs: ["distracted-boyfriend", "most-liked-egg", "change-my-mind"],
  relationships: {
    sameEra: ["distracted-boyfriend", "most-liked-egg"],
    sameFormat: ["change-my-mind"],
  },
  media: [
    // AI suggested — KYM cover screenshot of the viral audio debate
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/026/191/Screen_Shot_2018-05-15_at_4.35.53_PM.png",
      title: "Yanny vs Laurel — viral debate cover",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/yanny-or-laurel",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Cover imagery from the Yanny or Laurel auditory-illusion event.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/yanny-or-laurel",
      title: "Yanny or Laurel — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/yanny-or-laurel",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Spread timeline of the audio illusion meme event.",
      date: "2018",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Yanny_or_Laurel",
      title: "Yanny or Laurel — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Yanny_or_Laurel",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Scientific and cultural summary of the auditory illusion.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Yanny or Laurel — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Yanny_or_Laurel",
      domain: "en.wikipedia.org",
    },
    {
      title: "Yanny or Laurel — Know Your Meme",
      url: "https://knowyourmeme.com/memes/yanny-or-laurel",
      domain: "knowyourmeme.com",
    },
    {
      title: "Yanny or Laurel? How a Sound Clip Divided America — The New York Times",
      url: "https://www.nytimes.com/interactive/2018/05/16/upshot/audio-clip-yanny-laurel-debate.html",
      domain: "nytimes.com",
    },
  ],
};

export default entry;
