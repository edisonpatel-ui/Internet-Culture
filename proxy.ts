import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isEditorialPath } from "@/lib/admin/editorialPaths";
import { experimentalPaths } from "@/lib/admin/experimentalPaths";
import {
  EDITORIAL_TOKEN_COOKIE,
  EDITORIAL_TOKEN_HEADER,
  evaluateEditorialAccess,
} from "@/lib/admin/editorialAccess";

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function extractBearer(authorization: string | null): string | null {
  if (!authorization) return null;
  const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
  return match?.[1]?.trim() ?? null;
}

function isUnlockPath(pathname: string): boolean {
  return (
    pathname === experimentalPaths.unlock ||
    pathname.startsWith(`${experimentalPaths.unlock}/`) ||
    pathname === "/editorial-unlock" ||
    pathname.startsWith("/editorial-unlock/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isEditorialPath(pathname)) {
    return NextResponse.next();
  }

  if (isUnlockPath(pathname)) {
    return withNoIndex(NextResponse.next());
  }

  const access = evaluateEditorialAccess({
    isProduction: process.env.NODE_ENV === "production",
    cookieToken: request.cookies.get(EDITORIAL_TOKEN_COOKIE)?.value,
    bearerToken: extractBearer(request.headers.get("authorization")),
    headerToken: request.headers.get(EDITORIAL_TOKEN_HEADER),
  });

  if (access.allowed) {
    return withNoIndex(NextResponse.next());
  }

  const tokenConfigured = Boolean(process.env.EDITORIAL_OS_TOKEN?.trim());
  if (tokenConfigured) {
    const unlock = request.nextUrl.clone();
    unlock.pathname = experimentalPaths.unlock;
    unlock.searchParams.set("next", pathname);
    return withNoIndex(NextResponse.redirect(unlock));
  }

  return withNoIndex(new NextResponse("Not Found", { status: 404 }));
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/create",
    "/create/:path*",
    "/drafts",
    "/drafts/:path*",
    "/edits",
    "/edits/:path*",
    "/published",
    "/published/:path*",
    "/settings",
    "/settings/:path*",
    "/editorial-unlock",
    "/editorial-unlock/:path*",
    "/research",
    "/research/:path*",
    "/research-review",
    "/research-review/:path*",
    "/article-preview/:path*",
    "/publish",
    "/publish/:path*",
    "/updates",
    "/updates/:path*",
    "/draft-studio",
    "/draft-studio/:path*",
  ],
};
