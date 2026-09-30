import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
  UserIcon,
} from "lucide-react";
import {
  ArticleCover,
  articleBackLinkClass,
  articleMetaItemClass,
  articleMetaListClass,
} from "@/components/common/article-header/article-header";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import i18n, { shareLabels as getShareLabels } from "./news.i18n";
import {
  formatNewsDate,
  getOtherNews,
  isoNewsDate,
  readMinutes,
} from "./news-data";
import { newsMdxComponents } from "./news-mdx-components";
import NewsTags from "./news-tags";
import NewsShare from "./news-share";
import NewsCard from "./news-card";
import styles from "./news-prose.module.scss";

interface NewsArticleMdxContentProps {
  contentPath: string;
  id: string;
  locale: Locale;
}

/**
 * A news article: back link, header (tags, title, summary, byline, share),
 * cover image with credit, the MDX body at a readable measure (~68ch) with
 * scoped typography, the original source, then more news.
 */
export default async function NewsArticleMdxContent({
  contentPath,
  id,
  locale,
}: NewsArticleMdxContentProps) {
  if (!fs.existsSync(contentPath)) {
    notFound();
  }
  const t = (i18n[locale] ?? i18n.en).article;
  const card = (i18n[locale] ?? i18n.en).card;
  const { content, data } = matter(fs.readFileSync(contentPath, "utf-8"));
  const date: Date | undefined = data.date ? new Date(data.date) : undefined;
  const tags: string[] = Array.isArray(data.tags) ? data.tags.flat() : [];
  const path = `/${locale}/learn/news/${id}`;
  const more = getOtherNews(locale, id, 3);

  const shareLabels = getShareLabels(locale);

  return (
    <div className="pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-3xl">
        <NavLink href="/learn/news" className={articleBackLinkClass}>
          <ChevronLeftIcon aria-hidden="true" />
          {t.back}
        </NavLink>

        <header className="mt-6">
          <NewsTags tags={tags} className="mb-4" />
          <h1 className="text-balance">{data.title}</h1>
          {data.description && (
            <p className="lead mt-5">{data.description}</p>
          )}
          <ul className={articleMetaListClass}>
            {data.author && (
              <li className={articleMetaItemClass}>
                <UserIcon aria-hidden="true" className="size-4" />
                <span>
                  <span className="sr-only">{t.by} </span>
                  <span className="font-semibold text-foreground">
                    {data.author}
                  </span>
                </span>
              </li>
            )}
            {date && (
              <li className={articleMetaItemClass}>
                <CalendarIcon aria-hidden="true" className="size-4" />
                <span className="sr-only">{t.published} </span>
                <time dateTime={isoNewsDate(date)}>
                  {formatNewsDate(date, locale)}
                </time>
              </li>
            )}
            {data.read_time_seconds > 0 && (
              <li className={articleMetaItemClass}>
                <ClockIcon aria-hidden="true" className="size-4" />
                {card.min_read(readMinutes(data.read_time_seconds))}
              </li>
            )}
            {data.city && (
              <li className={articleMetaItemClass}>
                <MapPinIcon aria-hidden="true" className="size-4" />
                {data.city}
              </li>
            )}
          </ul>
          <NewsShare
            path={path}
            title={data.title}
            labels={shareLabels}
            className="mt-6 border-t pt-6"
          />
        </header>
      </div>

      {data.img && (
        <ArticleCover
          src={`/images/news/${data.img}`}
          alt={data.img_alt}
          caption={data.img_alt}
          author={data.img_author}
          authorSrc={data.img_author_src}
        />
      )}

      <div className="mx-auto mt-10 max-w-3xl md:mt-14">
        <div className={styles.prose}>
          <MDXRemote source={content} components={newsMdxComponents} />
        </div>

        {data.original_src && (
          <a
            href={data.original_src}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 flex max-w-[68ch] items-center justify-between gap-4 rounded-2xl border bg-card p-5 no-underline transition-colors duration-150 hover:border-primary/60"
          >
            <span className="font-semibold text-foreground">{t.source}</span>
            <ExternalLinkIcon
              aria-hidden="true"
              className="size-5 shrink-0 text-primary-ink"
            />
          </a>
        )}

        <NewsShare
          path={path}
          title={data.title}
          labels={shareLabels}
          className="mt-10 max-w-[68ch] border-t pt-6"
        />
      </div>

      {more.length > 0 && (
        <section
          aria-labelledby="more-news"
          className="mt-16 border-t pt-12 md:mt-24 md:pt-16"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="more-news">{t.more_title}</h2>
            <NavLink
              href="/learn/news"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-ink no-underline underline-offset-4 hover:underline"
            >
              {t.see_all}
              <ArrowRightIcon aria-hidden="true" className="size-4" />
            </NavLink>
          </div>
          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
              <li key={item.id} className="m-0">
                <NewsCard item={item} locale={locale} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
