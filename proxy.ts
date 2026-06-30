import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/auth";

const protectedPageRoutes = ["/sensus", "/pengaturan", "/admin"];
const protectedApiRoutes = ["/api/warga", "/api/pengaturan", "/api/admin"];

function isProtectedPath(pathname: string) {
  return (
    protectedPageRoutes.some((path) => pathname.startsWith(path)) ||
    protectedApiRoutes.some((path) => pathname.startsWith(path))
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const session = await verifySessionToken(token);

  if (!session) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        {
          success: false,
          message: "Session tidak valid",
        },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sensus/:path*",
    "/pengaturan/:path*",
    "/admin/:path*",
    "/api/warga/:path*",
    "/api/pengaturan/:path*",
    "/api/admin/:path*",
  ],
};