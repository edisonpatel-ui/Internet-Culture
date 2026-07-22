# Editorial OS v2 — Experimental (Phase 2+)

> **Status:** Experimental · Future Development · **Not part of Version 1**
>
> Canonical home: `/admin/experimental`
>
> Version 1 articles use Cursor + `lib/content/`. See
> `docs/VERSION_1_CONTENT_WORKFLOW.md` and `docs/EDITORIAL_OS_EXPERIMENTAL.md`.

---

## Pages (experimental lab)

| Route | Purpose |
|-------|---------|
| `/admin/experimental` | Lab hub |
| `/admin/experimental/create` | Prompt → Knowledge Engine → encyclopedia draft |
| `/admin/experimental/drafts` | Unpublished articles |
| `/admin/experimental/drafts/[id]` | Live-identical preview + Send to Edits / Delete |
| `/admin/experimental/edits` | Revision queue |
| `/admin/experimental/edits/[id]` | Previous → revision → Publish |
| `/admin/experimental/published` | Search live catalog |
| `/admin/experimental/published/[slug]` | Live view + Generate Update |
| `/admin/experimental/published/[slug]/update` | Diff preview + Approve Publish |
| `/admin/experimental/settings` | Knowledge Engine diagnostics |

## Flow (experimental only)

```
Create → Drafts → Edits → Publish (lib/content)
Published → scoped KE update → Approve
```

## Internal infrastructure (preserved)

- `lib/ai/knowledgeEngine` — research
- `lib/admin/editorialOs` — create / edits / publish bridge
- `lib/admin/draftGeneration` — writer + presentation
- `lib/admin/publish` — write `lib/content`
- `lib/admin/articleUpdate` — scoped live updates

Legacy top-level routes redirect into `/admin/experimental`.
