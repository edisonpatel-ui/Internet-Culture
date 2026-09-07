#!/usr/bin/env node
/**
 * sync-upstash.js
 *
 * Standalone sync: reads every active article slug across all ICH content
 * categories, runs the real evidence-based scoring pipeline
 * (scoreFromEvidence.ts, via proposeDynamicMetadataForEntry — the read-only
 * variant that never writes to lib/content/*.ts on disk), and logs a daily
 * time-series snapshot for each slug to Upstash Redis under the key
 * `metrics:history:<slug>` — the SAME key scheme used by the Vercel Cron
 * job (app/api/cron/update-metrics/route.ts) and lib/services/metricsHistory.ts,
 * so this script and that cron job share one unified history per slug
 * instead of writing to two separate, disconnected data stores.
 *
 * This script delegates the actual snapshot read/write/trim logic to the
 * real lib/services/metricsHistory.ts module (saveMetricSnapshot) rather
 * than reimplementing it — same reasoning as reusing scoreFromEvidence.ts
 * itself: one source of truth for "how a snapshot is shaped and stored,"
 * not two copies that could quietly drift apart.
 *
 * Run from the ICH repository ROOT:
 *   node sync-upstash.js
 *
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in the
 * environment (see the PowerShell command provided alongside this script
 * for loading them from .env.local).
 *
 * ── Why this file can do "import type stuff" despite being named .js ──────
 * This repo's real scoring logic and content catalog are TypeScript
 * (lib/dynamicMetadata/scoreFromEvidence.ts, lib/content/**), and plain
 * `node` cannot import .ts files on its own. Rather than requiring you to
 * install a new build tool, this file re-launches itself exactly once
 * through `tsx` (the same TypeScript runner this repo's own npm scripts
 * already use everywhere, e.g. `npx tsx scripts/next-id.ts`) and then does
 * the real work. You still just run `node sync-upstash.js` — the relaunch
 * is invisible except for one log line explaining it.
 */

"use strict";

const path = require("node:path");
const { spawnSync } = require("node:child_process");

const RELAUNCH_FLAG = "__SYNC_UPSTASH_TSX_RELAUNCH__";

if (!process.env[RELAUNCH_FLAG]) {
  // ── Outer (plain `node`) invocation: relaunch this same file via tsx ────
  console.log("[sync-upstash] Starting…");
  console.log(
    "[sync-upstash] Relaunching this script through `tsx` so it can load " +
      "this repo's real TypeScript scoring logic and content files " +
      "(one-time step, transparent to you)…",
  );

  const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
  // shell: true — on Windows, spawning a .cmd shim (npx.cmd) directly
  // without a shell throws EINVAL; routing through the shell (cmd.exe on
  // Windows, /bin/sh elsewhere) is what actually resolves .cmd/.bat shims
  // correctly. Node escapes the argument array appropriately for the
  // chosen shell, so __filename is still passed through safely even if
  // the path contains spaces.
  const result = spawnSync(npxCommand, ["tsx", __filename], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, [RELAUNCH_FLAG]: "1" },
  });

  if (result.error) {
    console.error(
      "[sync-upstash] Failed to launch `npx tsx`. Is Node.js/npm installed " +
        "and on your PATH? Underlying error:",
      result.error,
    );
    process.exit(1);
  }

  process.exit(result.status === null ? 1 : result.status);
}

// ── Inner (relaunched under tsx) invocation: the real work starts here. ──
main().catch((err) => {
  console.error("[sync-upstash] Fatal error — aborting run.");
  console.error(err);
  process.exit(1);
});

async function main() {
  const startedAt = Date.now();

  console.log("[sync-upstash] Running under tsx — TypeScript imports are now available.");
  console.log("[sync-upstash] Step 1/5 — Checking environment variables…");

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    console.error(
      "[sync-upstash] Missing UPSTASH_REDIS_REST_URL and/or " +
        "UPSTASH_REDIS_REST_TOKEN in the environment. See the PowerShell " +
        "command provided alongside this script for loading them from " +
        ".env.local before running.",
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `[sync-upstash]   UPSTASH_REDIS_REST_URL = ${redisUrl}`,
  );
  console.log(
    `[sync-upstash]   UPSTASH_REDIS_REST_TOKEN = ${maskToken(redisToken)}`,
  );

  console.log("[sync-upstash] Step 2/5 — Connecting to Upstash Redis…");
  const { Redis } = await importFromRepoRoot("@upstash/redis");
  const redis = new Redis({ url: redisUrl, token: redisToken });
  try {
    await redis.ping();
    console.log("[sync-upstash]   Connected — PING succeeded.");
  } catch (err) {
    console.error(
      "[sync-upstash]   Could not reach Upstash Redis. Check the URL/token " +
        "and that the database is active.",
    );
    console.error(err);
    process.exitCode = 1;
    return;
  }

  console.log("[sync-upstash] Step 3/5 — Loading canonical content categories…");
  const entries = await loadAllEntries();
  console.log(`[sync-upstash]   Loaded ${entries.length} active entries:`);
  for (const [category, count] of countByCategory(entries)) {
    console.log(`[sync-upstash]     - ${category}: ${count}`);
  }

  console.log("[sync-upstash] Step 4/5 — Loading the scoring pipeline (scoreFromEvidence.ts) and metrics history service…");
  const { proposeDynamicMetadataForEntry } = await importFromRepoRoot(
    "./lib/dynamicMetadata/refreshDynamicMetadata.ts",
  );
  const { saveMetricSnapshot } = await importFromRepoRoot(
    "./lib/services/metricsHistory.ts",
  );
  console.log("[sync-upstash]   Scoring pipeline and metrics history service ready.");

  console.log(
    `[sync-upstash] Step 5/5 — Scoring ${entries.length} entries and writing ` +
      "snapshots to Redis (metrics:history:<slug> — same key scheme as the " +
      "Vercel Cron job)…",
  );
  console.log(
    "[sync-upstash]   This calls real external evidence providers per " +
      "entry (Wikipedia/Reddit/YouTube/etc.) and can take a while for the " +
      "full catalog — that is expected, not a hang.",
  );

  let succeeded = 0;
  let skippedUnknown = 0;
  let failed = 0;

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const progress = `[${i + 1}/${entries.length}]`;

    try {
      console.log(`[sync-upstash] ${progress} Scoring "${entry.slug}" (${entry.category})…`);
      const proposed = await proposeDynamicMetadataForEntry(entry);

      const relevanceRaw = proposed.suggestion.relevance;
      if (typeof relevanceRaw !== "number") {
        console.log(
          `[sync-upstash] ${progress}   Skipped — live evidence was insufficient ` +
            `(relevance came back "unknown"), no snapshot written.`,
        );
        skippedUnknown += 1;
        continue;
      }

      const snapshot = await saveMetricSnapshot(entry.slug, relevanceRaw);
      console.log(
        `[sync-upstash] ${progress}   ✓ relevance=${snapshot.relevance} ` +
          `velocity=${snapshot.velocity >= 0 ? "+" : ""}${snapshot.velocity} ` +
          `→ metrics:history:${entry.slug}`,
      );
      succeeded += 1;
    } catch (err) {
      console.error(
        `[sync-upstash] ${progress}   ✗ Failed to score/save "${entry.slug}": ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
      failed += 1;
    }
  }

  const durationSec = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log("");
  console.log("[sync-upstash] ── Run complete ─────────────────────────────");
  console.log(`[sync-upstash]   Total entries:      ${entries.length}`);
  console.log(`[sync-upstash]   Snapshots written:  ${succeeded}`);
  console.log(`[sync-upstash]   Skipped (unknown):  ${skippedUnknown}`);
  console.log(`[sync-upstash]   Failed:             ${failed}`);
  console.log(`[sync-upstash]   Duration:           ${durationSec}s`);
  console.log("[sync-upstash] ─────────────────────────────────────────────");

  if (failed > 0) process.exitCode = 1;
}

/**
 * Loads every active entry across all five canonical content categories,
 * reading directly from this repo's content index files (the same arrays
 * lib/content/validation/catalog.ts combines) — brainrot-category articles
 * are folded into `meme` at publish time and are already included via the
 * memes array, matching how the rest of the site treats them.
 */
async function loadAllEntries() {
  const [memesMod, slangMod, eventsMod, peopleMod, trendsMod] = await Promise.all([
    importFromRepoRoot("./lib/content/memes/index.ts"),
    importFromRepoRoot("./lib/content/slang/index.ts"),
    importFromRepoRoot("./lib/content/events/index.ts"),
    importFromRepoRoot("./lib/content/people/index.ts"),
    importFromRepoRoot("./lib/content/trends/index.ts"),
  ]);

  return [
    ...memesMod.memes,
    ...slangMod.slangTerms,
    ...eventsMod.events,
    ...peopleMod.creators,
    ...trendsMod.trends,
  ];
}

function countByCategory(entries) {
  const counts = new Map();
  for (const entry of entries) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

function maskToken(token) {
  if (token.length <= 8) return "****";
  return `${token.slice(0, 4)}…${token.slice(-4)}`;
}

/**
 * Resolves a module relative to the REPO ROOT (this file's own directory,
 * per the instructions to extract this script into the repository root) —
 * deliberately using relative paths rather than this project's `@/` alias,
 * since that alias is a Next.js/tsconfig convenience this standalone script
 * doesn't rely on.
 */
async function importFromRepoRoot(specifier) {
  if (specifier.startsWith(".")) {
    const resolved = path.resolve(__dirname, specifier);
    return import(pathToFileUrl(resolved));
  }
  return import(specifier);
}

function pathToFileUrl(p) {
  const resolved = path.resolve(p);
  const withSlashes = resolved.split(path.sep).join("/");
  return process.platform === "win32"
    ? `file:///${withSlashes}`
    : `file://${withSlashes}`;
}
