import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s7",
  slug: "no-cap",
  title: "No Cap",
  category: "slang",
  description:
    "'No lie' / 'I'm being serious' — 'cap' means a lie, so 'no cap' means telling the truth.",
  imageGradient: "from-blue-500 via-indigo-500 to-violet-500",
  scores: { relevance: 79, influence: 79, cringe: 25, brainrot: 31 },
  addedAt: "2026-05-15",
  views: 290000,
  trendDirection: "stable",
  definition:
    "No cap means 'no lie' or 'for real' — you're emphasizing that a statement is true. 'Cap' means a lie or exaggeration; 'capping' is lying; 'stop capping' means stop lying. Common in hip-hop and AAVE, then mainstream Gen Z speech via social media and music in the late 2010s.",
  origin:
    "From African American Vernacular English and Atlanta hip-hop (artists such as Young Thug helped popularize 'cap' / 'no cap' in lyrics). Broad internet adoption followed in the late 2010s.",
  usageExamples: [
    "That concert was fire, no cap",
    "No cap? (seeking confirmation)",
    "Stop capping — we know you're exaggerating",
  ],
  relatedSlugs: ["bussin", "based", "deadass", "bet", "sus"],
  relationships: {
    relatedSlang: ["based", "deadass", "bet", "sus", "bussin"],
    community: ["based"],
  },
  sources: [
    {
      title: "No Cap — Know Your Meme",
      url: "https://knowyourmeme.com/memes/no-cap",
      domain: "knowyourmeme.com",
    },
    {
      title: "no cap — Wiktionary",
      url: "https://en.wiktionary.org/wiki/no_cap",
      domain: "en.wiktionary.org",
    },
  ],
};

export default entry;
