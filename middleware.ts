import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Remove the declaration since these functions are already defined in the package
// If you need to extend or modify the types, consider using interface merging instead
// For example:
// declare module '@clerk/nextjs/server' {
//   interface Auth {
//     // Add any additional properties here
//   }
// }

// If you still need to use custom types, consider creating a separate types file
// and importing it where needed, rather than declaring them in the middleware

import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";

console.log("Middleware NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const publicRoutes = ["/", "/api/public"];

export default clerkMiddleware(async (auth, req) => {
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { userId } = await getAuth(req);

  if (!userId && !publicRoutes.includes(req.nextUrl.pathname)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
