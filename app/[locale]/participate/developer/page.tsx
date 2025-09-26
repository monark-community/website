import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import matter from "gray-matter";
import { Metadata } from "next";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";

type DeveloperPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: DeveloperPageProps): Promise<Metadata> {
  const { locale } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "participate",
    "developer",
    "page.mdx"
  );
  return generateMdxMetadata({
    contentPath,
    id: "developer",
    ogImagePrefix: "/images/",
  });
}

export default async function DeveloperPage({ params }: DeveloperPageProps) {
  const { locale } = await params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "participate",
    "developer",
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
