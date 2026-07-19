import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m74",
  slug: "afro-ninja",
  title: "Afro Ninja",
  category: "meme",
  description:
    "Mark Allen Hicks's failed audition backflip — the 2000s fail-video that made 'Afro Ninja' synonymous with spectacular wipeouts.",
  imageGradient: "from-orange-500 via-red-600 to-zinc-900",
  scores: { relevance: 38, influence: 70, cringe: 40, brainrot: 42 },
  addedAt: "2026-07-19",
  historicalDate: "2004-01-01",
  views: 2900000,
  trendDirection: "stable",
  tags: ["classic","fail","viral video","2004","ebaums"],
  meaning:
    "A short clip of a stunt audition where a backflip with nunchucks ends in a face-plant. Used as a fail reaction and punchline for ambitious plans that flop instantly.",
  origin:
    "Stuntman Mark Allen Hicks's audition tape leaked to eBaum's World around 2004 and spread as Afro Ninja across early viral-video portals (Know Your Meme).",
  timeline: [
    {
        "date": "2004",
        "event": "Afro Ninja audition fail circulates on eBaum's World"
    },
    {
        "date": "Mid-2000s",
        "event": "Becomes a default fail-video reference online"
    },
    {
        "date": "2010s+",
        "event": "Persists as nostalgia fail-meme shorthand"
    }
],
  examples: [
    "Posting Afro Ninja after any overconfident fail",
    "Calling a wipeout 'full Afro Ninja'",
    "Fail compilations opening with the backflip"
],
  relatedSlugs: ["star-wars-kid","numa-numa","leeroy-jenkins","double-rainbow"],
  relationships: {
    "sameEra": [
        "star-wars-kid",
        "numa-numa"
    ],
    "relatedTo": [
        "leeroy-jenkins",
        "double-rainbow"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/053/afro_ninja.png",
        "title": "Afro Ninja — audition still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/afro-ninja",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Defining Afro Ninja fail-video still.",
        "date": "2004",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/afro-ninja",
        "title": "Afro Ninja — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/afro-ninja",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2004",
        "verified": false
    }
],
  sources: [
    {
        "title": "Afro Ninja — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/afro-ninja",
        "domain": "knowyourmeme.com"
    }
],
};

export default entry;
