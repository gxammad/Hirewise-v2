import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getSession();

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
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  // Protect user pages
  if (pathname.startsWith("/user")) {
    if (!session || session.role !== "USER") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/signup"],
};
