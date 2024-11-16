import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSession } from "./lib/auth.client";

export const PRIVATE_ROUTES = ["/app", "/"];

const isPrivateRoute = (path: string) =>
  PRIVATE_ROUTES.some((route) => route.includes(path));

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const { data: session } = await getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  if (!session && isPrivateRoute(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|403|404|500).*)",
  ],
};
