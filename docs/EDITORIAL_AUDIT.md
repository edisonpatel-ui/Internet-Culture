# Editorial Audit

Human review support for catalog quality. **Flags only — never auto-deletes.**

## Run

```bash
npm run audit:editorial
```

Exit code is always `0` unless the script crashes. Treat output as a queue for editors.

## Flag types

| Code | Meaning |
|------|---------|
| `DUPLICATE_CONCEPT` | Title/slug overlap with another entry (same detector as validate `TITLE_SIMILARITY`) |
| `WEAK_ARTICLE` | Short description, missing sources/tags, or thin body fields |
| `LOW_CULTURAL_SIGNIFICANCE` | Low influence **and** low relevance |
| `OUTDATED_ENTRY` | Declining + low relevance (often older topics) |
| `MERGE_OR_REMOVE_CANDIDATE` | Several concerns stacked — consider merge, rewrite, or removal |

## Workflow

1. Run `npm run audit:editorial`
2. Open flagged slugs in the app
3. Decide: rewrite, merge (redirect/aliases), keep with links, or remove manually
4. Re-run after edits

Do not bulk-delete from the audit output. Validation (`npm run validate`) remains the hard gate.

## Related

- Style: `EDITORIAL_STYLE_GUIDE.md`
- Language: `CONTENT_LANGUAGE_POLICY.md`
- Scores: `CULTURAL_SCORES.md`
