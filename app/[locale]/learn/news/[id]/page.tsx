import path from "path";
import * as i18n from "./page.i18n";
import type { I18n as PageI18n } from "./page.i18n";
import type { Metadata } from "next";
import MdxContentPage from "@/components/common/mdx-content-page";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";

interface NewsPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "news",
    id,
    "page.mdx"
  );
  return generateMdxMetadata({
    contentPath,
    id,
    ogImagePrefix: "/images/news/",
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale, id } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "news",
    id,
    "page.mdx"
  );
  const i18nStrings: PageI18n =
    (i18n as Record<string, PageI18n>)[locale] || i18n.en;

  return (
    <MdxContentPage
      contentPath={contentPath}
      backHref={`/${locale}/learn/news`}
      backLabel={i18nStrings.back_to_list}
    />
  );
}