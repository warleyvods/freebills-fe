import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import decode from 'jwt-decode';

type JwtPayload = {
  exp: number;
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currLocation = new URL(request.url);
  if (currLocation.pathname === '/') {
    return NextResponse.next();
  }

  if (currLocation.pathname === '/sign-in') {
    return NextResponse.next();
  }

  if (currLocation.pathname === '/forgot') {
    return NextResponse.next();
  }

  const tokenString = request.cookies.token;
  if (!tokenString) {
    return NextResponse.redirect(new URL('/', currLocation))
  }

  const jwt = decode<JwtPayload>(tokenString);
  if (jwt.exp < new Date().valueOf() / 1000) {
    const response = NextResponse.redirect(new URL('/', currLocation))
    response.cookies.token = ''
    return response
  }

  if (currLocation.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', currLocation))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/*',
}
