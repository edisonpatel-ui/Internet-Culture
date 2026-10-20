/**
 * lib/stripe/log.ts
 *
 * Logging helpers for the billing code.
 *  - `debugLog`: development/test only. Silent when NODE_ENV === "production".
 *    Use for anything verbose or containing personal data (emails, key hints).
 *  - `infoLog` / `errorLog`: always on, but callers must keep them free of
 *    emails, raw keys and key fragments — IDs (evt_, cs_, cus_, sub_) only.
 */

const isProduction = () => process.env.NODE_ENV === "production";

export function debugLog(...args: unknown[]): void {
  if (!isProduction()) console.log(...args);
}

export function infoLog(...args: unknown[]): void {
  console.log(...args);
}

export function errorLog(...args: unknown[]): void {
  console.error(...args);
}
