"use client";
import React, { useMemo, useState } from "react";
import { NewspaperIcon, SearchIcon, SearchXIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import i18n from "./news.i18n";
import { getNews, uniqueTags } from "./news-data";
import NewsCard from "./news-card";

interface NewsListProps {
  locale: Locale;
}

/**
 * /learn/news: page header, a search over titles, summaries and tags, the
 * latest item as a wide featured card, then the rest as a card grid. While
 * searching, every match goes in the grid (no featured card).
 */
const NewsList: React.FC<NewsListProps> = ({ locale }) => {
  const t = (i18n[locale] ?? i18n.en).list;
  const [search, setSearch] = useState("");
  const news = useMemo(() => getNews(locale), [locale]);

  const query = search.trim().toLowerCase();
  const results = query
    ? news.filter((item) =>
        [item.title, item.description, ...uniqueTags(item.tags)]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : news;
  const [featured, ...rest] = results;
  const showFeatured = !query && featured;
  const grid = showFeatured ? rest : results;

  return (
    <div className="site-container pb-16 pt-10 md:pb-24 md:pt-14">
      <header className="max-w-[42rem]">
        <NavLink href="/learn" className="eyebrow w-fit no-underline underline-offset-4 hover:underline">
          {t.eyebrow}
        </NavLink>
        <h1>{t.title}</h1>
        <p className="lead mt-4">{t.lead}</p>
      </header>

      {news.length === 0 ? (
        <EmptyState
          icon={<NewspaperIcon className="size-6" />}
          title={t.empty_title}
          body={t.empty_body}
          action={
            <Button asChild variant="outline">
              <NavLink href="/learn">{t.back_to_learn}</NavLink>
            </Button>
          }
        />
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mt-10">
            <div className="relative w-full sm:max-w-sm">
              <label htmlFor="news-search" className="sr-only">
                {t.search_label}
              </label>
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="news-search"
                type="search"
                placeholder={t.search_placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 rounded-full pl-10"
              />
            </div>
            <p
              className="m-0 text-sm text-muted-foreground"
              aria-live="polite"
            >
              {t.count(results.length)}
            </p>
          </div>

          {results.length === 0 ? (
            <EmptyState
              icon={<SearchXIcon className="size-6" />}
              title={t.empty_search_title(search.trim())}
              body={t.empty_search_body}
              action={
                <Button variant="outline" onClick={() => setSearch("")}>
                  <XIcon aria-hidden="true" />
                  {t.clear_search}
                </Button>
              }
            />
          ) : (
            <>
              {showFeatured && (
                <NewsCard
                  item={featured}
                  locale={locale}
                  variant="featured"
                  headingLevel="h2"
                  priority
                  className="mt-8"
                />
              )}
              {grid.length > 0 && (
                <ul className="m-0 mt-5 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {grid.map((item) => (
                    <li key={item.id} className="m-0">
                      <NewsCard
                        item={item}
                        locale={locale}
                        headingLevel="h2"
                      />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-3xl border border-dashed bg-card px-6 py-14 text-center">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
      >
        {icon}
      </span>
      <h2 className="mt-5 text-xl">{title}</h2>
      <p className="mt-2 max-w-[28rem] text-muted-foreground">{body}</p>
      <div className="mt-6">{action}</div>
    </div>
  );
}

export default NewsList;
