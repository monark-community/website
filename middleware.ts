import acceptLanguage from "accept-language";
import { LOCALE_HEADER, locales } from "@/i18n.config";
import { NextRequest, NextResponse } from "next/server";
import { getLocale, getPathnameLocale } from "./middlewares/getLocale";

acceptLanguage.languages(Array.from(locales));

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.search; // Get search parameters

  // Check if there is any supported locale in the pathname
  const locale = getLocale(req);
  const pathnameLocale = getPathnameLocale(pathname);
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  // Redirect if there is no locale in the pathname or if the cookie locale differs from the pathname locale
  if (!pathnameLocale || (cookieLocale && cookieLocale !== pathnameLocale)) {
    const newLocale = cookieLocale || locale;
    const newPathname = pathnameLocale
      ? pathname.replace(`/${pathnameLocale}`, `/${newLocale}`)
      : `/${newLocale}${pathname}`;
    const response = NextResponse.redirect(
      new URL(newPathname + searchParams, req.url)
    ); // Append search parameters
    response.cookies.set("NEXT_LOCALE", newLocale);
    return response;
  } else {
    // Pass the path locale to the root layout (for <html lang>) and set it in cookies
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set(LOCALE_HEADER, pathnameLocale);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.set("NEXT_LOCALE", pathnameLocale);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_vercel|_next/static|_next/image|fonts|images|sounds|vectors|assets|favicon.ico).*)",
  ],
};
