/**
 * Local test for applyMediaFixPatch's regex splice logic — verifies it
 * appends a new item to an existing media array without disturbing
 * existing items, comments, or verified:true entries, using a realistic
 * fixture file on disk (a temp copy, never a real content file).
 *
 * Run: npx tsx scripts/test-media-fix-patch.ts
 */
import fs from "node:fs";
import path from "node:path";
import { applyMediaFixPatch } from "../lib/dynamicMetadata/applyPatch";
import type { BaseEntry, MediaItem } from "../types";

let failures = 0;
let passed = 0;
function ok(label: string, cond: boolean, detail?: string) {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

const FIXTURE_SLUG = "__test_media_fix_fixture__";
const FIXTURE_PATH = path.join(process.cwd(), `lib/content/memes/${FIXTURE_SLUG}.ts`);

const FIXTURE_SOURCE = `import type { MemeEntry } from "@/types";

export const testFixture: MemeEntry = {
  id: "m9999",
  slug: "${FIXTURE_SLUG}",
  title: "Test Fixture",
  category: "meme",
  scores: { relevance: 10, influence: 10, cringe: 10, brainrot: 10 },
  media: [
    // A hand-written comment that must survive.
    {
      role: "supporting",
      type: "image",
      url: "https://upload.wikimedia.org/existing1.jpg",
      title: "Existing supporting image",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:existing1",
      platform: "wikimedia",
      verified: true,
    },
  ],
};
`;

async function main() {
  fs.writeFileSync(FIXTURE_PATH, FIXTURE_SOURCE, "utf8");
  try {
    const entry = {
      slug: FIXTURE_SLUG,
      category: "meme",
      media: [
        {
          role: "supporting",
          type: "image",
          url: "https://upload.wikimedia.org/existing1.jpg",
          title: "Existing supporting image",
          source: "Wikimedia Commons",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:existing1",
          platform: "wikimedia",
          verified: true,
        } as MediaItem,
      ],
    } as unknown as BaseEntry;

    const candidate: MediaItem = {
      role: "featured",
      type: "image",
      url: "https://upload.wikimedia.org/new-featured.jpg",
      title: "New featured candidate",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:new-featured",
      platform: "wikimedia",
      verified: false,
    };

    const result = applyMediaFixPatch(entry, candidate);
    ok("reports applied:true", result.applied === true);

    const written = fs.readFileSync(FIXTURE_PATH, "utf8");
    ok("existing comment survives", written.includes("A hand-written comment that must survive."));
    ok("existing verified:true item survives untouched", written.includes('url: "https://upload.wikimedia.org/existing1.jpg"') && /verified:\s*true/.test(written));
    ok("new featured item was appended", written.includes("https://upload.wikimedia.org/new-featured.jpg"));
    ok("new item has role featured", /role:\s*"featured"[\s\S]{0,200}new-featured\.jpg|new-featured\.jpg[\s\S]{0,50}role:\s*"featured"/.test(written) || written.includes('role: "featured"'));

    // File must still be syntactically parseable JS/TS-ish (basic brace balance check).
    const opens = (written.match(/\{/g) || []).length;
    const closes = (written.match(/\}/g) || []).length;
    ok("braces remain balanced after splice", opens === closes, `${opens} vs ${closes}`);

    const openBrackets = (written.match(/\[/g) || []).length;
    const closeBrackets = (written.match(/\]/g) || []).length;
    ok("brackets remain balanced after splice", openBrackets === closeBrackets, `${openBrackets} vs ${closeBrackets}`);

    // Second call: entry now has a featured item — must refuse to touch it again.
    entry.media = written.includes("new-featured") ? [...(entry.media ?? []), candidate] : entry.media;
    const secondResult = applyMediaFixPatch(entry, {
      ...candidate,
      url: "https://upload.wikimedia.org/should-not-be-added.jpg",
    });
    ok("refuses to touch an array that already has a featured item", secondResult.applied === false);
    const writtenAfterSecond = fs.readFileSync(FIXTURE_PATH, "utf8");
    ok(
      "second (wrongly-attempted) candidate was NOT written",
      !writtenAfterSecond.includes("should-not-be-added"),
    );
  } finally {
    if (fs.existsSync(FIXTURE_PATH)) fs.unlinkSync(FIXTURE_PATH);
  }

  console.log(`\n${passed} passed, ${failures} failed.`);
  if (failures > 0) process.exitCode = 1;
}

main();
