import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m53",
  slug: "arthurs-fist",
  title: "Arthur's Fist",
  category: "meme",
  description:
    "The clenched-fist Arthur Read still — the internet's default reaction image for bottled rage and 'mood.'",
  imageGradient: "from-amber-400 via-yellow-500 to-orange-600",
  scores: { relevance: 70, influence: 72, cringe: 22, brainrot: 30 },
  addedAt: "2026-07-18",
  historicalDate: "2016-07-27",
  views: 4100000,
  trendDirection: "stable",
  tags: ["reaction", "classic", "arthur", "2016", "twitter", "frustration"],
  meaning:
    "A reaction still of Arthur Read clenching his fist, used to signal suppressed anger, irritation, or intense 'mood' without a rant. Captions usually describe the frustrating situation above the fist.",
  origin:
    "The frame comes from the Arthur episode where Arthur punches D.W. (already famous via YouTube Poop edits). As a standalone reaction, Twitter user @AlmostJT posted the fist as 'relatable' in July 2016; it spread across Twitter and Reddit through 2016–17, with celebrity uses (e.g. LeBron James) amplifying it (Know Your Meme).",
  timeline: [
    { date: "1990s–2000s", event: "Source scene airs on Arthur; later YouTube Poop fame" },
    { date: "Jul 2016", event: "Fist still posted as a reaction image on Twitter" },
    { date: "2016–17", event: "Captions about everyday frustrations go mainstream" },
    { date: "Nov 2017", event: "LeBron James Instagram 'mood' post sparks debate" },
  ],
  examples: [
    "When someone says the microwave second doesn't count",
    "Group chat when the plans change for the third time",
    "Caption: 'mood' under the clenched fist alone",
  ],
  relatedSlugs: ["surprised-pikachu", "hide-the-pain-harold", "woman-yelling-at-cat"],
  relationships: {
    sameFormat: ["surprised-pikachu", "hide-the-pain-harold"],
    relatedTo: ["woman-yelling-at-cat"],
  },
  media: [
    // AI suggested — KYM icon is the defining fist still
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/021/018/arthur.jpg",
      title: "Arthur's Fist — clenched fist reaction still",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/arthurs-fist",
      platform: "knowyourmeme",
      attribution: "Arthur / PBS Kids still (via Know Your Meme documentation)",
      description: "The clenched-fist Arthur frame used as a frustration reaction meme.",
      date: "2016",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/arthurs-fist",
      title: "Arthur's Fist — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/arthurs-fist",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and celebrity uses of the Arthur's Fist reaction.",
      date: "2016",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Arthur's Fist — Know Your Meme",
      url: "https://knowyourmeme.com/memes/arthurs-fist",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
