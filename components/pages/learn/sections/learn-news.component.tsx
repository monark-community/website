import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import NewsCard from "@/components/pages/news/news-card";
import { DatedNewsMetadata } from "@/types/news.types";
import { Locale } from "@/i18n.config";
import { I18n } from "../learn.i18n";

type Props = {
  t: I18n["learn_page"]["news"];
  items: DatedNewsMetadata[];
  locale: Locale;
};

/** The three latest news items, from the same data as /learn/news. */
function LearnNews({ t, items, locale }: Props) {
  if (items.length === 0) return null;
  return (
    <section id="news" aria-labelledby="learn-news">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <SectionHeading
          id="learn-news"
          eyebrow={t.eyebrow}
          title={t.title}
        />
        <NavLink
          href="/learn/news"
          className="inline-flex h-10 items-center gap-1.5 text-sm font-bold text-primary-ink no-underline underline-offset-4 hover:underline"
        >
          {t.see_all}
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </NavLink>
      </div>
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`m-0 ${index === 2 ? "sm:max-lg:hidden" : ""}`}
          >
            <NewsCard item={item} locale={locale} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LearnNews;
