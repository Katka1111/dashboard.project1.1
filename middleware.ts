import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher, auth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (_, req: NextRequest) => {
  if (protectedRoutes(req)) {
    // Protect dashboard routes
    const session = await auth().getSession();
    if (!session) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // For all other cases, continue with the request
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
