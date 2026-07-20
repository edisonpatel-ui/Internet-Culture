# Editorial Audit

Human review support for catalog quality. **Flags only — never auto-deletes.**

## Primary: quality buckets

```bash
npm run audit:quality
```

| Bucket | Meaning |
|--------|---------|
| `strong` | Meets baseline quality signals |
| `improve` | Weak copy, shallow graph, outdated, or thin body |
| `merge` | Duplicate / overlap — consider merge (manual only) |
| `questionable` | Low cultural significance — needs human judgment |

Internal metadata (`editorialStatus`, `significanceLevel`) lives in `lib/editorial/registry.ts` and audit output only — **not** on public entry payloads or UI.

## Raw flags (debug)

```bash
npm run audit:editorial
```

| Code | Meaning |
|------|---------|
| `DUPLICATE_CONCEPT` | Title/slug overlap with another entry (same detector as validate `TITLE_SIMILARITY`) |
| `WEAK_ARTICLE` | Short description, missing sources/tags, or thin body fields |
| `LOW_CULTURAL_SIGNIFICANCE` | Low influence **and** low relevance |
| `OUTDATED_ENTRY` | Declining + low relevance (often older topics) |
| `MERGE_OR_REMOVE_CANDIDATE` | Several concerns stacked — consider merge, rewrite, or removal |
| `PROSE_STYLE` | Copy may sound academic, corporate, overstated, or generic-AI — rewrite for encyclopedia teach-first clarity |

Exit codes are always `0` unless a script crashes. Treat output as a queue for editors.

## Workflow

1. Run `npm run audit:quality` (primary report)
2. Optionally run `npm run audit:editorial` for raw detector codes
3. Open flagged slugs in the app
4. Decide: rewrite, merge (redirect/aliases), keep with typed links, or remove manually
5. Record lasting decisions in `lib/editorial/registry.ts` when useful
6. Re-run after edits

Do not bulk-delete from the audit output. Validation (`npm run validate`) remains the hard gate.

## Related

- Category standards: `CATEGORY_STANDARDS.md`
- Style (encyclopedia / teach-first writing): `EDITORIAL_STYLE_GUIDE.md`
- Language: `CONTENT_LANGUAGE_POLICY.md`
- Scores: `CULTURAL_SCORES.md`
- Prose detector: `lib/editorial/proseQuality.ts`
