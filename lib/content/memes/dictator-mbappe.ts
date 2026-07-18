import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m20",
  slug: "dictator-mbappe",
  title: "Dictator Mbappé",
  category: "meme",
  description:
    "A viral meme format comparing Kylian Mbappé's expressions and appearance to historical authoritarian figures.",
  imageGradient: "from-slate-600 via-zinc-500 to-gray-500",
  scores: { relevance: 72, brainrot: 45, cringe: 38 },
  addedAt: "2026-07-16",
  views: 640000,
  trendDirection: "declining",
  tags: ["soccer", "football", "sports", "real madrid", "twitter", "2024", "france"],
  meaning:
    "A meme format based on image comparisons between French soccer player Kylian Mbappé and historical dictators or authoritarian figures, drawing on perceived resemblances in facial expressions, posture, or framing. Widely circulated as satirical, image-based humor within football and internet meme communities.",
  origin:
    "Emerged on X (Twitter) and football meme communities in 2024, coinciding with Mbappé's high-profile transfer to Real Madrid and increased global media attention on the player. Fans circulated side-by-side comparisons and edited images placing Mbappé alongside historical figures.",
  timeline: [
    {
      date: "Summer 2024",
      event: "Mbappé signs with Real Madrid — elevated global media presence",
    },
    {
      date: "2024",
      event:
        "'Dictator Mbappé' comparisons circulate widely on X and football meme communities",
    },
  ],
  examples: [
    "Side-by-side of Mbappé at a press conference next to a historical figure",
    "The dictator Mbappé edits are circulating again",
    "Bro showed up to training looking like a dictator in the 40s [image]",
  ],
  relatedSlugs: [],
  // Meme identity is fan AI/Photoshop dictator edits — not reliably licensed.
  // A normal sports portrait would misrepresent the format. Reference only.
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/dictator-mbappe",
      title: "Dictator Mbappé — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/dictator-mbappe",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Origin and examples of the Dictator Mbappé edit format.",
      date: "2024",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Dictator Mbappé — Know Your Meme",
      url: "https://knowyourmeme.com/memes/dictator-mbappe",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
