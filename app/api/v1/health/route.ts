/**
 * app/api/v1/health/route.ts
 *
 * Public, unauthenticated pre-flight health check for the /api/v1 surface.
 * Deliberately does NOT go through lib/api/middleware.ts's bearer-token
 * authenticateApiRequest — a health probe (uptime monitors, load balancers,
 * scripts/preflight-test.ts) must never require an API key of its own. It
 * DOES reuse the same lazy-client pattern already used everywhere else in
 * lib/api/** and lib/stripe/client.ts, and it never logs or returns raw
 * secret values — only booleans for presence.
 *
 * GET /api/v1/health
 *   200 { status: "ok" | "degraded", redis: {...}, stripe: {...}, env: {...}, timestamp, version }
 *   503 { status: "error", ... }   — Redis is unreachable/misconfigured.
 *
 * Redis is the only dependency that fails the whole response: every
 * authenticated /api/v1/* route (lib/api/validateRequest.ts) depends on
 * Redis for auth + rate limiting, so if Redis is down the entire public API
 * is effectively down. Stripe and the optional integrations are reported
 * for visibility but only flip the top-level status to "degraded" — a
 * Stripe outage affects checkout/webhooks, not the read API this check
 * exists to protect, so it shouldn't turn an uptime monitor red for the
 * whole product.
 */

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getStripeClient } from "@/lib/stripe/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_VERSION = "v1";

/**
 * Secrets required for the core API surface (auth, rate limiting, billing)
 * to function. Only presence is ever reported — never the value itself.
 */
const REQUIRED_ENV_VARS = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_ID_STARTER",
  "STRIPE_PRICE_ID_PRO",
  "AUTH_SECRET",
  "CRON_SECRET",
] as const;

/** Secrets that power optional/experimental features — absence is fine, just surfaced. */
const OPTIONAL_ENV_VARS = [
  "RESEND_API_KEY",
  "GROQ_API_KEY",
  "TAVILY_API_KEY",
  "YOUTUBE_DATA_API_KEY",
] as const;

interface RedisStatus {
  connected: boolean;
  latencyMs: number | null;
  error?: string;
}

interface StripeStatus {
  connected: boolean;
  latencyMs: number | null;
  error?: string;
}

interface EnvStatus {
  allRequiredPresent: boolean;
  required: Record<(typeof REQUIRED_ENV_VARS)[number], boolean>;
  optional: Record<(typeof OPTIONAL_ENV_VARS)[number], boolean>;
}

/** Pings Upstash Redis and times the round trip. Never throws. */
async function checkRedis(): Promise<RedisStatus> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return {
      connected: false,
      latencyMs: null,
      error: "Missing UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.",
    };
  }

  try {
    // Intentionally a fresh client, not the cached singletons in
    // lib/api/validateRequest.ts / lib/stripe/checkoutKeyHandoff.ts — a
    // health check should exercise a real connection attempt, not report
    // "connected" purely because some other request already warmed a
    // module-level cache in this serverless instance.
    const redis = new Redis({ url, token });
    const start = Date.now();
    await redis.ping();
    return { connected: true, latencyMs: Date.now() - start };
  } catch (err) {
    console.error("[api/v1/health] Redis check failed:", err);
    return { connected: false, latencyMs: null, error: "Redis ping failed." };
  }
}

/** Makes a lightweight, read-only Stripe API call and times the round trip. Never throws. */
async function checkStripe(): Promise<StripeStatus> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { connected: false, latencyMs: null, error: "Missing STRIPE_SECRET_KEY." };
  }

  try {
    const stripe = getStripeClient();
    const start = Date.now();
    // balance.retrieve() is the standard low-cost Stripe connectivity probe:
    // it requires only basic key auth, touches no customer data, and has no
    // side effects — safe to call on every health check.
    await stripe.balance.retrieve();
    return { connected: true, latencyMs: Date.now() - start };
  } catch (err) {
    console.error("[api/v1/health] Stripe check failed:", err);
    return { connected: false, latencyMs: null, error: "Stripe API request failed." };
  }
}

/** Boolean presence flags only — raw secret values are never read into the response. */
function checkEnv(): EnvStatus {
  const required = Object.fromEntries(
    REQUIRED_ENV_VARS.map((key) => [key, Boolean(process.env[key])]),
  ) as EnvStatus["required"];

  const optional = Object.fromEntries(
    OPTIONAL_ENV_VARS.map((key) => [key, Boolean(process.env[key])]),
  ) as EnvStatus["optional"];

  return {
    allRequiredPresent: Object.values(required).every(Boolean),
    required,
    optional,
  };
}

export async function GET() {
  try {
    const [redis, stripe] = await Promise.all([checkRedis(), checkStripe()]);
    const env = checkEnv();
    const timestamp = new Date().toISOString();

    // Redis is a hard dependency for the whole /api/v1 surface (auth +
    // rate limiting) — its failure is the only thing that returns 503.
    if (!redis.connected) {
      return NextResponse.json(
        { status: "error" as const, version: API_VERSION, timestamp, redis, stripe, env },
        { status: 503 },
      );
    }

    const status: "ok" | "degraded" =
      stripe.connected && env.allRequiredPresent ? "ok" : "degraded";

    return NextResponse.json(
      { status, version: API_VERSION, timestamp, redis, stripe, env },
      { status: 200 },
    );
  } catch (err) {
    // Belt-and-suspenders: checkRedis/checkStripe/checkEnv never throw, but
    // a health endpoint must never itself 500 — that would defeat the
    // purpose of a pre-flight probe. Fail safe as "error"/503.
    console.error("[api/v1/health] unexpected error:", err);
    return NextResponse.json(
      {
        status: "error" as const,
        version: API_VERSION,
        timestamp: new Date().toISOString(),
        error: "Health check failed unexpectedly.",
      },
      { status: 503 },
    );
  }
}
