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

  const tokenString = request.cookies.token;
  if (!tokenString) {
    return NextResponse.redirect(new URL('/', currLocation))
  }

  // Getting cookies from the request
  const jwt = decode<JwtPayload>(tokenString);
  if (jwt.exp < new Date().valueOf() / 1000) {
    const response = NextResponse.redirect(new URL('/', currLocation))
    response.cookies.token = ''
    return response
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/*',
}
