import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e9",
  slug: "coldplay-kiss-cam",
  title: "Coldplay Kiss Cam",
  category: "event",
  description:
    "The 2025 Coldplay concert kiss cam moment that went globally viral — a couple caught on camera became the subject of one of the year's biggest public relationship dramas.",
  imageGradient: "from-yellow-400 via-amber-400 to-orange-400",
  scores: { relevance: 86, brainrot: 48, cringe: 42 },
  addedAt: "2026-07-16",
  historicalDate: "2025-06-01",
  views: 4800000,
  trendDirection: "declining",
  platform: "X, TikTok, YouTube",
  impact:
    "Demonstrated how instantly a private moment in a public arena can become global news and a cultural flashpoint. Reignited debates about public accountability, workplace relationships, and the nature of internet pile-ons and viral shaming.",
  highlights: [
    "At a Coldplay concert in 2025, a kiss cam moment captured a couple who appeared to react awkwardly when the camera focused on them",
    "The clip spread globally on X and TikTok within hours of being filmed and shared",
    "Internet communities identified the individuals — the story developed significant professional consequences for those involved",
    "The incident sparked widespread discussion about privacy in public spaces, accountability, and the speed of viral internet culture",
  ],
  relatedSlugs: ["short-form-takeover", "brat-summer"],
  tags: ["viral", "concert", "coldplay", "2025", "kiss cam", "accountability", "social media"],
  media: [
    // AI suggested — Jumbotron kiss-cam frame of Byron/Cabot (not generic Coldplay stage).
    // Human must confirm URL still loads the defining stadium-screen still and set verified: true.
    {
      role: "featured",
      type: "image",
      url: "https://i.insider.com/687a6914f748d8c055f5dfc0?width=1200&format=jpeg",
      title: "Coldplay Gillette Stadium Jumbotron kiss-cam moment",
      source: "Business Insider",
      sourceUrl:
        "https://www.businessinsider.com/astronomer-ceo-andy-byron-awkward-moment-coldplay-concert-viral-tiktok-2025-7",
      platform: "other",
      attribution: "Concert footage still via Business Insider coverage",
      description:
        "Defining viral frame: the couple on the Gillette Stadium Jumbotron during Coldplay's crowd-cam segment.",
      date: "2025",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Kiss_cam",
      title: "Kiss cam — Wikipedia (2025 Coldplay section)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Kiss_cam",
      platform: "other",
      attribution: "Wikipedia contributors",
      description:
        "Kiss-cam overview including the 2025 Coldplay / Astronomer viral incident.",
      date: "2025",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Kiss cam — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Kiss_cam",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
