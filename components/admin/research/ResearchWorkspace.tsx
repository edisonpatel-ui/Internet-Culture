import type { ResearchSession } from "@/types/admin";
import { validateSession } from "@/lib/admin/research";
import { TopicHeader } from "./TopicHeader";
import { ResearchNotes } from "./ResearchNotes";
import { SourcesPanel } from "./SourcesPanel";
import { TimelinePanel } from "./TimelinePanel";
import { EntityPanel } from "./EntityPanel";
import { RelationshipPanel } from "./RelationshipPanel";
import { InternalLinksPanel } from "./InternalLinksPanel";
import { CoveragePanel } from "./CoveragePanel";
import { ConfidencePanel } from "./ConfidencePanel";
import { AISuggestionsPanel } from "./AISuggestionsPanel";
import { ActivityLog } from "./ActivityLog";

interface ResearchWorkspaceProps {
  session: ResearchSession;
}

/**
 * Full research workspace layout for one session.
 * Placeholder panels — AI ports unwired (RC4-B).
 */
export function ResearchWorkspace({ session }: ResearchWorkspaceProps) {
  const validation = validateSession(session);

  return (
    <div className="space-y-6">
      <TopicHeader session={session} />

      {!validation.ok && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-sm font-semibold text-amber-200">
            Validation issues ({validation.issues.length})
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-amber-100/80">
            {validation.issues.map((issue) => (
              <li key={`${issue.code}-${issue.message}`}>
                [{issue.code}] {issue.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <ResearchNotes notes={session.notes} />
        <CoveragePanel notes={session.coverageNotes} />
        <SourcesPanel sources={session.sources} />
        <ConfidencePanel entries={session.confidence} />
        <TimelinePanel items={session.timeline} />
        <EntityPanel entities={session.entities} />
        <RelationshipPanel relationships={session.relationships} />
        <InternalLinksPanel links={session.internalLinks} />
        <AISuggestionsPanel suggestions={session.aiSuggestions} />
        <ActivityLog entries={session.activityLog} />
      </div>
    </div>
  );
}
