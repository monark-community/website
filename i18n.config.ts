export const locales = ["en", "fr"] as const;
export const defaultLocale = "en" as const;
export type Locale = (typeof locales)[number];

/** Request header the middleware sets to the path locale, read by the root layout for <html lang>. */
export const LOCALE_HEADER = "x-monark-locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
