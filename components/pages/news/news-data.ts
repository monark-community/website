import enNews from "@/content/en/news/index";
import frNews from "@/content/fr/news/index";
import { DatedNewsMetadata } from "@/types/news.types";
import { Locale } from "@/i18n.config";

/**
 * The news data source: the generated indexes in content/{en,fr}/news
 * (news-index.script.ts). Shared by the news list, the article page and the
 * Learn hub so they all sort and format items the same way.
 */
const newsDataMap: Record<Locale, DatedNewsMetadata[]> = {
  en: enNews,
  fr: frNews,
};

/** Every news item for a locale, most recent first. */
export function getNews(locale: Locale): DatedNewsMetadata[] {
  return [...(newsDataMap[locale] ?? newsDataMap.en)].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** One news item by id, or undefined. */
export function getNewsItem(
  locale: Locale,
  id: string
): DatedNewsMetadata | undefined {
  return (newsDataMap[locale] ?? newsDataMap.en).find((item) => item.id === id);
}

/** The most recent items other than `excludeId`. */
export function getOtherNews(
  locale: Locale,
  excludeId: string,
  count = 3
): DatedNewsMetadata[] {
  return getNews(locale)
    .filter((item) => item.id !== excludeId)
    .slice(0, count);
}

/**
 * Publication date in the reader's language. Dates are calendar days stored
 * as UTC midnight, so they are formatted in UTC: formatting in local time
 * shows the previous day west of Greenwich (and differs between the server
 * and the browser).
 */
export function formatNewsDate(date: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/** Machine-readable date for <time dateTime>. */
export function isoNewsDate(date: string | Date): string {
  return (typeof date === "string" ? new Date(date) : date)
    .toISOString()
    .slice(0, 10);
}

/** Rounded reading time in minutes, at least one. */
export function readMinutes(seconds: number): number {
  return Math.max(1, Math.round((seconds || 0) / 60));
}

/** Unique tags, in a stable order. */
export function uniqueTags(tags: string[] | string[][] = []): string[] {
  return [...new Set((tags as string[]).flat())].sort((a, b) =>
    a.localeCompare(b)
  );
}
