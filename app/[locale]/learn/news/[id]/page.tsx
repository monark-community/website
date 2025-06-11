import { NavLink } from "@/components/common/navlink/navlink";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import * as i18n from "./page.i18n";
import type { I18n as PageI18n } from "./page.i18n";
import { ArrowLeft } from "lucide-react";
import { components } from "@/mdx-components";

interface NewsPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale, id } = params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "news",
    id,
    "page.mdx"
  );

  // Check if the file exists
  if (!fs.existsSync(contentPath)) {
    notFound();
  }

  // Read the MDX content
  const content = fs.readFileSync(contentPath, "utf-8");
  const i18nStrings: PageI18n =
    (i18n as Record<string, PageI18n>)[locale] || i18n.en;

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <NavLink
          href={`/${locale}/learn/news`}
          className="inline-flex items-center text-primary font-medium group no-underline"
        >
          <ArrowLeft className="mr-1 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {i18nStrings.back_to_list}
        </NavLink>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={content} components={components} />
      </div>
    </div>
  );
}
