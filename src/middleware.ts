import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Use ONLY the Edge-safe config here — no mongoose, no bcrypt
export const { auth: middleware } = NextAuth(authConfig);

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default middleware(function handler(
  req: NextRequest & { auth: { user?: { role?: string } } | null }
) {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/login?callbackUrl=/admin", req.url));
    if (role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/salesman")) {
    if (!session) return NextResponse.redirect(new URL("/login?callbackUrl=/salesman", req.url));
    if (role !== "SALESMAN" && role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/account")) {
    if (!session) return NextResponse.redirect(new URL("/login?callbackUrl=/account", req.url));
  }

  if (pathname === "/checkout") {
    if (!session) return NextResponse.redirect(new URL("/login?callbackUrl=/checkout", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/salesman/:path*", "/account/:path*", "/checkout"],
};
