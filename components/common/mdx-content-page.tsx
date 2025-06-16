import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import { ChevronLeftIcon } from "lucide-react";
import { NavLink } from "./navlink/navlink";

interface MdxContentPageProps {
  contentPath: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export default async function MdxContentPage({
  contentPath,
  backHref,
  backLabel,
  children,
}: MdxContentPageProps) {
  if (!fs.existsSync(contentPath)) {
    notFound();
  }
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { content } = matter(contentRaw);

  return (
    <div className="container mx-auto">
      {backHref && backLabel && (
        <div className="mt-8">
          <NavLink href={backHref} className="inline-flex items-center text-primary font-medium group no-underline">
            <ChevronLeftIcon/>&nbsp;{backLabel}
          </NavLink>
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={content} components={components} />
      </div>
      {children}
    </div>
  );
}
