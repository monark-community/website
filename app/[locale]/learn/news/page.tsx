import React from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import * as i18n from "./news.i18n";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";

type Params = Promise<{ locale: Locale }>;

export default async function NewsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = i18n[locale].news_page;
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">{t.title}</h1>
      <p className="text-lg mb-8 max-w-[450px]">{t.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.news.map((article) => (
          <div key={article.id} className="flex flex-col">
            <Card className="flex flex-col flex-grow">
              <CardHeader>
                <Image
                  src={`/${locale}/images/news/${article.image}`}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-xl mb-4"
                  width={64}
                  height={64}
                />
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>
                  {article.date.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <CardDescription>{article.summary}</CardDescription>
                <Link href={`/learn/news/${article.id}`} className="mt-auto">
                  <Button className="mt-4">{t.read_more}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
