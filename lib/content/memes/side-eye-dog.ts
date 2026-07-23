import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m122",
  slug: "side-eye-dog",
  title: "Side Eye Dog",
  category: "meme",
  description:
    "A skeptical dachshund glancing sideways — also called Sus Dog or Capping Dog — the canine reaction image for when someone is clearly lying.",
  imageGradient: "from-amber-700 via-orange-400 to-yellow-300",
  scores: { relevance: 58, influence: 55, cringe: 20, brainrot: 48 },
  addedAt: "2026-07-23",
  historicalDate: "2015-04-23",
  views: 1600000,
  trendDirection: "stable",
  tags: ["reaction", "dog", "reddit", "2015", "sus", "side-eye"],
  meaning:
    "A photograph of a brown dachshund giving the camera a squinting sideways look — one ear flipped — used to call out lies, exaggerations, or suspicious behavior. Distinct from Side Eyeing Chloe: this is a pet photo meme, not a toddler reaction still, and it peaked again on TikTok around 2021 as 'capping' culture spread.",
  origin:
    "On April 23, 2015, Reddit user gooddboyy posted the photo to /r/aww with the caption about a car ride possibly being a vet trip. The image was cross-posted to Imgur the same day and slowly became a reaction macro for distrust. Know Your Meme documents years of quiet circulation before a TikTok-era resurgence when 'sus' and 'cap' slang attached to the dog's expression.",
  timeline: [
    { date: "Apr 23, 2015", event: "gooddboyy posts the dachshund photo to /r/aww" },
    { date: "2016–2017", event: "Image macros and forum reaction usage grow" },
    { date: "2021", event: "TikTok resurgence ties the dog to 'sus' and 'capping' jokes" },
    { date: "2020s", event: "Remains a stock skeptical-dog reaction distinct from Chloe" },
  ],
  examples: [
    "Replying with Side Eye Dog when a friend claims they 'forgot' homework existed",
    "TikTok stitch: sus behavior clip + the dachshund stare",
    "Caption: 'Cap' over a screenshot of an unbelievable tweet",
  ],
  relatedSlugs: ["side-eyeing-chloe", "o-rly-owl", "grumpy-cat", "doge"],
  relationships: {
    relatedTo: ["side-eyeing-chloe", "grumpy-cat"],
    sameFormat: ["o-rly-owl"],
  },
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/side-eye-dog",
      title: "Side Eye Dog — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/side-eye-dog",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "2015 Reddit origin and later TikTok resurgence.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Side Eye Dog — Know Your Meme",
      url: "https://knowyourmeme.com/memes/side-eye-dog",
      domain: "knowyourmeme.com",
    },
    {
      title: "Who Is This Viral Dog? — Know Your Meme editorial",
      url: "https://trending.knowyourmeme.com/editorials/guides/who-is-this-viral-dog-and-why-is-he-so-suspicious-the-side-eyeing-dog-and-sus-dog-meme-explained",
      domain: "knowyourmeme.com",
    },
  ],
};

export default entry;
