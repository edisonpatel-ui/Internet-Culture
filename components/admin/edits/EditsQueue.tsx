import Link from "next/link";
import type { EditSession } from "@/lib/admin/editorialOs";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";

export function EditsQueue({ sessions }: { sessions: EditSession[] }) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 px-6 py-16 text-center">
        <p className="text-sm text-zinc-400">No open edits.</p>
        <p className="mt-2 text-xs text-zinc-600">
          From a draft preview, continue to publish to create one.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-zinc-900 rounded-lg border border-zinc-800">
      {sessions.map((s) => (
        <li key={s.id}>
          <Link
            href={experimentalPaths.edit(s.id)}
            className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-zinc-900/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-zinc-100">
                {s.revisedDraft.title}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {s.changeSummary}
                {s.editorComment
                  ? ` · “${s.editorComment.slice(0, 60)}${s.editorComment.length > 60 ? "…" : ""}”`
                  : ""}
              </p>
            </div>
            <span className="text-xs text-amber-300/90">Open</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
