import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m23",
  slug: "woman-yelling-at-cat",
  title: "Woman Yelling at Cat",
  category: "meme",
  description:
    "A two-panel meme pairing a screaming Real Housewives cast member with an unimpressed white cat at a dinner table — one of the most versatile reaction formats of the late 2010s.",
  imageGradient: "from-yellow-400 via-orange-400 to-red-400",
  scores: { relevance: 82, brainrot: 42, cringe: 20 },
  addedAt: "2026-07-17",
  historicalDate: "2019-10-01",
  views: 4200000,
  trendDirection: "stable",
  tags: ["reaction", "two-panel", "rhobh", "cat", "twitter"],
  meaning:
    "An image macro template where the left panel depicts intense female emotion (screaming, crying, pointing) and the right panel shows a white cat at a dinner table — calm, indifferent, and mildly offended. The two panels are placed in contrast to represent two opposing sides of an argument, with the cat almost always representing the calm, logical (or unbothered) party.",
  origin:
    "The left panel originates from a 2011 episode of The Real Housewives of Beverly Hills (Season 2) featuring Taylor Armstrong in an emotional confrontation. The cat — named Smudge — appeared in a 2018 Tumblr post by user @tunameltsmyheart showing him sitting at a dinner table in front of a salad. A Twitter user combined them in a side-by-side post in October 2019, and the format exploded on social media.",
  timeline: [
    { date: "2011", event: "Taylor Armstrong's emotional confrontation filmed during RHOBH Season 2" },
    { date: "May 2018", event: "Smudge the cat's dinner table photo posted to Tumblr by @tunameltsmyheart" },
    { date: "Oct 2019", event: "Two panels combined on Twitter — format goes viral" },
    { date: "2019–2020", event: "Becomes one of the dominant reaction image templates across all platforms" },
    { date: "2020+", event: "Continues in use as a durable argument/contrast reaction format" },
  ],
  examples: [
    "Left: [Person who thinks your plan is perfect] Right: [Smudge, unconvinced by the plan]",
    "Me explaining why I need another coffee vs. My anxiety saying no",
    "Twitter user screaming about a game result / Smudge sitting at the table: 'it's just a game'",
  ],
  relatedSlugs: ["gigachad", "chill-guy"],
  // IMAGE-FIRST meme — Wikipedia fair-use composite (same pattern as Doge).
  // A solo cast headshot is NOT representative; only the two-panel template is.
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/1/1f/WomanYellingAtACat_meme.jpg",
      title: "Woman Yelling at a Cat — original two-panel template",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:WomanYellingAtACat_meme.jpg",
      platform: "wikimedia",
      attribution: "RHOBH / Smudge the Cat (fair use for identification)",
      license: "Fair use",
      description:
        "The defining two-panel meme composite — Taylor Armstrong yelling (left) and Smudge the cat at a dinner table (right).",
      date: "2019",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/woman-yelling-at-cat",
      title: "Woman Yelling at Cat — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/woman-yelling-at-cat",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Comprehensive documentation of the two-panel meme format, including the origins of both image sources and the timeline of its spread.",
      date: "2019",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Woman Yelling at Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/woman-yelling-at-cat",
      domain: "knowyourmeme.com",
    },
    {
      title: "Woman Yelling at Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Woman_Yelling_at_Cat",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
