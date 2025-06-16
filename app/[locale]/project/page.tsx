import React from "react";
import ProjectList from "@/components/common/pages/project/ProjectList";
import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import * as i18n from "./metadata.i18n";

type ProjectsPageProps = {
  params : Promise<{ locale: Locale }>
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = i18n[locale].projects_page;
  return {
    title: `${t.title} • Monark`,
    description: t.description,
  }
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  return <ProjectList locale={locale} />;
}
