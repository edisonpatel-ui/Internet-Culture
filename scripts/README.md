## Content quality gates

### Unified validation (required)

```bash
npm run validate
```

Runs the full P0 content gate (`lib/content/validation/`). Exit **1** on any error.

**Hard fails (errors):**
- Duplicate slugs (distinct entries — trend re-exports of the same entry are OK)
- Duplicate IDs
- Filename does not match `slug` (or expected category file missing)
- `relatedSlugs` pointing at missing entries
- Missing required fields (by category)
- Published entry with empty/missing `sources`
- Invalid category
- Invalid media schema (role/type/url/title/source/sourceUrl/platform, featured+embed, Wikimedia `/thumb/`)

**Soft (warnings only):**
- Category-aware media quality (slang/trends may omit media; memes/creators/events warn without featured)
- Unverified media (`verified: false`)
- Placeholder / generic featured titles
- SEO: short description, duplicate SEO titles
- Title similarity / concept overlap (`TITLE_SIMILARITY`)
- Alias registry unknown slug or collisions
- Broken `relationships.*` slug targets

`npm run build` runs `prebuild` → `npm run validate` automatically.

### Next ID helper

```bash
npm run next-id meme
npm run next-id slang
npm run next-id event
npm run next-id creator
npm run next-id trend
npm run next-id brainrot
```

Scans the catalog for the highest numeric ID with that category's prefix and prints the next available ID (e.g. `m42`). Prefer this over manually guessing sequential IDs.

### Media audit (offline report)

```bash
npm run audit:media
```

Human-readable media readiness report. Exit 0 even with warnings. Use after adding media; does not replace `validate`.

### Media audit (live / network)

```bash
npm run audit:media:live
```

HEAD reachability + YouTube oEmbed checks. Soft warnings only (exit 0 unless the script itself crashes).

**Never auto-sets `verified: true`.** Humans confirm correct topic representation, then flip the flag.

### Aliases

Search / SEO alternate phrases live in `lib/content/aliases/registry.ts` (not inside article files). Validated by `npm run validate`.
