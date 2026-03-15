import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Закрываем /admin от поисковиков и прямого доступа без заголовка
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};