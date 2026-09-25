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
 *  - This module only ever ADDS to the `apikey:*` Redis namespace. It does
 *    not touch any existing key, route, or content — fully additive.
 *
 * Tiers, v2 (Stripe Sandbox launch):
 *  - "free"    — admin-issued only (app/api/admin/keys), for internal
 *                testing/partner trials. No monthly quota; a modest 60/min
 *                burst cap still applies.
 *  - "starter" — $19/mo via Stripe Checkout. 25,000 req/mo, 100/min burst.
 *  - "pro"     — $49/mo via Stripe Checkout. 250,000 req/mo, 1000/min burst.
 *  Monthly quotas are enforced separately in lib/api/validateRequest.ts;
 *  this file only defines the numbers and persists them on the key record.
 */

import { Redis } from "@upstash/redis";

export type ApiKeyTier = "free" | "starter" | "pro";

/** Per-tier burst budget: requests allowed per 60-second window. */
export const TIER_RATE_LIMITS: Record<ApiKeyTier, number> = {
  free: 60,
  starter: 100,
  pro: 1000,
};

/**
 * Per-tier monthly request quota. `null` means no monthly cap (only the
 * "free" tier — internal/testing keys issued directly by an admin).
 */
export const TIER_MONTHLY_QUOTAS: Record<ApiKeyTier, number | null> = {
  free: null,
  starter: 25_000,
  pro: 250_000,
};

export interface ApiKeyRecord {
  /** Owner label — a partner name for admin-issued keys, or the customer's email for paid keys. */
  owner: string;
  tier: ApiKeyTier;
  createdAt: string;
  /** Requests allowed per 60-second window for this key's tier. */
  rateLimit: number;
  /** Requests allowed per calendar month, or null for no cap (free/testing keys). */
  monthlyQuota: number | null;
  /** Present only for Stripe-originated keys — lets support look a key up by customer. */
  stripeCustomerEmail?: string;
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

async function persistKeyRecord(hashedKey: string, record: ApiKeyRecord): Promise<void> {
  const redis = getRedisClient();
  await redis.set(`${REDIS_KEY_PREFIX}${hashedKey}`, record);
}

/**
 * Registers a brand-new API key for `owner` at the given `tier`, storing
 * only its hash (plus metadata) in Redis. Returns the one-time raw key that
 * must be handed to the owner now — it cannot be recovered afterward.
 *
 * Used by the admin key generator (app/api/admin/keys) for internal
 * testing/partner trials. Always issues with the tier's default monthly
 * quota (null for "free") — for a Stripe purchase, use registerPaidApiKey
 * instead so the customer's email is recorded on the record.
 */
export async function registerApiKey(
  owner: string,
  tier: ApiKeyTier,
): Promise<GeneratedApiKey> {
  if (!owner || !owner.trim()) {
    throw new Error("[lib/api/keys] registerApiKey requires a non-empty owner.");
  }
  if (!(tier in TIER_RATE_LIMITS)) {
    throw new Error(`[lib/api/keys] Invalid tier "${tier}".`);
  }

  const { rawKey, hashedKey } = await generateApiKey();

  const record: ApiKeyRecord = {
    owner: owner.trim(),
    tier,
    createdAt: new Date().toISOString(),
    rateLimit: TIER_RATE_LIMITS[tier],
    monthlyQuota: TIER_MONTHLY_QUOTAS[tier],
  };

  await persistKeyRecord(hashedKey, record);

  return { rawKey, hashedKey };
}

/**
 * Registers a key from a completed Stripe Checkout session
 * (app/api/webhooks/stripe/route.ts). Only "starter" and "pro" are valid
 * paid tiers — records the customer's email alongside the owner label so
 * support can trace a key back to a Stripe customer.
 */
export async function registerPaidApiKey(
  customerEmail: string,
  tier: Extract<ApiKeyTier, "starter" | "pro">,
): Promise<GeneratedApiKey> {
  if (!customerEmail || !customerEmail.trim()) {
    throw new Error("[lib/api/keys] registerPaidApiKey requires a non-empty customer email.");
  }
  if (tier !== "starter" && tier !== "pro") {
    throw new Error(`[lib/api/keys] Invalid paid tier "${tier}". Expected "starter" or "pro".`);
  }

  const { rawKey, hashedKey } = await generateApiKey();
  const email = customerEmail.trim().toLowerCase();

  const record: ApiKeyRecord = {
    owner: email,
    tier,
    createdAt: new Date().toISOString(),
    rateLimit: TIER_RATE_LIMITS[tier],
    monthlyQuota: TIER_MONTHLY_QUOTAS[tier],
    stripeCustomerEmail: email,
  };

  await persistKeyRecord(hashedKey, record);

  return { rawKey, hashedKey };
}

/** Looks up a stored key record by its hash. Returns null if not found. */
export async function getApiKeyRecord(hashedKey: string): Promise<ApiKeyRecord | null> {
  const redis = getRedisClient();
  const record = await redis.get<ApiKeyRecord>(`${REDIS_KEY_PREFIX}${hashedKey}`);
  return record ?? null;
}
