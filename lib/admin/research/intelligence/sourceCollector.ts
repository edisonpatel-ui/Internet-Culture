/**
 * Source collector — cite URL-backed evidence only.
 * Seeds include Knowledge Engine trusted-source discovery candidates.
 */

import type { Evidence, ResearchInput, SourceCollector } from "./types";

function id(topic: string, n: number): string {
  return `ev-${topic.slice(0, 12).replace(/\s+/g, "-").toLowerCase()}-${n}`;
}

function classifyUrl(url: string): Evidence["sourceCategory"] {
  if (/knowyourmeme\.com/i.test(url)) return "know_your_meme";
  if (/wikipedia\.org|wiktionary\.org|wikimedia\.org/i.test(url)) {
    return "wikipedia";
  }
  if (/archive\.org|web\.archive/i.test(url)) return "archive";
  if (/youtube\.com|youtu\.be/i.test(url)) return "platform_documentation";
  if (
    /merriam-webster|dictionary\.com|cambridge\.org|oxford/i.test(url)
  ) {
    return "official";
  }
  if (/news\.google|nytimes|bbc\.|reuters|theguardian/i.test(url)) {
    return "journalism";
  }
  return "unknown";
}

function tierForUrl(url: string): Evidence["tier"] {
  if (/wikipedia\.org|knowyourmeme\.com|wiktionary\.org/i.test(url)) {
    return "High";
  }
  if (
    /merriam-webster|dictionary\.com|cambridge\.org|oxford|imdb\.com|steampowered|genius\.com/i.test(
      url,
    )
  ) {
    return "Medium";
  }
  return "Medium";
}

export const mockSourceCollector: SourceCollector = {
  collect(input: ResearchInput): Evidence[] {
    const seeds = input.seedSources ?? [];
    const evidence: Evidence[] = [];
    const seen = new Set<string>();

    seeds.forEach((s, i) => {
      const url = s.url?.trim();
      if (!url || !/^https?:\/\//i.test(url)) return;
      if (seen.has(url)) return;
      seen.add(url);
      evidence.push({
        id: id(input.topic, 10 + i),
        claim: `Trusted-source candidate for ${input.topic}: ${s.title}`,
        sourceTitle: s.title,
        sourceUrl: url,
        sourceCategory: classifyUrl(url),
        tier: tierForUrl(url),
        notes:
          "Knowledge Engine discovery / seed URL — eligible for citation grounding.",
      });
    });

    return evidence;
  },
};
