import React from "react";
import NewsList from "@/components/common/pages/news/NewsList";
import { Locale } from "@/i18n.config";

type Params = Promise<{ locale: Locale }>;

export default async function NewsPage({ params }: { params: Params }) {
  const { locale } = await params;
  return <NewsList locale={locale} />;
}
