import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';


const isProtectedRoute = createRouteMatcher([
    '/dashboard-project1-1.vercel.app(.*)'
]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    return auth.protect();
  }

  // You can add custom logic here based on the user's authentication status
  const { userId } = auth;
  if (!userId) {
    // If the user is not authenticated, you can redirect them or return a response
    // For example:
    // return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
