import React from "react";
import { Locale } from "@/i18n.config";
import Roadmap from "@/components/web/roadmap/roadmap";

type Params = Promise<{ locale: Locale }>;

export default async function RoadmapPage({ params }: { params: Params }) {
  const { locale } = await params;
  return <Roadmap locale={locale} />;
}
