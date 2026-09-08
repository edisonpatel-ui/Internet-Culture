/**
 * Real Groq client (free tier, no card required — console.groq.com).
 *
 * This is the only provider in `lib/ai/providers` that actually makes a
 * network call. It is intentionally separate from the placeholder
 * OpenAI/Anthropic/Google providers so it can be swapped for a paid
 * provider later without touching the rest of the pipeline — callers only
 * depend on `callGroqJSON` / `callGroqText` / `callGroqJSONWithRetry` below,
 * not on the Groq wire format.
 */

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Model choice matters here: must support `response_format: json_object`
 * on Groq and have enough context for a full encyclopedia-article prompt.
 *
 * IMPORTANT — do not "fix" these back to llama-3.3-70b-versatile or
 * llama-3.1-8b-instant. Both were deprecated by Groq on 2026-06-17 and
 * fully decommissioned on 2026-08-16 (see
 * https://console.groq.com/docs/deprecations) — requests to either now
 * fail outright with a `model_decommissioned` error, which is strictly
 * worse than a TPM rate limit. gpt-oss-120b / gpt-oss-20b are Groq's own
 * recommended replacements (same task class, comparable-or-better quality,
 * faster inference) and are what's actually being served today.
 *
 * Both are overridable via env var so a future model swap (Groq will keep
 * deprecating models on this cadence) never requires another code change:
 *   GROQ_MODEL        — primary model for normal-sized requests
 *   GROQ_RETRY_MODEL   — smaller/faster model used for the one-shot retry
 *                        after a 429/TPM rate-limit error (see
 *                        callGroqJSONWithRetry below)
 */
const DEFAULT_MODEL = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";
const RETRY_MODEL = process.env.GROQ_RETRY_MODEL?.trim() || "openai/gpt-oss-20b";

export class GroqNotConfiguredError extends Error {
  constructor() {
    super("GROQ_API_KEY is not set — real generation is unavailable.");
    this.name = "GroqNotConfiguredError";
  }
}

export class GroqRequestError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "GroqRequestError";
  }
}

interface GroqChatResponse {
  choices?: Array<{
    message?: { content?: string };
    finish_reason?: string;
  }>;
  error?: { message?: string; code?: string; type?: string };
}

export interface GroqCallOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  /** Ask Groq to constrain output to a single JSON object. */
  json?: boolean;
}

function apiKey(): string | undefined {
  return process.env.GROQ_API_KEY?.trim() || undefined;
}

export function isGroqConfigured(): boolean {
  return Boolean(apiKey());
}

/**
 * True if this error is Groq's TPM/rate-limit rejection — the case
 * `callGroqJSONWithRetry` retries once for, rather than failing straight
 * to the offline fallback. Checks both the HTTP status Groq uses (429) and
 * the error body wording, since some proxies/SDKs normalize the status
 * code but always preserve the message.
 */
export function isRateLimitError(err: unknown): err is GroqRequestError {
  if (!(err instanceof GroqRequestError)) return false;
  if (err.status === 429) return true;
  return /rate.?limit|tokens per minute|\bTPM\b/i.test(err.message);
}

/**
 * Low-level chat call — one request, no retry. Throws GroqNotConfiguredError
 * if no key is set so callers can fall back cleanly instead of silently
 * producing empty prose.
 */
export async function callGroq(
  system: string,
  user: string,
  opts: GroqCallOptions = {},
): Promise<string> {
  const key = apiKey();
  if (!key) throw new GroqNotConfiguredError();

  const res = await fetch(GROQ_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: opts.model ?? DEFAULT_MODEL,
      temperature: opts.temperature ?? 0.4,
      max_tokens: opts.maxTokens ?? 4000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      ...(opts.json ? { response_format: { type: "json_object" } } : {}),
    }),
  });

  const data = (await res.json().catch(() => null)) as GroqChatResponse | null;

  if (!res.ok) {
    throw new GroqRequestError(
      data?.error?.message ?? `Groq request failed (${res.status})`,
      res.status,
    );
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new GroqRequestError("Groq returned an empty response.");
  }
  return content;
}

/**
 * Call Groq and parse the response as JSON. Strips a stray ```json fence
 * if the model adds one despite response_format.
 */
export async function callGroqJSON<T>(
  system: string,
  user: string,
  opts: GroqCallOptions = {},
): Promise<T> {
  const raw = await callGroq(system, user, { ...opts, json: true });
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new GroqRequestError(
      "Groq response was not valid JSON after cleanup.",
    );
  }
}

/**
 * Same as callGroqJSON, but if the first attempt fails with a Groq
 * TPM/rate-limit error (429), retries exactly once using the smaller/faster
 * RETRY_MODEL and a further-trimmed prompt — before letting the error
 * propagate to the caller's existing offline-fallback logic.
 *
 * `buildUser` is a factory rather than a plain string so the caller can
 * hand back a genuinely smaller prompt on the retry attempt (fewer source
 * excerpts, shorter draft-content context, etc.) instead of this function
 * blindly slicing prompt text — blind truncation risks cutting off the
 * required JSON-schema instructions callers put at the end of the user
 * message, which would break response parsing entirely.
 *
 * Any other error (bad JSON, missing key, non-429 failure) is NOT retried
 * here and propagates immediately, same as plain callGroqJSON — callers
 * catch that and fall back to the offline/basic reviser, unchanged.
 */
export async function callGroqJSONWithRetry<T>(
  system: string,
  buildUser: (attempt: 1 | 2) => string,
  opts: GroqCallOptions = {},
): Promise<T> {
  try {
    return await callGroqJSON<T>(system, buildUser(1), opts);
  } catch (err) {
    if (!isRateLimitError(err)) throw err;

    console.warn(
      `[Groq] TPM rate limit hit on ${opts.model ?? DEFAULT_MODEL} — retrying once with ${RETRY_MODEL} and a trimmed prompt.`,
    );

    return await callGroqJSON<T>(system, buildUser(2), {
      ...opts,
      model: RETRY_MODEL,
      // The retry model is smaller/faster and the retry prompt is smaller
      // too, so cap completion tokens tighter as well — no reason to ask
      // for as much output budget as the primary attempt did.
      maxTokens: Math.min(opts.maxTokens ?? 4000, 2000),
    });
  }
}
