import type { ResearchInternalLink } from "@/types/admin";
import { PanelShell } from "./PanelShell";

interface InternalLinksPanelProps {
  links: ResearchInternalLink[];
}

export function InternalLinksPanel({ links }: InternalLinksPanelProps) {
  return (
    <PanelShell
      title="Internal links"
      description="Suggestions only — RC3 internalLinkSuggestions later."
      badge={`${links.length}`}
    >
      {links.length === 0 ? (
        <p className="text-sm text-zinc-600">No link suggestions yet.</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id} className="text-sm">
              <span className="text-[11px] uppercase text-zinc-500">
                {link.kind}
              </span>
              <p className="text-zinc-200">
                {link.label}
                {link.target && (
                  <span className="ml-1 font-mono text-[11px] text-zinc-600">
                    {link.target}
                  </span>
                )}
              </p>
              <p className="text-xs text-zinc-500">{link.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelShell>
  );
}
