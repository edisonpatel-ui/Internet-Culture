import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m39",
  slug: "this-is-fine",
  title: "This Is Fine",
  category: "meme",
  description:
    "KC Green's 2013 comic dog calmly sipping coffee in a burning room — the internet's favorite denial emoji.",
  imageGradient: "from-orange-500 via-amber-400 to-yellow-300",
  scores: { relevance: 80, brainrot: 40, cringe: 18 },
  addedAt: "2026-07-17",
  historicalDate: "2013-01-09",
  views: 4800000,
  trendDirection: "stable",
  tags: ["comic", "reaction", "denial", "2013", "kc-green", "classic"],
  meaning:
    "A reaction image for pretending everything is okay while the situation is clearly on fire — bemused acceptance, coping, or outright denial. Usually the first two panels of KC Green's 'On Fire' strip (dog: 'This is fine').",
  origin:
    "Drawn by KC Green for the webcomic Gunshow in a 2013 strip titled 'On Fire.' Know Your Meme traces early viral spread to September 2014 on Reddit/Imgur; the panels became a defining mid-2010s coping meme and remained a political/news reaction staple for years after.",
  timeline: [
    { date: "2013", event: "KC Green publishes the Gunshow strip 'On Fire'" },
    { date: "Sep 2014", event: "Two-panel crop spreads on Reddit/Imgur without attribution" },
    { date: "2016", event: "Peak mainstream recognition; used heavily in politics and news commentary" },
    { date: "2016", event: "Green publishes a 'This is Not Fine' follow-up on The Nib" },
    { date: "2023+", event: "Continues as a durable reaction image; licensed appearances in games/merch" },
  ],
  examples: [
    "Posting the dog during a work meltdown: 'This is fine'",
    "News cycle dumpster fire + This Is Fine reaction",
    "Group chat after everyone ignores a looming deadline",
  ],
  relatedSlugs: ["hide-the-pain-harold", "disaster-girl", "chill-guy"],
  media: [
    // AI suggested — Wikipedia fair-use panel of the defining comic
    {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/en/c/cb/This_is_fine_from_On_Fire_strip_by_KC_Green.jpg",
      title: "This Is Fine — panels from KC Green's On Fire",
      source: "Wikipedia",
      sourceUrl:
        "https://en.wikipedia.org/wiki/File:This_is_fine_from_On_Fire_strip_by_KC_Green.jpg",
      platform: "wikimedia",
      attribution: "KC Green (fair use for identification)",
      license: "Fair use",
      description:
        "The first panels of the On Fire strip — Question Hound saying 'This is fine' in a burning room.",
      date: "2013",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/this-is-fine",
      title: "This Is Fine — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/this-is-fine",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the comic origin and meme spread.",
      date: "2014",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Gunshow_(webcomic)#%22This_is_fine%22",
      title: "Gunshow — 'This is fine' section (Wikipedia)",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Gunshow_(webcomic)",
      platform: "wikimedia",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic background on Gunshow and the meme's cultural afterlife.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "This Is Fine — Know Your Meme",
      url: "https://knowyourmeme.com/memes/this-is-fine",
      domain: "knowyourmeme.com",
    },
    {
      title: "Gunshow (webcomic) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gunshow_(webcomic)",
      domain: "en.wikipedia.org",
    },
    {
      title: "The Meme That Defined a Decade — The Atlantic",
      url: "https://www.theatlantic.com/culture/archive/2023/01/this-is-fine-dog-meme-decade/672799/",
      domain: "theatlantic.com",
    },
  ],
};

export default entry;
