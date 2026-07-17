import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m21",
  slug: "gangnam-style",
  title: "Gangnam Style",
  category: "meme",
  description:
    "PSY's 2012 K-pop anthem that became the first YouTube video to reach one billion views — and unleashed a global horse-dance craze.",
  imageGradient: "from-yellow-400 via-orange-400 to-red-500",
  scores: { relevance: 82, brainrot: 55, cringe: 35 },
  addedAt: "2026-07-17",
  historicalDate: "2012-07-15",
  views: 4800000,
  trendDirection: "stable",
  tags: ["youtube", "kpop", "music", "dance", "viral", "2012", "psy", "korea"],
  meaning:
    "A 2012 K-pop song by PSY and its signature 'horse-riding' dance move. Originally a satirical commentary on the lavish lifestyle of Seoul's Gangnam district, it became a global phenomenon and a defining moment in the internet's ability to make something — instantly and without gatekeepers — a worldwide hit.",
  origin:
    "PSY (Park Jae-sang) released 'Gangnam Style' on July 15, 2012. The comedic music video spread organically through YouTube, Twitter, and Facebook. By mid-August 2012 it had 50 million views; by late October it had become the most-viewed YouTube video of all time, eventually crossing the one-billion-view mark on December 21, 2012 — the first video ever to do so.",
  timeline: [
    { date: "Jul 15, 2012", event: "PSY releases 'Gangnam Style' on YouTube and iTunes" },
    {
      date: "Aug 2012",
      event:
        "Video goes globally viral — Ellen, T-Pain, and Robbie Williams publicly react; flash mobs erupt worldwide",
    },
    {
      date: "Sep 2012",
      event:
        "UN Secretary-General Ban Ki-moon calls PSY a 'force for world peace'",
    },
    {
      date: "Dec 21, 2012",
      event:
        "Becomes the first YouTube video to reach one billion views — YouTube's like counter breaks and must be upgraded",
    },
    {
      date: "2023",
      event:
        "The official video surpasses 5.2 billion views — still one of the most-watched videos in YouTube history",
    },
  ],
  examples: [
    "An entire office erupting into the horse-dance during a Harlem Shake–style flash mob",
    "World leaders joking about PSY at international summits in late 2012",
    "The 'Oppan Gangnam Style' earworm that refused to leave your head for an entire year",
    "YouTube's view counter literally breaking because no one coded for 10 figures",
  ],
  relatedSlugs: ["harlem-shake", "rickroll", "nyan-cat"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // YouTube thumbnail CDN — hotlink-safe, stable, instantly recognizable.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg",
      title: "Gangnam Style — official music video thumbnail (2012)",
      source: "YouTube / officialpsy",
      sourceUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      platform: "youtube",
      attribution: "PSY / YG Entertainment",
      license: "YouTube Standard License",
      description:
        "The official Gangnam Style music video thumbnail — one of the most recognized images in YouTube history.",
      date: "2012-07-15",
      tags: ["original", "music video", "official"],
      verified: true,
    },
    // ── SUPPORTING ─────────────────────────────────────────────────────────────
    // Live performance photo — CC BY-SA 2.0 by Eva Rinaldi Photography.
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Psy_Gangnam_Style_performs_at_Marquee,_The_Star,_Sydney,_Australia_(1).jpg",
      title: "PSY performing Gangnam Style at Marquee, Sydney (2012)",
      source: "Wikimedia Commons / Eva Rinaldi Photography",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Psy_Gangnam_Style_performs_at_Marquee,_The_Star,_Sydney,_Australia_(1).jpg",
      platform: "wikimedia",
      attribution: "Eva Rinaldi (CC BY-SA 2.0)",
      license: "CC BY-SA 2.0",
      description:
        "PSY (Park Jae-sang) performing Gangnam Style at the Marquee nightclub in Sydney, Australia during his 2012 world tour.",
      date: "2012-10",
      tags: ["live performance", "psy", "world tour"],
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    // Official PSY YouTube video — 5.2B+ views, the defining artifact of the meme.
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      title: "PSY — GANGNAM STYLE (강남스타일) M/V",
      source: "YouTube / officialpsy",
      sourceUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      platform: "youtube",
      attribution: "PSY / YG Entertainment",
      license: "YouTube Standard License",
      description:
        "The official Gangnam Style music video — the first YouTube video ever to reach one billion views, now at over 5 billion.",
      date: "2012-07-15",
      tags: ["original", "official", "music video", "5 billion views"],
      verified: true,
    },
    // ── REFERENCE ──────────────────────────────────────────────────────────────
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/gangnam-style",
      title: "Gangnam Style — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/gangnam-style",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description:
        "Comprehensive documentation of the Gangnam Style meme — its spread, variants, and cultural legacy.",
      verified: true,
    },
  ],
  sources: [
    {
      title: "Gangnam Style — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gangnam_Style",
      domain: "en.wikipedia.org",
    },
    {
      title: "Gangnam Style — Know Your Meme",
      url: "https://knowyourmeme.com/memes/gangnam-style",
      domain: "knowyourmeme.com",
    },
    {
      title: "PSY — GANGNAM STYLE (Official Music Video)",
      url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      domain: "youtube.com",
    },
  ],
};

export default entry;
