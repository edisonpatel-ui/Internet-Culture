# Editorial OS security (internal / experimental tooling)

> **Phase 2+.** The Experimental AI Lab at `/admin/experimental` is **not** part of
> the Version 1 content workflow. See `docs/EDITORIAL_OS_EXPERIMENTAL.md`.

## Status

**Authentication is not implemented.** Experimental Editorial routes live under
`/admin/experimental` (plus legacy redirects) and are isolated from the public
encyclopedia as far as the current architecture allows. They are **not** a
substitute for staff SSO.

## Isolation measures (in place)

| Control | Status |
|---------|--------|
| Not linked from public Header / Footer / nav | ✓ |
| Public chrome hidden on editorial paths (`SiteChrome`) | ✓ |
| `robots.txt` disallow | ✓ (`/admin/`, legacy editorial prefixes) |
| `robots: noindex` metadata on `(admin)` layout | ✓ |
| Sitemap excludes editorial URLs | ✓ |
| `X-Robots-Tag: noindex, nofollow, noarchive` via middleware | ✓ |
| Token gate (`EDITORIAL_OS_TOKEN`) | ✓ soft gate until real auth |
| Production fail-closed when token unset | ✓ returns 404 for editorial paths |
| Next.js `proxy.ts` request gate + `X-Robots-Tag` | ✓ |

## Token gate (interim)

1. Set `EDITORIAL_OS_TOKEN` in the server environment (never commit the value).
2. Open `/admin/experimental/unlock` (legacy `/editorial-unlock` redirects here), enter the token (sets httpOnly cookie `ich_editorial_os`).
3. Or call routes with `Authorization: Bearer <token>` / `x-editorial-token: <token>`.

**Development:** if `EDITORIAL_OS_TOKEN` is unset, experimental routes remain open for local mock work.

**Production:** if `EDITORIAL_OS_TOKEN` is unset, experimental routes return **404** (fail closed).

## Remaining limitations

- Anyone with the shared token (or local open-dev access) can use the full Experimental AI Lab.
- Server actions are not separately authenticated beyond the page gate.
- In-memory stores are not multi-tenant or durable.
- Replace this gate with real auth (SSO / password) before treating the OS as production-secure.
