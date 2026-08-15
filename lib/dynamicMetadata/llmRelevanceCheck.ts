/**
 * LLM double-check for Current Popularity — used ONLY when the heuristic
 * signal-scoring has weak corroboration (fewer than 2 independent providers
 * showing real activity). This is deliberately not run on every refresh:
 * most articles have clear enough signals that the heuristic is reliable
 * and fast, and calling an LLM on every single refresh would add latency
 * forever for no accuracy benefit on the clear cases.
 *
 * When it does run, it reasons about the evidence the way a person would —
 * catching cases where the raw numbers look convincing but are clearly
 * about the wrong thing (e.g. a common-name flood in the news).
 */

import type { BaseEntry } from "@/types";
import type { DynamicSignalBundle } from "./providers/types";
import type { RelevanceActivitySignal } from "./scoreFromEvidence";
import { callGroqJSON, isGroqConfigured } from "@/lib/ai/providers/groqReal";

/** Fewer than this many corroborating providers = ambiguous. */
const CORROBORATION_THRESHOLD = 2;

export function isRelevanceAmbiguous(
  signals: RelevanceActivitySignal[],
): boolean {
  const corroborating = new Set(
    signals.filter((s) => s.value >= 35).map((s) => s.providerId),
  ).size;
  return corroborating < CORROBORATION_THRESHOLD;
}

interface LlmRelevanceCheck {
  score: number;
  reasoning: string;
}

/**
 * Ask an LLM to independently estimate Current Popularity (0-100) from the
 * same evidence the heuristic saw. Returns null on any failure (no API key,
 * request error, bad JSON) — callers must fall back to the heuristic score
 * alone rather than blocking the refresh.
 */
export async function llmRelevanceCheck(
  entry: Pick<BaseEntry, "title" | "category" | "description">,
  bundle: DynamicSignalBundle,
  heuristicScore: number | "unknown",
): Promise<LlmRelevanceCheck | null> {
  if (!isGroqConfigured()) return null;

  const evidenceLines = bundle.observations
    .filter((o) => o.value != null)
    .map((o) => `- ${o.providerId} (${o.kind}): ${o.value}${o.note ? ` — ${o.note}` : ""}`)
    .join("\n");

  const system =
    "You are an internet-culture editor estimating how popular a specific meme/slang/creator/event/trend is RIGHT NOW (last 30-60 days), on a 0-100 scale. " +
    "You will be given raw signal readings from various sources plus a heuristic's estimate. " +
    "Be skeptical of any single flooded-looking signal — a common word or name can pull in unrelated results that have nothing to do with the actual subject. " +
    "Respond with JSON only: {\"score\": <0-100 integer>, \"reasoning\": \"<one sentence>\"}.";

  const user =
    `Subject: "${entry.title}" (${entry.category})\n` +
    `Description: ${entry.description}\n\n` +
    `Raw signal readings:\n${evidenceLines || "(none)"}\n\n` +
    `Heuristic's estimate: ${heuristicScore}\n\n` +
    `What's your independent estimate of Current Popularity right now, and does the evidence actually support it?`;

  try {
    const result = await callGroqJSON<{ score?: number; reasoning?: string }>(
      system,
      user,
      { temperature: 0.2, maxTokens: 200 },
    );
    if (typeof result.score !== "number" || Number.isNaN(result.score)) {
      return null;
    }
    const score = Math.max(0, Math.min(100, Math.round(result.score)));
    return { score, reasoning: result.reasoning ?? "" };
  } catch {
    return null;
  }
}
