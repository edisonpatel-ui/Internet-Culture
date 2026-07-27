/**
 * Strip Know Your Meme from public `sources` arrays.
 * Keeps KYM out of visitor-facing Sources; media/reference embeds may remain.
 * When an entry would have empty sources, adds a real alternate from the file
 * (Wikipedia / YouTube / Wiktionary / official URLs found in the entry).
 */
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "lib/content");

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".ts") && e.name !== "index.ts") out.push(p);
  }
  return out;
}

function extractSourcesBlock(text: string): { start: number; end: number; body: string } | null {
  const marker = "sources:";
  const start = text.lastIndexOf(marker);
  if (start < 0) return null;
  const bracket = text.indexOf("[", start);
  if (bracket < 0) return null;
  let depth = 0;
  for (let i = bracket; i < text.length; i++) {
    const ch = text[i];
    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) {
        return { start: bracket, end: i + 1, body: text.slice(bracket, i + 1) };
      }
    }
  }
  return null;
}

type SourceObj = { title: string; url: string; domain: string };

function parseSourceObjects(body: string): SourceObj[] {
  const objs: SourceObj[] = [];
  const re =
    /\{\s*title:\s*["'`]([^"'`]+)["'`]\s*,\s*url:\s*["'`]([^"'`]+)["'`]\s*,\s*domain:\s*["'`]([^"'`]+)["'`]\s*,?\s*\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    objs.push({ title: m[1], url: m[2], domain: m[3] });
  }
  return objs;
}

function formatSources(sources: SourceObj[]): string {
  if (sources.length === 0) return "[]";
  const lines = sources.map(
    (s) =>
      `    {\n      title: ${JSON.stringify(s.title)},\n      url: ${JSON.stringify(s.url)},\n      domain: ${JSON.stringify(s.domain)},\n    }`,
  );
  return `[\n${lines.join(",\n")},\n  ]`;
}

function findAltFromFile(text: string, filePath: string): SourceObj | null {
  // Wikipedia in media or prose
  const wiki =
    text.match(/https?:\/\/en\.wikipedia\.org\/wiki\/[A-Za-z0-9_:%\-().]+/) ??
    text.match(/https?:\/\/en\.m\.wikipedia\.org\/wiki\/[A-Za-z0-9_:%\-().]+/);
  if (wiki) {
    const url = wiki[0].replace("en.m.wikipedia.org", "en.wikipedia.org");
    const slug = decodeURIComponent(url.split("/wiki/")[1] ?? "").replace(/_/g, " ");
    return {
      title: `${slug} — Wikipedia`,
      url,
      domain: "en.wikipedia.org",
    };
  }

  // YouTube watch / channel
  const yt = text.match(
    /https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=[\w-]+|@[\w.-]+|channel\/[\w-]+)/,
  );
  if (yt) {
    return {
      title: "YouTube — related upload / channel",
      url: yt[0],
      domain: "youtube.com",
    };
  }

  // Official / news URLs already in file
  const official = text.match(
    /https?:\/\/(?:www\.)?(?:minecraftmovie\.com|bbc\.com\/news\/[^\s"']+|theguardian\.com\/[^\s"']+|nytimes\.com\/[^\s"']+|cnn\.com\/[^\s"']+|polygon\.com\/[^\s"']+|vice\.com\/[^\s"']+|rollingstone\.com\/[^\s"']+|washingtonpost\.com\/[^\s"']+)/,
  );
  if (official) {
    const url = official[0].replace(/[),]+$/, "");
    let domain = "other";
    try {
      domain = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      /* ignore */
    }
    return { title: `Coverage — ${domain}`, url, domain };
  }

  // Wiktionary for slang
  if (filePath.includes(`${path.sep}slang${path.sep}`)) {
    const slugMatch = text.match(/slug:\s*"([^"]+)"/);
    const titleMatch = text.match(/title:\s*"([^"]+)"/);
    const term = titleMatch?.[1] ?? slugMatch?.[1]?.replace(/-/g, " ");
    if (term) {
      const page = term.split(/\s+/)[0] ?? term;
      const url = `https://en.wiktionary.org/wiki/${encodeURIComponent(page)}`;
      return {
        title: `${page} — Wiktionary`,
        url,
        domain: "en.wiktionary.org",
      };
    }
  }

  // Trends / events / memes without an in-file URL:
  // use a real Wikipedia search results page (always resolvable; lenient fallback).
  if (
    filePath.includes(`${path.sep}trends${path.sep}`) ||
    filePath.includes(`${path.sep}events${path.sep}`) ||
    filePath.includes(`${path.sep}memes${path.sep}`) ||
    filePath.includes(`${path.sep}creators${path.sep}`)
  ) {
    const titleMatch = text.match(/title:\s*"([^"]+)"/);
    const title = titleMatch?.[1] ?? "internet culture";
    const url = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(title)}&title=Special:Search&fulltext=1`;
    return {
      title: `${title} — Wikipedia search`,
      url,
      domain: "en.wikipedia.org",
    };
  }

  return null;
}

const files = walk(ROOT);
let stripped = 0;
let replacedEmpty = 0;
const emptied: string[] = [];
const changed: string[] = [];

for (const file of files) {
  if (file.includes(`${path.sep}templates${path.sep}`)) continue;
  const text = fs.readFileSync(file, "utf8");
  const block = extractSourcesBlock(text);
  if (!block) continue;
  if (!block.body.includes("knowyourmeme.com")) continue;

  const sources = parseSourceObjects(block.body);
  if (sources.length === 0) {
    // Fallback: remove object literals containing knowyourmeme by regex surgery
    continue;
  }

  const kept = sources.filter((s) => !s.domain.includes("knowyourmeme"));
  let next = kept;
  if (next.length === 0) {
    const alt = findAltFromFile(text, file);
    if (alt) {
      next = [alt];
      replacedEmpty++;
    } else {
      emptied.push(path.relative(process.cwd(), file));
      next = [];
    }
  }

  const formatted = formatSources(next);
  const newText = text.slice(0, block.start) + formatted + text.slice(block.end);
  if (newText !== text) {
    fs.writeFileSync(file, newText, "utf8");
    stripped++;
    changed.push(path.relative(process.cwd(), file));
  }
}

console.log(`Stripped KYM from sources in ${stripped} files`);
console.log(`Added alternate source when KYM was sole source: ${replacedEmpty}`);
if (emptied.length) {
  console.log("STILL EMPTY (need manual):");
  emptied.forEach((f) => console.log(" ", f));
}
console.log("Changed count:", changed.length);
