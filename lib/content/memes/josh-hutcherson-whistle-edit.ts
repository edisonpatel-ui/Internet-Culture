import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m52",
  slug: "josh-hutcherson-whistle-edit",
  title: 'Josh Hutcherson "Whistle" Edit',
  category: "meme",
  description:
    "A 2014 thirsty Hutcherson fancam set to a Flo Rida 'Whistle' cover — revived in 2023 as a TikTok bait-and-switch meme.",
  imageGradient: "from-pink-400 via-rose-500 to-red-600",
  scores: { relevance: 68, influence: 58, cringe: 62, brainrot: 55 },
  addedAt: "2026-07-18",
  historicalDate: "2014-10-12",
  views: 2100000,
  trendDirection: "stable",
  tags: ["tiktok", "2023", "fancam", "bait", "hunger games", "edit"],
  meaning:
    "A low-fi fan slideshow of Josh Hutcherson set to Joel Merry's cover of Flo Rida's 'Whistle.' In 2023 TikTok treated it like a rickroll: hide the edit in candy, ice cubes, garage projections — a bait-and-switch thirst edit.",
  origin:
    "YouTube channel MetroGirlzStation uploaded 'Josh Hutcherson || Whistle' on October 12, 2014. It resurfaced after the Five Nights at Freddy's film (2023) put Hutcherson back in feeds; TikTokers turned the old edit into a prank format (Know Your Meme, Polygon).",
  timeline: [
    { date: "Oct 2014", event: "Original YouTube fancam edit uploaded" },
    { date: "Late 2010s", event: "Edit circulates as nostalgic / ironic thirst content" },
    { date: "Nov 2023", event: "TikTok revival after FNaF movie; bait-and-switch trend" },
    { date: "2023–24", event: "Edit projected on objects, hidden in Halloween candy, etc." },
  ],
  examples: [
    "Opening a 'mystery candy' that plays the Whistle edit",
    "Projecting the edit onto a garage door as a street prank",
    "Caption: 'don't click' then the Hutcherson slideshow",
  ],
  relatedSlugs: ["rickroll", "short-form-takeover", "tiktok-rise"],
  relationships: {
    sameFormat: ["rickroll"],
    relatedEvent: ["short-form-takeover", "tiktok-rise"],
  },
  media: [
    // AI suggested — KYM cover still of the edit
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/047/264/josh_hutcherson_whistle.jpg",
      title: 'Josh Hutcherson "Whistle" Edit — cover still',
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/josh-hutcherson-whistle-edit",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Representative still from the viral Hutcherson Whistle fancam edit.",
      date: "2014",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/josh-hutcherson-whistle-edit",
      title: 'Josh Hutcherson "Whistle" Edit — Know Your Meme',
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/josh-hutcherson-whistle-edit",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin of the 2014 edit and 2023 TikTok bait trend.",
      date: "2023",
      verified: false,
    },
  ],
  sources: [
    {
      title: 'Josh Hutcherson "Whistle" Edit — Know Your Meme',
      url: "https://knowyourmeme.com/memes/josh-hutcherson-whistle-edit",
      domain: "knowyourmeme.com",
    },
    {
      title: "The Josh Hutcherson 'Whistle' edit meme, explained — Polygon",
      url: "https://www.polygon.com/23984032/josh-hutcherson-whistle-edit-meme-trend-explained/",
      domain: "polygon.com",
    },
  ],
};

export default entry;
