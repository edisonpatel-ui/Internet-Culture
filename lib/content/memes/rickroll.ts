import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m9",
  slug: "rickroll",
  title: "Rickroll",
  category: "meme",
  description:
    "The internet's most legendary bait-and-switch — Rick Astley's 'Never Gonna Give You Up' disguised as something else.",
  imageGradient: "from-blue-600 via-indigo-500 to-violet-600",
  scores: { relevance: 85, brainrot: 50, cringe: 30 },
  addedAt: "2026-07-16",
  historicalDate: "2007-05-01",
  views: 4200000,
  trendDirection: "stable",
  tags: ["classic", "youtube", "music", "4chan", "rick astley"],
  meaning:
    "Tricking someone into clicking a disguised link that plays Rick Astley's 1987 hit 'Never Gonna Give You Up.' The joke is the surprise of the redirect, not the content.",
  origin:
    "Evolved from '4chan duckrolling,' where misleading links led to a duck-on-wheels image. In May 2007, users on 4chan's /v/ board replaced the duck with Rick Astley's music video, creating the first rickroll.",
  timeline: [
    { date: "Jul 1987", event: "'Never Gonna Give You Up' released — reaches #1 in the UK" },
    { date: "May 2007", event: "First documented rickroll appears on 4chan's /v/ board" },
    {
      date: "Nov 2008",
      event:
        "Rick Astley performs at the Macy's Thanksgiving Day Parade in disguise, rickrolling millions on live TV",
    },
    {
      date: "2012+",
      event: "Rickrolling becomes a permanent fixture of internet culture — never truly dies",
    },
  ],
  examples: [
    "Click here for the patch notes [rickroll link]",
    "Important project update attached [rickroll]",
    "You've been rickrolled — you knew it was coming",
  ],
  relatedSlugs: ["doge", "nyan-cat"],
  media: [
    // ── FEATURED ───────────────────────────────────────────────────────────────
    // YouTube thumbnail CDN (i.ytimg.com) is hotlink-safe and stable.
    {
      role: "featured",
      type: "image",
      url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      title: "Never Gonna Give You Up — official music video thumbnail (1987)",
      source: "YouTube / Rick Astley",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      platform: "youtube",
      attribution: "Rick Astley / BMG",
      license: "YouTube Standard License",
      description: "Thumbnail of the official 'Never Gonna Give You Up' video — the destination of every rickroll since 2007.",
      date: "1987",
      verified: true,
    },
    // ── VIDEO ──────────────────────────────────────────────────────────────────
    {
      role: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Rick Astley — Never Gonna Give You Up (Official Music Video)",
      source: "YouTube / Rick Astley",
      sourceUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      platform: "youtube",
      attribution: "Rick Astley / BMG",
      license: "YouTube Standard License",
      description: "The official music video — the unsuspecting destination of every rickroll since 2007.",
      date: "1987-07-27",
      tags: ["original", "music video"],
      verified: true,
    },
  ],
  sources: [
    {
      title: "Rickrolling — Know Your Meme",
      url: "https://knowyourmeme.com/memes/rickrolling",
      domain: "knowyourmeme.com",
    },
    {
      title: "Rickrolling — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Rickrolling",
      domain: "en.wikipedia.org",
    },
    {
      title: "Rick Astley — 'Never Gonna Give You Up' (Official Video)",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      domain: "youtube.com",
    },
  ],
};

export default entry;
