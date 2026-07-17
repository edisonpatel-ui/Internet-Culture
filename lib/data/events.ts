/**
 * @deprecated Content has migrated to lib/content/events/
 *
 * Every event now lives in its own file: lib/content/events/[slug].ts
 * The lib/content/events/index.ts aggregates and exports all entries.
 *
 * This file is kept as a thin re-export for any remaining imports that
 * point here rather than to lib/content/. Do not add new entries here.
 * Add them to lib/content/events/ instead.
 */
export {
  events,
  getEventBySlug,
  getAllEventSlugs,
  getRecentEvents,
  getRelatedEvents,
  getAllEvents,
} from "@/lib/content/events";
