import type { Entity, ResearchReport } from "@/lib/admin/research/intelligence";
import type { ResearchEntity } from "@/types/admin";
import { PanelShell } from "../PanelShell";

interface EntitiesTabProps {
  report: ResearchReport;
  sessionEntities: ResearchEntity[];
}

function EntityCard({ entity }: { entity: Entity | ResearchEntity }) {
  const aliases =
    "aliases" in entity && entity.aliases.length > 0
      ? entity.aliases.join(", ")
      : null;
  const notes = "notes" in entity ? entity.notes : undefined;
  const slug = "catalogSlug" in entity ? entity.catalogSlug : undefined;

  return (
    <article className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-3">
      <p className="text-sm font-medium text-zinc-100">{entity.name}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-600">
        {entity.kind}
      </p>
      {aliases && (
        <p className="mt-1.5 text-xs text-zinc-500">Also: {aliases}</p>
      )}
      {slug && (
        <p className="mt-1 text-[11px] text-zinc-600">Catalog: {slug}</p>
      )}
      {notes && <p className="mt-1.5 text-xs text-zinc-500">{notes}</p>}
    </article>
  );
}

function EntityGroup({
  title,
  entities,
}: {
  title: string;
  entities: Array<Entity | ResearchEntity>;
}) {
  if (entities.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {title}{" "}
        <span className="font-normal text-zinc-600">({entities.length})</span>
      </h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {entities.map((e) => (
          <EntityCard key={e.id} entity={e} />
        ))}
      </div>
    </div>
  );
}

export function EntitiesTab({ report, sessionEntities }: EntitiesTabProps) {
  const sessionOnly = sessionEntities.filter(
    (se) =>
      ![
        ...report.people,
        ...report.organizations,
        ...report.platforms,
        ...report.communities,
        ...report.memes,
        ...report.slang,
      ].some((e) => e.name.toLowerCase() === se.name.toLowerCase()),
  );

  return (
    <PanelShell
      title="Entity graph"
      description="People, organizations, platforms, communities, memes, and slang."
    >
      <div className="space-y-6">
        <EntityGroup title="People" entities={report.people} />
        <EntityGroup title="Organizations" entities={report.organizations} />
        <EntityGroup title="Platforms" entities={report.platforms} />
        <EntityGroup title="Communities" entities={report.communities} />
        <EntityGroup title="Memes" entities={report.memes} />
        <EntityGroup title="Slang" entities={report.slang} />
        <EntityGroup title="Session entities" entities={sessionOnly} />
        {report.people.length +
          report.organizations.length +
          report.platforms.length +
          report.communities.length +
          report.memes.length +
          report.slang.length +
          sessionOnly.length ===
          0 && (
          <p className="text-sm text-zinc-600">No entities extracted yet.</p>
        )}
      </div>
    </PanelShell>
  );
}
