/**
 * lib/customerAuth/passwordResetStore.ts
 *
 * Single-use password-reset tokens, stored in the same Upstash Redis
 * instance already used across lib/api/* and lib/customerAuth/* (no new
 * infrastructure). A token maps to an email, expires in 30 minutes, and is
 * deleted the instant it's consumed — a reset link can't be replayed even
 * within its TTL window. Deliberately its own Redis namespace
 * (`pwreset:*`) rather than reusing magiclink:* — a password-reset token
 * grants a materially different capability (set a new password) than a
 * login-link token, and keeping them separate means revoking/auditing one
 * kind can never accidentally affect the other.
 *
 * Same shape as lib/customerAuth/magicLinkStore.ts on purpose — this is
 * the same problem (single-use, time-boxed, email-scoped Redis token)
 * solved the same way, not a new pattern invented from scratch.
 */

import { randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";

const TOKEN_KEY_PREFIX = "pwreset:";
const TOKEN_TTL_SECONDS = 60 * 30; // 30 minutes

let cachedClient: Redis | null = null;

function getRedisClient(): Redis {
  if (cachedClient) return cachedClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "[lib/customerAuth/passwordResetStore] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    );
  }
  cachedClient = new Redis({ url, token });
  return cachedClient;
}

/** Generates and stores a new reset token for `email`. Returns the raw token to embed in the emailed link. */
export async function createPasswordResetToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const redis = getRedisClient();
  await redis.set(`${TOKEN_KEY_PREFIX}${token}`, email.trim().toLowerCase(), {
    ex: TOKEN_TTL_SECONDS,
  });
  return token;
}

/**
 * Verifies and consumes a reset token, returning the associated email (or
 * null if missing, expired, or already used). Deletes the token
 * immediately so it cannot be replayed.
 */
export async function consumePasswordResetToken(token: string): Promise<string | null> {
  const redis = getRedisClient();
  const key = `${TOKEN_KEY_PREFIX}${token}`;
  const email = await redis.get<string>(key);
  if (!email) return null;
  await redis.del(key);
  return email;
}
