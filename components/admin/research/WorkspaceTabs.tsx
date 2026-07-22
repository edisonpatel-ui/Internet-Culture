"use client";

import { useState } from "react";
import type { ResearchSession } from "@/types/admin";
import type { ResearchReport } from "@/lib/admin/research/intelligence";
import { OverviewTab } from "./tabs/OverviewTab";
import { TimelineTab } from "./tabs/TimelineTab";
import { EvidenceTab } from "./tabs/EvidenceTab";
import { EntitiesTab } from "./tabs/EntitiesTab";
import { RelationshipsTab } from "./tabs/RelationshipsTab";
import { CoverageTab } from "./tabs/CoverageTab";
import { RecommendationsTab } from "./tabs/RecommendationsTab";
import { ActivityTab } from "./tabs/ActivityTab";

export type WorkspaceTabId =
  | "overview"
  | "timeline"
  | "evidence"
  | "entities"
  | "relationships"
  | "coverage"
  | "recommendations"
  | "activity";

const TABS: Array<{ id: WorkspaceTabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "evidence", label: "Evidence" },
  { id: "entities", label: "Entities" },
  { id: "relationships", label: "Relationships" },
  { id: "coverage", label: "Coverage" },
  { id: "recommendations", label: "Recommendations" },
  { id: "activity", label: "Activity" },
];

interface WorkspaceTabsProps {
  session: ResearchSession;
  report: ResearchReport;
  defaultTab?: WorkspaceTabId;
}

/**
 * Client tab shell for research browsing (read-only report views).
 */
export function WorkspaceTabs({
  session,
  report,
  defaultTab = "overview",
}: WorkspaceTabsProps) {
  const [tab, setTab] = useState<WorkspaceTabId>(defaultTab);

  return (
    <div>
      <div className="border-b border-zinc-800">
        <nav
          className="-mb-px flex gap-1 overflow-x-auto"
          aria-label="Research workspace sections"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
                  active
                    ? "border-zinc-100 text-zinc-100"
                    : "border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="pt-5">
        {tab === "overview" && (
          <OverviewTab session={session} report={report} />
        )}
        {tab === "timeline" && (
          <TimelineTab report={report} sessionItems={session.timeline} />
        )}
        {tab === "evidence" && (
          <EvidenceTab report={report} sessionSources={session.sources} />
        )}
        {tab === "entities" && (
          <EntitiesTab report={report} sessionEntities={session.entities} />
        )}
        {tab === "relationships" && (
          <RelationshipsTab
            report={report}
            sessionRelationships={session.relationships}
            sessionLinks={session.internalLinks}
          />
        )}
        {tab === "coverage" && <CoverageTab report={report} />}
        {tab === "recommendations" && (
          <RecommendationsTab
            report={report}
            sessionLinks={session.internalLinks}
          />
        )}
        {tab === "activity" && (
          <ActivityTab entries={session.activityLog} />
        )}
      </div>
    </div>
  );
}
