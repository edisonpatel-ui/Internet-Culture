import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m14",
  slug: "keyboard-cat",
  title: "Keyboard Cat",
  category: "meme",
  description:
    "A cat in a blue shirt playing keyboard — used to 'play off' blunders, falls, and awkward moments.",
  imageGradient: "from-sky-500 via-blue-600 to-indigo-600",
  scores: { relevance: 72, influence: 78, cringe: 22, brainrot: 48 },
  addedAt: "2026-07-16",
  historicalDate: "2009-05-10",
  views: 2200000,
  trendDirection: "declining",
  tags: ["classic", "youtube", "cat", "animals", "music", "reaction"],
  meaning:
    "A video of a cat named Fatso wearing a blue shirt, appearing to play an upbeat keyboard melody. Used in the 'Play him off, Keyboard Cat' format — inserted after someone falls, fails, or does something embarrassing, as a comic dismissal.",
  origin:
    "The original footage of Fatso was filmed by Charlie Schmidt in 1984 and uploaded to YouTube in June 2007. In May 2009, YouTuber Brad O'Farrell popularized the 'Play him off, Keyboard Cat' format by editing the clip after fails.",
  timeline: [
    { date: "1984", event: "Charlie Schmidt films his cat Fatso playing keyboard at home" },
    { date: "Jun 2007", event: "Schmidt uploads the footage to YouTube" },
    {
      date: "May 2009",
      event: "Brad O'Farrell creates the 'Play him off, Keyboard Cat' format — goes viral",
    },
    {
      date: "2009–2010",
      event: "Keyboard Cat becomes one of the defining memes of early YouTube culture",
    },
  ],
  examples: [
    "PLAY HIM OFF, KEYBOARD CAT [after an embarrassing speech]",
    "Keyboard cat closes out the failed project presentation",
    "Any cringeworthy moment deserves a keyboard cat exit",
  ],
  relatedSlugs: ["nyan-cat", "rickroll"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/J---aiyznGQ/hqdefault.jpg",
      title: "Keyboard Cat (Fatso) — original YouTube video thumbnail",
      source: "YouTube / Charlie Schmidt",
      sourceUrl: "https://www.youtube.com/watch?v=J---aiyznGQ",
      platform: "youtube",
      attribution: "Charlie Schmidt (original footage, 1984)",
      license: "YouTube Standard License",
      description: "Fatso the cat in a blue shirt at the keyboard — filmed by Charlie Schmidt in 1984, the basis for the 'Play him off, Keyboard Cat' format.",
      date: "1984",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=J---aiyznGQ",
      title: "Keyboard Cat — Play him off, Keyboard Cat",
      source: "YouTube / Charlie Schmidt",
      sourceUrl: "https://www.youtube.com/watch?v=J---aiyznGQ",
      platform: "youtube",
      attribution: "Charlie Schmidt (original footage, 1984)",
      license: "YouTube Standard License",
      description: "Fatso the cat wearing a blue shirt, filmed in 1984 and uploaded by Charlie Schmidt. The format 'Play him off, Keyboard Cat' made this one of early YouTube's defining memes.",
      date: "2007-06-07",
      tags: ["original", "viral"],
      verified: true,
    },
  ],
  sources: [
    {
      title: "Keyboard Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/keyboard-cat",
      domain: "knowyourmeme.com",
    },
    {
      title: "Keyboard Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Keyboard_Cat",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
