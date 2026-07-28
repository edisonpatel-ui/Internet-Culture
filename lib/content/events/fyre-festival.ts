import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e35",
  slug: "fyre-festival",
  title: "Fyre Festival",
  category: "event",
  description:
    "The April 2017 luxury-island festival that never happened — FEMA tents, cheese sandwiches, and influencer-promoted hype that became the defining scam-event of the Instagram era.",
  imageGradient: "from-orange-500 via-rose-400 to-teal-500",
  scores: { relevance: 25, influence: 71, cringe: 48, brainrot: 30 },
  addedAt: "2026-07-23",
  historicalDate: "2017-04-28",
  views: 6200000,
  trendDirection: "stable",
  tags: ["2017", "festival", "scam", "instagram", "influencer"],
  platform: "Instagram, Twitter, YouTube",
  impact:
    "Organizers Billy McFarland and Ja Rule sold a Bahamas \"immersive\" experience using orange-tile Instagram posts and supermodel promos. Attendees arrived to unfinished sites, soaked mattresses, and cancelled acts. Twitter and Instagram documented the disaster in real time; lawsuits and a Netflix/Hulu documentary duo cemented Fyre as the cautionary tale for influencer marketing, startup hype, and private-jet aesthetics without logistics.",
  highlights: [
    "April 2017: Fyre Festival was cancelled mid-arrival on Great Exuma, Bahamas",
    "Attendees documented FEMA tents, boxed lunches, and lack of basic infrastructure",
    "Billy McFarland pleaded guilty to wire fraud; the event spawned major documentaries",
    "Became the reference meme for overpromised luxury experiences and influencer accountability",
  ],
  relatedSlugs: ["influencer-culture", "instagram-culture", "creator-economy", "logan-paul"],
  media: [
    // AI suggested — human must verify URL and set verified: true
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/2/23/N458UW_-_Swift_Air_-_Boeing_737-400_-_Fyre_Festival.jpg",
      title: "Charter aircraft branded for Fyre Festival",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:N458UW_-_Swift_Air_-_Boeing_737-400_-_Fyre_Festival.jpg",
      platform: "wikimedia",
      attribution: "Photograph on Wikimedia Commons (see file page)",
      license: "See Commons file page",
      description: "Fyre Festival–branded charter jet — symbol of the promoted luxury experience.",
      date: "2017",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Fyre_Festival",
      title: "Fyre Festival — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Fyre_Festival",
      platform: "other",
      attribution: "Wikipedia contributors",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Fyre Festival — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Fyre_Festival",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
