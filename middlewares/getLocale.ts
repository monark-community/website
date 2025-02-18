import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { locales, defaultLocale } from "@/i18n.config";

export function getLocale(request: NextRequest) {
  const current = request.cookies.get("NEXT_LOCALE");
  if (current?.value) return current.value;
  const locale = request.headers
    .get("accept-language")
    ?.split(",")
    .map((l) => l.split(";")[0]);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return match(locale ?? [], locales as any, defaultLocale);
}

export function getPathnameLocale(pathname: string) {
  return locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}
