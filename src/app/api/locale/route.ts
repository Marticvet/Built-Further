import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, localeCookie } from "@/i18n/config";

export function GET(request: NextRequest) {
    const locale = request.nextUrl.searchParams.get("locale") || "";
    const path = request.nextUrl.searchParams.get("path") || "";
    if (!hasLocale(locale) || !path.startsWith(`/${locale}`) || path.startsWith(`/${locale}//`)) {
        return NextResponse.redirect(new URL("/en", request.url));
    }
    const response = NextResponse.redirect(new URL(path, request.url));
    response.cookies.set(localeCookie, locale, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax", httpOnly: true, secure: request.nextUrl.protocol === "https:" });
    return response;
}
