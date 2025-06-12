"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import enNews from "@/content/en/news/index";
import frNews from "@/content/fr/news/index";
import { DatedNewsMetadata } from "@/types/news.types";
import { en, fr } from "./news-list.i18n";
import { Locale } from "@/i18n.config";
import { NavLink } from "../../navlink/navlink";
import Image from "next/image";
import { format } from "date-fns";
import { fr as frDateLocale, enUS as enDateLocale } from "date-fns/locale";

interface ProjectListProps {
  locale: Locale;
}

const newsDataMap: Record<Locale, DatedNewsMetadata[]> = {
  en: enNews,
  fr: frNews,
};

const NewsList: React.FC<ProjectListProps> = ({ locale }) => {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState<DatedNewsMetadata[]>([]);
  const [i18nStrings, setI18nStrings] = useState(en);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log(newsDataMap);
    const newsData = newsDataMap[locale];
    setNews(newsData);
    setI18nStrings(locale === "fr" ? fr : en);
    setInitialized(true);
  }, [locale]);

  const filteredNews = news
    .filter((item) => {
      const searchLower = search.toLowerCase();
      return item.title.toLowerCase().includes(searchLower);
    })
    // Sort filtered news alphabetically by title
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">{i18nStrings.page_title}</h1>
      <p className="text-muted-foreground mb-8 max-w-[460px]">
        {i18nStrings.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <Input
          placeholder={i18nStrings.search_placeholder}
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
                      src={`/images/news/${item.id}.jpg`}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {item.author && <span>{item.author},</span>}
                      <span>
                        {format(new Date(item.date), "PPP", {
                          locale: locale === "fr" ? frDateLocale : enDateLocale,
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="mb-4">{item.summary}</p>
                    <div className="mt-auto pt-2"></div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-lg">
              {i18nStrings.not_found}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsList;
