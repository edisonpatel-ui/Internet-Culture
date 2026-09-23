/**
 * lib/api/keys.ts
 *
 * API key issuance for the public v1 API (app/api/v1/**).
 *
 * Design (defensive, non-breaking):
 *  - Raw keys are never stored anywhere. Only their SHA-256 hash is persisted
 *    in Redis, under `apikey:<hashedKey>`. This mirrors how a leaked database
 *    read (Redis dump, backup, log line) cannot be turned back into a usable
 *    credential — the same principle as storing password hashes, not
 *    passwords.
 *  - Uses Web Crypto's `crypto.subtle.digest("SHA-256", ...)`, available in
 *    both the Node.js and Edge runtimes, so this module has no runtime
 *    constraint and can be imported from either.
 *  - Uses `@upstash/redis`'s REST client (already a project dependency —
 *    see lib/services/metricsHistory.ts), so no new persistent connection
 *    or infrastructure is introduced.
 *  - This module only ever ADDS a new Redis key namespace (`apikey:*`). It
 *    does not touch any existing key, route, or content — fully additive.
 */

import { Redis } from "@upstash/redis";

export type ApiKeyTier = "free" | "pro";

/** Per-tier request budget, expressed as requests allowed per 60-second window. */
export const TIER_RATE_LIMITS: Record<ApiKeyTier, number> = {
  free: 60,
  pro: 1000,
};

export interface ApiKeyRecord {
  owner: string;
  tier: ApiKeyTier;
  createdAt: string;
  /** Requests allowed per 60-second window for this key's tier. */
  rateLimit: number;
}

export interface GeneratedApiKey {
  /** The plaintext key — shown to the caller exactly once, never stored. */
  rawKey: string;
  /** SHA-256 hex digest of rawKey — this is what gets persisted/looked up. */
  hashedKey: string;
}

const KEY_PREFIX = "cg_live_";
const REDIS_KEY_PREFIX = "apikey:";

let cachedClient: Redis | null = null;

/**
 * Lazily constructs the shared Upstash REST client. Fails loudly (rather
 * than with an opaque network error) if env vars are missing, matching the
 * convention in lib/services/metricsHistory.ts.
 */
function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "[lib/api/keys] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN. " +
        "Set both in your environment (see .env.example) before issuing or validating API keys.",
    );
  }

  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Converts a byte buffer to a lowercase hex string. */
function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** SHA-256 hashes a UTF-8 string, returning a lowercase hex digest. */
async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(digest);
}

/**
 * Generates a new API key.
 *
 * Returns both the raw key (to hand to the caller once) and its SHA-256
 * hash (what actually gets stored). The raw key is never persisted by this
 * function — callers are responsible for displaying/transmitting it
 * securely and must not log it.
 */
export async function generateApiKey(): Promise<GeneratedApiKey> {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const randomHex = toHex(randomBytes.buffer);
  const rawKey = `${KEY_PREFIX}${randomHex}`;
  const hashedKey = await sha256Hex(rawKey);
  return { rawKey, hashedKey };
}

/**
 * Hashes a caller-supplied raw key the same way generateApiKey does, for use
 * at validation time (lib/api/validateRequest.ts). Exported so the two sides
 * of the system can never drift apart.
 */
export async function hashApiKey(rawKey: string): Promise<string> {
  return sha256Hex(rawKey);
}

/**
 * Registers a brand-new API key for `owner` at the given `tier`, storing
 * only its hash (plus metadata) in Redis. Returns the one-time raw key that
 * must be handed to the owner now — it cannot be recovered afterward.
 */
export async function registerApiKey(
  owner: string,
  tier: ApiKeyTier,
): Promise<GeneratedApiKey> {
  if (!owner || !owner.trim()) {
    throw new Error("[lib/api/keys] registerApiKey requires a non-empty owner.");
  }
  if (tier !== "free" && tier !== "pro") {
    throw new Error(`[lib/api/keys] Invalid tier "${tier}". Expected "free" or "pro".`);
  }

  const { rawKey, hashedKey } = await generateApiKey();

  const record: ApiKeyRecord = {
    owner: owner.trim(),
    tier,
    createdAt: new Date().toISOString(),
    rateLimit: TIER_RATE_LIMITS[tier],
  };

  const redis = getRedisClient();
  await redis.set(`${REDIS_KEY_PREFIX}${hashedKey}`, record);

  return { rawKey, hashedKey };
}

/** Looks up a stored key record by its hash. Returns null if not found. */
export async function getApiKeyRecord(hashedKey: string): Promise<ApiKeyRecord | null> {
  const redis = getRedisClient();
  const record = await redis.get<ApiKeyRecord>(`${REDIS_KEY_PREFIX}${hashedKey}`);
  return record ?? null;
}
