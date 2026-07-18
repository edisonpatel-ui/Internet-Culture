import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m55",
  slug: "handsome-squidward",
  title: "Handsome Squidward",
  category: "meme",
  description:
    "Squidward's unnaturally handsome redesign from SpongeBob — and the dramatic fall that resets his face — remixed for years on YouTube.",
  imageGradient: "from-teal-400 via-cyan-500 to-blue-600",
  scores: { relevance: 66, influence: 64, cringe: 25, brainrot: 48 },
  addedAt: "2026-07-18",
  historicalDate: "2007-11-23",
  views: 2700000,
  trendDirection: "stable",
  tags: ["spongebob", "reaction", "youtube", "cartoon", "classic", "remix"],
  meaning:
    "Handsome Squidward is the glamorous Squidward redesign from 'The Two Faces of Squidward,' used as a beauty/glow-up punchline. Closely tied: the fall clip where he faceplants a pole and returns to normal — a remix staple set to dramatic songs.",
  origin:
    "Episode 'The Two Faces of Squidward' aired November 23, 2007. Fan remixes of Handsome Squidward (especially the fall) appeared on YouTube in the early 2010s and kept circulating as green-screen / soundtrack edits (Know Your Meme).",
  timeline: [
    { date: "Nov 2007", event: "'The Two Faces of Squidward' airs on Nickelodeon" },
    { date: "2011+", event: "YouTube remixes of the fall scene gain hundreds of thousands of views" },
    { date: "2010s–20s", event: "Handsome Squidward used as glow-up / before-after meme template" },
  ],
  examples: [
    "Before/after: regular Squidward → Handsome Squidward as a glow-up joke",
    "Fall clip remixed to 'My Heart Will Go On' or other dramatic tracks",
    "Calling someone 'Handsome Squidward coded' after a haircut",
  ],
  relatedSlugs: ["is-this-a-pigeon", "glow-up", "loss"],
  relationships: {
    sameFormat: ["is-this-a-pigeon"],
    relatedSlang: ["glow-up"],
    relatedTo: ["loss"],
  },
  media: [
    // AI suggested — KYM cover for Handsome Squidward / falling
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/003/047/Screen_Shot_2020-12-30_at_4.14.12_PM.png",
      title: "Handsome Squidward — defining still",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/handsome-squidward-squidward-falling",
      platform: "knowyourmeme",
      attribution: "SpongeBob SquarePants still (via Know Your Meme documentation)",
      description: "Representative Handsome Squidward image from the viral meme entry.",
      date: "2007",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/handsome-squidward-squidward-falling",
      title: "Handsome Squidward / Squidward Falling — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/handsome-squidward-squidward-falling",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Episode origin and YouTube remix history.",
      date: "2007",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Handsome Squidward / Squidward Falling — Know Your Meme",
      url: "https://knowyourmeme.com/memes/handsome-squidward-squidward-falling",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
