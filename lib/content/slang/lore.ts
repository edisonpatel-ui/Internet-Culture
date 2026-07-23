import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s73",
  slug: "lore",
  title: "Lore",
  category: "slang",
  description:
    "Backstory, hidden context, or accumulated drama around a person, fandom, or meme — the wiki in your head.",
  imageGradient: "from-indigo-700 via-purple-700 to-violet-800",
  scores: { relevance: 90, influence: 78, cringe: 15, brainrot: 35 },
  addedAt: "2026-07-23",
  views: 2400000,
  trendDirection: "rising",
  tags: ["fandom", "gaming", "tiktok", "storytelling", "2020s"],
  definition:
    "Internet lore is the deep or messy history behind something — creator feuds, deleted tweets, origin myths, inside jokes. 'That's lore' means newcomers are missing context. 'Adding to the lore' means someone did something that future fans will have to explain. Gaming and YouTube communities used 'lore' for worldbuilding; TikTok broadened it to personal and celebrity drama.",
  origin:
    "Lore comes from Old English storytelling traditions; gaming (Dark Souls, Minecraft, ARGs) repopularized it for optional deep narrative. Twitter and TikTok in the early 2020s stretched 'lore' to any serialized online drama — streamer arcs, franchise fan theories, even cafeteria gossip with wiki energy.",
  usageExamples: [
    "You need the 2019 tweet for this meme — that's lore.",
    "He showed up in her stream chat. Lore updated.",
    "The company reply-all email is corporate lore now.",
  ],
  relatedSlugs: ["stan", "receipts", "npc", "brainrot"],
  sources: [
    {
      title: "Lore (gaming) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Lore_(gaming)",
      domain: "en.wikipedia.org",
    },
    {
      title: "Internet Lore — Know Your Meme",
      url: "https://knowyourmeme.com/memes/internet-lore",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
