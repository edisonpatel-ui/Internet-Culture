/**
 * lib/customerAuth/magicLinkStore.ts
 *
 * Single-use magic-link tokens for customer login, stored in the same
 * Upstash Redis instance already used across lib/api/* (no new
 * infrastructure). A token maps to an email, expires in 15 minutes, and is
 * deleted the instant it's consumed — so a link can't be replayed even
 * within its TTL window.
 */

import { randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";

const TOKEN_KEY_PREFIX = "magiclink:";
const TOKEN_TTL_SECONDS = 60 * 15; // 15 minutes

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/customerAuth/magicLinkStore] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Generates and stores a new token for `email`. Returns the raw token to embed in the emailed link. */
export async function createMagicLinkToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const redis = getRedisClient();
  await redis.set(`${TOKEN_KEY_PREFIX}${token}`, email.trim().toLowerCase(), {
    ex: TOKEN_TTL_SECONDS,
  });
  return token;
}

/**
 * Verifies and consumes a token, returning the associated email (or null if
 * the token is missing, expired, or already used). Deletes the token
 * immediately so it cannot be replayed.
 */
export async function consumeMagicLinkToken(token: string): Promise<string | null> {
  const redis = getRedisClient();
  const key = `${TOKEN_KEY_PREFIX}${token}`;
  const email = await redis.get<string>(key);
  if (!email) return null;
  await redis.del(key);
  return email;
}
