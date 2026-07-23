"use client";

import { SORT_OPTIONS, type SortOption } from "@/lib/discovery/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  id?: string;
}

export function SortDropdown({
  value,
  onChange,
  id = "discovery-sort",
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="shrink-0 text-xs font-medium text-zinc-500">
        Sort
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-white/30 focus:ring-2 focus:ring-[var(--accent)]/25"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-zinc-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
