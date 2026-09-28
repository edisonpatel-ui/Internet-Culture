/**
 * scripts/preflight-test.ts
 *
 * Automated pre-flight self-test for the production API surface. Makes
 * live HTTP requests against a running instance of the app (local
 * `next dev` / `next start`, or a deployed Vercel URL) and asserts the
 * exact contracts already locked in by lib/api/errors.ts,
 * lib/api/middleware.ts, and app/api/v1/**:
 *
 *   GET /api/v1/health                → 200
 *   GET /api/v1/terms/rizz (no auth)  → 401 { error: { code: "UNAUTHORIZED", ... } }
 *   GET /api/v1/playground?slug=rizz  → 200, `_notice` present, every array ≤ 2 items
 *   GET /docs                         → 200
 *
 * Usage:
 *   npm run dev                 # in one terminal — starts the app
 *   npm run test:preflight      # in another — defaults to http://localhost:3000
 *
 *   # Against a deployed environment instead of localhost:
 *   PREFLIGHT_BASE_URL=https://internet-culture.vercel.app npm run test:preflight
 *
 * Exits 0 if every gate passes, 1 otherwise (CI-friendly).
 */

const BASE_URL = (process.env.PREFLIGHT_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
// Generous enough to survive a cold `next dev` on-demand compile of a route
// that hasn't been hit yet (e.g. /docs pulling in the API reference bundle).
// `next start` / a deployed instance responds far faster than this.
const TIMEOUT_MS = 30_000;
const PLAYGROUND_MAX_ARRAY_ITEMS = 2;

// --- tiny ANSI helpers — a script this small doesn't need a color dependency ---
const color = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

const PASS = color.green("[PASS]");
const FAIL = color.red("[FAIL]");

interface GateResult {
  name: string;
  passed: boolean;
  detail?: string;
}

const results: GateResult[] = [];

function record(name: string, passed: boolean, detail?: string): void {
  results.push({ name, passed, detail });
  console.log(`${passed ? PASS : FAIL} ${name}${detail ? color.dim(` — ${detail}`) : ""}`);
}

async function fetchWithTimeout(path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${BASE_URL}${path}`, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/** Recursively finds the first array anywhere in `value` longer than `max` items. */
function findOversizedArray(value: unknown, max: number, path = "data"): string | null {
  if (Array.isArray(value)) {
    if (value.length > max) {
      return `${path} has ${value.length} items (expected \u2264 ${max})`;
    }
    for (let i = 0; i < value.length; i++) {
      const nested = findOversizedArray(value[i], max, `${path}[${i}]`);
      if (nested) return nested;
    }
    return null;
  }
  if (value && typeof value === "object") {
    for (const [key, nestedValue] of Object.entries(value as Record<string, unknown>)) {
      const nested = findOversizedArray(nestedValue, max, `${path}.${key}`);
      if (nested) return nested;
    }
  }
  return null;
}

function describeError(err: unknown): string {
  if (err instanceof Error) {
    if (err.name === "AbortError") return `timed out after ${TIMEOUT_MS}ms`;
    const cause = "cause" in err ? (err.cause as { code?: string } | undefined) : undefined;
    if (cause?.code === "ECONNREFUSED") {
      return `connection refused — is the server running at ${BASE_URL}?`;
    }
    return err.message;
  }
  return String(err);
}

// --- Gate 1: /api/v1/health ---
async function checkHealth(): Promise<void> {
  const gate = "GET /api/v1/health \u2192 200";
  try {
    const res = await fetchWithTimeout("/api/v1/health");
    const body = await res.json().catch(() => null);

    if (res.status !== 200) {
      record(gate, false, `expected 200, got ${res.status}${body ? ` — ${JSON.stringify(body)}` : ""}`);
      return;
    }
    if (!body || typeof body.status !== "string") {
      record(gate, false, 'response body is missing a top-level "status" field');
      return;
    }

    const latencyNote = typeof body.redis?.latencyMs === "number" ? `, redis ${body.redis.latencyMs}ms` : "";
    record(gate, true, `status="${body.status}"${latencyNote}`);
  } catch (err) {
    record(gate, false, describeError(err));
  }
}

// --- Gate 2: /api/v1/terms/rizz with no Authorization header ---
async function checkUnauthorizedTerms(): Promise<void> {
  const gate = "GET /api/v1/terms/rizz (no auth) \u2192 401 UNAUTHORIZED";
  try {
    const res = await fetchWithTimeout("/api/v1/terms/rizz");
    const body = await res.json().catch(() => null);

    if (res.status !== 401) {
      record(gate, false, `expected 401, got ${res.status}${body ? ` — ${JSON.stringify(body)}` : ""}`);
      return;
    }

    const code = body?.error?.code;
    if (code !== "UNAUTHORIZED") {
      record(gate, false, `expected error.code "UNAUTHORIZED", got ${JSON.stringify(code)}`);
      return;
    }

    record(gate, true, `error.code="${code}"`);
  } catch (err) {
    record(gate, false, describeError(err));
  }
}

// --- Gate 3: /api/v1/playground?slug=rizz ---
async function checkPlayground(): Promise<void> {
  const gate = "GET /api/v1/playground?slug=rizz \u2192 200, _notice present, arrays \u2264 2";
  try {
    const res = await fetchWithTimeout("/api/v1/playground?slug=rizz");
    const body = await res.json().catch(() => null);

    if (res.status !== 200) {
      record(gate, false, `expected 200, got ${res.status}${body ? ` — ${JSON.stringify(body)}` : ""}`);
      return;
    }
    if (typeof body?._notice !== "string" || body._notice.length === 0) {
      record(gate, false, 'response is missing a non-empty "_notice" field');
      return;
    }

    const oversized = findOversizedArray(body?.data, PLAYGROUND_MAX_ARRAY_ITEMS);
    if (oversized) {
      record(gate, false, oversized);
      return;
    }

    record(gate, true, "_notice present, all arrays within limit");
  } catch (err) {
    record(gate, false, describeError(err));
  }
}

// --- Gate 4: /docs ---
async function checkDocs(): Promise<void> {
  const gate = "GET /docs \u2192 200";
  try {
    const res = await fetchWithTimeout("/docs");
    if (res.status !== 200) {
      record(gate, false, `expected 200, got ${res.status}`);
      return;
    }
    record(gate, true);
  } catch (err) {
    record(gate, false, describeError(err));
  }
}

async function main(): Promise<void> {
  console.log(color.bold("\nInternet Culture Hub \u2014 Pre-Flight Self-Test"));
  console.log(color.dim(`Target: ${BASE_URL}\n`));

  await checkHealth();
  await checkUnauthorizedTerms();
  await checkPlayground();
  await checkDocs();

  const passed = results.filter((r) => r.passed).length;
  const failed = results.length - passed;

  console.log("");
  console.log(color.bold(`Result: ${passed}/${results.length} gates passed`));

  if (failed > 0) {
    console.log(color.red(`${failed} gate(s) failed.\n`));
    process.exitCode = 1;
  } else {
    console.log(color.green("All gates passed.\n"));
    process.exitCode = 0;
  }
}

main().catch((err) => {
  console.error(color.red("Pre-flight script crashed unexpectedly:"), err);
  process.exitCode = 1;
});
