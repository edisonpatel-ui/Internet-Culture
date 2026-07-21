# AI Editorial Platform

Provider-agnostic foundation for future editorial AI workflows.

**This phase does not run AI.** No SDKs, no API keys, no public UI, no article generation.

## Layout

```
lib/ai/
  types.ts              AIProvider + Research/Draft/Review/SEO contracts (RC3-A)
  index.ts              Public exports
  providers/            OpenAI, Anthropic, Google, Mock (all throw Not implemented)
  prompts/              Reusable prompt templates (strings only)
  pipelines/            Thin pipeline stubs (RC3-A)
  packages/             Research / Draft / Review / SEO / Update payloads (RC3-B)
  workflows/            Stage definitions + validation hooks (RC3-B)
  editorialState.ts     Typed editorial state machine (RC3-B)
```

## Design rules

1. **Human-in-the-loop** — every future result requires human review before catalog changes.
2. **Provider-agnostic** — swap vendors via `AIProvider`; prompts stay shared.
3. **No auto-publish** — never write `lib/content/` from a workflow without an explicit editor commit path.
4. **Structured packages** — drafts are field maps, not markdown dumps.
5. **Separate from** `lib/intelligence/ai` (heuristics) and `lib/integrations` (`AiAssistProvider` stub).

## How RC3-B fits RC3-A

| RC3-A | RC3-B |
|-------|--------|
| `AIProvider` + prompts + pipelines | Workflows orchestrate stages around those contracts |
| Thin `ResearchResult` / `DraftResult` | Rich `ResearchPackage` / `DraftPackage` for editorial jobs |
| — | `editorialState` gates invalid stage jumps |

Pipelines remain low-level stubs; workflows are the documented lifecycle API.

## Intended flow

See [`docs/EDITORIAL_WORKFLOW.md`](../../docs/EDITORIAL_WORKFLOW.md).

## Usage (later)

```ts
import {
  createEditorialJob,
  advanceEditorialJob,
  validateResearchWorkflowInput,
  runResearchWorkflow,
} from "@/lib/ai";

const job = createEditorialJob("Cottagecore");
// advanceEditorialJob(job, "ResearchComplete") — only valid transitions
// runResearchWorkflow({ topic: "…" }) → throws Not implemented
```

Do not import `@/lib/ai` from App Router pages until a deliberate wiring phase.
