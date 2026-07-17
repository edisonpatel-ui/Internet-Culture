import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m13",
  slug: "nyan-cat",
  title: "Nyan Cat",
  category: "meme",
  description:
    "A pixelated cat with a Pop-Tart body flying through space leaving a rainbow trail — pure early-internet whimsy.",
  imageGradient: "from-purple-500 via-pink-500 to-fuchsia-400",
  scores: { relevance: 78, brainrot: 65, cringe: 28 },
  addedAt: "2026-07-16",
  historicalDate: "2011-04-02",
  views: 3100000,
  trendDirection: "stable",
  tags: ["classic", "youtube", "cat", "animation", "animals", "music"],
  meaning:
    "An animated GIF of a grey cat with a Pop-Tart body flying through space, trailing a rainbow, set to the Japanese song 'Nyanyanyanyanyanyanya!' by daniwell. Represents peak early-internet absurdist joy.",
  origin:
    "Created by artist Chris Torres (prguitarman) and posted on April 2, 2011. YouTube user saraj00n combined the animation with daniwell's music. The resulting video went globally viral within days.",
  timeline: [
    { date: "Apr 2, 2011", event: "Chris Torres posts the original Nyan Cat GIF" },
    {
      date: "Apr 2011",
      event: "YouTube video combining the GIF with daniwell's song goes viral worldwide",
    },
    { date: "2011", event: "Tens of millions of YouTube views accumulated within weeks" },
    {
      date: "Feb 2021",
      event: "Torres sells the original Nyan Cat as an NFT for approximately 300 ETH",
    },
  ],
  examples: [
    "Nyan Cat playing in a browser tab for 10 hours straight",
    "Pop-Tart cat appearing in every possible context",
    "The earworm you cannot escape: nyan nyan nyan nyan",
  ],
  relatedSlugs: ["keyboard-cat", "doge"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/QH2-TGUlwu4/maxresdefault.jpg",
      title: "Nyan Cat — original viral YouTube video thumbnail (2011)",
      source: "YouTube / saraj00n",
      sourceUrl: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      platform: "youtube",
      attribution: "Animation: Chris Torres (prguitarman) · Music: daniwell · Upload: saraj00n",
      license: "YouTube Standard License",
      description: "Thumbnail of the original Nyan Cat viral video — the Pop-Tart cat flying through space with a rainbow trail, set to daniwell's Nyanyanya.",
      date: "2011-04-05",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      title: "Nyan Cat [original] — saraj00n",
      source: "YouTube / saraj00n",
      sourceUrl: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      platform: "youtube",
      attribution: "Animation: Chris Torres (prguitarman) · Music: daniwell",
      license: "YouTube Standard License",
      description: "The original viral composite — Chris Torres's GIF with daniwell's Nyanyanya song, posted by saraj00n in April 2011.",
      date: "2011-04-05",
      tags: ["original", "viral"],
      verified: true,
    },
  ],
  sources: [
    {
      title: "Nyan Cat — Know Your Meme",
      url: "https://knowyourmeme.com/memes/nyan-cat",
      domain: "knowyourmeme.com",
    },
    {
      title: "Nyan Cat — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Nyan_Cat",
      domain: "en.wikipedia.org",
    },
    {
      title: "Nyan Cat — original site by Chris Torres",
      url: "https://www.nyan.cat",
      domain: "nyan.cat",
    },
  ],
};

export default entry;
