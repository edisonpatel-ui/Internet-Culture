import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface EntryBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Visible breadcrumb trail for users + internal linking
 * (Home → Category → Entry). Matches JSON-LD BreadcrumbList.
 */
export function EntryBreadcrumbs({ items }: EntryBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
        <li>
          <Link href="/" className="transition-colors hover:text-zinc-300">
            {SITE_NAME}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.path} className="flex items-center gap-1.5">
            <span aria-hidden className="text-zinc-600">
              /
            </span>
            <Link
              href={item.path}
              className="transition-colors hover:text-zinc-300"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
