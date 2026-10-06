/**
 * scripts/test-api-pipeline.ts
 *
 * Standalone end-to-end check — calls GET /api/v1/terms/rizz against a
 * running instance of the app with a real API key, and prints the
 * formatted status, headers, and body. Useful as a quick "is the whole
 * pipeline actually working" check (auth, rate limiting, the catalog
 * lookup, the response shape) without opening a browser or Postman.
 *
 * Usage:
 *   npm run dev                                          # in one terminal
 *   npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx    # in another
 *
 *   # Against a deployed environment instead of localhost:
 *   API_PIPELINE_BASE_URL=https://internet-culture.vercel.app \
 *     npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx
 *
 * API key resolution, in order: a CLI argument, then TEST_API_KEY (read
 * from .env.local via the same tiny built-in parser scripts/test-resend.ts
 * and scripts/delete-user.ts use — this script runs standalone via `tsx`,
 * not through Next.js's dev server, so nothing loads .env.local
 * automatically). If neither is set, prints clear instructions for getting
 * a real key (via the dashboard, or scripts/delete-user.ts's sibling
 * account-creation path through a real Stripe checkout) and exits.
 *
 * Exit code 0 on a 2xx response, 1 otherwise — safe to use as a
 * post-deploy smoke check.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DEFAULT_BASE_URL = "http://localhost:3000";
const TARGET_SLUG = "rizz";
const TIMEOUT_MS = 15_000;

const color = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

/** Minimal KEY=VALUE .env parser — no new dependency for a script this small. Never overrides a variable already set in the real environment. */
function loadEnvFile(path: string): void {
  if (!existsSync(path)) return;

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

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function loadLocalEnv(): void {
  const envLocalPath = resolve(process.cwd(), ".env.local");
  const envPath = resolve(process.cwd(), ".env");

  if (existsSync(envLocalPath)) {
    loadEnvFile(envLocalPath);
  } else if (existsSync(envPath)) {
    loadEnvFile(envPath);
  }
}

function readEnv(name: string): string {
  const raw = process.env[name];
  return typeof raw === "string" ? raw.trim() : "";
}

async function main(): Promise<void> {
  loadLocalEnv();

  const apiKey = process.argv[2] || readEnv("TEST_API_KEY");
  if (!apiKey) {
    console.error(
      "No API key given.\n\n" +
        "Usage:\n" +
        "  npx tsx scripts/test-api-pipeline.ts cg_live_xxxxx\n\n" +
        "Or set TEST_API_KEY in .env.local.\n\n" +
        "To get a real key: log in to /dashboard and use \"Regenerate Key\" (shown once), " +
        "or complete a test checkout against your Stripe test-mode keys.",
    );
    process.exitCode = 1;
    return;
  }

  const baseUrl = (readEnv("API_PIPELINE_BASE_URL") || DEFAULT_BASE_URL).replace(/\/$/, "");
  const url = `${baseUrl}/api/v1/terms/${TARGET_SLUG}`;

  console.log(color.bold("\nCulture Graph API — End-to-End Pipeline Test"));
  console.log(color.dim(`GET ${url}\n`));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const start = Date.now();

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
    });
    const latencyMs = Date.now() - start;
    const body = await response.json().catch(() => null);

    const statusLine = `${response.status} ${response.statusText || (response.ok ? "OK" : "Error")}`;
    const statusColored = response.ok ? color.green(statusLine) : color.red(statusLine);

    console.log(`Status:   ${statusColored}`);
    console.log(`Latency:  ${latencyMs}ms`);

    console.log(color.bold("\nRate limit / quota headers:"));
    const headerNames = ["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-Quota-Limit", "X-Quota-Remaining"];
    for (const name of headerNames) {
      const value = response.headers.get(name);
      console.log(`  ${name}: ${value ?? color.dim("(not present)")}`);
    }

    console.log(color.bold("\nResponse body:"));
    console.log(JSON.stringify(body, null, 2));

    if (response.ok) {
      console.log(color.green("\n✓ Pipeline check passed.\n"));
      process.exitCode = 0;
    } else {
      console.log(color.red("\n✗ Pipeline check failed — see status/body above.\n"));
      process.exitCode = 1;
    }
  } catch (err) {
    const latencyMs = Date.now() - start;
    if (err instanceof Error && err.name === "AbortError") {
      console.error(color.red(`\n✗ Request timed out after ${TIMEOUT_MS}ms.`));
    } else {
      console.error(
        color.red(`\n✗ Request failed after ${latencyMs}ms — is the server running at ${baseUrl}?`),
      );
      console.error(err);
    }
    process.exitCode = 1;
  } finally {
    clearTimeout(timer);
  }
}

main();
