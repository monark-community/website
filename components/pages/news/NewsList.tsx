"use client";
import React, { useMemo } from "react";
import { NewspaperIcon, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import BrowseBar, { BarFilter } from "@/components/common/browse-bar/BrowseBar";
import {
  sectionScrollMargin,
  useActiveSection,
  useListView,
  useLocationSearch,
  useSectionJump,
} from "@/components/common/browse-bar/list-view";
import {
  matchKnownValue,
  matchesQuery,
} from "@/components/common/browse-bar/list-search";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import i18n from "./news.i18n";
import {
  commonTags,
  getNews,
  NewsSection,
  newsSections,
  uniqueTags,
} from "./news-data";
import NewsCard from "./news-card";

interface NewsListProps {
  locale: Locale;
}

// Stories beside a section's feature; the rest go in a grid below.
const SIDE_COUNT = 3;

/**
 * Query params of the news list: `q` (search in titles, summaries and
 * tags), `tag` (one topic tag, as written in that locale), `year`, and
 * `view` (see components/common/browse-bar/list-view.ts).
 */
const NEWS_PARAMS = { search: "q", tag: "tag", year: "year" } as const;
const FILTER_PARAMS = Object.values(NEWS_PARAMS);

const sectionId = (category: string) => `news-${category}`;

/** Calendar year of a news date (stored as UTC midnight). */
const newsYear = (date: string) => String(new Date(date).getUTCFullYear());

/**
 * /learn/news as a magazine, with a sticky bar under the header to switch
 * between two views.
 *
 * Browse: the latest story as a wide lead, then one section per category
 * (news frontmatter `category`), reached from the bar's jump links.
 * Sections with two stories show them side by side at the same size;
 * larger ones show a big 16:9 feature with the other stories beside it,
 * mirrored from one section to the next on wide screens (feature left,
 * then right, ...), extra stories continuing in a grid. The lead story
 * isn't repeated in its category.
 *
 * Filter: search, topic and year, and one grid of the matching stories.
 */
const NewsList: React.FC<NewsListProps> = ({ locale }) => {
  const t = (i18n[locale] ?? i18n.en).list;
  const news = useMemo(() => getNews(locale), [locale]);
  const [lead] = news;
  const sections = useMemo(() => newsSections(news, lead?.id), [news, lead]);

  const search = useLocationSearch();
  const { view, setView, setFilters } = useListView({
    search,
    filterParams: FILTER_PARAMS,
    storageKey: "monark:news-view",
    sectionPrefix: "news-",
  });
  const filtering = view === "filter";

  // Topics: every tag but the ones all stories carry ("Article").
  const { topics, years } = useMemo(() => {
    const common = commonTags(news);
    return {
      topics: uniqueTags(news.map((item) => item.tags)).filter(
        (tag) => !common.has(tag)
      ),
      years: [...new Set(news.map((item) => newsYear(item.date)))].sort(
        (a, b) => b.localeCompare(a)
      ),
    };
  }, [news]);

  const params = new URLSearchParams(search);
  const query = params.get(NEWS_PARAMS.search) ?? "";
  const selectedTag = matchKnownValue(params.get(NEWS_PARAMS.tag), topics);
  const selectedYear = matchKnownValue(params.get(NEWS_PARAMS.year), years);

  const results = useMemo(
    () =>
      news.filter(
        (item) =>
          matchesQuery(query, [item.title, item.description, ...item.tags]) &&
          (!selectedTag || item.tags.includes(selectedTag)) &&
          (!selectedYear || newsYear(item.date) === selectedYear)
      ),
    [news, query, selectedTag, selectedYear]
  );

  const sectionIds = useMemo(
    () => (filtering ? [] : sections.map(({ category }) => sectionId(category))),
    [filtering, sections]
  );
  const [active, setActive, lockActive] = useActiveSection(sectionIds);
  const jumpTo = useSectionJump(setActive, lockActive);

  const filters: BarFilter[] = [
    {
      key: NEWS_PARAMS.tag,
      label: t.topic,
      allLabel: t.all_topics,
      value: selectedTag,
      options: topics.map((tag) => ({ value: tag, label: tag })),
    },
    {
      key: NEWS_PARAMS.year,
      label: t.year,
      allLabel: t.all_years,
      value: selectedYear,
      options: years.map((year) => ({ value: year, label: year })),
    },
  ];
  const clearFilters = () =>
    setFilters(Object.fromEntries(FILTER_PARAMS.map((param) => [param, undefined])));

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
          <BrowseBar
            className="mt-4 md:mt-6"
            locale={locale}
            view={view}
            onViewChange={setView}
            jumpLabel={t.jump_label}
            sections={sections.map(({ category }) => ({
              id: sectionId(category),
              label: t.categories[category].title,
            }))}
            activeSection={active}
            onJump={jumpTo}
            search={query}
            onSearch={(value) => setFilters({ [NEWS_PARAMS.search]: value || undefined })}
            searchLabel={t.search_label}
            searchPlaceholder={t.search_short}
            filters={filters}
            onFilter={(key, value) => setFilters({ [key]: value })}
            resultLabel={t.results_count(results.length)}
            onClear={clearFilters}
          />

          {!filtering ? (
            <>
              <section aria-labelledby="news-latest" className="mt-6 md:mt-8">
                <h2 id="news-latest" className="sr-only">
                  {t.latest_label}
                </h2>
                <NewsCard item={lead} locale={locale} variant="lead" priority />
              </section>

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
          ) : results.length > 0 ? (
            <section aria-labelledby="news-results" className="mt-6 md:mt-8">
              <h2 id="news-results" className="sr-only">
                {t.results_title}
              </h2>
              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((item, index) => (
                  <li key={item.id} className="m-0">
                    <NewsCard item={item} locale={locale} priority={index < 3} />
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <div className="mx-auto mt-6 flex max-w-md flex-col items-center rounded-3xl border border-dashed px-6 py-14 text-center md:mt-8">
              <SearchX aria-hidden="true" className="size-8 text-muted-foreground" />
              <p className="mt-4 text-lg font-bold text-foreground">{t.no_match_title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.no_match_hint}</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex h-10 items-center rounded-full border border-input bg-card px-5 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.clear_filters}
              </button>
            </div>
          )}
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
      // Lands with the section's top border exactly on the sticky bar's
      // bottom border, so the two 1px lines overlap instead of stacking.
      style={{ scrollMarginTop: sectionScrollMargin(-1) }}
      className="mt-14 border-t pt-10 md:mt-16 md:pt-14"
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

export default NewsList;
