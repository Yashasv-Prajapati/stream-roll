import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    apiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT_URL,
    protectedRoutes,
    publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

    const isPublicRoute = publicRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );

    const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    );

    if (isApiRoute) {
        return NextResponse.next();
    }

    if (isProtectedRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl)
            );
        }
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
