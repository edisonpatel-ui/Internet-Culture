import type { ResearchReport } from "@/lib/admin/research/intelligence";
import type {
  ResearchInternalLink,
  ResearchRelationship,
} from "@/types/admin";
import { PanelShell } from "../PanelShell";
import { formatLabel } from "../workspaceTokens";

interface RelationshipsTabProps {
  report: ResearchReport;
  sessionRelationships: ResearchRelationship[];
  sessionLinks: ResearchInternalLink[];
}

const KIND_BUCKETS: Array<{
  title: string;
  match: (kind: string) => boolean;
}> = [
  {
    title: "Predecessors",
    match: (k) => /predecessor|precursor|derived_from|inspired_by|before/i.test(k),
  },
  {
    title: "Successors",
    match: (k) => /successor|spawned|led_to|after/i.test(k),
  },
  {
    title: "Parodies",
    match: (k) => /parod/i.test(k),
  },
  {
    title: "Inspired by",
    match: (k) => /inspir/i.test(k),
  },
];

export function RelationshipsTab({
  report,
  sessionRelationships,
  sessionLinks,
}: RelationshipsTabProps) {
  const allRels = [
    ...report.relationships.map((r) => ({
      id: r.id,
      kind: r.kind,
      label: `${r.fromName} → ${r.toName}`,
      reason: r.reason,
      confidence: r.confidence,
    })),
    ...sessionRelationships.map((r) => ({
      id: r.id,
      kind: r.kind,
      label: r.targetTitle,
      reason: r.reason,
      confidence: undefined as number | undefined,
    })),
  ];

  const used = new Set<string>();
  const buckets = KIND_BUCKETS.map((b) => {
    const items = allRels.filter((r) => b.match(r.kind));
    items.forEach((i) => used.add(i.id));
    return { title: b.title, items };
  });

  const other = allRels.filter((r) => !used.has(r.id));

  const related = report.relatedEntries;
  const missing = report.potentialMissingEntries;
  const internal = sessionLinks;

  return (
    <div className="space-y-4">
      {buckets.map(
        (b) =>
          b.items.length > 0 && (
            <PanelShell key={b.title} title={b.title} badge={`${b.items.length}`}>
              <ul className="space-y-2">
                {b.items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
                  >
                    <p className="font-medium text-zinc-200">{item.label}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">
                      {formatLabel(item.kind)}
                      {item.confidence != null
                        ? ` · conf ${(item.confidence * 100).toFixed(0)}%`
                        : ""}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{item.reason}</p>
                  </li>
                ))}
              </ul>
            </PanelShell>
          ),
      )}

      <PanelShell title="Related entries" badge={`${related.length}`}>
        {related.length === 0 ? (
          <p className="text-sm text-zinc-600">No related entries listed.</p>
        ) : (
          <ul className="space-y-2">
            {related.map((r, i) => (
              <li
                key={`${r.title}-${i}`}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <p className="font-medium text-zinc-200">{r.title}</p>
                {r.slug && (
                  <p className="text-[11px] text-zinc-600">{r.slug}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500">{r.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell title="Missing entries" badge={`${missing.length}`}>
        {missing.length === 0 ? (
          <p className="text-sm text-zinc-600">No missing-entry gaps.</p>
        ) : (
          <ul className="space-y-2">
            {missing.map((g) => (
              <li
                key={g.id}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-zinc-200">{g.title}</p>
                  <span className="text-[10px] uppercase text-zinc-500">
                    {g.priority}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-500">{g.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      <PanelShell title="Internal links" badge={`${internal.length}`}>
        {internal.length === 0 ? (
          <p className="text-sm text-zinc-600">No internal link stubs.</p>
        ) : (
          <ul className="space-y-2">
            {internal.map((l) => (
              <li
                key={l.id}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <p className="font-medium text-zinc-200">{l.label}</p>
                <p className="text-[11px] text-zinc-500">
                  {formatLabel(l.kind)}
                  {l.target ? ` · ${l.target}` : ""}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{l.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelShell>

      {other.length > 0 && (
        <PanelShell title="Other relationships" badge={`${other.length}`}>
          <ul className="space-y-2">
            {other.map((item) => (
              <li
                key={item.id}
                className="rounded-md border border-zinc-800 px-3 py-2 text-sm"
              >
                <p className="font-medium text-zinc-200">{item.label}</p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {formatLabel(item.kind)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{item.reason}</p>
              </li>
            ))}
          </ul>
        </PanelShell>
      )}
    </div>
  );
}
