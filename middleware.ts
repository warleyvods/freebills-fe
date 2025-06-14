import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  exp: number;
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currLocation = new URL(request.url);

  const tokenValue = request.cookies.get('token')?.value;
  if (currLocation.pathname === '/' && tokenValue) {
    const jwt = jwtDecode<JwtPayload>(tokenValue);
    if (jwt.exp >= new Date().valueOf() / 1000) {
      return NextResponse.redirect(new URL('/dashboard', currLocation));
    }
  }

  if (currLocation.pathname === '/') {
    return NextResponse.next();
  }

  if (currLocation.pathname === '/sign-in') {
    return NextResponse.next();
  }

  if (currLocation.pathname === '/forgot') {
    return NextResponse.next();
  }

  const tokenString = request.cookies.get('token')?.value;
  if (!tokenString) {
    return NextResponse.redirect(new URL('/', currLocation))
  }

  const jwt = jwtDecode<JwtPayload>(tokenString);
  if (jwt.exp < new Date().valueOf() / 1000) {
    const response = NextResponse.redirect(new URL('/', currLocation))
    response.cookies.set('token', '')
    return response
  }

  if (currLocation.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', currLocation))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
