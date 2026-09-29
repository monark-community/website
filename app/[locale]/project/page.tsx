import React, { Suspense } from "react";
import ProjectList, {
  ProjectListFallback,
} from "@/components/pages/project/ProjectList";
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
  // The list reads its filters from the query string (useSearchParams), so it
  // renders on the client; the fallback keeps the page statically renderable.
  return (
    <Suspense fallback={<ProjectListFallback locale={locale} />}>
      <ProjectList locale={locale} />
    </Suspense>
  );
}
