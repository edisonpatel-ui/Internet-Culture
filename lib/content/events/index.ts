/**
 * Event content layer — public interface for all event entries.
 *
 * lib/data/events.ts is the current implementation source.
 * Pages and the service layer import from here, never from lib/data/ directly.
 *
 * When the per-file migration is complete, only this file needs to change.
 */

export {
  events,
  getEventBySlug,
  getAllEventSlugs,
  getRecentEvents,
  getRelatedEvents,
  getAllEvents,
} from "@/lib/data/events";
