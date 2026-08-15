import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie } from "@/i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const firstSegment = pathname.split("/")[1];
    if (hasLocale(firstSegment)) return NextResponse.next();

    const saved = request.cookies.get(localeCookie)?.value;
    const locale = saved && hasLocale(saved) ? saved : defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"] };
