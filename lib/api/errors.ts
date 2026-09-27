/**
 * lib/api/errors.ts
 *
 * Standard error classes + a single formatter so every route under
 * /app/api/v1/* returns the same JSON error shape:
 *
 *   { "error": { "code": string, "message": string, "status": number } }
 *
 * Usage in a route:
 *   try {
 *     ...
 *   } catch (err) {
 *     return formatApiError(err);
 *   }
 *
 * Routes throw one of the typed errors below (or let a genuinely
 * unexpected error propagate — formatApiError still handles that safely,
 * as a generic 500, without leaking internals).
 */

import { NextResponse } from "next/server";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    status: number;
  };
}

/** Base class every typed API error extends. Carries the fields formatApiError needs. */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  /** Optional extra response headers (e.g. rate-limit headers) the route should still set. */
  readonly headers?: Record<string, string>;

  constructor(code: string, message: string, status: number, headers?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.headers = headers;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Missing or invalid API key.", headers?: Record<string, string>) {
    super("UNAUTHORIZED", message, 401, headers);
    this.name = "UnauthorizedError";
  }
}

export class RateLimitError extends ApiError {
  constructor(message = "Rate limit exceeded.", headers?: Record<string, string>) {
    super("RATE_LIMITED", message, 429, headers);
    this.name = "RateLimitError";
  }
}

export interface FieldIssue {
  field: string;
  message: string;
}

/** Thrown by validateQuery (lib/api/validation.ts) on a failed Zod parse. */
export class InvalidInputError extends ApiError {
  readonly issues: FieldIssue[];

  constructor(issues: FieldIssue[], message = "Invalid request parameters.") {
    super("INVALID_INPUT", message, 400);
    this.name = "InvalidInputError";
    this.issues = issues;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found.") {
    super("NOT_FOUND", message, 404);
    this.name = "NotFoundError";
  }
}

/**
 * Converts any thrown value into the uniform JSON error response. Always
 * succeeds — an error that isn't one of our typed classes becomes a
 * generic 500 with no internal details leaked into the response body
 * (the original error is still logged server-side for debugging).
 */
export function formatApiError(error: unknown): NextResponse<ApiErrorBody> {
  if (error instanceof InvalidInputError) {
    return NextResponse.json(
      {
        error: { code: error.code, message: error.message, status: error.status },
        // Field-level detail is additive — every /api/v1 error body still
        // matches the base `{ error: { code, message, status } }` shape;
        // `issues` is extra context specific to validation failures.
        issues: error.issues,
      } as ApiErrorBody & { issues: FieldIssue[] },
      { status: error.status, headers: error.headers },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message, status: error.status } },
      { status: error.status, headers: error.headers },
    );
  }

  console.error("[api/v1] unhandled error:", error);
  return NextResponse.json(
    { error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again.", status: 500 } },
    { status: 500 },
  );
}
