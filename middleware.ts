import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// import { getSession } from "./lib/auth.client";

// const privateRoutes = ["/", "/app"] as const;

// const isProtectedRoute = (pathname: string) =>
//   privateRoutes.some((route) => pathname.startsWith(route));

export default async function middleware(_request: NextRequest) {
  // const { data: session } = await getSession({
  //   fetchOptions: {
  //     headers: {
  //       cookie: request.headers.get("cookie") ?? "",
  //     },
  //   },
  // });
  // const currentURL = request.nextUrl.searchParams.get("currentURL");
  // const decodedURL = currentURL
  //   ? new URL(decodeURIComponent(currentURL))
  //   : new URL(request.url);
  // const pathname = decodedURL?.pathname;
  // if (session === null && isProtectedRoute(pathname)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // return null;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|403|404|500).*)",
  ],
};
