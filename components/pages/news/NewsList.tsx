"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
// The fixed site header (h-16).
const HEADER_HEIGHT = 64;

const sectionId = (category: string) => `news-${category}`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * /learn/news as a magazine: the latest story as a wide lead, a sticky row
 * of jump links, then one section per category (news frontmatter
 * `category`). Sections with two stories show them side by side at the
 * same size; larger ones show a big 16:9 feature with the other stories
 * beside it, mirrored from one section to the next on wide screens
 * (feature left, then right, ...), extra stories continuing in a grid.
 * The lead story isn't repeated in its category.
 */
const NewsList: React.FC<NewsListProps> = ({ locale }) => {
  const t = (i18n[locale] ?? i18n.en).list;
  const news = useMemo(() => getNews(locale), [locale]);
  const [lead] = news;
  const sections = useMemo(() => newsSections(news, lead?.id), [news, lead]);
  const [active, setActive, lockActive] = useActiveSection(sections);
  const stuck = useStuck();
  const jumpList = useRef<HTMLUListElement>(null);

  // Keep the current category visible in the scrollable row (phones).
  useEffect(() => {
    const list = jumpList.current;
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list) return;
    if (!link) {
      list.scrollTo({ left: 0 });
      return;
    }
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left) });
  }, [active]);

  // Smooth scroll to a section (instant under reduced motion). The offset
  // under the fixed header and the sticky bar comes from the section's
  // scroll-margin-top. The hash is updated without a jump, and the clicked
  // category stays highlighted while the page scrolls past the others.
  const jumpTo = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, category: string) => {
      const target = document.getElementById(sectionId(category));
      if (!target) return;
      event.preventDefault();
      const reduced = prefersReducedMotion();
      lockActive(reduced ? 0 : 900);
      setActive(category);
      target.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(
        window.history.state,
        "",
        `#${sectionId(category)}`
      );
    },
    [lockActive, setActive]
  );

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
            <>
              {/* Scrolls under the header exactly when the bar sticks. */}
              <div
                ref={stuck.sentinel}
                aria-hidden="true"
                className="mt-12 h-px md:mt-14"
              />
              <nav
                aria-label={t.jump_label}
                data-stuck={stuck.value ? "true" : "false"}
                // The content stays in the site container; a full-viewport
                // layer behind it carries the background, blur and border
                // once stuck (the page clips horizontal overflow).
                className="sticky top-16 z-20 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:border-transparent before:transition-[background-color,border-color] before:duration-200 before:ease-out data-[stuck=true]:before:border-border data-[stuck=true]:before:bg-background/90 data-[stuck=true]:before:backdrop-blur-md"
              >
                <ul
                  ref={jumpList}
                  className="m-0 -mx-4 flex list-none gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:-mx-1 sm:px-1"
                >
                  {sections.map(({ category }) => {
                    const current = active === category;
                    return (
                      <li key={category} className="m-0 shrink-0">
                        <a
                          href={`#${sectionId(category)}`}
                          onClick={(event) => jumpTo(event, category)}
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
            </>
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
  const id = sectionId(section.category);
  const pair = section.items.length === 2;
  const [feature, ...rest] = section.items;
  const side = pair ? [] : rest.slice(0, SIDE_COUNT);
  const more = pair ? [] : rest.slice(SIDE_COUNT);
  // Side stories by count: one gets a full card, two get tall rows that
  // share the feature's height, three or more get compact rows.
  const sideVariant =
    side.length === 1 ? "default" : side.length === 2 ? "tall" : "compact";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // scroll-mt-10 plus the global scroll-padding-top (5rem) is the fixed
      // header and the sticky bar (120px): the section lands with its top
      // border tucked under the bar's own border.
      className="mt-14 scroll-mt-10 border-t pt-10 md:mt-16 md:pt-14"
    >
      <div className="max-w-[40rem]">
        <h2 id={`${id}-title`}>{title}</h2>
        {line && <p className="mt-2 text-muted-foreground">{line}</p>}
      </div>

      {pair ? (
        // Two stories: equal cards side by side.
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-10 gap-y-12 p-0 md:grid-cols-2">
          {section.items.map((item) => (
            <li key={item.id} className="m-0">
              <NewsCard item={item} locale={locale} variant="feature" />
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={cn(
            "mt-8 grid grid-cols-1 gap-x-10 gap-y-8",
            side.length > 0 &&
              (sideVariant === "tall" ? "lg:grid-cols-2" : "lg:grid-cols-12"),
            sideVariant === "compact" && "lg:items-center"
          )}
        >
          <NewsCard
            item={feature}
            locale={locale}
            variant={side.length > 0 ? "feature" : "lead"}
            className={cn(
              side.length > 0 && sideVariant !== "tall" && "lg:col-span-7",
              mirrored && "lg:order-2"
            )}
          />
          {side.length > 0 && (
            <ul
              className={cn(
                "m-0 flex list-none flex-col gap-6 p-0",
                sideVariant !== "tall" && "lg:col-span-5",
                sideVariant === "tall" && "gap-8 lg:h-full lg:gap-6",
                mirrored && "lg:order-1"
              )}
            >
              {side.map((item) => (
                <li
                  key={item.id}
                  className={cn("m-0", sideVariant === "tall" && "lg:min-h-0 lg:flex-1")}
                >
                  <NewsCard item={item} locale={locale} variant={sideVariant} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

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

/**
 * Whether the category bar is stuck under the header: a 1px sentinel just
 * above it leaves the viewport (under the header) exactly when it sticks.
 */
function useStuck() {
  const [value, setValue] = useState(false);
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setValue(
          !entry.isIntersecting &&
            entry.boundingClientRect.top < HEADER_HEIGHT + 1
        ),
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return { value, sentinel: setNode };
}

/**
 * The category section currently under the sticky bar. `lock(ms)` freezes
 * it for a while (during a smooth scroll to a clicked category).
 */
function useActiveSection(
  sections: NewsSection[]
): [string | null, (category: string | null) => void, (ms: number) => void] {
  const [active, setActive] = useState<string | null>(null);
  const lockedUntil = useRef(0);
  const lock = useCallback((ms: number) => {
    lockedUntil.current = Date.now() + ms;
  }, []);

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
        if (Date.now() < lockedUntil.current) return;
        const first = elements.find((el) => visible.get(el.id));
        setActive(first ? first.id.replace(/^news-/, "") : null);
      },
      // A band just under the header and the sticky bar.
      { rootMargin: "-150px 0px -55% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return [active, setActive, lock];
}

export default NewsList;
