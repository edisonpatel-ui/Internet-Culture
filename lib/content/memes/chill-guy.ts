import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m28",
  slug: "chill-guy",
  title: "Chill Guy",
  category: "meme",
  description:
    "A cartoon dog character created by artist Philip Bank in November 2024 — hands in pockets, relaxed expression — that became a massive viral template representing the 'unbothered' mindset.",
  imageGradient: "from-slate-500 via-blue-400 to-cyan-400",
  scores: { relevance: 85, brainrot: 38, cringe: 18 },
  addedAt: "2026-07-17",
  historicalDate: "2024-11-01",
  views: 2900000,
  trendDirection: "declining",
  tags: ["2024", "character", "reaction", "dog", "unbothered", "viral"],
  meaning:
    "Chill Guy represents total composure and lack of concern. He's used as a reaction image to signal 'I am completely fine with this,' 'I am unbothered,' or 'I simply do not care.' Often placed alongside text describing a catastrophic or stressful situation to convey ironic calm.",
  origin:
    "Philip Bank (@mister_koss), a digital artist, posted the Chill Guy character to X (formerly Twitter) in November 2024. The character — a beige dog in jeans and a sweater, hands in pockets, looking casually to the side — was immediately embraced as a meme template. Within days the image spread to all major platforms, spawning thousands of variations. The character's design embodied the 'sigma male' and 'NPC' aesthetic that had been trending throughout 2024.",
  timeline: [
    { date: "Nov 2024", event: "Philip Bank posts the Chill Guy character to X (@mister_koss)" },
    { date: "Nov 2024", event: "Image immediately goes viral — thousands of memes created within days" },
    { date: "Nov–Dec 2024", event: "Chill Guy becomes one of the most used meme templates across platforms" },
    { date: "Dec 2024", event: "Multiple Chill Guy cryptocurrency tokens launch, controversially using the image without permission" },
    { date: "2025", event: "Meme usage normalizes; remains a stable reaction format" },
  ],
  examples: [
    "[Chill Guy standing] 'me watching my code fail for the 47th time'",
    "Your project deadline is tomorrow and you haven't started: [Chill Guy]",
    "When the world is falling apart but you've detached emotionally: Chill Guy",
  ],
  relatedSlugs: ["gigachad", "woman-yelling-at-cat"],
  // IMAGE-FIRST: Wikipedia fair-use original artwork (same pattern as Doge / Trollface).
  media: [
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/c/c7/Chill_guy_original_artwork.jpg",
      title: "Chill Guy — original Phillip Banks artwork (2023)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/File:Chill_guy_original_artwork.jpg",
      platform: "wikimedia",
      attribution: "Phillip Banks (fair use for identification)",
      license: "Fair use",
      description:
        "The original Chill Guy / 'my new character' artwork by Phillip Banks — the anthropomorphic dog that defines the meme.",
      date: "2023-10-04",
      verified: true,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/chill-guy",
      title: "Chill Guy — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/chill-guy",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Documentation of Phillip Banks' Chill Guy artwork and its 2024 viral spread.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Chill Guy — Know Your Meme",
      url: "https://knowyourmeme.com/memes/chill-guy",
      domain: "knowyourmeme.com",
    },
    {
      title: "Chill Guy — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Chill_Guy",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
