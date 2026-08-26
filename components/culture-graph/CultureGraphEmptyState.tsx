/**
 * Intentional empty state — shown when the canonical relationship data
 * derives zero graph edges. Never replaced with fabricated connections.
 */
export function CultureGraphEmptyState() {
  return (
    <div className="glass-card flex flex-col items-center gap-2 px-6 py-16 text-center">
      <p className="font-page text-lg font-semibold text-white">
        Not enough connections yet
      </p>
      <p className="max-w-md text-sm text-zinc-400">
        The Culture Graph shows real relationships between articles.
        Connections will appear here as they&apos;re curated.
      </p>
    </div>
  );
}
