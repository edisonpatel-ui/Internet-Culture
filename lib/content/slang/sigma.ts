import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s4",
  slug: "sigma",
  title: "Sigma",
  category: "slang",
  description:
    "A 'lone wolf' male archetype who rejects the alpha/beta social hierarchy — now mostly used ironically as a meme.",
  imageGradient: "from-violet-600 via-purple-500 to-fuchsia-500",
  scores: { relevance: 47, influence: 78, cringe: 90, brainrot: 88 },
  addedAt: "2026-07-01",
  views: 284000,
  trendDirection: "declining",
  definition:
    "Sigma (as in 'sigma male') describes a self-styled lone-wolf type who supposedly succeeds without chasing status inside the usual alpha/beta social hierarchy — independent, quiet, and 'above' conventional dominance games. Online, the label is almost always ironic: people call mundane or edgy behavior 'sigma' as a joke, especially in 'sigma grindset' phonk memes and TikTok satire.",
  origin:
    "Grew out of online manosphere / incel-adjacent personality taxonomies that ranked men as alpha, beta, sigma, etc. TikTok and grindset meme accounts turned the archetype into widespread satire in the early 2020s.",
  usageExamples: [
    "Sigma grindset: waking up at 4am to post memes",
    "He's so sigma he eats lunch alone by choice",
    "Sigma male playlist — phonk only",
  ],
  relatedSlugs: [
    "sigma-grindset",
    "mewing",
    "looksmaxxing",
    "aura",
    "mogging",
  ],
  relationships: {
    relatedTo: ["sigma-grindset"],
    relatedSlang: ["aura"],
    sameEra: ["mewing", "looksmaxxing", "mogging"],
  },
  sources: [
    {
      title: "Sigma male — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Sigma_male",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
