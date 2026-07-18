const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "lib", "content");
const cats = ["memes", "slang", "creators", "events", "trends", "brainrot"];

function extract(file) {
  const src = fs.readFileSync(file, "utf8");
  const slug = (src.match(/slug:\s*["']([^"']+)["']/) || [])[1] || "?";
  const title = (src.match(/title:\s*["']([^"']+)["']/) || [])[1] || "?";
  const category = (src.match(/category:\s*["']([^"']+)["']/) || [])[1] || "?";
  let description = "";
  const d1 = src.match(/description:\s*["']([^"']*)["']/);
  const d2 = src.match(/description:\s*`([^`]*)`/);
  if (d1) description = d1[1];
  else if (d2) description = d2[1].replace(/\s+/g, " ").trim();

  const hasMediaKey = /media\s*:\s*\[/.test(src);
  let roles = [];
  if (hasMediaKey) {
    const mi = src.indexOf("media:");
    const after = src.slice(mi);
    const start = after.indexOf("[");
    let depth = 0;
    let end = -1;
    for (let i = start; i < after.length; i++) {
      if (after[i] === "[") depth++;
      else if (after[i] === "]") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    const block = end >= 0 ? after.slice(start, end + 1) : "";
    roles = [...block.matchAll(/role\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  }
  const uniqueRoles = [...new Set(roles)];
  const hasFeatured = roles.includes("featured");
  const emptyMedia = /media\s*:\s*\[\s*\]/.test(src);
  const hasMedia = hasMediaKey && roles.length > 0 && !emptyMedia;

  return {
    slug,
    title,
    category,
    hasMedia: hasMedia ? "yes" : "no",
    hasFeatured: hasFeatured ? "yes" : "no",
    roles: uniqueRoles.length ? uniqueRoles.join("+") : "none",
    description: description.slice(0, 200),
  };
}

const out = [];
for (const cat of cats) {
  const dir = path.join(root, cat);
  if (!fs.existsSync(dir)) {
    out.push({ cat, articles: [] });
    continue;
  }
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts");
  const articles = files
    .map((f) => extract(path.join(dir, f)))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  out.push({ cat, articles });
}

const reportPath = path.join(__dirname, "tmp-audit-report.json");
fs.writeFileSync(reportPath, JSON.stringify(out, null, 2));
console.log("Wrote", reportPath);
for (const { cat, articles } of out) {
  console.log(cat, articles.length);
}
