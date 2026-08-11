/**
 * Real Groq client (free tier, no card required — console.groq.com).
 *
 * This is the only provider in `lib/ai/providers` that actually makes a
 * network call. It is intentionally separate from the placeholder
 * OpenAI/Anthropic/Google providers so it can be swapped for a paid
 * provider later without touching the rest of the pipeline — callers only
 * depend on `callGroqJSON` / `callGroqText` below, not on the Groq wire
 * format.
 */

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Model choice matters here: must support `response_format: json_object`
 * on Groq and have enough context for a full encyclopedia-article prompt.
 * Llama 3.3 70B is the best free-tier balance of quality and speed.
 */
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

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
  error?: { message?: string };
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
 * Low-level chat call. Throws GroqNotConfiguredError if no key is set so
 * callers can fall back cleanly instead of silently producing empty prose.
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
