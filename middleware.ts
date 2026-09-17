import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  let session: { id: string; role: string } | null = null;

  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie);
    } catch {
      session = null;
    }
  }

  const { pathname } = req.nextUrl;

  // Allow public pages
  if (pathname.startsWith("/login") || pathname.startsWith("/signup")) {
    if (session) {
      // Already logged in, redirect to home
      return NextResponse.redirect(
        new URL(session.role === "ADMIN" ? "/admin/home" : "/user/home", req.url)
      );
    }
    return NextResponse.next();
  }

  // Protect admin pages
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Protect user pages
  if (pathname.startsWith("/user")) {
    if (!session || session.role !== "USER") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/signup"],
};
