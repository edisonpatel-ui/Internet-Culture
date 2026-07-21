# Editorial AI Workflow

Internal lifecycle for Internet Culture Hub encyclopedia entries.

**Status:** Architecture only (RC3-B). No AI providers, no admin UI, no auto-publish.

Related: [`AI_EDITORIAL_PLATFORM.md`](./AI_EDITORIAL_PLATFORM.md), [`lib/ai/README.md`](../lib/ai/README.md).

---

## Lifecycle

```
Idea
  ↓
Research
  ↓
Draft
  ↓
Human Editing
  ↓
Editorial Review
  ↓
SEO Review
  ↓
Validation          ← npm run validate (hard gate; not AI)
  ↓
Approval
  ↓
Publish             ← human commit to lib/content/ + deploy
  ↓
Update Detection
  ↓
Revision
  ↓
Republish
```

---

## Stage map

| Stage | Module | Package | Editorial state |
|-------|--------|---------|-----------------|
| Research | `workflows/researchWorkflow.ts` | `ResearchPackage` | ResearchRequested → ResearchComplete |
| Draft | `workflows/draftWorkflow.ts` | `DraftPackage` | → DraftGenerated |
| Human editing | (editor / future tooling) | — | HumanEditing |
| Editorial review | `workflows/reviewWorkflow.ts` | `ReviewPackage` | EditorialReview |
| SEO review | `workflows/seoWorkflow.ts` | `SeoReviewPackage` | SEOReview |
| Validation | existing `npm run validate` | — | (pre-Approved) |
| Approval / Publish | human git commit | — | Approved → Published |
| Update | `workflows/updateWorkflow.ts` | `UpdatePackage` | NeedsUpdate → ResearchRequested |

State transitions are enforced by `lib/ai/editorialState.ts`.

---

## Package responsibilities

### ResearchPackage
Structured research before drafting: summary, chronology, origin, platforms, impact, sources, conflicts, gaps, confidence.

### DraftPackage
Field-level proposals (title, origin, timeline, examples, scores, media, sources). **Not** markdown. **Not** a content file.

### ReviewPackage
Recommendations only — factual completeness, teach-first quality, hype/vague language, sources, style-guide consistency. Never auto-rewrites.

### SeoReviewPackage
Title / meta / slug / linking / schema / image opportunities. Recommendations only.

### UpdatePackage
Diff of existing article snapshot vs new research: changed facts, outdated sections, new events/aliases, suggested score updates. Always `humanReviewRequired: true`.

---

## Hard rules

1. AI never writes `lib/content/` directly.
2. AI never sets `media.verified: true`.
3. AI never bypasses `npm run validate`.
4. Provider calls happen only after a future wiring phase (RC3-A providers still throw).
5. Public site runtime must not import these workflows.

---

## Relationship to RC3-A

- **Providers / prompts / pipelines** — how a model might be invoked later.
- **Workflows / packages / state machine** — what an editorial job looks like and which stage comes next.

Together they form the internal AI editorial platform without changing public behavior.
