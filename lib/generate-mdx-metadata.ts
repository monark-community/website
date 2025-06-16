import fs from "fs";
import matter from "gray-matter";
import type { Metadata } from "next";

export interface GenerateMdxMetadataOptions {
  contentPath: string;
  id?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  ogImagePrefix?: string; // e.g. "/images/project/"
}

export function generateMdxMetadata({
  contentPath,
  id = "",
  fallbackTitle = "",
  fallbackDescription = "",
  ogImagePrefix = "",
}: GenerateMdxMetadataOptions): Metadata {
  if (!fs.existsSync(contentPath)) {
    return {};
  }
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { data } = matter(contentRaw);
  const title = `${data.accronym || data.title || fallbackTitle || id} • Monark`;
  const description = data.description || fallbackDescription;
  const ogImage = ogImagePrefix && id ? `${ogImagePrefix}${id}.jpg` : undefined;

  return {
    title,
    description,
    openGraph: ogImage
      ? {
          title,
          description,
          images: [ogImage],
        }
      : undefined,
    twitter: ogImage
      ? {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        }
      : undefined,
  };
}
