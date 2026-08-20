/**
 * LLM judgment over REAL fetched evidence (Reddit/Bluesky post text, News
 * headlines) for Cringe, Brainrot, and Influence.
 *
 * This replaces catalog-evidence's regex keyword-matching as the PRIMARY
 * source for these scores. The old approach scored "absurdity",
 * "mockery-signal", etc. by pattern-matching the article's OWN title/tags —
 * which is circular (an entry only scored as brainrot if someone had
 * already tagged it that way) and is not real-world evidence at all.
 *
 * This step instead reads actual community text collected this refresh and
 * asks an LLM to judge it the way a person would. If there's no live
 * evidence text (obscure/new entry, all providers came back empty), this
 * returns null and callers fall back to the catalog-evidence heuristic as a
 * last resort — never the other way around.
 */

import type { DynamicSignalBundle, DynamicSignalObservation } from "./providers/types";
import { callGroqJSON, isGroqConfigured } from "@/lib/ai/providers/groqReal";

export interface CulturalJudgmentResult {
  absurdity: number | null;
  cohortAdoption: number | null;
  remixActivity: number | null;
  mockerySignal: number | null;
  outdatedness: number | null;
  confidence: number;
  reasoning: string;
}

interface RawCulturalJudgment {
  absurdity?: number | null;
  cohortAdoption?: number | null;
  remixActivity?: number | null;
  mockerySignal?: number | null;
  outdatedness?: number | null;
  confidence?: number;
  reasoning?: string;
}

function collectEvidenceText(bundle: DynamicSignalBundle, maxItems = 20): string[] {
  const out: string[] = [];
  for (const o of bundle.observations as DynamicSignalObservation[]) {
    if (o.evidenceText && o.evidenceText.length > 0) {
      out.push(...o.evidenceText.map((t) => `[${o.providerId}] ${t}`));
    }
  }
  return out.slice(0, maxItems);
}

function clampOrNull(v: unknown): number | null {
  if (typeof v !== "number" || Number.isNaN(v)) return null;
  return Math.max(0, Math.min(100, Math.round(v)));
}

/**
 * Judge Cringe + Brainrot character from real evidence text.
 * Returns null when Groq isn't configured or no live evidence text exists
 * at all — callers must fall back to catalog-evidence, never invent this.
 */
export async function judgeCulturalIdentity(
  entry: { title: string; category: string },
  bundle: DynamicSignalBundle,
): Promise<CulturalJudgmentResult | null> {
  if (!isGroqConfigured()) return null;

  const evidence = collectEvidenceText(bundle);
  if (evidence.length === 0) return null;

  const system =
    "You are an internet-culture editor judging a subject's cultural character from REAL evidence " +
    "(actual Reddit/Bluesky post text and news headlines gathered this session) — never from the subject's own " +
    "site tags or category label, which you are not shown and must not assume. Score five independent things, " +
    "0-100, or null if the evidence genuinely doesn't speak to it:\n" +
    "- absurdity: how absurd/chaotic/overstimulating IS the thing itself (not how the posts talk about it)\n" +
    "- cohortAdoption: how strongly adopted by Gen Alpha / hyper-online short-form culture specifically\n" +
    "- remixActivity: how much people are remixing/templating/reformatting it into derivative content\n" +
    "- mockerySignal: how much the evidence shows people mocking, cringing at, or being embarrassed by this\n" +
    "- outdatedness: how much the evidence shows people treating this as dated/played-out/cringe-because-old\n" +
    "Do not default to a middling score out of caution — if the evidence clearly shows something (e.g. posts " +
    "mocking it, or posts using it as a serious reference with no mockery), score it accordingly. If the " +
    "evidence is generic activity with no cultural-character signal either way, use null for that field, not a " +
    "guess. Also return a 0-100 confidence for the whole judgment and a one-sentence reasoning grounded in " +
    "specific evidence items you saw. Respond with JSON only: " +
    '{"absurdity": number|null, "cohortAdoption": number|null, "remixActivity": number|null, ' +
    '"mockerySignal": number|null, "outdatedness": number|null, "confidence": number, "reasoning": string}';

  const user =
    `Subject: "${entry.title}" (${entry.category})\n\n` +
    `Real evidence gathered this session:\n${evidence.map((e) => `- ${e}`).join("\n")}\n\n` +
    "Judge only from the evidence above.";

  try {
    const result = await callGroqJSON<RawCulturalJudgment>(system, user, {
      temperature: 0.2,
      maxTokens: 350,
    });
    return {
      absurdity: clampOrNull(result.absurdity),
      cohortAdoption: clampOrNull(result.cohortAdoption),
      remixActivity: clampOrNull(result.remixActivity),
      mockerySignal: clampOrNull(result.mockerySignal),
      outdatedness: clampOrNull(result.outdatedness),
      confidence: clampOrNull(result.confidence) ?? 40,
      reasoning: result.reasoning?.trim() || "",
    };
  } catch {
    return null;
  }
}

export interface InfluenceJudgmentResult {
  derivativeAdoption: number | null;
  confidence: number;
  reasoning: string;
}

interface RawInfluenceJudgment {
  derivativeAdoption?: number | null;
  confidence?: number;
  reasoning?: string;
}

/**
 * Judge derivative-culture adoption from real evidence text — the one input
 * Influence is allowed to move on. "Did other people/communities/creators
 * actually build on or reference this?" not "is it visible right now."
 * Returns null when unconfigured or no evidence — Influence then stays
 * exactly where it was (never invented from silence).
 */
export async function judgeInfluenceEvidence(
  entry: { title: string; category: string },
  bundle: DynamicSignalBundle,
  currentInfluence: number,
): Promise<InfluenceJudgmentResult | null> {
  if (!isGroqConfigured()) return null;

  const evidence = collectEvidenceText(bundle);
  if (evidence.length === 0) return null;

  const system =
    "You are an internet-culture editor judging lasting Influence — NOT current popularity, fame, reach, or " +
    "virality. Influence means: did this permanently shape how people communicate/create online — did other " +
    "creators, communities, or formats visibly build on it? Being widely seen is not influence; being widely " +
    "COPIED, REFERENCED, or BUILT ON is. From the real evidence text given, score derivativeAdoption 0-100: " +
    "clear evidence of others adopting/referencing/building on this = high; the evidence is just people " +
    "discussing the thing itself with no sign of derivative adoption = should stay near the current baseline, " +
    "not rise; use null if the evidence doesn't speak to derivative adoption either way. Be conservative — this " +
    "score should rarely move far from the current baseline in one refresh; only strong, clear, repeated " +
    "evidence should shift it. Respond with JSON only: " +
    '{"derivativeAdoption": number|null, "confidence": number, "reasoning": string}';

  const user =
    `Subject: "${entry.title}" (${entry.category})\n` +
    `Current Influence baseline: ${currentInfluence}\n\n` +
    `Real evidence gathered this session:\n${evidence.map((e) => `- ${e}`).join("\n")}\n\n` +
    "Judge only from the evidence above.";

  try {
    const result = await callGroqJSON<RawInfluenceJudgment>(system, user, {
      temperature: 0.15,
      maxTokens: 250,
    });
    return {
      derivativeAdoption: clampOrNull(result.derivativeAdoption),
      confidence: clampOrNull(result.confidence) ?? 35,
      reasoning: result.reasoning?.trim() || "",
    };
  } catch {
    return null;
  }
}
