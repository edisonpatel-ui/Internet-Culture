/**
 * Tests for the pre-launch publish + SEO hardening:
 *  - publish no longer shells out (no child_process / npm run build)
 *  - in-memory candidate validation (validateCandidateEntry)
 *  - post-write registration check (verifyWrittenContentEntry)
 *  - revalidation path set (revalidatePath replacement for the build step)
 *  - JSON-LD safe serialization + DefinedTerm/Article schemas
 *  - metadata: canonical, Twitter card, route-generated OG image fallback
 *
 * Fabricated in-memory entries only; no content files are written.
 *
 * Run: npx tsx scripts/test-publish-safety.ts
 */

import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { validateCandidateEntry } from "@/lib/content/validation/validateCandidate";
import {
  getPublishRevalidationPaths,
  revalidateAfterPublish,
} from "@/lib/admin/publish/revalidatePublish";
import { verifyWrittenContentEntry } from "@/lib/admin/publish/writeContentFile";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createDefinedTermJsonLd,
  createEntryArticleSchema,
  createEntryMetadata,
} from "@/lib/seo";
import type { BaseEntry } from "@/types";

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

function meme(overrides: Record<string, unknown> = {}): BaseEntry {
  return {
    id: "m9999",
    slug: "fixture-meme",
    title: "Fixture Meme",
    category: "meme",
    description: "A fixture meme used only by tests.",
    imageGradient: "from-zinc-800 to-black",
    scores: { relevance: 50, influence: 40, cringe: 20, brainrot: 30 },
    addedAt: "2026-01-01",
    views: 0,
    trendDirection: "new",
    sources: [{ title: "Wikipedia", url: "https://en.wikipedia.org/wiki/Meme" }],
    meaning: "What the fixture meme means.",
    origin: "Where the fixture meme began.",
    timeline: [],
    examples: ["An example."],
    relatedSlugs: [],
    ...overrides,
  } as unknown as BaseEntry;
}

const existing = [
  meme({ id: "m1", slug: "existing-a" }),
  meme({ id: "m2", slug: "existing-b" }),
];
const opts = { existingEntries: existing, additionalKnownSlugs: [] as string[] };
const codes = (e: BaseEntry) =>
  validateCandidateEntry(e, opts).map((i) => i.code);

console.log("\nPublish safety + SEO hardening tests:\n");

// ── No shell at publish time ────────────────────────────────────────────────
{
  const src = fs.readFileSync(
    path.join(process.cwd(), "lib/admin/publish/publishApprovedDraft.ts"),
    "utf8",
  );
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  ok("publishApprovedDraft imports no child_process", !/child_process/.test(code));
  ok("publishApprovedDraft runs no shell commands", !/execSync|exec\(|spawn|npm run/.test(code));
}

// ── In-memory candidate validation ─────────────────────────────────────────
ok("a valid candidate passes with zero errors", codes(meme()).length === 0, codes(meme()).join());
ok("duplicate slug is rejected", codes(meme({ slug: "existing-a", id: "m10" })).includes("DUPLICATE_SLUG"));
ok("duplicate id is rejected", codes(meme({ id: "m1", slug: "brand-new" })).includes("DUPLICATE_ID"));
ok("missing meaning is rejected", codes(meme({ meaning: "" })).includes("MISSING_MEANING"));
ok("missing sources is rejected", codes(meme({ sources: [] })).includes("MISSING_SOURCES"));
ok("broken relatedSlugs is rejected", codes(meme({ relatedSlugs: ["nope"] })).includes("BROKEN_RELATED_SLUG"));
ok("existing relatedSlugs resolve", codes(meme({ relatedSlugs: ["existing-a"] })).length === 0);
ok("invalid category is rejected", codes(meme({ category: "bogus" })).includes("INVALID_CATEGORY"));
ok(
  "invalid media schema is rejected",
  codes(meme({ media: [{ role: "nope", type: "image", url: "https://x", title: "t", source: "s", sourceUrl: "https://x", platform: "other" }] })).includes("INVALID_MEDIA_SCHEMA"),
);
ok("non-numeric score is rejected", codes(meme({ scores: { relevance: "x", influence: 1, cringe: 1, brainrot: 1 } })).includes("MISSING_SCORES"));

// ── Post-write registration check ──────────────────────────────────────────
{
  const good = verifyWrittenContentEntry({
    filePath: "lib/content/memes/always-has-been.ts",
    id: "unused",
    slug: "always-has-been",
    category: "meme",
    importName: "alwaysHasBeen",
  });
  // id is intentionally wrong above, so only the id check should complain.
  ok("registration check finds the index import + array entry", !good.some((p) => p.includes("index.ts")), good.join(" | "));
  const bad = verifyWrittenContentEntry({
    filePath: "lib/content/memes/does-not-exist.ts",
    id: "m0",
    slug: "does-not-exist",
    category: "meme",
    importName: "doesNotExist",
  });
  ok("registration check flags a missing file and missing index entry", bad.length >= 2, bad.join(" | "));
}

// ── Revalidation (replaces runtime `npm run build`) ────────────────────────
{
  const p = getPublishRevalidationPaths({ category: "meme", slug: "foo" });
  ok("revalidates the article's own page", p.includes("/memes/foo"));
  ok("revalidates the category listing", p.includes("/memes"));
  ok("revalidates the homepage", p.includes("/"));
  ok("revalidates /culture-graph", p.includes("/culture-graph"));
  ok("revalidates /admin/drafts", p.includes("/admin/drafts"));
  ok("people entries map to /people/[slug]", getPublishRevalidationPaths({ category: "creator", slug: "x" }).includes("/people/x"));
  ok("trend entries map to /trending/[slug]", getPublishRevalidationPaths({ category: "trend", slug: "x" }).includes("/trending/x"));
  ok("no duplicate paths", new Set(p).size === p.length);
  let threw = false;
  let result: ReturnType<typeof revalidateAfterPublish> | undefined;
  try {
    result = revalidateAfterPublish({ category: "meme", slug: "foo" });
  } catch {
    threw = true;
  }
  ok("revalidateAfterPublish never throws outside a request context", !threw && Boolean(result) && Array.isArray(result?.paths));
}

// ── JSON-LD ────────────────────────────────────────────────────────────────
{
  const html = renderToStaticMarkup(
    createElement(JsonLd, { data: { headline: "</script><script>alert(1)</script>" } }),
  );
  ok("JSON-LD cannot be broken out of its <script> tag", !html.includes("</script><script>"), html);
  const inner = html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
  let parsed: { headline?: string } = {};
  try {
    parsed = JSON.parse(inner);
  } catch {
    /* handled below */
  }
  ok("escaped JSON-LD still parses back to the original text", parsed.headline === "</script><script>alert(1)</script>");

  const m = meme({ meaning: "The real meaning." }) as BaseEntry & { meaning: string };
  const term = createDefinedTermJsonLd(m, { path: "/memes/fixture-meme" }) as Record<string, unknown>;
  ok("DefinedTerm for a meme uses its meaning", term.description === "The real meaning.");
  ok("DefinedTerm for a meme is @type DefinedTerm", term["@type"] === "DefinedTerm");
  ok(
    "DefinedTerm meme set is the Meme Encyclopedia",
    (term.inDefinedTermSet as { name: string }).name === "Internet Meme Encyclopedia",
  );
  const slang = { ...meme(), category: "slang", definition: "Slang definition." } as unknown as BaseEntry & { definition: string };
  const slangTerm = createDefinedTermJsonLd(slang, { path: "/slang/x" }) as Record<string, unknown>;
  ok(
    "DefinedTerm for slang is unchanged (Slang Dictionary)",
    (slangTerm.inDefinedTermSet as { name: string }).name === "Internet Slang Dictionary" && slangTerm.description === "Slang definition.",
  );
  const article = createEntryArticleSchema(meme()) as Record<string, unknown>;
  ok("Article schema has @type Article and a headline", article["@type"] === "Article" && article.headline === "Fixture Meme");
  ok("Article schema carries datePublished", article.datePublished === "2026-01-01");
}

// ── Metadata ───────────────────────────────────────────────────────────────
{
  const noImg = createEntryMetadata(meme());
  ok("canonical is an absolute category-native URL", String(noImg.alternates?.canonical).endsWith("/memes/fixture-meme") && String(noImg.alternates?.canonical).startsWith("http"));
  ok("twitter card is summary_large_image", (noImg.twitter as { card?: string })?.card === "summary_large_image");
  ok("openGraph type is article", (noImg.openGraph as { type?: string })?.type === "article");
  ok(
    "entry WITHOUT an image leaves `images` keys absent so the route's opengraph-image applies",
    !Object.prototype.hasOwnProperty.call(noImg.openGraph ?? {}, "images") &&
      !Object.prototype.hasOwnProperty.call(noImg.twitter ?? {}, "images"),
  );
  const withImg = createEntryMetadata(
    meme({ imageUrl: "https://upload.wikimedia.org/x/y.png" }),
  );
  ok(
    "entry WITH an image keeps using it (backward compatible)",
    JSON.stringify(withImg.openGraph).includes("upload.wikimedia.org") &&
      JSON.stringify(withImg.twitter).includes("upload.wikimedia.org"),
  );
}

console.log(`\n${passed} passed, ${failures} failed.`);
if (failures > 0) process.exitCode = 1;
