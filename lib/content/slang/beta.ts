import type { SlangEntry } from "@/types";

const entry: SlangEntry = {
  id: "s99",
  slug: "beta",
  title: "Beta",
  category: "slang",
  description:
    "Internet slang for a submissive, low-status man — the pejorative opposite of 'alpha' — widely used across manosphere and incel forums.",
  imageGradient: "from-slate-600 via-gray-500 to-zinc-600",
  scores: { relevance: 36, influence: 50, cringe: 55, brainrot: 25 },
  addedAt: "2026-09-12",
  views: 1300000,
  trendDirection: "stable",
  tags: ["manosphere", "incel", "internet meme", "hierarchy", "masculinity"],
  definition:
    "Beta (short for 'beta male') is an insult describing a man framed as weak, submissive, sexually unsuccessful, or lacking traditional masculine confidence — the opposite of an 'alpha.' It's used pejoratively by manosphere and incel communities and has since spread into broader, often ironic, internet meme usage.",
  origin:
    "Like 'alpha,' the term borrows from early ethology research on animal dominance hierarchies that has since been widely criticized by scientists as an oversimplified, largely inapplicable model for human behavior. 'Beta' gained traction in manosphere blogs and forums in the early 2010s as a pejorative self-identifier among incels and an insult for other men, and later spread into wider ironic meme usage, including the related 'sigma male' archetype that positions itself outside the alpha/beta hierarchy.",
  usageExamples: [
    "Used as an insult implying a man lacks confidence or assertiveness",
    "Incel forum posts self-identifying as 'beta' in a resigned or bitter tone",
    "Ironic meme captions mocking exaggerated alpha/beta hierarchy claims",
  ],
  relatedSlugs: ["alpha", "sigma", "simp"],
  sources: [
    {
      title: "Is \"Beta Male\" Slang or Science?",
      url: "https://dudewipes.com/blogs/dude-blog/beta-male",
      domain: "dudewipes.com",
    },
  ],
};

export default entry;
