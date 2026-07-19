import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m73",
  slug: "star-wars-kid",
  title: "Star Wars Kid",
  category: "meme",
  description:
    "Ghyslain Raza's private lightsaber-practice tape leaked online — an early viral video that also became a cautionary cyberbullying story.",
  imageGradient: "from-zinc-800 via-amber-500 to-yellow-300",
  scores: { relevance: 40, influence: 88, cringe: 45, brainrot: 30 },
  addedAt: "2026-07-19",
  historicalDate: "2003-04-14",
  views: 4800000,
  trendDirection: "stable",
  tags: ["classic","viral video","2003","star wars","cyberbullying"],
  meaning:
    "Footage of a Canadian teen practicing lightsaber moves with a golf-ball retriever. Online it was remixed endlessly; culturally it also marks early viral fame's darker bullying side.",
  origin:
    "In 2002–2003, classmates leaked Ghyslain Raza's private tape; it spread via eBaum's World and beyond as Star Wars Kid, later covered extensively as both meme and cyberbullying case (Know Your Meme, Wikipedia).",
  timeline: [
    {
        "date": "2002–03",
        "event": "Private tape is leaked and spreads as Star Wars Kid"
    },
    {
        "date": "2003+",
        "event": "Remixes and news coverage make it a defining early viral video"
    },
    {
        "date": "Later years",
        "event": "Discussed as a landmark cyberbullying / consent case in viral culture"
    }
],
  examples: [
    "Referencing Star Wars Kid when talking about early viral leaks",
    "Remix edits pairing the tape with Star Wars score (historical usage)",
    "Media essays on consent and early meme culture"
],
  relatedSlugs: ["afro-ninja","numa-numa","double-rainbow","rickroll"],
  relationships: {
    "sameEra": [
        "afro-ninja",
        "numa-numa",
        "end-of-ze-world"
    ],
    "relatedTo": [
        "double-rainbow",
        "rickroll"
    ]
},
  media: [
    {
        "role": "featured",
        "type": "image",
        "url": "https://i.kym-cdn.com/entries/icons/original/000/000/014/star_wars_kid_meme_banner_image.jpg",
        "title": "Star Wars Kid — cultural documentation still",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/star-wars-kid",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Widely circulated Star Wars Kid documentation image.",
        "date": "2003",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://knowyourmeme.com/memes/star-wars-kid",
        "title": "Star Wars Kid — Know Your Meme",
        "source": "Know Your Meme",
        "sourceUrl": "https://knowyourmeme.com/memes/star-wars-kid",
        "platform": "knowyourmeme",
        "attribution": "Know Your Meme / Literally Media",
        "description": "Origin and spread documentation.",
        "date": "2003",
        "verified": false
    },
    {
        "role": "reference",
        "type": "embed",
        "url": "https://en.wikipedia.org/wiki/Star_Wars_Kid",
        "title": "Star Wars Kid — Wikipedia",
        "source": "Wikipedia",
        "sourceUrl": "https://en.wikipedia.org/wiki/Star_Wars_Kid",
        "platform": "other",
        "attribution": "Wikipedia contributors",
        "license": "CC BY-SA 4.0",
        "description": "Encyclopedic background.",
        "verified": false
    }
],
  sources: [
    {
        "title": "Star Wars Kid — Know Your Meme",
        "url": "https://knowyourmeme.com/memes/star-wars-kid",
        "domain": "knowyourmeme.com"
    },
    {
        "title": "Star Wars Kid — Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Star_Wars_Kid",
        "domain": "en.wikipedia.org"
    }
],
};

export default entry;
