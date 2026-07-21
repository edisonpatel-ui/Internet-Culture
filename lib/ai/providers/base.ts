/**
 * Shared “not implemented” guard for placeholder AI providers.
 * No SDKs, no network, no env — foundation only.
 */
export function notImplemented(providerLabel: string, method: string): never {
  throw new Error(`${providerLabel}.${method}: Not implemented.`);
}
