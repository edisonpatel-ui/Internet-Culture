/**
 * Local fixture tests for the Wikimedia media ranking/filtering pipeline
 * (lib/ai/research/wikimediaMedia.ts). No live network required — global
 * fetch is mocked with canned Commons API responses so this exercises the
 * REAL relevance-scoring, junk-filtering, and dedup logic end to end.
 *
 * Run: npx tsx scripts/test-media-ranking.ts
 */

import { findWikimediaMedia, findWikimediaMediaSet } from "../lib/ai/research/wikimediaMedia";

type SearchHit = { title: string; snippet: string };
type ImageInfo = {
  title: string;
  url: string;
  descriptionUrl: string;
  license?: string;
  artist?: string;
  width?: number;
  height?: number;
};

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

/**
 * Mocks Commons `list=search` and `prop=imageinfo` calls based on a fixed
 * candidate pool, regardless of exact query string (mirrors how a real
 * Commons search would return a mixed bag including junk).
 */
function mockCommons(pool: Array<SearchHit & ImageInfo>) {
  const originalFetch = global.fetch;
  global.fetch = (async (url: string | URL) => {
    const u = url.toString();
    if (u.includes("list=search")) {
      return {
        ok: true,
        json: async () => ({
          query: { search: pool.map((p) => ({ title: p.title, pageid: 1, snippet: p.snippet })) },
        }),
      } as Response;
    }
    if (u.includes("prop=imageinfo")) {
      const pages: Record<string, unknown> = {};
      pool.forEach((p, i) => {
        pages[String(i)] = {
          title: p.title,
          imageinfo: [
            {
              url: p.url,
              descriptionurl: p.descriptionUrl,
              width: p.width,
              height: p.height,
              mime: "image/jpeg",
              extmetadata: {
                LicenseShortName: p.license ? { value: p.license } : undefined,
                Artist: p.artist ? { value: p.artist } : undefined,
              },
            },
          ],
        };
      });
      return { ok: true, json: async () => ({ query: { pages } }) } as Response;
    }
    return { ok: false, json: async () => ({}) } as Response;
  }) as typeof fetch;
  return () => {
    global.fetch = originalFetch;
  };
}

async function testRelevanceRanking() {
  console.log("\nTest: ranks the actually-relevant candidate above junk/unrelated hits");
  const restore = mockCommons([
    {
      title: "File:Flag of Brazil.svg",
      snippet: "national flag",
      url: "https://upload.wikimedia.org/x/Flag_of_Brazil.png",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:Flag_of_Brazil.svg",
      license: "Public domain",
      width: 800,
      height: 600,
    },
    {
      title: "File:Random unrelated icon.png",
      snippet: "a generic icon",
      url: "https://upload.wikimedia.org/x/Random_icon.png",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:Random_unrelated_icon.png",
      license: "CC0",
      width: 400,
      height: 400,
    },
    {
      title: "File:Distracted Boyfriend meme original photo.jpg",
      snippet: "The Distracted Boyfriend stock photo used as a meme template",
      url: "https://upload.wikimedia.org/x/Distracted_Boyfriend.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:Distracted_Boyfriend_meme_original_photo.jpg",
      license: "CC-BY-SA 4.0",
      artist: "Antonio Guillem",
      width: 1200,
      height: 800,
    },
  ]);
  try {
    const result = await findWikimediaMedia("Distracted Boyfriend", "featured", "meme");
    ok(
      "picks the Distracted Boyfriend photo, not the flag or generic icon",
      result?.url === "https://upload.wikimedia.org/x/Distracted_Boyfriend.jpg",
      `got: ${result?.url}`,
    );
  } finally {
    restore();
  }
}

async function testJunkTitleFiltering() {
  console.log("\nTest: junk titles (flags/maps/logos) never win even with keyword overlap");
  const restore = mockCommons([
    {
      // Shares the word "internet" with a hypothetical topic, but is junk.
      title: "File:Wikimedia Commons logo internet icon.svg",
      snippet: "logo",
      url: "https://upload.wikimedia.org/x/logo.png",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:logo",
      license: "CC0",
      width: 500,
      height: 500,
    },
  ]);
  try {
    const result = await findWikimediaMedia("Internet Culture", "featured");
    ok("returns null rather than a junk-titled logo", result === null, `got: ${result?.url}`);
  } finally {
    restore();
  }
}

async function testWeakMatchReturnsNull() {
  console.log("\nTest: a weak/unrelated match returns null instead of a wrong image");
  const restore = mockCommons([
    {
      title: "File:Completely unrelated subject photograph.jpg",
      snippet: "nothing to do with the query",
      url: "https://upload.wikimedia.org/x/unrelated.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:unrelated",
      license: "CC0",
      width: 900,
      height: 700,
    },
  ]);
  try {
    const result = await findWikimediaMedia("Skibidi Toilet", "featured", "brainrot");
    ok("returns null below the relevance floor", result === null, `got: ${result?.url}`);
  } finally {
    restore();
  }
}

async function testGallerySecondImageIsDistinct() {
  console.log("\nTest: findWikimediaMediaSet returns a genuinely distinct second image, not a near-duplicate");
  const restore = mockCommons([
    {
      title: "File:Wojak cropped original drawing.jpg",
      snippet: "Wojak the original Feels Guy drawing",
      url: "https://upload.wikimedia.org/x/wojak1.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:wojak1",
      license: "CC0",
      width: 800,
      height: 800,
    },
    {
      title: "File:Wojak cropped original drawing (alternate upload).jpg",
      snippet: "same Wojak drawing re-uploaded",
      url: "https://upload.wikimedia.org/x/wojak1_dupe.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:wojak1_dupe",
      license: "CC0",
      width: 800,
      height: 800,
    },
    {
      title: "File:NPC Wojak variant meme.png",
      snippet: "a distinct Wojak variant used in the NPC meme",
      url: "https://upload.wikimedia.org/x/npc_wojak.png",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:npc_wojak",
      license: "CC0",
      width: 800,
      height: 800,
    },
  ]);
  try {
    const result = await findWikimediaMediaSet("Wojak", "meme");
    ok("returns 2 images", result.length === 2, `got ${result.length}`);
    ok(
      "second image is the NPC variant, not the near-duplicate re-upload",
      result[1]?.url === "https://upload.wikimedia.org/x/npc_wojak.png",
      `got: ${result[1]?.url}`,
    );
  } finally {
    restore();
  }
}

async function testTinyImagesRejected() {
  console.log("\nTest: tiny/thumbnail-sized images are rejected as hero candidates");
  const restore = mockCommons([
    {
      title: "File:My Shayla tiny thumbnail icon.jpg",
      snippet: "My Shayla",
      url: "https://upload.wikimedia.org/x/tiny.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:tiny",
      license: "CC0",
      width: 80,
      height: 80,
    },
  ]);
  try {
    const result = await findWikimediaMedia("My Shayla", "featured", "slang");
    ok("returns null for a sub-200px candidate", result === null, `got: ${result?.url}`);
  } finally {
    restore();
  }
}

async function testCategoryAwareQueriesDontLeakMemeSuffix() {
  console.log("\nTest: non-meme categories don't get a misleading '+meme' fallback baked into scoring");
  // A creator-category search where the ONLY candidate is a portrait that
  // matches the base topic — should still be picked even though it has
  // nothing to do with "meme".
  const restore = mockCommons([
    {
      title: "File:Example Creator portrait 2024.jpg",
      snippet: "Portrait of the internet creator Example Creator",
      url: "https://upload.wikimedia.org/x/creator.jpg",
      descriptionUrl: "https://commons.wikimedia.org/wiki/File:creator",
      license: "CC-BY 4.0",
      artist: "Photographer X",
      width: 1000,
      height: 1200,
    },
  ]);
  try {
    const result = await findWikimediaMedia("Example Creator", "featured", "creator");
    ok(
      "finds the creator portrait via category-tuned queries",
      result?.url === "https://upload.wikimedia.org/x/creator.jpg",
      `got: ${result?.url}`,
    );
  } finally {
    restore();
  }
}

async function main() {
  await testRelevanceRanking();
  await testJunkTitleFiltering();
  await testWeakMatchReturnsNull();
  await testGallerySecondImageIsDistinct();
  await testTinyImagesRejected();
  await testCategoryAwareQueriesDontLeakMemeSuffix();

  console.log(`\n${passed} passed, ${failures} failed.`);
  if (failures > 0) {
    process.exitCode = 1;
  }
}

main();
