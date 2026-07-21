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
- [`EDITORIAL_OPERATING_SYSTEM.md`](./EDITORIAL_OPERATING_SYSTEM.md) (RC4-A)
- [`ADMIN_PLATFORM.md`](./ADMIN_PLATFORM.md)
- [`EDITORIAL_PIPELINES.md`](./EDITORIAL_PIPELINES.md)
- [`AI_ASSISTANTS.md`](./AI_ASSISTANTS.md)
- [`PUBLISHING_WORKFLOW.md`](./PUBLISHING_WORKFLOW.md)
- [`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md)

## Relationship to other ports

| Module | Role |
|--------|------|
| `lib/ai` | Editorial platform + reasoning + knowledge |
| `lib/intelligence/` | Live-site cultural scores / related recommendations |
| `lib/intelligence/ai` | Heuristic suggestion envelopes |
| `lib/integrations` `AiAssistProvider` | Future thin product assist port |

## Next phases (not started)

1. **RC4 implementation** — auth’d admin shell using OS blueprints (no public chatbot)
2. Implement one provider behind `AIProvider` with server-only secrets
3. Internal tooling that runs workflows using intelligence + knowledge
4. Map `DraftPackage` → article templates with human confirmation
5. Keep `npm run validate` as the hard gate before any commit
