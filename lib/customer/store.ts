/**
 * lib/customer/store.ts
 *
 * Customer account records, keyed by email — the piece that lets a
 * logged-in dashboard user's session (just an email, see
 * lib/customerAuth/session.ts) be resolved to "their" Stripe customer and
 * "their" active API key. lib/api/keys.ts's records are keyed by hashed
 * key (right for auth/rate-limiting lookups on every API request); this is
 * the reverse index the dashboard needs (right for "what does this logged
 * in customer own").
 *
 * Storage model:
 *   customer:<email> → CustomerRecord (JSON)
 */

import { Redis } from "@upstash/redis";
import type { ApiKeyTier } from "@/lib/api/keys";

export interface CustomerRecord {
  email: string;
  stripeCustomerId: string;
  tier: Extract<ApiKeyTier, "starter" | "pro">;
  /** Hash of the customer's current active key (lib/api/keys.ts apikey:<hash> record). */
  hashedKey: string;
  /** Last 4 characters of the raw key, for masked display — never the full key. */
  keyLastFour: string;
  createdAt: string;
  updatedAt: string;
  /**
   * bcrypt hash of the customer's dashboard password (lib/customerAuth/passwords.ts),
   * for the password-login option added alongside the original magic-link
   * flow. Absent for every account created before this field existed, and
   * for any account that has never set a password — those customers can
   * only log in via magic link until they use "Forgot password" once,
   * which doubles as "set a password for the first time" (see
   * app/api/auth/reset-password/route.ts). Never the plaintext password.
   */
  passwordHash?: string;
}

const CUSTOMER_KEY_PREFIX = "customer:";

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/customer/store] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getCustomerRecord(email: string): Promise<CustomerRecord | null> {
  const redis = getRedisClient();
  const record = await redis.get<CustomerRecord>(`${CUSTOMER_KEY_PREFIX}${normalizeEmail(email)}`);
  return record ?? null;
}

/** Creates or fully overwrites a customer record — used on initial checkout completion. */
export async function upsertCustomerRecord(record: CustomerRecord): Promise<void> {
  const redis = getRedisClient();
  await redis.set(`${CUSTOMER_KEY_PREFIX}${normalizeEmail(record.email)}`, record);
}

/**
 * Updates just the active-key fields on an existing customer record (used
 * by the key-regeneration flow). Throws if no record exists yet — a
 * customer must exist (from a completed checkout) before they can
 * regenerate a key.
 */
export async function updateCustomerActiveKey(
  email: string,
  hashedKey: string,
  keyLastFour: string,
): Promise<CustomerRecord> {
  const existing = await getCustomerRecord(email);
  if (!existing) {
    throw new Error(`[lib/customer/store] No customer record for ${email} — cannot update key.`);
  }
  const updated: CustomerRecord = {
    ...existing,
    hashedKey,
    keyLastFour,
    updatedAt: new Date().toISOString(),
  };
  await upsertCustomerRecord(updated);
  return updated;
}

/**
 * Sets (or replaces) the bcrypt password hash on an existing customer
 * record — used by the password-reset completion flow
 * (app/api/auth/reset-password/route.ts PUT). Throws if no record exists,
 * same guard as updateCustomerActiveKey.
 */
export async function updateCustomerPassword(email: string, passwordHash: string): Promise<CustomerRecord> {
  const existing = await getCustomerRecord(email);
  if (!existing) {
    throw new Error(`[lib/customer/store] No customer record for ${email} — cannot set password.`);
  }
  const updated: CustomerRecord = {
    ...existing,
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
  await upsertCustomerRecord(updated);
  return updated;
}

/**
 * Permanently deletes a customer's account record — used by "Delete
 * account" (app/api/customer/account/route.ts DELETE). This only removes
 * the `customer:<email>` reverse-index record; the caller is responsible
 * for also revoking the associated API key (lib/api/keys.ts revokeApiKey)
 * and purging usage analytics (lib/api/metrics.ts purgeUsageMetrics) —
 * kept separate here so this module stays focused on just this one
 * storage model, matching how it never touches apikey:* records either.
 */
export async function deleteCustomerRecord(email: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(`${CUSTOMER_KEY_PREFIX}${normalizeEmail(email)}`);
}
