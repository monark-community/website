import React from "react";
import NewsList from "@/components/pages/news/NewsList";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import i18n from "@/components/pages/news/news.i18n";
import { getNews } from "@/components/pages/news/news-data";

type NewsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = i18n[locale] ?? i18n.en;
  const title = `${meta.title} • Monark`;
  // The latest article's cover stands in for the list when shared.
  const latest = getNews(locale)[0];
  const images = latest
    ? [{ url: `/images/news/${latest.img}`, alt: latest.img_alt }]
    : [`/${locale}/images/og/og-homepage-monark-decentralization.jpg`];
  return {
    title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/learn/news`,
      languages: { en: "/en/learn/news", fr: "/fr/learn/news" },
    },
    openGraph: {
      type: "website",
      siteName: "Monark",
      title,
      description: meta.description,
      url: `/${locale}/learn/news`,
      locale: locale === "fr" ? "fr_CA" : "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  return <NewsList locale={locale} />;
}
