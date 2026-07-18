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
- SEO: short description, duplicate SEO titles

`npm run build` runs `prebuild` → `npm run validate` automatically.

### Media audit (report)

```bash
npm run audit:media
```

Human-readable media readiness report. Exit 0 even with warnings. Use after adding media; does not replace `validate`.
