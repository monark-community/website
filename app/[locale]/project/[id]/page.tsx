import path from "path";
import type { Metadata } from "next";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";
import ProjectMdxContent from "@/components/pages/project/project-mdx-content";
import { Locale } from "@/i18n.config";
import i18n from "./page.i18n";

interface ProjectsPageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "project",
    id,
    "page.mdx"
  );
  const meta = generateMdxMetadata({
    contentPath,
    id,
    ogImagePrefix: "/images/project/",
  });
  return meta;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale, id } = await params;
  const t = i18n[locale];
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "project",
    id,
    "page.mdx"
  );

  return (
    <>
      <ProjectMdxContent
        contentPath={contentPath}
        backHref={`/${locale}/project`}
        backLabel={t.back_to_list}
        locale={locale}
      />
    </>
  );
}
