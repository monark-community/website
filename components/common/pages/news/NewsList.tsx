"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import enNews from "@/content/en/news/index";
import frNews from "@/content/fr/news/index";
import { DatedNewsMetadata } from "@/types/news.types";
import i18n from "./news-list.i18n";
import { Locale } from "@/i18n.config";
import { NavLink } from "../../navlink/navlink";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import NewsArticleCategories from "./NewsArticleCategories";
import { IconLabelAttribute } from "../../icon-label-attribute/IconLabelAttribute";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { formatDuration, mapLocaleToDateFns } from "@/lib/time";

interface ProjectListProps {
  locale: Locale;
}

const newsDataMap: Record<Locale, DatedNewsMetadata[]> = {
  en: enNews,
  fr: frNews,
};

const NewsList: React.FC<ProjectListProps> = ({ locale }) => {
  const t = i18n[locale];
  const [search, setSearch] = useState("");
  const [news, setNews] = useState<DatedNewsMetadata[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log(newsDataMap);
    const newsData = newsDataMap[locale];
    setNews(newsData);
    setInitialized(true);
  }, [locale]);

  const filteredNews = news
    .filter((item) => {
      const searchLower = search.toLowerCase();
      return item.title.toLowerCase().includes(searchLower);
    })
    // Sort by date, most recent first
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">{t.page_title}</h1>
      <p className="text-muted-foreground mb-8 max-w-[460px]">
        {t.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <Input
          placeholder={t.search_placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>
      {!initialized ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full">
              <Card className="overflow-hidden h-full flex flex-col transition-colors animate-pulse">
                <div className="w-full h-64 bg-muted mb-4" />
                <CardHeader>
                  <div className="h-6 w-1/2 bg-muted rounded mb-2" />
                  <div className="h-4 w-1/4 bg-muted rounded" />
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-3/4 bg-muted rounded mb-4" />
                  <div className="mt-auto pt-2">
                    <div className="h-4 w-24 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <div key={item.id} className="h-full">
                <Card className="overflow-hidden h-full flex flex-col transition-colors">
                  <NavLink href={`/learn/news/${item.id}`} className="block">
                    <Image
                      src={`/images/news/${item.id}.webp`}
                      alt={item.title}
                      width={500}
                      height={200}
                      className="w-full h-64 object-cover mb-4 hover:opacity-90 transition-opacity"
                    />
                  </NavLink>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">
                      <NavLink
                        href={`/learn/news/${item.id}`}
                        className="hover:underline"
                      >
                        {item.title}
                      </NavLink>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="mb-4">{item.description}</p>
                    <div className="mt-auto pt-2"></div>
                    <div className="flex flex-col gap-2 text-muted-foreground">
                      <IconLabelAttribute
                        Icon={CalendarIcon}
                        label={t.date}
                        value={format(parseISO(item.date), "PPP", {
                          locale: mapLocaleToDateFns(locale),
                        })}
                      />
                      <IconLabelAttribute
                        Icon={ClockIcon}
                        label={t.read_time}
                        value={formatDuration(item.read_time_seconds, locale)}
                      />
                      <div className="flex gap-2 py-2"><NewsArticleCategories categories={item.tags.flat()} /></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-lg">
              {t.not_found}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsList;
