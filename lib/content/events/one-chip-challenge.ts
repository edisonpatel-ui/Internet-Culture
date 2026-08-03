import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e11",
  slug: "one-chip-challenge",
  title: "One Chip Challenge",
  category: "event",
  description:
    "Paqui's infamous coffin-boxed chip — so spicy it put people in hospitals and was pulled from shelves following a teenager's death in 2023.",
  imageGradient: "from-red-600 via-orange-600 to-yellow-500",
  scores: { relevance: 15, influence: 76, cringe: 21, brainrot: 29 },
  addedAt: "2026-07-16",
  historicalDate: "2023-09-01",
  views: 2800000,
  trendDirection: "declining",
  platform: "TikTok, YouTube",
  impact:
    "Became one of the most discussed viral food challenges of the decade — raising urgent questions about content creator responsibility, food safety regulations, and the gamification of danger in social media culture. The challenge's tragic end led Paqui to withdraw the product entirely.",
  highlights: [
    "Paqui's One Chip Challenge featured a single chip coated in Carolina Reaper and Naga Viper peppers, sold in a coffin-shaped box",
    "Participants filmed themselves eating the chip and competing to see how long they could last without drinking anything",
    "Videos of participants in visible distress spread across TikTok and YouTube as both entertainment and cautionary content",
    "In September 2023, 14-year-old Harris Wolobah became ill at school after eating the chip and later died — the medical examiner noted the chip as a contributing factor",
    "Paqui voluntarily pulled the product from store shelves nationwide following the tragedy",
  ],
  relatedSlugs: [
    "short-form-takeover",
    "ice-bucket-challenge",
    "tiktok-rise",
    "minecraft-movie-premiere",
  ],
  tags: ["challenge", "food", "spicy", "tiktok", "viral", "paqui", "2023", "safety"],
  media: [
    // Paqui coffin packaging — the product people associate with the challenge.
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Paqui_coffin-shaped_chip_boxes.jpg",
      title: "Paqui One Chip Challenge — coffin-shaped boxes",
      source: "Wikimedia Commons / theimpulsivebuy",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Paqui_coffin-shaped_chip_boxes.jpg",
      platform: "wikimedia",
      attribution: "theimpulsivebuy (CC BY-SA 2.0)",
      license: "CC BY-SA 2.0",
      description:
        "Paqui coffin-shaped chip packaging — the defining product visual of the One Chip Challenge.",
      date: "2016-10-17",
      verified: true,
    },
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Paqui_One_Chip_Challenge_7-Eleven.jpg",
      title: "Paqui One Chip Challenge — retail display at 7-Eleven",
      source: "Wikimedia Commons / Phillip Pessar",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Paqui_One_Chip_Challenge_7-Eleven.jpg",
      platform: "wikimedia",
      attribution: "Phillip Pessar (CC BY 2.0)",
      license: "CC BY 2.0",
      description:
        "One Chip Challenge product on a 7-Eleven shelf during the challenge's retail peak.",
      date: "2023-09-01",
      verified: true,
    },
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=Eip2wuhIcLQ",
      title: "Tony Hawk and Sean Evans Take on the Paqui One Chip Challenge | Hot Ones",
      source: "YouTube / First We Feast",
      sourceUrl: "https://www.youtube.com/watch?v=Eip2wuhIcLQ",
      platform: "youtube",
      attribution: "First We Feast / Hot Ones",
      license: "YouTube Standard License",
      description:
        "Official Hot Ones video documenting the Paqui One Chip Challenge format.",
      date: "2022",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/One_Chip_Challenge",
      title: "One Chip Challenge — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/One_Chip_Challenge",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "History of the challenge and the 2023 product withdrawal.",
      date: "2023",
      verified: true,
    },
  ],
  sources: [
    {
      title: "One Chip Challenge — Wikipedia",
      url: "https://en.wikipedia.org/wiki/One_Chip_Challenge",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
