import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/", "/api/public"];

export default clerkMiddleware(async ({ req, auth }) => {
  const { userId } = auth; // Use auth directly since it contains the userId

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  if (!userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
