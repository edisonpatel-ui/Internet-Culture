import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m5",
  slug: "npc-streaming",
  title: "NPC Streaming",
  category: "meme",
  description:
    "TikTok live streamers repeating robotic phrases for tips — uncanny and viral.",
  imageGradient: "from-zinc-500 via-slate-400 to-gray-300",
  scores: { relevance: 74, brainrot: 80, cringe: 92 },
  addedAt: "2026-07-04",
  views: 440000,
  trendDirection: "rising",
  meaning:
    "Performers act like video game NPCs — looping catchphrases ('gang gang', 'ice cream so good') when viewers send gifts.",
  origin:
    "Emerged from TikTok LIVE's gift economy, where viewers send virtual gifts that trigger performer reactions. Streamers began looping exaggerated, robotic catchphrases and movements when gifts arrived — mimicking video game non-player characters (NPCs). Canadian creator PinkyDoll became the most widely covered NPC streamer in 2023, known for phrases like 'ice cream so good' and 'gang gang.'",
  timeline: [
    { date: "2023", event: "NPC-style streams emerge on TikTok LIVE" },
    { date: "Mid-2023", event: "PinkyDoll and other NPC streamers go viral — mainstream news coverage follows" },
    { date: "2024–2025", event: "Format spreads to parodies, gaming references, and meme culture broadly" },
  ],
  examples: [
    "Ice cream so good — I can't stop watching NPC streams",
    "Bro turned into an NPC after 3 Red Bulls",
    "Gang gang [activated by TikTok gift]",
  ],
  relatedSlugs: ["skibidi-toilet"],
  sources: [
    {
      title: "NPC Streaming — Know Your Meme",
      url: "https://knowyourmeme.com/memes/npc-streaming",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
