import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT_URL,
  protectedRoutes,
  publicRoutes,
} from "./routes";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const isLoggedIn = request.cookies.has("userAuth");

  const isApiAuthRoute = apiAuthPrefix.some((prefix) =>
    nextUrl.pathname.startsWith(prefix)
  );

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
      );
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    //   let callbackUrl = nextUrl.pathname;
    //   if (nextUrl.search) {
    //     callbackUrl += nextUrl.search;
    //   }

    //   const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(new URL(`signup`, nextUrl));
  }

  return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
