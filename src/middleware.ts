import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { legacyRedirect } from "@/seo/legacy";

export function middleware(request: NextRequest) {
  const destination = legacyRedirect(request.nextUrl.pathname);
  if (destination && destination !== request.nextUrl.pathname) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 308);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|brand/|sitemap.xml|sitemaps|robots.txt).*)"],
};
