import React from "react";
import NewsList from "@/components/common/pages/news/NewsList";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import * as i18n from "./metadata.i18n";

type NewsPageProps = {
  params : Promise<{ locale: Locale }>
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = i18n[locale].news_page;
  return {
    title: `${t.title} • Monark`,
    description: t.description,
  }
};

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  return <NewsList locale={locale} />;
}
