# Editorial OS / Knowledge Engine — Experimental (Phase 2+)

> **Status:** Experimental · Future Development · **Not part of Version 1**
>
> Do not use this system while building encyclopedia content for Version 1.
> The primary workflow is Cursor research → `lib/content/` → human review → commit.
> See `docs/VERSION_1_CONTENT_WORKFLOW.md`.

---

## Why it still exists

The full AI Editorial OS, Knowledge Engine, research packages, draft generation,
edits queue, publish bridge, and scoped update tools were built as an internal
prototype. They remain **fully functional** for future testing and Phase 2+.

Nothing was deleted. Architecture is preserved under:

| Area | Location |
|------|----------|
| UI routes | `/admin/experimental/*` |
| Path helpers | `lib/admin/experimentalPaths.ts` |
| Create / edits bridge | `lib/admin/editorialOs/` |
| Knowledge Engine | `lib/ai/knowledgeEngine/` |
| Draft generation | `lib/admin/draftGeneration/` |
| Publish | `lib/admin/publish/` |
| Article updates | `lib/admin/articleUpdate/` |
| Research infra | `lib/admin/research/`, `lib/admin/researchReview/` |

---

## How to open the lab

1. Set `EDITORIAL_OS_TOKEN` (see `docs/EDITORIAL_OS_SECURITY.md`)
2. Visit `/admin/experimental/unlock`
3. Hub: `/admin/experimental`

### Experimental routes

| Route | Purpose |
|-------|---------|
| `/admin/experimental` | Lab hub |
| `/admin/experimental/create` | Prompt → KE → draft |
| `/admin/experimental/drafts` | Unpublished drafts |
| `/admin/experimental/edits` | Revision / publish queue |
| `/admin/experimental/published` | Live catalog + updates |
| `/admin/experimental/settings` | KE diagnostics |
| `/admin/experimental/unlock` | Soft token gate |

Legacy URLs (`/create`, `/drafts`, `/research`, …) **redirect** into this lab.
They are not the Version 1 workflow.

---

## Navigation labels

Chrome is branded **Experimental AI Lab — Future Editorial System · Phase 2+**
so it is never mistaken for production CMS tooling.

---

## When it returns

After the encyclopedia has a large amount of grounded content, this lab can be
reactivated as the primary editorial surface. Until then, treat it as an
isolated prototype.
