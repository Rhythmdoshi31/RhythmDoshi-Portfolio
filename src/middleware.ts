import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
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