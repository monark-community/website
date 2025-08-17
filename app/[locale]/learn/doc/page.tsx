import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import matter from "gray-matter";
import { Metadata } from "next";
import { generateMdxMetadata } from "@/lib/generate-mdx-metadata";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "lucide-react";

type DocPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { locale } = await params;
  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "doc",
    "page.mdx"
  );
  return generateMdxMetadata({
    contentPath,
    id: "doc",
    ogImagePrefix: "/images/",
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const { locale } = await params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "doc",
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
    <div className="container mx-auto">
      <MDXRemote source={content} components={components} />
      <Button className="mt-8" size="lg" asChild>
        <a href="https://www.notion.so/Welcome-to-Monark-2222a891d75180fb8111c92d0b579775" target="_blank" rel="noreferrer" className="no-underline mb-12">
        <BookOpenIcon/>Explore Documentation  
        </a>
      </Button>
    </div>
  );
}
