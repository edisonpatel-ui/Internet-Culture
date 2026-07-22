/**
 * Start a research job only after Initial Assessment passes.
 */

import { runInitialAssessment } from "@/lib/ai/knowledgeEngine/initialAssessment";
import { saveAssessment } from "@/lib/ai/knowledgeEngine/assessmentStore";
import { createSession } from "@/lib/admin/research/sessionService";
import type { ResearchSession } from "@/types/admin";
import type { TopicAssessment } from "@/lib/ai/knowledgeEngine/initialAssessment";

export interface StartResearchJobResult {
  assessment: TopicAssessment;
  session?: ResearchSession;
}

/**
 * Assess topic → if qualifies, create Research session.
 * Never creates ResearchPackage/Draft on rejection.
 */
export function startResearchJob(input: {
  topic: string;
  notes?: string;
  context?: string;
  tags?: string[];
}): StartResearchJobResult {
  const assessment = saveAssessment(
    runInitialAssessment({
      topic: input.topic,
      notes: input.notes,
      context: input.context,
    }),
  );

  if (!assessment.qualifies) {
    return { assessment };
  }

  const session = createSession({
    topic: assessment.topic,
    notes: [
      input.notes?.trim() ?? "",
      `Initial Assessment ${assessment.id}: qualifies (confidence ${Math.round(assessment.confidence * 100)}%).`,
    ]
      .filter(Boolean)
      .join("\n"),
    tags: input.tags ?? ["assessed"],
    priority: "medium",
  });

  return { assessment, session };
}
