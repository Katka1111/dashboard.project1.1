import { NextResponse } from 'next/server';
import { authMiddleware } from "@clerk/nextjs";
import type { NextRequest } from 'next/server';


// Define protected routes
const protectedRoutes = ['/dashboard-project1-1.vercel.app(.*)'];

export default authMiddleware({
  publicRoutes: (req) => !protectedRoutes.some(route => req.nextUrl.pathname.match(route)),
  afterAuth(auth, req, evt) {
    // Handle authenticated requests
    if (auth.userId && protectedRoutes.some(route => req.nextUrl.pathname.match(route))) {
      // User is authenticated and trying to access a protected route
      // You can add additional logic here if needed
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
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
