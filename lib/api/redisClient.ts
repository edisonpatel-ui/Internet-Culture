/**
 * lib/api/redisClient.ts
 *
 * One lazily-created Upstash REST client shared by the API hot path
 * (usage tracking, view-count flushing, metric snapshots). Older modules
 * each keep their own private client; they can migrate here over time —
 * a single instance means one set of connection settings and one place to
 * mock in tests.
 */

import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function getSharedRedis(): Redis {
  if (client) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("[lib/api/redisClient] Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.");
  }
  client = new Redis({ url, token });
  return client;
}
