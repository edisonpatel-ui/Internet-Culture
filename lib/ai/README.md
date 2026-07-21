# AI Editorial Platform

Provider-agnostic foundation for future editorial AI workflows.

**This phase does not run AI.** No SDKs, no API keys, no public UI, no article generation.

## Layout

```
lib/ai/
  types.ts / providers / prompts / pipelines   RC3-A
  packages / workflows / editorialState.ts     RC3-B
  intelligence/                                RC3-C
  knowledge/                                   RC3-D
```

## Design rules

1. **Human-in-the-loop** — suggestions never auto-publish.
2. **Provider-agnostic** — swap vendors via `AIProvider`.
3. **No auto-publish** — never write `lib/content/` without an editor commit.
4. **Structured packages** — field maps, not markdown dumps.
5. **Preserve uncertainty** — contradictions and Low/Unknown stay visible.
6. **Knowledge ≠ prompts** — taxonomy/eras/principles live in `knowledge/`.
7. **Separate from** live-site `lib/intelligence/` and `lib/integrations`.

## RC3 stack

| Phase | Role |
|-------|------|
| RC3-A | How a model might be invoked |
| RC3-B | What an editorial job is |
| RC3-C | How research/evaluation should reason |
| RC3-D | What culture *is* (shared knowledge assets) |

## Docs

- [`docs/KNOWLEDGE_BASE.md`](../../docs/KNOWLEDGE_BASE.md)
- [`docs/EDITORIAL_INTELLIGENCE.md`](../../docs/EDITORIAL_INTELLIGENCE.md)
- [`docs/EDITORIAL_WORKFLOW.md`](../../docs/EDITORIAL_WORKFLOW.md)
- [`docs/AI_EDITORIAL_PLATFORM.md`](../../docs/AI_EDITORIAL_PLATFORM.md)

Do not import `@/lib/ai` from App Router pages until a deliberate wiring phase.
