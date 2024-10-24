import { NextResponse } from 'next/server';
import { clerkMiddleware, ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';


// Define protected routes
const protectedRoutes = ['/dashboard-project1-1.vercel.app(.*)'];

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req: NextRequest) => {
  const isPublicRoute = !protectedRoutes.some(route => req.nextUrl.pathname.match(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle authenticated requests
  if (auth.userId) {
    return NextResponse.next();
  }

  // Handle non-authenticated requests to protected routes
  if (!auth.userId && protectedRoutes.some(route => req.nextUrl.pathname.match(route))) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // For all other cases, continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
