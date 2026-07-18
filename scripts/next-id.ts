/**
 * Safe next-ID helper for Internet Culture Hub.
 *
 * Usage:
 *   npm run next-id meme
 *   npm run next-id slang
 *   npm run next-id event
 *   npm run next-id creator
 *   npm run next-id trend
 *   npm run next-id brainrot
 *
 * Scans the live catalog, finds the highest numeric ID for the category prefix,
 * and prints the next available ID (e.g. m42).
 */

import { buildCatalog } from "../lib/content/validation/catalog";

type CategoryArg =
  | "meme"
  | "slang"
  | "event"
  | "creator"
  | "trend"
  | "brainrot";

const PREFIX: Record<CategoryArg, string> = {
  meme: "m",
  slang: "s",
  event: "e",
  creator: "cr",
  trend: "t",
  brainrot: "br",
};

const USAGE = `Usage: npm run next-id <category>

Categories: meme | slang | event | creator | trend | brainrot

Example:
  npm run next-id meme
  → m42
`;

function parseArgs(argv: string[]): CategoryArg {
  const raw = (argv[2] ?? "").toLowerCase().trim();
  if (!raw || !(raw in PREFIX)) {
    console.error(USAGE);
    process.exit(1);
  }
  return raw as CategoryArg;
}

function numericSuffix(id: string, prefix: string): number | null {
  if (!id.startsWith(prefix)) return null;
  const rest = id.slice(prefix.length);
  if (!/^\d+$/.test(rest)) return null;
  return Number.parseInt(rest, 10);
}

function main() {
  const category = parseArgs(process.argv);
  const prefix = PREFIX[category];
  const { entries } = buildCatalog();
  const allIds = new Set(entries.map((e) => e.id));

  let max = 0;
  for (const id of allIds) {
    const n = numericSuffix(id, prefix);
    if (n !== null && n > max) max = n;
  }

  let next = max + 1;
  let candidate = `${prefix}${next}`;
  while (allIds.has(candidate)) {
    next += 1;
    candidate = `${prefix}${next}`;
  }

  process.stdout.write(`${candidate}\n`);
}

main();
