/**
 * Internal / experimental Editorial OS path prefixes —
 * not part of the public encyclopedia.
 *
 * Version 1 content workflow does not use these routes.
 * See docs/EDITORIAL_OS_EXPERIMENTAL.md and docs/VERSION_1_CONTENT_WORKFLOW.md.
 */

import {
  EXPERIMENTAL_AND_LEGACY_PREFIXES,
  EXPERIMENTAL_OS_BASE,
} from "./experimentalPaths";

export const EDITORIAL_PATH_PREFIXES = EXPERIMENTAL_AND_LEGACY_PREFIXES;

export { EXPERIMENTAL_OS_BASE };

export function isEditorialPath(pathname: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;
  return EDITORIAL_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}
