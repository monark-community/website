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

/**
 * Tags carried by every item of a locale (e.g. "Article"): they say
 * nothing about an item, so cards and filters leave them out.
 */
export function commonTags(items: DatedNewsMetadata[]): Set<string> {
  if (items.length === 0) return new Set();
  const [first, ...rest] = items;
  return new Set(
    uniqueTags(first.tags).filter((tag) =>
      rest.every((item) => item.tags.includes(tag))
    )
  );
}

/** Filterable topics for a list, most used first. */
export function topicTags(items: DatedNewsMetadata[]): string[] {
  const common = commonTags(items);
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of uniqueTags(item.tags)) {
      if (!common.has(tag)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

/** The one tag a card shows: the item's first tag that isn't common. */
export function primaryTag(
  item: DatedNewsMetadata,
  common: Set<string>
): string | undefined {
  return item.tags.find((tag) => !common.has(tag)) ?? item.tags[0];
}

/** The first `maxWords` words of a summary, with an ellipsis if cut. */
export function excerpt(text: string, maxWords = 20): string {
  const words = (text || "").trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words
    .slice(0, maxWords)
    .join(" ")
    .replace(/[,;:.!?…—-]+$/, "")}…`;
}

/** Unique tags, in a stable order. */
export function uniqueTags(tags: string[] | string[][] = []): string[] {
  return [...new Set((tags as string[]).flat())].sort((a, b) =>
    a.localeCompare(b)
  );
}
