/**
 * lib/api/validation.ts
 *
 * Reusable Zod schemas for /api/v1 query parameters, plus a validateQuery
 * helper that turns a failed parse into an InvalidInputError (see
 * lib/api/errors.ts) with per-field detail — routes never hand-roll their
 * own parameter checks or error shapes.
 */

import { z, type ZodType } from "zod";
import { InvalidInputError, type FieldIssue } from "@/lib/api/errors";

/**
 * Catalog slugs are kebab-case (see lib/content/**, e.g. "skibidi-toilet").
 * Bounded length guards against pathological input reaching downstream
 * lookups.
 */
export const slugSchema = z
  .string()
  .trim()
  .min(1, "slug must not be empty")
  .max(120, "slug must be 120 characters or fewer")
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase kebab-case (letters, numbers, hyphens)");

/** Page size for any future list endpoint. Coerced from the string query param. */
export const limitSchema = z.coerce
  .number({ message: "limit must be a number" })
  .int("limit must be an integer")
  .min(1, "limit must be at least 1")
  .max(100, "limit must be 100 or fewer")
  .default(20);

/** 1-indexed page number for any future list endpoint. */
export const pageSchema = z.coerce
  .number({ message: "page must be a number" })
  .int("page must be an integer")
  .min(1, "page must be at least 1")
  .default(1);

/** Matches ContentCategory exactly (types/index.ts) so an invalid category is rejected up front. */
export const categorySchema = z.enum(["meme", "slang", "trend", "brainrot", "event", "creator"]);

/**
 * Converts a Zod issue path (e.g. ["limit"]) into a flat field name for the
 * API error response. Query params are always top-level, so this is
 * usually just the first path segment; falls back to "query" for the rare
 * root-level issue.
 */
function issuePath(path: readonly PropertyKey[]): string {
  return path.length > 0 ? path.map(String).join(".") : "query";
}

/**
 * Parses `request`'s URL search params against `schema` and returns the
 * typed result. Throws InvalidInputError (caught by formatApiError) with
 * one FieldIssue per failing param if parsing fails.
 *
 * `schema` should be a z.object(...) of the expected query shape, e.g.:
 *   validateQuery(request, z.object({ slug: slugSchema }))
 */
export function validateQuery<T extends ZodType>(request: Request, schema: T): z.infer<T> {
  const { searchParams } = new URL(request.url);
  const raw = Object.fromEntries(searchParams.entries());

  const result = schema.safeParse(raw);
  if (!result.success) {
    const issues: FieldIssue[] = result.error.issues.map((issue) => ({
      field: issuePath(issue.path),
      message: issue.message,
    }));
    throw new InvalidInputError(issues);
  }
  return result.data;
}
