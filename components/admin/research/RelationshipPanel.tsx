import type { ResearchRelationship } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface RelationshipPanelProps {
  relationships: ResearchRelationship[];
}

export function RelationshipPanel({ relationships }: RelationshipPanelProps) {
  return (
    <PanelShell
      title="Relationships"
      description="Cultural edges — RC3 relationshipDiscovery later."
      badge={`${relationships.length}`}
    >
      {relationships.length === 0 ? (
        <p className="text-sm text-zinc-600">No relationships yet.</p>
      ) : (
        <ul className="space-y-2">
          {relationships.map((rel) => (
            <li
              key={rel.id}
              className="rounded-lg border border-white/5 px-3 py-2 text-sm"
            >
              <p className="text-zinc-200">
                <span className="text-zinc-500">{rel.kind}</span>
                {" → "}
                {rel.targetTitle}
                {rel.targetSlug && (
                  <span className="ml-1 font-mono text-[11px] text-zinc-600">
                    ({rel.targetSlug})
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">{rel.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
