import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('auth-token')?.value;

	console.log('middleware', req.nextUrl.pathname.startsWith('/app'), token)

	if (req.nextUrl.pathname.startsWith('/auth') && !token) {
		return NextResponse.next();
	}

	if (req.nextUrl.pathname.startsWith('/auth') && token) {
		return NextResponse.redirect(new URL('/app/houses', req.url));
	}

	if (req.nextUrl.pathname.startsWith('/app') && !token) {
		console.log('redirecting to login')
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	if (req.nextUrl.pathname.startsWith('/app') && token) {
		console.log('redirecting to houses')
		return NextResponse.next();
	}

}

export const config = {
	matcher: ['/auth/:path*', '/app/:path*']
}