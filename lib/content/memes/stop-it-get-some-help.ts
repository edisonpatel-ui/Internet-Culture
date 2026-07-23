import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m110",
  slug: "stop-it-get-some-help",
  title: "Stop It, Get Some Help",
  category: "meme",
  description:
    "Michael Jordan's 1987 anti-drug PSA line — clipped and captioned whenever someone posts unhinged or self-destructive behavior online.",
  imageGradient: "from-purple-700 via-violet-600 to-indigo-500",
  scores: { relevance: 68, influence: 72, cringe: 45, brainrot: 50 },
  addedAt: "2026-07-23",
  historicalDate: "1987-05-26",
  views: 2700000,
  trendDirection: "stable",
  tags: ["michael-jordan", "psa", "intervention", "2010s", "reaction", "classic"],
  meaning:
    "A reaction meme using footage from Michael Jordan's May 1987 McDonald's-sponsored anti-drug PSA, in which he tells viewers: 'If you're doing it, stop it. Get some help.' Captioned or clipped when someone shares behavior that looks like a cry for intervention — toxic habits, unhinged posts, or ironic self-roasts. The tone is mock-concerned: 'bro please log off.'",
  origin:
    "The PSA aired on ABC on May 26, 1987, at the end of the anti-drug special Cracked Up. McDonald's sponsored the Get It Straight program spot starring Jordan. Decades later, an isolated clip of Jordan saying 'Stop it, get some help' spread on Vine and YouTube in the early 2010s. Know Your Meme documents viral remix use from 2014 onward as a reaction format for cringeworthy content.",
  timeline: [
    { date: "May 26, 1987", event: "Michael Jordan anti-drug PSA airs on ABC — 'Stop it, get some help'" },
    { date: "Feb 2010", event: "Earliest widely circulated YouTube upload of the full PSA" },
    { date: "2014", event: "Isolated clip used in Vine parody remixes" },
    { date: "2016", event: "Standalone 'stop it get some help' reaction clips peak on YouTube" },
    { date: "2017+", event: "Standard reply format for unhinged fandom and shitpost threads" },
  ],
  examples: [
    "Friend posts their 47th toxic ex tweet — 'Stop it. Get some help.'",
    "Quote-tweeting a cursed fan edit with the Jordan clip",
    "Commenting on someone's 3am posting spree with the PSA line",
  ],
  relatedSlugs: ["hide-the-pain-harold", "this-is-fine", "crying-jordan"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/rb8z2BMrd60/hqdefault.jpg",
      title: "Stop it, get some help — Jordan PSA thumbnail",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=rb8z2BMrd60",
      platform: "youtube",
      attribution: "McDonald's / Michael Jordan (via EightiesTV upload)",
      description: "Thumbnail from the widely clipped 1987 anti-drug PSA.",
      date: "1987",
      verified: false,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=rb8z2BMrd60",
      title: "Michael Jordan anti-drug PSA (1987)",
      source: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=rb8z2BMrd60",
      platform: "youtube",
      attribution: "McDonald's / Michael Jordan",
      description: "Original PSA source for the 'Stop it, get some help' meme clip.",
      date: "1987",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/stop-it-get-some-help",
      title: "Stop It, Get Some Help — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/stop-it-get-some-help",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Stop It, Get Some Help — Know Your Meme",
      url: "https://knowyourmeme.com/memes/stop-it-get-some-help",
      domain: "knowyourmeme.com",
    },
    {
      title: "Stop it. Get some help. — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Stop_it._Get_some_help.",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
