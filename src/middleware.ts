import { NextResponse } from 'next/server'

export function middleware() {
  // Get the response
  const response = NextResponse.next()

  // Add CSRF token to response headers
  const csrfToken = crypto.randomUUID()
  response.headers.set('X-CSRF-Token', csrfToken)

  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    '/contact/:path*'
  ]
} 