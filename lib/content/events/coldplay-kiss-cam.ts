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
  // DEFINING VISUAL PASS — HERO EMPTY:
  // Target: Gillette Stadium Jumbotron kiss-cam frame (Byron/Cabot) or official
  // embeddable news thumbnail of that exact moment.
  // Sources checked: Wikimedia (Coldplay/Chris Martin concert photos — stage only;
  // Kiss cam wiki uses Obama basketball kiss — unrelated), YouTube oembed (no
  // verified official news clip ID with that still), GMA/NME/Euronews text
  // coverage (no CC image), Coldplay official channel (no upload of the moment).
  // Substitutes (generic Coldplay stage, Chris Martin portrait) are misleading.
  media: [
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
