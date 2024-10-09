// import { authMiddleware } from "@clerk/nextjs/server";
// import { type NextRequest, NextResponse } from "next/server";
// // import { redirect } from "next/navigation";
// // import { clerkClient } from "@clerk/nextjs";
// // import { redirectToSignIn } from "@clerk/nextjs/server";

// export default authMiddleware({
//   afterAuth: (auth, req) => {
//     if (auth.isPublicRoute) {
//       //  For public routes, we don't need to do anything
//       return NextResponse.next();
//     }

//     const url = new URL(req.nextUrl.origin);

//     if (!auth.userId) {
//       //  If user tries to access a private route without being authenticated,
//       //  redirect them to the sign in page
//       url.pathname = "/sign-in";
//       return NextResponse.redirect(url);
//     }
//   },
//   publicRoutes: [
//     "/",
//     "/sign-in(.*)",
//     "/sign-up(.*)",
//     "/terms(.*)",
//     "/api/webhook(.*)",
//     "/admin(.*)",
//   ],
//   // debug: true,
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Logger } from "next-axiom";
import type { NextFetchEvent, NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/marketplace/cart(.*)",
  "/marketplace/(.*)/products/(.*)",
  "/myorders(.*)",
  "(.*)approval(.*)",
  "(.*)approvalForms(.*)",
]);

async function loggingMiddleware(
  request: NextRequest,
  event: NextFetchEvent,
  auth: ClerkMiddlewareAuth,
  url?: URL,
) {
  const logger = new Logger({ source: "middleware" });
  logger.middleware(request);

  event.waitUntil(logger.flush());

  if (url) {
    // return NextResponse.redirect(url);
    return auth().redirectToSignIn();
  }
  return NextResponse.next();
}

export default clerkMiddleware(async (auth, req, event: NextFetchEvent) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    const url = new URL(req.nextUrl.origin);
    url.pathname = "/sign-in";

    // return NextResponse.redirect(url);
    await loggingMiddleware(req, event, auth, url);

    // return auth().redirectToSignIn()
  }
  await loggingMiddleware(req, event, auth);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
