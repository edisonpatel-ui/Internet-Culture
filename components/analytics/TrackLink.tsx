"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import {
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsProps,
} from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

interface TrackLinkProps extends Omit<LinkProps, "onClick"> {
  children: ReactNode;
  event: AnalyticsEventName | string;
  eventProps?: AnalyticsProps;
}

/**
 * Client island for analytics-on-click links.
 * Parent sections can stay Server Components and wrap only the link.
 */
export function TrackLink({
  children,
  event,
  eventProps,
  ...linkProps
}: TrackLinkProps) {
  return (
    <Link
      {...linkProps}
      onClick={() => {
        trackEvent(event, eventProps);
      }}
    >
      {children}
    </Link>
  );
}
