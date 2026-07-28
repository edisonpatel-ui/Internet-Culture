import type { EventEntry } from "@/types";

const entry: EventEntry = {
  id: "e19",
  slug: "most-liked-egg",
  title: "Most Liked Egg",
  category: "event",
  description:
    "The January 2019 Instagram egg that briefly became the most-liked post on the platform — a pure engagement stunt turned global meme.",
  imageGradient: "from-amber-100 via-yellow-200 to-orange-300",
  scores: { relevance: 41, influence: 72, cringe: 30, brainrot: 29 },
  addedAt: "2026-07-18",
  historicalDate: "2019-01-04",
  views: 3800000,
  trendDirection: "declining",
  tags: ["2019", "instagram", "viral", "engagement", "world-record"],
  platform: "Instagram",
  impact:
    "Proved a blank stock photo plus a clear call-to-action could outpace celebrity posts for likes. Sparked 'Egg Gang' fandom, cracked-egg sequel posts, mental-health ad pivots, and years of jokes about empty virality — until Messi's 2022 World Cup post overtook the record.",
  highlights: [
    "@world_record_egg posted a plain egg photo on January 4, 2019 challenging Kylie Jenner's like record",
    "Within ~10 days it became Instagram's most-liked post (tens of millions of likes)",
    "Follow-up posts showed the egg cracking; creators later revealed as ad creatives including Chris Godfrey",
    "Record stood until Lionel Messi's December 2022 World Cup celebration post",
  ],
  relatedSlugs: ["short-form-takeover", "tiktok-rise", "area-51-raid"],
  relationships: {
    sameEra: ["area-51-raid", "tiktok-rise"],
    relatedTo: ["short-form-takeover"],
  },
  media: [
    // AI suggested — KYM cover of the Instagram egg post
    {
      role: "featured",
      type: "image",
      url: "https://i.kym-cdn.com/entries/icons/original/000/028/148/1527c092-1da5-4f7a-b638-f30543382b0b-large16x9_EGGGANGInstagramPost.png",
      title: "World Record Egg — Instagram egg post",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/world-record-egg",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "The plain egg photograph that became Instagram's most-liked post in 2019.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/world-record-egg",
      title: "World Record Egg — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/world-record-egg",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Timeline of the Instagram egg like record.",
      date: "2019",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://en.wikipedia.org/wiki/Instagram_egg",
      title: "Instagram egg — Wikipedia",
      source: "Wikipedia",
      sourceUrl: "https://en.wikipedia.org/wiki/Instagram_egg",
      platform: "other",
      attribution: "Wikipedia contributors",
      license: "CC BY-SA 4.0",
      description: "Encyclopedic account of the egg post and later record loss.",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Instagram egg — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Instagram_egg",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
