# Version 1 Content Workflow

**This is the primary way articles are created for Internet Culture Hub.**

The internal AI Editorial OS / Knowledge Engine is **not** part of Version 1.
It lives under `/admin/experimental` as Phase 2+ / experimental future work.

---

## Primary pipeline

```
Topic
  ↓
Research with Cursor AI
  ↓
Generate article in Cursor (lib/content/)
  ↓
Human review
  ↓
Commit to repository
  ↓
Website
```

Follow:

1. `.cursor/rules/content-research.mdc` — research & accuracy
2. `.cursor/rules/article-creation.mdc` — file creation, IDs, indexes
3. `.cursor/rules/media-architecture.mdc` — media rules
4. `docs/EDITORIAL_STYLE_GUIDE.md` — public prose voice
5. `npm run validate` → `npm run audit:media` → `npm run build`

---

## What Version 1 does **not** use

- `/admin/experimental/*` (Experimental AI Lab)
- Knowledge Engine UI
- Research Review / Draft Review UI
- In-app Create → Drafts → Edits → Publish CMS

Those systems remain in the repo for future development. See
`docs/EDITORIAL_OS_EXPERIMENTAL.md`.
