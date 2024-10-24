import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher, getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';


const isProtectedRoute = createRouteMatcher([
    '/dashboard-project1-1.vercel.app(.*)'
]);
export default clerkMiddleware((auth, req) => {
  const userId = auth.userId;
  if (isProtectedRoute(req)) {
    auth.protect();
  }
  // You can add custom logic here based on the user's authentication status
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
