/**
 * Real Tavily web search client (free tier, no card required — tavily.com).
 *
 * Used only by the real generation path (`realArticleGeneration.ts`) to
 * ground drafts in actual current sources. Never used on public pages.
 */

const TAVILY_ENDPOINT = "https://api.tavily.com/search";

export class TavilyNotConfiguredError extends Error {
  constructor() {
    super("TAVILY_API_KEY is not set — live source search is unavailable.");
    this.name = "TavilyNotConfiguredError";
  }
}

export interface TavilyResult {
  title: string;
  url: string;
  /** Short extracted snippet Tavily judged most relevant to the query. */
  content: string;
  score: number;
}

interface TavilyResponse {
  results?: Array<{
    title?: string;
    url?: string;
    content?: string;
    score?: number;
  }>;
  answer?: string;
  error?: string;
}

function apiKey(): string | undefined {
  return process.env.TAVILY_API_KEY?.trim() || undefined;
}

export function isTavilyConfigured(): boolean {
  return Boolean(apiKey());
}

export interface TavilySearchOptions {
  maxResults?: number;
  searchDepth?: "basic" | "advanced";
  /** Restrict to domains the site already treats as trustworthy. */
  includeDomains?: string[];
  includeAnswer?: boolean;
}

/**
 * Run one Tavily search. Returns [] (never throws on empty results) so a
 * single weak query doesn't abort the whole research pass — but throws
 * TavilyNotConfiguredError / a network error, since those mean the caller
 * should stop and fall back rather than silently produce a source-free draft.
 */
export async function tavilySearch(
  query: string,
  opts: TavilySearchOptions = {},
): Promise<{ results: TavilyResult[]; answer?: string }> {
  const key = apiKey();
  if (!key) throw new TavilyNotConfiguredError();

  const res = await fetch(TAVILY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      query,
      search_depth: opts.searchDepth ?? "advanced",
      max_results: opts.maxResults ?? 6,
      include_answer: opts.includeAnswer ?? false,
      ...(opts.includeDomains ? { include_domains: opts.includeDomains } : {}),
    }),
  });

  const data = (await res.json().catch(() => null)) as TavilyResponse | null;

  if (!res.ok) {
    throw new Error(
      `Tavily request failed (${res.status}): ${data?.error ?? "unknown error"}`,
    );
  }

  const results: TavilyResult[] = (data?.results ?? [])
    .filter((r) => r.url && r.title)
    .map((r) => ({
      title: r.title!,
      url: r.url!,
      content: r.content ?? "",
      score: r.score ?? 0,
    }));

  return { results, answer: data?.answer };
}

/**
 * Run several searches in parallel and merge, deduped by URL — the shape
 * a research pass actually needs (overview + origin + recent activity).
 */
export async function tavilySearchMany(
  queries: string[],
  opts: TavilySearchOptions = {},
): Promise<TavilyResult[]> {
  const batches = await Promise.all(
    queries.map((q) => tavilySearch(q, opts).catch(() => ({ results: [] as TavilyResult[] }))),
  );
  const seen = new Set<string>();
  const merged: TavilyResult[] = [];
  for (const batch of batches) {
    for (const r of batch.results) {
      if (seen.has(r.url)) continue;
      seen.add(r.url);
      merged.push(r);
    }
  }
  return merged.sort((a, b) => b.score - a.score);
}
