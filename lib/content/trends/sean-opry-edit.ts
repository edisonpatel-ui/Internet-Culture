import type { BaseEntry } from "@/types";

const entry: BaseEntry = {
  id: "t50",
  slug: "sean-opry-edit",
  title: "Sean O'Pry Edit",
  category: "trend",
  description:
    "A 2026 TikTok edit format that syncs slow-motion footage of the American model Sean O'Pry from a 2015 fragrance ad to a remix whose synth drop lands on his face and walk.",
  imageGradient: "from-zinc-700 via-neutral-800 to-black",
  scores: { relevance: 77, influence: 25, cringe: 50, brainrot: 40 },
  addedAt: "2026-10-18",
  lastUpdated: "2026-10-18",
  historicalDate: "2026-09-09",
  views: 0,
  trendDirection: "rising",
  tags: ["tiktok", "edits", "model", "fragrance-ad", "remix", "2026", "thirst-edit"],
  origin:
    "The footage comes from a 2015 Paco Rabanne '1 Million' fragrance commercial featuring Sean O'Pry, uploaded to YouTube on 4 February 2015. On 9 September 2026 the TikTok user @.fwmatu posted an edit of the ad set to Black Coast's 'TRNDSTTR (Lucian Remix),' which became the reference version of the format and reached about 21.7 million views. The remix itself dates from 2014 and had been used in edits before this trend.",
  summary:
    "The format is a beat-sync edit: black-and-white slow-motion shots from the ad, cut so the song's synth drop hits a close-up of O'Pry's face or his walk toward the camera. Captions range from romantic text to dating-app jokes and self-deprecating posts about staring at a crush, so O'Pry works as a stand-in for aspirational male beauty in thirst-edit culture. Swapping the song generally produces a different trend, because the remix is what creators and viewers expect. Early copies mostly reuse the same ad footage.",
  relatedSlugs: ["josh-hutcherson-whistle-edit"],
  relationships: {
    sameFormat: ["josh-hutcherson-whistle-edit"],
  },
  sources: [
    {
      title: "Sean O'Pry — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Sean_O%27Pry",
      domain: "en.wikipedia.org",
    },
    {
      title: "Black Coast – TRNDSTTR (Lucian Remix) — Complex",
      url: "https://www.complex.com/music/2014/11/black-coast-trndsttr-lucian-remix",
      domain: "complex.com",
    },
  ],
};

export default entry;
