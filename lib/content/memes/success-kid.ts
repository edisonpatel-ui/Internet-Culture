import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m31",
  slug: "success-kid",
  title: "Success Kid",
  category: "meme",
  description:
    "The fist-pumping baby photo that became the internet's universal emoji for small victories and personal wins.",
  imageGradient: "from-amber-400 via-orange-400 to-red-400",
  scores: { relevance: 74, brainrot: 28, cringe: 18 },
  addedAt: "2026-07-17",
  historicalDate: "2007-08-26",
  views: 5100000,
  trendDirection: "stable",
  tags: ["advice-animal", "classic", "baby", "success", "2007", "2011"],
  meaning:
    "A photo of a toddler clenching a fistful of sand with a determined expression, captioned to celebrate minor triumphs — getting a parking spot, finishing a task, or any small personal win.",
  origin:
    "Photographed in 2007 by Laney Griner of her son Sammy on a Florida beach and uploaded to Flickr. Early captions framed the image as aggressive ('I Hate Sandcastles'); around 2011 the tone flipped to celebratory 'Success Kid,' which the Griner family embraced. The image later appeared in advertising and a family fundraising campaign.",
  timeline: [
    { date: "Aug 2007", event: "Laney Griner photographs Sammy Griner on a Florida beach" },
    { date: "2011", event: "'I Hate Sandcastles' / Success Kid formats spread online" },
    { date: "2010s", event: "Widely licensed for ads; becomes a mainstream success reaction image" },
    { date: "2015", event: "Family uses Success Kid imagery in a GoFundMe for Sammy's father's kidney transplant" },
  ],
  examples: [
    "Finally submitted the assignment on time [Success Kid]",
    "Coffee was free today — Success Kid energy",
    "Matched socks on the first try",
  ],
  relatedSlugs: ["bad-luck-brian", "philosoraptor"],
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/f/ff/SuccessKid.jpg",
      title: "Success Kid — original Sammy Griner photo (2007)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:SuccessKid.jpg",
      platform: "wikimedia",
      attribution: "Laney Griner (fair use for identification)",
      license: "Fair use",
      description:
        "The original Success Kid photograph — Sammy Griner with a fistful of sand and a determined expression.",
      date: "2007-08-26",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/success-kid-i-hate-sandcastles",
      title: "Success Kid / I Hate Sandcastles — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/success-kid-i-hate-sandcastles",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Success Kid photo and its caption formats.",
      date: "2007",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Success Kid — Know Your Meme",
      url: "https://knowyourmeme.com/memes/success-kid-i-hate-sandcastles",
      domain: "knowyourmeme.com",
    },
    {
      title: "Success Kid — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Success_Kid",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
