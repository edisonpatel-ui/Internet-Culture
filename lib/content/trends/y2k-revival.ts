import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t15",
  slug: "y2k-revival",
  title: "Y2K Revival",
  category: "trend",
  description:
    "A Gen Z-driven nostalgia wave reviving late 90s and early 2000s fashion — butterfly clips, low-rise jeans, Von Dutch, bedazzling, and the visual language of a pre-social-media digital era.",
  imageGradient: "from-pink-400 via-purple-400 to-blue-400",
  scores: { relevance: 70, brainrot: 30, cringe: 32 },
  addedAt: "2026-07-17",
  views: 2100000,
  trendDirection: "declining",
  tags: ["fashion", "nostalgia", "2000s", "gen-z", "tiktok", "style"],
  origin:
    "TikTok and Instagram fashion communities, 2020–2022. Generation Z, who grew up after the Y2K era, began romanticizing the visual language of late 90s/early 2000s pop culture: Paris Hilton's aesthetic, Von Dutch trucker hats, butterfly clips, low-rise jeans, platform sandals, velour tracksuits, and sparkly everything. Thrift stores and fast fashion both responded to the demand.",
  relatedSlugs: ["clean-girl-aesthetic"],
  // Fashion revival — no single CC image that is "Y2K Revival" without stock-photo
  // vibes. Gradient + reference is the correct call.
  // Early-2000s low-rise denim — a signature Y2K fashion silhouette (not stock).
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Woman_in_Low_rise_jeans.jpg",
      title: "Low-rise jeans — early 2000s fashion silhouette",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Woman_in_Low_rise_jeans.jpg",
      platform: "wikimedia",
      attribution: "dailylifeofmojo (CC BY 2.0)",
      license: "CC BY 2.0",
      description:
        "Low-rise jeans and crop-top styling associated with early-2000s / Y2K fashion that Gen Z revived.",
      date: "2009-07-25",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Y2K_fashion",
      title: "Y2K Fashion — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Y2K_fashion",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Overview of Y2K fashion and its Gen Z revival cycle.",
      date: "2020",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Y2K Fashion Revival — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Y2K_fashion",
      domain: "en.wikipedia.org",
    },
    {
      title: "Y2K Revival: Everything You Need to Know — Vogue",
      url: "https://www.vogue.com/article/y2k-fashion-trend",
      domain: "vogue.com",
    },
  ],
};

export default entry;
