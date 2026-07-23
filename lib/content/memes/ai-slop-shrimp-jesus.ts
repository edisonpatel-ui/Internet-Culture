import type { MemeEntry } from "@/types";

const entry: MemeEntry = {
  id: "m98",
  slug: "ai-slop-shrimp-jesus",
  title: "AI Slop / Shrimp Jesus",
  category: "meme",
  description:
    "The wave of bizarre AI-generated Facebook images — especially surreal 'Shrimp Jesus' art — that flooded feeds and became shorthand for low-quality AI spam.",
  imageGradient: "from-rose-500 via-orange-400 to-amber-300",
  scores: { relevance: 78, influence: 62, cringe: 55, brainrot: 48 },
  addedAt: "2026-07-23",
  historicalDate: "2023-03-01",
  views: 2100000,
  trendDirection: "stable",
  tags: ["ai", "facebook", "slop", "2023", "generative", "spam"],
  meaning:
    "A label for the flood of low-effort AI images that spread through Facebook groups and recommendation feeds in 2023 — often religious-themed, surreal, or uncanny. 'Shrimp Jesus' became the poster child: a hyper-detailed AI portrait of Jesus made of or surrounded by shrimp. The phrase 'AI slop' captures both the aesthetic (glossy, wrong, algorithmic) and the feeling that platforms were serving machine-made filler instead of human posts.",
  origin:
    "Generative AI tools like Midjourney and DALL·E made it easy to mass-produce share-bait images. Know Your Meme and mainstream outlets documented a surge of AI religious art on Facebook in early 2023; NPR and The Verge reported on 'Shrimp Jesus' and similar images going viral in recommendation tabs. The meme crystallized criticism of platform spam and the uncanny valley of AI content pushed to older demographics.",
  timeline: [
    { date: "2022", event: "Text-to-image tools go mainstream; AI art floods social platforms" },
    { date: "Mar 2023", event: "'Shrimp Jesus' and similar AI religious images spread on Facebook" },
    { date: "Mar–Apr 2023", event: "Media coverage (NPR, Verge) turns the phenomenon into 'AI slop' discourse" },
    { date: "2023–2024", event: "'AI slop' becomes a general term for low-quality generative spam" },
    { date: "2025+", event: "Used alongside brainrot and slop discourse as platforms scale AI content" },
  ],
  examples: [
    "Grandma's feed full of AI Jesus portraits — 'this is AI slop'",
    "Shrimp Jesus reposted with 'why is Facebook like this'",
    "Commenting 'slop' under obviously Midjourney-generated engagement bait",
  ],
  relatedSlugs: ["this-is-fine", "npc-streaming", "italian-brainrot"],
  media: [
    {
      role: "reference",
      type: "embed",
      url: "https://knowyourmeme.com/memes/shrimp-jesus",
      title: "Shrimp Jesus — Know Your Meme",
      source: "Know Your Meme",
      sourceUrl: "https://knowyourmeme.com/memes/shrimp-jesus",
      platform: "knowyourmeme",
      attribution: "Know Your Meme / Literally Media",
      description: "Documentation of the Shrimp Jesus AI image and Facebook spread.",
      date: "2023",
      verified: false,
    },
    {
      role: "reference",
      type: "embed",
      url: "https://www.npr.org/2023/03/27/1165440269/ai-artificial-intelligence-facebook-misinformation",
      title: "AI images are flooding Facebook — NPR",
      source: "NPR",
      sourceUrl: "https://www.npr.org/2023/03/27/1165440269/ai-artificial-intelligence-facebook-misinformation",
      platform: "other",
      attribution: "NPR",
      description: "News coverage of AI-generated religious imagery on Facebook.",
      date: "2023",
      verified: false,
    },
  ],
  sources: [
    {
      title: "Shrimp Jesus — Know Your Meme",
      url: "https://knowyourmeme.com/memes/shrimp-jesus",
      domain: "knowyourmeme.com",
    },
    {
      title: "AI images are flooding Facebook — NPR",
      url: "https://www.npr.org/2023/03/27/1165440269/ai-artificial-intelligence-facebook-misinformation",
      domain: "npr.org",
    },
    {
      title: "Facebook is being flooded with AI-generated spam — The Verge",
      url: "https://www.theverge.com/2023/5/2/23706838/facebook-ai-generated-images-spam-recommendations",
      domain: "theverge.com",
    },
  ],
};

export default entry;
