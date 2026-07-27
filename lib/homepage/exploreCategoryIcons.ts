import type { LucideIcon } from "lucide-react";
import {
  Brain,
  CalendarDays,
  Flame,
  Laugh,
  MessageCircle,
  Users,
} from "lucide-react";

/** Lucide icons for homepage Browse by category grid only. */
export const EXPLORE_CATEGORY_ICONS: Record<
  "/memes" | "/slang" | "/brainrot" | "/trending" | "/events" | "/people",
  LucideIcon
> = {
  "/memes": Laugh,
  "/slang": MessageCircle,
  "/brainrot": Brain,
  "/trending": Flame,
  "/events": CalendarDays,
  "/people": Users,
};
