import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createAuthClient } from 'better-auth/client';
import { NextURL } from 'next/dist/server/web/next-url';

export const client = createAuthClient();

export async function authMiddleware(request: NextRequest) {
  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get('cookie') ?? ""
      }
    }
  })
  if (!session && request.nextUrl.pathname !== "/sign-in") {
    return NextResponse.redirect(new NextURL("/sign-in", request.url));
  }
  return NextResponse.next();
}
