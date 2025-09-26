import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import matter from "gray-matter";
import { Metadata } from "next";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";

type IndustryPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "participate",
    "industry",
    "page.mdx"
  );
  return generateMdxMetadata({
    contentPath,
    id: "industry",
    ogImagePrefix: "/images/",
  });
}

export default async function DeveloperPage({ params }: IndustryPageProps) {
  const { locale } = await params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "participate",
    "industry",
    "page.mdx"
  );

  // Check if the file exists
  if (!fs.existsSync(contentPath)) {
    notFound();
  }

  // Read the MDX content
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { content } = matter(contentRaw);

  return (
    <div className="container mx-auto py-6">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
