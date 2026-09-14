import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s98",
  slug: "alpha",
  title: "Alpha",
  category: "slang",
  description:
    "Internet slang borrowed from animal ethology describing a dominant, confident, high-status man — a core concept of manosphere and pickup-artist culture.",
  imageGradient: "from-red-800 via-orange-700 to-yellow-600",
  scores: { relevance: 40, influence: 55, cringe: 45, brainrot: 25 },
  addedAt: "2026-09-12",
  views: 1500000,
  trendDirection: "stable",
  tags: ["manosphere", "pickup artist community", "internet meme", "hierarchy", "masculinity"],
  definition:
    "Alpha (short for 'alpha male') describes a man framed as dominant, assertive, sexually successful, and high-status — the aspirational opposite of a 'beta.' Originally a term from animal behavior research, it was adopted by the pickup-artist community and later the broader manosphere, and now circulates widely in memes both sincerely and ironically.",
  origin:
    "The concept was developed by biologist L. David Mech in early wolf-pack research (which Mech later said was oversimplified and has since walked back). The seduction community adopted 'alpha' to describe an aspirational masculine archetype in the 2000s, and it spread into wider manosphere forums and 4chan-adjacent meme culture through the 2010s, where it's used both as a genuine aspiration and as ironic exaggeration in 'alpha as fuck' greentext-style jokes.",
  usageExamples: [
    "\"He's such an alpha\" said admiringly about a confident public figure",
    "Ironic 4chan-style greentext stories mocking exaggerated 'alpha' behavior",
    "Self-help content framed around 'becoming more alpha'",
  ],
  relatedSlugs: ["beta", "sigma", "gigachad"],
  sources: [
    {
      title: "Alpha and beta male — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Alpha_and_beta_male",
      domain: "en.wikipedia.org",
    },
  ],
};

export default entry;
