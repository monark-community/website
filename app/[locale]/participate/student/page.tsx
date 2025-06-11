import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";

type StudentPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function StudentPage({ params }: StudentPageProps) {
  const { locale } = await params;

  const contentPath = path.join(
    process.cwd(),
    "content",
    locale,
    "participate",
    "student",
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
    </div>
  );
}
