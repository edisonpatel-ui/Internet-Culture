import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e8",
  slug: "ice-bucket-challenge",
  title: "Ice Bucket Challenge",
  category: "event",
  description:
    "The viral charity campaign that swept the internet in summer 2014 — dump ice water, challenge three friends, raise awareness and money for ALS.",
  imageGradient: "from-sky-400 via-blue-500 to-indigo-600",
  scores: { relevance: 79, brainrot: 28, cringe: 15 },
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
