import path from "path";
import * as i18n from "./page.i18n";
import type { I18n as PageI18n } from "./page.i18n";
import type { Metadata } from "next";
import MdxContentPage from "@/components/common/mdx-content-page";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";
import matter from "gray-matter";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";

interface ProjectsPageProps {
  params: Promise<{
    locale: string;
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
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "project",
    id,
    "page.mdx"
  );
  const basePath = path.join(process.cwd(), "content", locale, "project");
  const monarkSupportContentPath = path.join(basePath, "monark-support.mdx");
  const devEnvContentPath = path.join(basePath, "dev-env.mdx");
  const monarkSupportContentRaw = fs.readFileSync(
    monarkSupportContentPath,
    "utf-8"
  );
  const devEnvContentRaw = fs.readFileSync(devEnvContentPath, "utf-8");
  const { content: monarkSupportContent } = matter(monarkSupportContentRaw);
  const { content: devEnvContent } = matter(devEnvContentRaw);
  const i18nStrings: PageI18n =
    (i18n as Record<string, PageI18n>)[locale] || i18n.en;

  return (
    <>
      <MdxContentPage
        contentPath={contentPath}
        backHref={`/${locale}/project`}
        backLabel={i18nStrings.back_to_list}
      />
      <MDXRemote source={devEnvContent} components={components} />
      <MDXRemote source={monarkSupportContent} components={components} />
    </>
  );
}
