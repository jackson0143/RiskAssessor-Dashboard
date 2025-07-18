import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {


  if (!isPublicRoute(req)) {
    await auth.protect()
  }
  
  const { sessionClaims } = await auth()
  const userRole = sessionClaims?.metadata?.role

  // Once user is authenticated, use the middleware to redirect based on role
  if (sessionClaims) {
    

    //IF USER and trying to access admin routes, redirect to home
    if (userRole !== 'admin' && isAdminRoute(req)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    
    //IF ADMIN and trying to access base routes/user routes, redirect back to admin home page (for safety)
    if (userRole === 'admin' && req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/admin/home', req.url))
    }
  }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};