/**
 * scripts/test-api-pipeline.ts
 *
 * Standalone end-to-end check of the public Culture Graph API against a
 * running instance of the app, using a real API key. Covers:
 *
 *   1. GET  /api/v1/terms/:slug       — happy path (200 + payload shape)
 *   2. GET  /api/v1/terms/:unknown    — unknown slug returns 404 NOT_FOUND
 *   3. POST /api/v1/terms/batch       — mixed known/unknown slugs (200, per-item `found`)
 *   4. POST /api/v1/terms/batch       — empty body list is rejected (400)
 *   5. GET  /api/v1/terms/:slug       — no API key is rejected (401)
 *
 * Each check prints its HTTP status, latency, and either ✓ or ✗ with the
 * reason. Rate-limit/quota headers from the first call are shown too.
 * Exit code 0 if every check passes, 1 otherwise — safe as a post-deploy
 * smoke test.
 *
 * Usage:
 *   npm run dev                                           # in one terminal
 *   npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx    # in another
 *   npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx --verbose   # also print response bodies
 *
 *   # Against a deployed environment:
 *   API_PIPELINE_BASE_URL=https://internet-culture.vercel.app \
 *     npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx
 *
 * API key resolution: the first non-flag CLI argument, then TEST_API_KEY
 * (read from .env.local / .env by a tiny built-in parser, since this runs
 * standalone via tsx and not through Next.js). Get a key from /dashboard
 * ("Regenerate Key") or via a test-mode Stripe checkout.
 *
 * Note: every check made with a key counts against that key's monthly
 * quota (4 requests per run).
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_BASE_URL = "http://localhost:3000";
const KNOWN_SLUGS = ["rizz", "aura"] as const;
const UNKNOWN_SLUG = "definitely-not-a-real-term";
const TIMEOUT_MS = 15_000;

const color = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

/** Minimal KEY=VALUE .env parser. Never overrides a variable already set in the real environment. */
function loadEnvFile(path: string): void {
  const contents = readFileSync(path, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function loadLocalEnv(): void {
  const envLocalPath = resolve(process.cwd(), ".env.local");
  const envPath = resolve(process.cwd(), ".env");
  if (existsSync(envLocalPath)) loadEnvFile(envLocalPath);
  else if (existsSync(envPath)) loadEnvFile(envPath);
}

function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

interface CallResult {
  status: number;
  statusText: string;
  latencyMs: number;
  headers: Headers;
  body: unknown;
}

type Json = Record<string, unknown>;

function asObject(value: unknown): Json | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Json) : null;
}

async function call(
  baseUrl: string,
  method: "GET" | "POST",
  path: string,
  apiKey: string | null,
  jsonBody?: unknown,
): Promise<CallResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = Date.now();
  try {
    const headers: Record<string, string> = {};
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
    if (jsonBody !== undefined) headers["Content-Type"] = "application/json";

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: jsonBody === undefined ? undefined : JSON.stringify(jsonBody),
      signal: controller.signal,
    });
    const body: unknown = await response.json().catch(() => null);
    return {
      status: response.status,
      statusText: response.statusText,
      latencyMs: Date.now() - start,
      headers: response.headers,
      body,
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`timed out after ${TIMEOUT_MS}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

interface Check {
  name: string;
  request: string;
  run: () => Promise<CallResult>;
  /** Returns null when the response is acceptable, otherwise a human-readable failure reason. */
  verify: (result: CallResult) => string | null;
  showRateHeaders?: boolean;
}

function errorCode(body: unknown): string | undefined {
  const error = asObject(asObject(body)?.error);
  return typeof error?.code === "string" ? error.code : undefined;
}

async function main(): Promise<void> {
  loadLocalEnv();

  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose");
  const apiKey = args.find((a) => !a.startsWith("--")) || readEnv("TEST_API_KEY");

  if (!apiKey) {
    console.error(
      color.red("No API key given.\n\n") +
        "Usage:\n" +
        "  npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx [--verbose]\n\n" +
        "Or set TEST_API_KEY in .env.local.\n\n" +
        'To get a key: log in to /dashboard and use "Regenerate Key" (shown once), ' +
        "or complete a test checkout against your Stripe test-mode keys.",
    );
    process.exitCode = 1;
    return;
  }

  const baseUrl = (readEnv("API_PIPELINE_BASE_URL") || DEFAULT_BASE_URL).replace(/\/$/, "");
  const [knownA, knownB] = KNOWN_SLUGS;

  const checks: Check[] = [
    {
      name: "GET term — known slug",
      request: `GET /api/v1/terms/${knownA}`,
      showRateHeaders: true,
      run: () => call(baseUrl, "GET", `/api/v1/terms/${knownA}`, apiKey),
      verify: ({ status, body }) => {
        if (status !== 200) return `expected 200, got ${status}${errorCode(body) ? ` (${errorCode(body)})` : ""}`;
        const root = asObject(body);
        const data = asObject(root?.data);
        if (root?.success !== true || !data) return "response is missing success:true / data object";
        if (typeof data.term !== "string") return "data.term is missing";
        if (typeof data.velocityIndex !== "string") return "data.velocityIndex is missing";
        return null;
      },
    },
    {
      name: "GET term — unknown slug",
      request: `GET /api/v1/terms/${UNKNOWN_SLUG}`,
      run: () => call(baseUrl, "GET", `/api/v1/terms/${UNKNOWN_SLUG}`, apiKey),
      verify: ({ status, body }) => {
        if (status !== 404) return `expected 404, got ${status}`;
        if (errorCode(body) !== "NOT_FOUND") return `expected error.code NOT_FOUND, got ${errorCode(body) ?? "none"}`;
        return null;
      },
    },
    {
      name: "POST batch — known + unknown slugs",
      request: `POST /api/v1/terms/batch  { slugs: [${knownA}, ${knownB}, ${UNKNOWN_SLUG}] }`,
      run: () => call(baseUrl, "POST", "/api/v1/terms/batch", apiKey, { slugs: [knownA, knownB, UNKNOWN_SLUG] }),
      verify: ({ status, body }) => {
        if (status !== 200) return `expected 200, got ${status}${errorCode(body) ? ` (${errorCode(body)})` : ""}`;
        const root = asObject(body);
        const data = root?.data;
        if (root?.success !== true || !Array.isArray(data)) return "response is missing success:true / data array";
        if (data.length !== 3) return `expected 3 result items, got ${data.length}`;

        const bySlug = new Map<string, Json>();
        for (const item of data) {
          const obj = asObject(item);
          if (obj && typeof obj.slug === "string") bySlug.set(obj.slug, obj);
        }
        if (bySlug.get(knownA)?.found !== true) return `"${knownA}" should be found:true`;
        if (!asObject(bySlug.get(knownA)?.term)) return `"${knownA}" result is missing its term payload`;
        if (bySlug.get(UNKNOWN_SLUG)?.found !== false) return `"${UNKNOWN_SLUG}" should be found:false (not fail the whole batch)`;

        const meta = asObject(root?.meta);
        if (meta?.requested !== 3) return `meta.requested should be 3, got ${String(meta?.requested)}`;
        const foundCount = data.filter((i) => asObject(i)?.found === true).length;
        if (meta?.found !== foundCount) return `meta.found (${String(meta?.found)}) does not match results (${foundCount})`;
        return null;
      },
    },
    {
      name: "POST batch — empty slugs rejected",
      request: "POST /api/v1/terms/batch  { slugs: [] }",
      run: () => call(baseUrl, "POST", "/api/v1/terms/batch", apiKey, { slugs: [] }),
      verify: ({ status, body }) => {
        if (status !== 400) return `expected 400, got ${status}`;
        if (errorCode(body) !== "INVALID_INPUT") return `expected error.code INVALID_INPUT, got ${errorCode(body) ?? "none"}`;
        return null;
      },
    },
    {
      name: "GET term — missing API key rejected",
      request: `GET /api/v1/terms/${knownA}  (no Authorization header)`,
      run: () => call(baseUrl, "GET", `/api/v1/terms/${knownA}`, null),
      verify: ({ status, body }) => {
        if (status !== 401) return `expected 401, got ${status}`;
        if (errorCode(body) !== "UNAUTHORIZED") return `expected error.code UNAUTHORIZED, got ${errorCode(body) ?? "none"}`;
        return null;
      },
    },
  ];

  console.log(color.bold("\nCulture Graph API — End-to-End Pipeline Test"));
  console.log(color.dim(`Base URL: ${baseUrl}\n`));

  let passed = 0;
  let failed = 0;

  for (const [index, check] of checks.entries()) {
    console.log(color.bold(`[${index + 1}/${checks.length}] ${check.name}`));
    console.log(color.dim(`    ${check.request}`));

    let result: CallResult;
    try {
      result = await check.run();
    } catch (err) {
      failed++;
      const reason = err instanceof Error ? err.message : String(err);
      console.log(`    ${color.red("✗ Request failed:")} ${reason}`);
      console.log(color.dim(`    Is the server running at ${baseUrl}?\n`));
      continue;
    }

    const statusLine = `${result.status} ${result.statusText || (result.status < 400 ? "OK" : "Error")}`;
    const failure = check.verify(result);
    const statusColored = failure ? color.red(statusLine) : color.green(statusLine);
    console.log(`    Status:  ${statusColored}   Latency: ${result.latencyMs}ms`);

    if (check.showRateHeaders) {
      for (const name of ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-Quota-Limit", "X-Quota-Remaining"]) {
        const value = result.headers.get(name);
        console.log(color.dim(`    ${name}: ${value ?? "(not present)"}`));
      }
    }

    if (failure) {
      failed++;
      console.log(`    ${color.red(`✗ ${failure}`)}`);
      console.log(color.dim(`    Body: ${JSON.stringify(result.body)?.slice(0, 400)}`));
    } else {
      passed++;
      console.log(`    ${color.green("✓ passed")}`);
      if (verbose) console.log(color.dim(JSON.stringify(result.body, null, 2).replace(/^/gm, "    ")));
    }
    console.log("");
  }

  const total = checks.length;
  if (failed === 0) {
    console.log(color.green(`✓ All ${total} checks passed.\n`));
    process.exitCode = 0;
  } else {
    console.log(color.red(`✗ ${failed} of ${total} checks failed (${passed} passed).\n`));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(color.red("Unexpected error:"), err);
  process.exitCode = 1;
});
