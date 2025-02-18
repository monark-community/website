import acceptLanguage from "accept-language";
import { locales } from "@/i18n.config";
import { NextRequest, NextResponse } from "next/server";
import { getLocale, getPathnameLocale } from "./middlewares/getLocale";

acceptLanguage.languages(Array.from(locales));

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

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
    const response = NextResponse.redirect(new URL(newPathname, req.url));
    response.cookies.set("NEXT_LOCALE", newLocale);
    return response;
  } else {
    // Set locale in cookies
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", pathnameLocale);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|fonts|images|sounds|vectors|assets|favicon.ico).*)",
  ],
};
