import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e8",
  slug: "ice-bucket-challenge",
  title: "Ice Bucket Challenge",
  category: "event",
  description:
    "The viral charity campaign that swept the internet in summer 2014 — dump ice water, challenge three friends, raise awareness and money for ALS.",
  imageGradient: "from-sky-400 via-blue-500 to-indigo-600",
  scores: { relevance: 79, influence: 90, cringe: 15, brainrot: 28 },
  addedAt: "2026-07-16",
  historicalDate: "2014-08-01",
  views: 3200000,
  trendDirection: "declining",
  platform: "Facebook, YouTube, Twitter",
  impact:
    "One of the first viral internet campaigns to prove that social media virality and charitable giving could combine at global scale. The challenge raised over $115 million for ALS research in a matter of weeks and directly funded the discovery of a gene variant linked to the disease.",
  highlights: [
    "Started in summer 2014 through ALS patient communities, with Pat Quinn and Pete Frates — both living with ALS — playing key roles in spreading the challenge",
    "Participants filmed themselves dumping ice water over their heads and challenged three others to do the same within 24 hours or donate to ALS research",
    "Celebrities including Bill Gates, Mark Zuckerberg, and Tim Cook participated",
    "Raised over $115 million for the ALS Association in weeks — a record for the organization",
    "In 2016, researchers announced the discovery of the NEK1 gene variant linked to ALS — funded in part by Ice Bucket Challenge donations",
  ],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // Wikimedia Commons — CC BY 2.0 photo by Anthony Quintano from Flickr.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Mission_Accomplished_-_ALS_Ice_Bucket_Challenge_(14848289439).jpg",
      title: "ALS Ice Bucket Challenge — 'Mission Accomplished' (August 2014)",
      source: "Wikimedia Commons / Anthony Quintano",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Mission_Accomplished_-_ALS_Ice_Bucket_Challenge_(14848289439).jpg",
      platform: "wikimedia",
      attribution: "Anthony Quintano (CC BY 2.0)",
      license: "CC BY 2.0",
      description: "A participant completing the ALS Ice Bucket Challenge in August 2014 — the viral campaign that raised over $115 million for ALS research.",
      date: "2014-08",
      verified: true,
    },
    // AI suggested — human must verify URL and set verified: true
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Doing_the_ALS_Ice_Bucket_Challenge_%2814927191426%29.jpg",
      title: "Participant doing the ALS Ice Bucket Challenge (2014)",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Doing_the_ALS_Ice_Bucket_Challenge_(14927191426).jpg",
      platform: "wikimedia",
      attribution: "See Commons file page (CC BY 2.0)",
      license: "CC BY 2.0",
      description:
        "Additional 2014 Ice Bucket Challenge still — the dunk format that defined the campaign.",
      date: "2014-08",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Ice_Bucket_Challenge",
      title: "Ice Bucket Challenge — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Ice_Bucket_Challenge",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "History, fundraising totals, and scientific follow-on of the challenge.",
      date: "2014",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/ice-bucket-challenge",
      title: "Ice Bucket Challenge — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/ice-bucket-challenge",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Viral spread and meme framing of the Ice Bucket Challenge.",
      date: "2014",
      verified: false,
    },
  ],
  relatedSlugs: ["short-form-takeover", "vine-shutdown"],
  tags: ["charity", "viral", "als", "2014", "challenge", "facebook", "celebrity", "fundraising"],
  sources: [
    {
      title: "Ice Bucket Challenge — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Ice_Bucket_Challenge",
      domain: "en.wikipedia.org",
    },
    {
      title: "Ice Bucket Challenge — Know Your Meme",
      url: "https://knowyourmeme.com/memes/ice-bucket-challenge",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
