import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import MembersSection from "@/components/pages/about/members-section/members-section.component";
import AuthorCard from "@/components/pages/about/author-card/author-card.component";
import * as members from "@/components/pages/about/members-section/members.i18n";
import { Locale } from "@/i18n.config";
import matter from "gray-matter";
import { Metadata } from "next";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "about",
    "page.mdx"
  );
  return generateMdxMetadata({
    contentPath,
    id: "about",
    ogImagePrefix: "/images/",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

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
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { content } = matter(contentRaw);

  // The first team member (the CEO) signs the About text: an author card
  // in a left column that stays in view while the text scrolls on large
  // screens, and a compact block above the text on small ones.
  const team = members[locale as Locale].team;
  const author = team.members[0];

  return (
    <div className="pt-6 pb-8 md:pt-10">
      <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,48rem)] lg:gap-12">
        {author && (
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AuthorCard member={author} label={team.author_label} />
          </div>
        )}
        <div className="min-w-0">
          <MDXRemote source={content} components={components} />
        </div>
      </div>
      <MembersSection
        locale={locale as Locale}
        exclude={author ? [author.name] : []}
      />
    </div>
  );
}
