export interface ComingSoonItem {
  title: string;
  description: string;
}

const DEFAULT_ITEMS: ComingSoonItem[] = [
  {
    title: "Media Gallery",
    description: "Images, videos, and embedded social posts.",
  },
  {
    title: "Full Timeline",
    description: "Complete history from origin to today.",
  },
  {
    title: "Community Discussion",
    description: "Comments, reactions, and user-contributed examples.",
  },
  {
    title: "Deep Dive",
    description: "Extended background, context, and cultural analysis.",
  },
];

interface EntryComingSoonProps {
  items?: ComingSoonItem[];
  /** Number of columns in the grid. Defaults to 2. */
  cols?: 2 | 3;
}

export function EntryComingSoon({
  items = DEFAULT_ITEMS,
  cols = 2,
}: EntryComingSoonProps) {
  const colClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className={`mb-8 grid gap-4 ${colClass}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="glass-card border-dashed border-white/10 p-5"
        >
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Coming Soon
          </p>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="mt-1 text-sm text-zinc-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
