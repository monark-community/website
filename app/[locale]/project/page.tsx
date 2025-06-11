import React from "react";
import ProjectList from "../../../components/common/pages/project/ProjectList";
import { Locale } from "@/i18n.config";

type Params = Promise<{ locale: Locale }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale } = await params;
  return <ProjectList locale={locale} />;
}
