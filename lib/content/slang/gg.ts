import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s54",
  slug: "gg",
  title: "GG",
  category: "slang",
  description:
    "Gaming acronym for 'good game' — sportsmanship closer, resignation, or sarcastic salt depending on tone.",
  imageGradient: "from-emerald-400 via-teal-600 to-slate-800",
  scores: { relevance: 80, influence: 95, cringe: 25, brainrot: 20 },
  addedAt: "2026-07-19",
  historicalDate: "2003-01-18",
  views: 8500000,
  trendDirection: "stable",
  tags: ["gaming","classic","acronym","esports","chat"],
  definition:
    "GG means 'good game.' Typed at match end as polite sportsmanship, acknowledgment of defeat, or sarcastically after a stomp. Often paired with EZ as the rude variant 'gg ez.'",
  origin:
    "Competitive multiplayer chat culture; defined on Urban Dictionary by 2003 and documented across esports and forums as the default end-of-match phrase (Know Your Meme).",
  usageExamples: [
    "Lobby chat after a close match: 'gg'",
    "Resigning mid-match: 'gg wp'",
    "Sarcastic after a cheese win: 'gg'"
],
  relatedSlugs: ["ez","geeg","press-f-to-pay-respects","noob","git-gud","w-dub"],
  relationships: {
    "relatedSlang": [
        "ez",
        "geeg",
        "noob",
        "git-gud",
        "w-dub"
    ],
    "relatedTo": [
        "press-f-to-pay-respects"
    ],
    "community": [
        "ez",
        "geeg"
    ],
    "spawnedVariants": [
        "geeg"
    ]
},
  media: [
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/gg",
        "title": "GG — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/gg",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Slang origin and usage documentation.",
        "date": "2003",
        "verified": false
    }
],
  sources: [
    {
        "title": "GG — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/gg",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "GG — Urban Dictionary",
        "url": "https://www.urbandictionary.com/define.php?term=GG",
        "domain": "urbandictionary.com"
    }
],
};

export default entry;
