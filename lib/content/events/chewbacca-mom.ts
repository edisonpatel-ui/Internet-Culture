import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e31",
  slug: "chewbacca-mom",
  title: "Chewbacca Mom",
  category: "event",
  description:
    "Candace Payne's May 2016 Facebook Live video laughing in a Chewbacca mask — one of the first mega-viral Facebook Live moments, with hundreds of millions of views.",
  imageGradient: "from-amber-600 via-orange-500 to-brown-700",
  scores: { relevance: 48, influence: 82, cringe: 25, brainrot: 30 },
  addedAt: "2026-07-23",
  historicalDate: "2016-05-19",
  views: 4100000,
  trendDirection: "declining",
  tags: ["2016", "facebook", "viral video", "star wars", "wholesome"],
  platform: "Facebook Live, YouTube, TV",
  impact:
    "Payne bought a roaring Chewbacca mask at Kohl's, filmed herself in the car, and laughed until she cried. Facebook's live product was still new; the clip spread across news, talk shows, and YouTube mirrors faster than almost any prior Facebook-native video. Hasbro and Kohl's sent gifts; Payne appeared on James Corden. Chewbacca Mom proved that unfiltered joy — not a produced sketch — could define a platform era and inspire years of reaction memes.",
  highlights: [
    "May 19, 2016: Candace Payne streamed herself wearing a Chewbacca mask on Facebook Live",
    "The video passed 100 million views within days — among Facebook's most-watched clips at the time",
    "Major outlets and late-night TV amplified the clip; retailers and Lucasfilm joined the response",
    "Became a reference point for wholesome viral video before TikTok dominated short-form",
  ],
  relatedSlugs: ["vine-shutdown", "tiktok-rise", "ice-bucket-challenge", "youtube-creator-era"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/y6Q7Hq7ApjY/hqdefault.jpg",
      title: "Chewbacca Mom on The Late Late Show",
      source: "YouTube / The Late Late Show with James Corden",
      sourceUrl: "https://www.youtube.com/watch?v=y6Q7Hq7ApjY",
      platform: "youtube",
      attribution: "The Late Late Show with James Corden",
      description: "Candace Payne (Chewbacca Mom) appearing on late-night TV after the viral clip.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Chewbacca_mask_lady",
      title: "Chewbacca mask lady — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Chewbacca_mask_lady",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Chewbacca mask lady — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Chewbacca_mask_lady",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
