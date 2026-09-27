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
