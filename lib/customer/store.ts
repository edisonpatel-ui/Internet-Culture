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
  /** Stripe subscription ID (sub_...) — set from checkout and kept current by the lifecycle webhooks. */
  stripeSubscriptionId?: string;
  /**
   * Last Stripe subscription status seen by the webhook (active, past_due,
   * canceled, ...). Absent for accounts created before lifecycle tracking.
   */
  subscriptionStatus?: string;
  /** ISO timestamp of the last successful invoice payment (invoice.payment_succeeded). */
  lastPaymentAt?: string;
  /** ISO timestamp when the subscription ended and the API key was revoked. */
  canceledAt?: string;
}

const CUSTOMER_KEY_PREFIX = "customer:";
/** Reverse index: Stripe customer ID -> email, so lifecycle webhooks can find the account. */
const STRIPE_CUSTOMER_INDEX_PREFIX = "stripe_customer:";

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
  const email = normalizeEmail(record.email);
  const pipeline = redis.pipeline();
  pipeline.set(`${CUSTOMER_KEY_PREFIX}${email}`, record);
  if (record.stripeCustomerId) {
    pipeline.set(`${STRIPE_CUSTOMER_INDEX_PREFIX}${record.stripeCustomerId}`, email);
  }
  await pipeline.exec();
}

/** Resolves a Stripe customer ID to a customer record via the reverse index. Null if unknown. */
export async function getCustomerRecordByStripeId(stripeCustomerId: string): Promise<CustomerRecord | null> {
  const redis = getRedisClient();
  const email = await redis.get<string>(`${STRIPE_CUSTOMER_INDEX_PREFIX}${stripeCustomerId}`);
  if (!email) return null;
  return getCustomerRecord(email);
}

/** Backfills the reverse index for accounts created before it existed. */
export async function indexStripeCustomer(stripeCustomerId: string, email: string): Promise<void> {
  const redis = getRedisClient();
  await redis.set(`${STRIPE_CUSTOMER_INDEX_PREFIX}${stripeCustomerId}`, normalizeEmail(email));
}

/** Merges lifecycle fields into an existing record. Returns null if the record does not exist. */
export async function patchCustomerRecord(
  email: string,
  patch: Partial<
    Pick<CustomerRecord, "tier" | "stripeSubscriptionId" | "subscriptionStatus" | "lastPaymentAt" | "canceledAt">
  >,
): Promise<CustomerRecord | null> {
  const existing = await getCustomerRecord(email);
  if (!existing) return null;
  // updatedAt is deliberately NOT bumped: the key-regeneration cooldown
  // (app/api/dashboard/regenerate-key) treats it as "last key change", and
  // billing events (every renewal) must not lock a customer out of rotating a leaked key.
  const updated: CustomerRecord = { ...existing, ...patch };
  if ("canceledAt" in patch && patch.canceledAt === undefined) delete updated.canceledAt;
  await upsertCustomerRecord(updated);
  return updated;
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
  const existing = await getCustomerRecord(email);
  const pipeline = redis.pipeline();
  pipeline.del(`${CUSTOMER_KEY_PREFIX}${normalizeEmail(email)}`);
  if (existing?.stripeCustomerId) {
    pipeline.del(`${STRIPE_CUSTOMER_INDEX_PREFIX}${existing.stripeCustomerId}`);
  }
  await pipeline.exec();
}
