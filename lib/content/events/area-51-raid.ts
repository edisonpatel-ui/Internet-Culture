import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e15",
  slug: "area-51-raid",
  title: "Area 51 Raid",
  category: "event",
  description:
    "The 2019 'Storm Area 51' Facebook event — millions RSVP'd to 'see them aliens,' and a few thousand actually showed up in the desert.",
  imageGradient: "from-emerald-800 via-green-600 to-lime-400",
  scores: { relevance: 68, influence: 68, cringe: 45, brainrot: 70 },
  addedAt: "2026-07-18",
  historicalDate: "2019-09-20",
  views: 3200000,
  trendDirection: "declining",
  tags: ["2019", "facebook", "meme-event", "area-51", "naruto-run"],
  platform: "Facebook, Twitter, Instagram",
  impact:
    "A pure meme-to-IRL crossover: an ironic Facebook event became international news, tourism, and Naruto-run jokes. Proved that absurdist internet coordination could produce real-world gatherings — even when almost nobody expected a literal raid.",
  highlights: [
    "Facebook event 'Storm Area 51, They Can't Stop All of Us' drew millions of RSVPs in mid-2019",
    "September 2019 gatherings near the Nevada site drew thousands of curious attendees",
    "Naruto-run memes and alien merch defined the joke's visual language",
    "Authorities and media treated the meme seriously enough to issue warnings",
  ],
  relatedSlugs: ["harlem-shake", "ice-bucket-challenge", "rickroll", "yeet"],
  relationships: {
    sameFormat: ["ice-bucket-challenge"],
    sameEra: ["tiktok-rise"],
  },
  media: [
    // AI suggested — crowd at Area 51 back gate (Commons); defining IRL moment
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Crowd_gathered_at_the_back_gate_of_Area_51.jpg",
      title: "Crowd at Area 51 back gate during Storm Area 51",
      source: "Wikimedia Commons",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Crowd_gathered_at_the_back_gate_of_Area_51.jpg",
      platform: "wikimedia",
      attribution: "Photograph on Wikimedia Commons (see file page)",
      license: "See Commons file page",
      description:
        "People gathered at the Area 51 perimeter during the Storm Area 51 meme event.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Storm_Area_51",
      title: "Storm Area 51 — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Storm_Area_51",
      platform: "other",
      attribution: "Wikipedia contributors",
      description: "Overview of the Facebook event and September 2019 gatherings.",
      date: "2019",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Storm Area 51 — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Storm_Area_51",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
