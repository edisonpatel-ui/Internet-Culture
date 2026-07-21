import type { ResearchEntity } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface EntityPanelProps {
  entities: ResearchEntity[];
}

export function EntityPanel({ entities }: EntityPanelProps) {
  return (
    <PanelShell
      title="Entities"
      description="People, platforms, memes — RC3 entityExtraction later."
      badge={`${entities.length}`}
    >
      {entities.length === 0 ? (
        <p className="text-sm text-zinc-600">No entities yet.</p>
      ) : (
        <ul className="space-y-2">
          {entities.map((entity) => (
            <li
              key={entity.id}
              className="flex flex-wrap items-baseline gap-2 text-sm"
            >
              <span className="font-medium text-zinc-200">{entity.name}</span>
              <span className="text-[11px] uppercase text-zinc-500">
                {entity.kind}
              </span>
              {entity.aliases.length > 0 && (
                <span className="text-xs text-zinc-600">
                  aka {entity.aliases.join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
