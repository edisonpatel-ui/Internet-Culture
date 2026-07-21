# AI Editorial Platform (RC3-A)

Provider-agnostic foundation for future editorial AI workflows.

**This phase does not run AI.** No SDKs, no API keys, no public UI, no article generation.

## Layout

```
lib/ai/
  types.ts          AIProvider + Research/Draft/Review/SEO contracts
  index.ts          Public exports
  providers/        OpenAI, Anthropic, Google, Mock (all throw Not implemented)
  prompts/          Reusable prompt templates (strings only)
  pipelines/        Documented workflows (throw; do not call providers)
```

## Design rules

1. **Human-in-the-loop** — every future result requires human review before catalog changes.
2. **Provider-agnostic** — swap vendors via `AIProvider`; prompts stay shared.
3. **No auto-publish** — never write `lib/content/` from a pipeline without an explicit editor commit path.
4. **Separate from** `lib/intelligence/ai` (heuristics) and `lib/integrations` (`AiAssistProvider` stub).

## Intended flow (future)

```
Research → Draft → Review (+ SEO / linking / media prompts) → Human edit → validate → commit
```

## Usage (later)

```ts
import {
  OpenAIProvider,
  buildResearchPrompt,
  researchPipeline,
} from "@/lib/ai";

// RC3-A: constructing a provider is safe; calling methods throws.
const provider = new OpenAIProvider();
// await provider.research({ topic: "…" }) → throws Not implemented
```

Do not import `@/lib/ai` from App Router pages until a deliberate wiring phase.
