import { NextRequest, NextResponse } from "next/server";

function getToken(request: NextRequest) {
  return request.cookies.get("token")?.value;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = getToken(request);

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const isLoginPage = pathname.startsWith("/login");

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/reservations");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/reservations/:path*",
    "/login",
  ],
};