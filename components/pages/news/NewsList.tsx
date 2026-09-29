"use client";
import React, { useMemo, useState } from "react";
import { NewspaperIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import i18n from "./news.i18n";
import { getNews, topicTags } from "./news-data";
import NewsCard from "./news-card";

interface NewsListProps {
  locale: Locale;
}

/**
 * /learn/news as a magazine front page: the latest story as a large
 * image-led feature with the next two beside it, then every other story in
 * an image-first grid, filterable by topic. The top stories stay put (so
 * the page doesn't jump); with a topic chosen, the grid shows every match,
 * top stories included.
 */
const NewsList: React.FC<NewsListProps> = ({ locale }) => {
  const t = (i18n[locale] ?? i18n.en).list;
  const news = useMemo(() => getNews(locale), [locale]);
  const topics = useMemo(() => topicTags(news), [news]);
  const [topic, setTopic] = useState<string | null>(null);

  const filtered = topic
    ? news.filter((item) => item.tags.includes(topic))
    : news;
  const [feature, ...others] = news;
  const side = others.slice(0, 2);
  const grid = topic ? filtered : others.slice(2);

  return (
    <div className="site-container pb-16 pt-10 md:pb-24 md:pt-14">
      <header className="max-w-[42rem]">
        <NavLink
          href="/learn"
          className="eyebrow w-fit no-underline underline-offset-4 hover:underline"
        >
          {t.eyebrow}
        </NavLink>
        <h1>{t.title}</h1>
        <p className="lead mt-3">{t.lead}</p>
      </header>

      {news.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed bg-card px-6 py-14 text-center">
          <span
            aria-hidden="true"
            className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <NewspaperIcon className="size-6" />
          </span>
          <h2 className="mt-5 text-xl">{t.empty_title}</h2>
          <p className="mt-2 text-muted-foreground">{t.empty_body}</p>
          <Button asChild variant="outline" className="mt-6">
            <NavLink href="/learn">{t.back_to_learn}</NavLink>
          </Button>
        </div>
      ) : (
        <>
          {feature && (
            <section aria-labelledby="top-stories" className="mt-10 md:mt-12">
              <h2 id="top-stories" className="sr-only">
                {t.top_stories}
              </h2>
              <div
                className={cn(
                  "grid grid-cols-1 gap-x-8 gap-y-10",
                  side.length > 0 && "lg:grid-cols-12"
                )}
              >
                <NewsCard
                  item={feature}
                  locale={locale}
                  variant="feature"
                  priority
                  className={side.length > 0 ? "lg:col-span-8" : undefined}
                />
                {side.length > 0 && (
                  <ul className="m-0 grid list-none grid-cols-1 gap-x-5 gap-y-10 p-0 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-y-8">
                    {side.map((item) => (
                      <li key={item.id} className="m-0">
                        <NewsCard item={item} locale={locale} variant="side" />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {(grid.length > 0 || topic) && (
            <section
              aria-labelledby="all-news"
              className="mt-16 border-t pt-12 md:mt-20 md:pt-16"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 id="all-news" className="text-2xl">
                  {t.all_title}
                </h2>
                {topics.length > 0 && (
                  <div
                    role="group"
                    aria-label={t.filter_label}
                    className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
                  >
                    {[null, ...topics].map((value) => {
                      const active = topic === value;
                      return (
                        <button
                          key={value ?? "all"}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setTopic(value)}
                          className={cn(
                            "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-150",
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "bg-card text-foreground hover:bg-secondary"
                          )}
                        >
                          {value ?? t.all_topics}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {grid.map((item) => (
                  <li key={item.id} className="m-0">
                    <NewsCard item={item} locale={locale} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default NewsList;
