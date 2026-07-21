# AI Editorial Platform

Provider-agnostic foundation for future editorial AI workflows.

**This phase does not run AI.** No SDKs, no API keys, no public UI, no article generation.

## Layout

```
lib/ai/
  types.ts              AIProvider + contracts (RC3-A)
  providers/            OpenAI, Anthropic, Google, Mock (throw)
  prompts/              Reusable prompt templates
  pipelines/            Thin pipeline stubs (RC3-A)
  packages/             Research / Draft / Review / SEO / Update (RC3-B)
  workflows/            Stage definitions + validation hooks (RC3-B)
  editorialState.ts     Typed editorial state machine (RC3-B)
  intelligence/         Research & evaluation reasoning (RC3-C)
```

## Design rules

1. **Human-in-the-loop** — every future result requires human review before catalog changes.
2. **Provider-agnostic** — swap vendors via `AIProvider`; prompts stay shared.
3. **No auto-publish** — never write `lib/content/` without an explicit editor commit path.
4. **Structured packages** — drafts are field maps, not markdown dumps.
5. **Preserve uncertainty** — contradictions and Low/Unknown evidence stay visible.
6. **Separate from** live-site `lib/intelligence/` and `lib/integrations`.

## RC3 stack

| Phase | Role |
|-------|------|
| RC3-A | How a model might be invoked (providers, prompts, pipelines) |
| RC3-B | What an editorial job is (packages, workflows, state) |
| RC3-C | How research/evaluation should reason (methodology, evidence, entities) |

## Docs

- [`docs/EDITORIAL_WORKFLOW.md`](../../docs/EDITORIAL_WORKFLOW.md)
- [`docs/EDITORIAL_INTELLIGENCE.md`](../../docs/EDITORIAL_INTELLIGENCE.md)
- [`docs/AI_EDITORIAL_PLATFORM.md`](../../docs/AI_EDITORIAL_PLATFORM.md)

Do not import `@/lib/ai` from App Router pages until a deliberate wiring phase.
