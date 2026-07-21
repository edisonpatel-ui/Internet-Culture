# AI Editorial Platform

Architecture notes for **RC3-A** (foundation) and **RC3-B** (internal workflow).

## Status

| Item | State |
|------|--------|
| `lib/ai` types + providers + prompts + pipelines | Present (RC3-A) |
| Packages + workflows + editorial state machine | Present (RC3-B) |
| AI SDKs / env vars / API routes | **None** |
| Public UI / article generation | **None** |
| Wired into App Router | **No** |

## Module

See [`lib/ai/README.md`](../lib/ai/README.md) and [`EDITORIAL_WORKFLOW.md`](./EDITORIAL_WORKFLOW.md).

## Relationship to other ports

| Module | Role |
|--------|------|
| `lib/ai` | Editorial LLM platform (research → draft → review → update) |
| `lib/intelligence/ai` | Heuristic suggestion envelopes (no LLM required) |
| `lib/integrations` `AiAssistProvider` | Future thin assist port for product features |

Do not merge these without an explicit architecture decision.

## Next phases (not started)

1. Implement one provider behind `AIProvider` with server-only secrets
2. Internal CLI or admin-only tooling that runs workflows
3. Map `DraftPackage` → article templates with human confirmation
4. Keep `npm run validate` as the hard gate before any commit
