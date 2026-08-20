import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie } from "@/i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const firstSegment = pathname.split("/")[1];
    if (hasLocale(firstSegment)) {
        if (pathname.length > 1 && pathname.endsWith("/")) {
            const url = new URL(request.url);
            url.pathname = pathname.slice(0, -1);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    const saved = request.cookies.get(localeCookie)?.value;
    const locale = saved && hasLocale(saved) ? saved : defaultLocale;
    const url = request.nextUrl.clone();
    if (pathname === "/") {
        url.pathname = `/${locale}`;
        return NextResponse.rewrite(url);
    }

    url.pathname = `/${locale}${pathname.replace(/\/$/, "")}`;
    return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|bfx|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"] };
