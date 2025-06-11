import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import MembersSection from "@/components/common/members-section/members-section.component";
import { Locale } from "@/i18n.config";

interface AboutPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "about",
    "page.mdx"
  );

  // Check if the file exists
  if (!fs.existsSync(contentPath)) {
    notFound();
  }

  // Read the MDX content
  const content = fs.readFileSync(contentPath, "utf-8");

  return (
    <div className="container mx-auto">
      <MDXRemote source={content} components={components} />
      <MembersSection locale={locale as Locale} />
    </div>
  );
}
