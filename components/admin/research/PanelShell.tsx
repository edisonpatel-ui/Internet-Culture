import type { ReactNode } from "react";

interface PanelShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  badge?: string;
}

export function PanelShell({
  title,
  description,
  children,
  badge,
}: PanelShellProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              {description}
            </p>
          )}
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
