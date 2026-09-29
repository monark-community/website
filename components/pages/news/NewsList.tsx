"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NewspaperIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import i18n from "./news.i18n";
import { getNews, NewsSection, newsSections } from "./news-data";
import NewsCard from "./news-card";

interface NewsListProps {
  locale: Locale;
}

// Stories beside a section's feature; the rest go in a grid below.
const SIDE_COUNT = 3;

const sectionId = (category: string) => `news-${category}`;

/**
 * /learn/news as a magazine: the latest story as a wide lead, a sticky row
 * of jump links, then one section per category (news frontmatter
 * `category`). Each section shows a large 16:9 feature with compact stories
 * beside it, mirrored from one section to the next on wide screens (feature
 * left, then right, ...); extra stories continue in a grid. The lead story
 * isn't repeated in its category.
 */
const NewsList: React.FC<NewsListProps> = ({ locale }) => {
  const t = (i18n[locale] ?? i18n.en).list;
  const news = useMemo(() => getNews(locale), [locale]);
  const [lead] = news;
  const sections = useMemo(() => newsSections(news, lead?.id), [news, lead]);
  const active = useActiveSection(sections);
  const jumpList = useRef<HTMLUListElement>(null);

  // Keep the current category visible in the scrollable row (phones).
  useEffect(() => {
    const list = jumpList.current;
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left) });
  }, [active]);

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

      {!lead ? (
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
          <section aria-labelledby="news-latest" className="mt-10 md:mt-12">
            <h2 id="news-latest" className="sr-only">
              {t.latest_label}
            </h2>
            <NewsCard item={lead} locale={locale} variant="lead" priority />
          </section>

          {sections.length > 1 && (
            <nav
              aria-label={t.jump_label}
              className="sticky top-16 z-20 -mx-4 mt-14 border-y bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/75 sm:mx-0 sm:rounded-full sm:border md:mt-16"
            >
              <ul
                ref={jumpList}
                className="m-0 flex list-none gap-1 overflow-x-auto p-1.5 px-4 [scrollbar-width:none] sm:px-1.5">
                {sections.map(({ category }) => {
                  const current = active === category;
                  return (
                    <li key={category} className="m-0 shrink-0">
                      <a
                        href={`#${sectionId(category)}`}
                        aria-current={current ? "true" : undefined}
                        className={cn(
                          "inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold no-underline transition-colors duration-150",
                          current
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-secondary"
                        )}
                      >
                        {t.categories[category].title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {sections.map((section, index) => (
            <CategorySection
              key={section.category}
              section={section}
              mirrored={index % 2 === 1}
              locale={locale}
              title={t.categories[section.category].title}
              line={t.categories[section.category].line}
            />
          ))}
        </>
      )}
    </div>
  );
};

function CategorySection({
  section,
  mirrored,
  locale,
  title,
  line,
}: {
  section: NewsSection;
  mirrored: boolean;
  locale: Locale;
  title: string;
  line?: string;
}) {
  const [feature, ...rest] = section.items;
  const side = rest.slice(0, SIDE_COUNT);
  const more = rest.slice(SIDE_COUNT);
  const id = sectionId(section.category);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-14 scroll-mt-36 border-t pt-10 md:mt-16 md:pt-14"
    >
      <div className="max-w-[40rem]">
        <h2 id={`${id}-title`}>{title}</h2>
        {line && <p className="mt-2 text-muted-foreground">{line}</p>}
      </div>

      <div
        className={cn(
          "mt-8 grid grid-cols-1 gap-x-10 gap-y-8",
          side.length > 0 && "lg:grid-cols-12",
          side.length > 1 && "lg:items-center"
        )}
      >
        <NewsCard
          item={feature}
          locale={locale}
          variant={side.length > 0 ? "feature" : "lead"}
          className={cn(
            side.length > 0 && "lg:col-span-7",
            mirrored && "lg:order-2"
          )}
        />
        {side.length > 0 && (
          <ul
            className={cn(
              "m-0 flex list-none flex-col gap-6 p-0 lg:col-span-5",
              mirrored && "lg:order-1"
            )}
          >
            {side.map((item) => (
              <li key={item.id} className="m-0">
                <NewsCard
                  item={item}
                  locale={locale}
                  // A single story beside the feature gets a full card.
                  variant={side.length > 1 ? "compact" : "default"}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {more.length > 0 && (
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((item) => (
            <li key={item.id} className="m-0">
              <NewsCard item={item} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** The category section currently at the top of the viewport. */
function useActiveSection(sections: NewsSection[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = sections
      .map(({ category }) => document.getElementById(sectionId(category)))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const first = elements.find((el) => visible.get(el.id));
        setActive(first ? first.id.replace(/^news-/, "") : null);
      },
      // A band just under the sticky header and jump links.
      { rootMargin: "-140px 0px -55% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);
  return active;
}

export default NewsList;
