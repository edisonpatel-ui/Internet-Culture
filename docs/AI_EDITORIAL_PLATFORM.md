# AI Editorial Platform

Architecture notes for **RC3-A** through **RC3-D**.

## Status

| Item | State |
|------|--------|
| Providers + prompts + pipelines | Present (RC3-A) |
| Packages + workflows + state machine | Present (RC3-B) |
| Editorial intelligence engine | Present (RC3-C) |
| Encyclopedia knowledge base | Present (RC3-D) |
| AI SDKs / env vars / API routes | **None** |
| Public UI / article generation | **None** |
| Wired into App Router | **No** |

## Docs

- [`lib/ai/README.md`](../lib/ai/README.md)
- [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md)
- [`EDITORIAL_INTELLIGENCE.md`](./EDITORIAL_INTELLIGENCE.md)
- [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md)

## Relationship to other ports

| Module | Role |
|--------|------|
| `lib/ai` | Editorial platform + reasoning + knowledge |
| `lib/intelligence/` | Live-site cultural scores / related recommendations |
| `lib/intelligence/ai` | Heuristic suggestion envelopes |
| `lib/integrations` `AiAssistProvider` | Future thin product assist port |

## Next phases (not started)

1. Implement one provider behind `AIProvider` with server-only secrets
2. Internal tooling that runs workflows using intelligence + knowledge
3. Map `DraftPackage` → article templates with human confirmation
4. Keep `npm run validate` as the hard gate before any commit
