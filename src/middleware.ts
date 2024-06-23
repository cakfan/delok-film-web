import NextAuth from "next-auth";
import authConfig from "@/config/auth/config";
// import type { NextRequest } from "next/server";
// import { updateSession } from "@/config/supabase/middleware";
import {
  DEFAULT_LOGIN_REDIRECT,
  publicApiPrefix,
  authRoutes,
  publicRoutes,
  userRoutes,
} from "@/routes";

const { auth: middleware } = NextAuth(authConfig);
// import { createClient } from "./config/supabase/server";

// Function to check if a route is start with prefix
const isUrlStartWithAnyPrefix = (
  url: string,
  prefixUrls: string[],
): boolean => {
  for (const prefix of prefixUrls) {
    if (url.startsWith(prefix)) {
      return true;
    }
  }
  return false;
};

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicApiRoute = isUrlStartWithAnyPrefix(
    nextUrl.pathname,
    publicApiPrefix,
  );
  const isPublicRoute = isUrlStartWithAnyPrefix(nextUrl.pathname, publicRoutes);
  const isUserRoute = isUrlStartWithAnyPrefix(nextUrl.pathname, userRoutes);
  const isAuthRoute = isUrlStartWithAnyPrefix(nextUrl.pathname, authRoutes);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isPublicRoute || isPublicApiRoute || isUserRoute) {
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(authRoutes[0], nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
