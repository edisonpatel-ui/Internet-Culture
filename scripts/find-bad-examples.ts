import fs from "fs";
import path from "path";

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".ts") && e.name !== "index.ts") out.push(p);
  }
  return out;
}

const BAD =
  /^(A \d+-second|An edit that|A Reels|A TikTok that|A gas-station|Opening-weekend|Episode \d+|Satoyu|A middle-schooler|Adults use|Annoying Orange|Cosplay and|Group chats after|Misheard-lyric|A Minecraft Movie clip|A Minecraft or Roblox)/i;

for (const f of walk("lib/content")) {
  const t = fs.readFileSync(f, "utf8");
  const m = t.match(/examples:\s*\[([\s\S]*?)\],/);
  if (!m) continue;
  const items = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const bad = items.filter((i) => BAD.test(i) || /captioned '|treating the|comment sections call/.test(i));
  if (bad.length) {
    console.log(path.relative(process.cwd(), f));
    bad.forEach((b) => console.log("  -", b.slice(0, 100)));
  }
}
