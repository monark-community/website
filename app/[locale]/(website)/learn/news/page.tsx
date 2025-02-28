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
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Params = Promise<{ locale: Locale }>;

export default async function NewsPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = i18n[locale].news_page;
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <p className="text-lg mb-8">{t.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.news.map((article) => (
          <div key={article.id}>
            <Card>
              <CardHeader>
                <Image
                  src={`/${locale}/images/news/${article.image}`}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                  width={64}
                  height={64}
                />
                <CardTitle className="text-xl mt-4">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{article.summary}</CardDescription>
                <Link href={`/learn/news/${article.id}`}>
                  <Button>{t.read_more}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
