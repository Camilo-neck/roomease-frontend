import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { setCookie } from "./utils/cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

async function edgeRefreshToken(refreshTokenCookie: string | undefined) {
	if (!refreshTokenCookie) return;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refreshToken`, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken: refreshTokenCookie }),
		});
		const data = await response.json();
		const token = response.headers.get("auth-token");
		let unEncryptedToken: any;
		if (token) {
			unEncryptedToken = decodeJwt(token);
		}
		return { newToken: token, unEncryptedToken };
	} catch (error) {
		console.log(error);
		return;
	}
}

export async function middleware(req: NextRequest) {
	let token = req.cookies.get("auth-token")?.value;
	let unEnCryptedToken: any;
	if (!token) {
		const refreshTokenCookie = req.cookies.get("refresh-token")?.value;
		if (refreshTokenCookie) {
			const { newToken, unEncryptedToken } = (await edgeRefreshToken(refreshTokenCookie)) as any;
			if (newToken) {
				token = newToken;
				unEnCryptedToken = unEncryptedToken;
			}
		}
	}

	if (req.nextUrl.pathname.startsWith("/auth") && !token) {
		return NextResponse.next();
	}

	if (req.nextUrl.pathname.startsWith("/auth") && token) {
		const response = NextResponse.redirect(new URL("/app/houses", req.url));
		if (!unEnCryptedToken) {
			unEnCryptedToken = decodeJwt(token);
		}
		response.cookies.set("auth-token", token, {
			maxAge: unEnCryptedToken.exp * 1000 - Date.now(),
			path: "/",
		});
		return response;
	}

	if (req.nextUrl.pathname.startsWith("/app") && !token) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if (req.nextUrl.pathname.startsWith("/app") && token) {
		const response = NextResponse.next();
		if (!unEnCryptedToken) {
			unEnCryptedToken = decodeJwt(token);
		}
		response.cookies.set("auth-token", token, {
			maxAge: unEnCryptedToken.exp * 1000 - Date.now(),
			path: "/",
		});
		return response;
	}
}

export const config = {
	matcher: ["/auth/:path*", "/app/:path*"],
};
