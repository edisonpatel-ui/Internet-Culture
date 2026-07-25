import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { isEditorialPath } from "@/lib/admin/editorialPaths";
import {
  isAdminAuthConfigured,
  isAllowedAdminEmail,
} from "@/lib/admin/auth/adminAllowlist";

const { auth } = NextAuth(authConfig);

function withNoIndex(response: NextResponse): NextResponse {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function isAccessPath(pathname: string): boolean {
  return (
    pathname === "/admin/access" || pathname.startsWith("/admin/access/")
  );
}

function isAuthApiPath(pathname: string): boolean {
  return pathname === "/api/auth" || pathname.startsWith("/api/auth/");
}

/**
 * Gate every internal admin / experimental path.
 * Unauthenticated visitors get 404 — never a login redirect that reveals admin.
 * Authenticated admins must navigate freely between all admin pages.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAuthApiPath(pathname)) {
    return withNoIndex(NextResponse.next());
  }

  if (!isEditorialPath(pathname)) {
    return NextResponse.next();
  }

  if (isAccessPath(pathname)) {
    return withNoIndex(NextResponse.next());
  }

  const configured = isAdminAuthConfigured();
  const isProduction = process.env.NODE_ENV === "production";

  if (!configured) {
    if (isProduction) {
      return withNoIndex(new NextResponse("Not Found", { status: 404 }));
    }
    return withNoIndex(NextResponse.next());
  }

  try {
    // Bind request so session cookies are visible in the proxy/edge context.
    const session = await auth();
    const email = session?.user?.email?.trim().toLowerCase() ?? "";
    if (!email || !isAllowedAdminEmail(email)) {
      return withNoIndex(new NextResponse("Not Found", { status: 404 }));
    }
  } catch {
    return withNoIndex(new NextResponse("Not Found", { status: 404 }));
  }

  return withNoIndex(NextResponse.next());
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/auth/:path*",
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
