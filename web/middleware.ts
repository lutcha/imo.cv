// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const url = request.nextUrl.clone();

    // Pattern for subdomains (e.g., agency.imo.cv or agency.localhost:3000)
    // We exclude common root domains
    const subdomainMatch = host.match(/^([a-z0-9-]+)\.(imo\.cv|localhost:\d+)$/);

    if (subdomainMatch?.[1] && !['www', 'api', 'admin'].includes(subdomainMatch[1])) {
        const subdomain = subdomainMatch[1];

        // Rewrite to agency route group
        // This will map agency.localhost:3000/ to app/(agency)/[subdomain]/page.tsx
        if (!url.pathname.startsWith(`/agency/${subdomain}`)) {
            url.pathname = `/agency/${subdomain}${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
