import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t49",
  slug: "aura-battle",
  title: "Aura Battle",
  category: "trend",
  description:
    "In-person face-offs, mostly among teenagers, where two people take turns acting out memes and viral poses in front of a crowd to see who has more 'aura.'",
  imageGradient: "from-violet-600 via-fuchsia-600 to-amber-500",
  scores: { relevance: 80, influence: 40, cringe: 55, brainrot: 70 },
  addedAt: "2026-10-18",
  lastUpdated: "2026-10-18",
  historicalDate: "2026-08-01",
  views: 0,
  trendDirection: "rising",
  tags: ["aura", "street-battles", "mexico", "latin-america", "tiktok", "2026", "memes"],
  origin:
    "'Aura' is Gen Z slang for a person's style, charisma or presence, and 'aura farming' borrows the video-game word for repeating an action to earn points. Aura battles turn that joke into a live contest. Reporting in August 2026 described meet-ups in Mexico, Argentina, Brazil, Peru and Bolivia, with the trend also reaching Spain. In a typical battle two competitors, mostly aged 14 to 20, take turns recreating memes, poses and viral videos while the crowd films; winners are picked by judges and crowd reaction, and 'aura points' are symbolic rather than formally scored.",
  summary:
    "Aura battles move online meme literacy onto the street: instead of punches or rhymes, contestants win by being funnier, more confident and more fluent in viral references than their opponent. A Mexico City contest in front of the Palacio de Bellas Artes offered a 3,000-peso prize; in Argentina the stakes were bragging rights to 'infinite aura.' Moments that went around included a teenager winning a crowd with a Cristiano Ronaldo 'Siuuu' jump and a 'mewing' pose, and a competitor in Lightning McQueen trousers using a giant sandal as a prop. Reactions were mixed: some adults saw it as a sign of declining culture, a mayor in Honduras banned the battles, and a psychologist quoted in coverage argued they get teenagers to meet in person.",
  relatedSlugs: ["aura", "aura-farming"],
  relationships: {
    inspiredBy: ["aura-farming"],
    relatedSlang: ["aura", "aura-farming"],
  },
  sources: [
    {
      title: "What is 'aura farming'? TikTok's strange viral battles hit the streets — Euronews",
      url: "https://www.euronews.com/2026/08/22/what-is-aura-farming-tiktoks-strange-viral-battles-hit-the-streets",
      domain: "euronews.com",
    },
  ],
};

export default entry;
