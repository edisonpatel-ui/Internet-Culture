/**
 * lib/api/keyCache.ts
 *
 * Tiny in-memory LRU cache with a per-entry TTL, used to avoid hitting
 * Upstash Redis for work that rarely changes (verified API-key records,
 * recent metric snapshots).
 *
 * Scope and trade-offs:
 *  - Per server instance. On Vercel each warm lambda has its own cache; a
 *    cold start starts empty. It cuts Redis reads for repeat callers
 *    without any shared state.
 *  - TTL bounds staleness. For API keys that means a revoked or re-tiered
 *    key can still be honoured by *other* warm instances for up to the TTL
 *    (5 minutes). The instance that performs a revoke evicts immediately
 *    (see revokeApiKey in lib/api/keys.ts).
 *  - Bounded size: when full, the least-recently-used entry is evicted, so
 *    a flood of distinct keys cannot grow memory without limit.
 *  - No dependency; a Map preserves insertion order, which is all an LRU
 *    needs (re-inserting on read moves an entry to "most recent").
 */

import type { ApiKeyRecord } from "@/lib/api/keys";

interface Entry<V> {
  value: V;
  expiresAt: number;
}

export class TtlLruCache<K, V> {
  private readonly store = new Map<K, Entry<V>>();

  constructor(
    private readonly maxEntries: number,
    private readonly ttlMs: number,
    /** Injectable clock, for tests. */
    private readonly now: () => number = Date.now,
  ) {
    if (maxEntries < 1) throw new Error("TtlLruCache: maxEntries must be >= 1");
    if (ttlMs < 1) throw new Error("TtlLruCache: ttlMs must be >= 1");
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt <= this.now()) {
      this.store.delete(key);
      return undefined;
    }

    // Refresh recency: move to the end of the Map's iteration order.
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    this.store.delete(key);
    this.store.set(key, { value, expiresAt: this.now() + this.ttlMs });

    while (this.store.size > this.maxEntries) {
      const oldest = this.store.keys().next();
      if (oldest.done) break;
      this.store.delete(oldest.value);
    }
  }

  delete(key: K): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    return this.store.size;
  }
}

/** 5 minutes. */
export const API_KEY_CACHE_TTL_MS = 5 * 60 * 1000;
export const API_KEY_CACHE_MAX_ENTRIES = 1000;

/** Verified API-key records, keyed by the key's SHA-256 hash (never the raw key). */
export const apiKeyRecordCache = new TtlLruCache<string, ApiKeyRecord>(
  API_KEY_CACHE_MAX_ENTRIES,
  API_KEY_CACHE_TTL_MS,
);
