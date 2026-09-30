import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import NewsArticleMdxContent from "@/components/pages/news/news-article-mdx-content";
import { Locale } from "@/i18n.config";

interface NewsPageProps {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
}

function contentPathFor(locale: Locale, id: string) {
  return path.join(process.cwd(), "content", locale, "news", id, "page.mdx");
}

function readFrontmatter(locale: Locale, id: string) {
  const contentPath = contentPathFor(locale, id);
  if (!fs.existsSync(contentPath)) return undefined;
  return matter(fs.readFileSync(contentPath, "utf-8")).data;
}

/**
 * Share metadata from the article's frontmatter: Open Graph "article" with
 * its publication date, author and tags, the cover image (the real .webp
 * file named in `img`), a large Twitter card, and en/fr alternates.
 */
export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const data = readFrontmatter(locale, id);
  if (!data) return {};

  const title = `${data.title} • Monark`;
  const description: string = data.description ?? "";
  const url = `/${locale}/learn/news/${id}`;
  const images = data.img
    ? [{ url: `/images/news/${data.img}`, alt: data.img_alt ?? data.title }]
    : undefined;
  const publishedTime = data.date
    ? new Date(data.date).toISOString()
    : undefined;

  return {
    title,
    description,
    authors: data.author ? [{ name: data.author }] : undefined,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/learn/news/${id}`,
        fr: `/fr/learn/news/${id}`,
      },
    },
    openGraph: {
      type: "article",
      siteName: "Monark",
      title,
      description,
      url,
      locale: locale === "fr" ? "fr_CA" : "en_US",
      publishedTime,
      authors: data.author ? [data.author] : undefined,
      tags: Array.isArray(data.tags) ? data.tags.flat() : undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale, id } = await params;
  const data = readFrontmatter(locale, id);

  // Structured data for search engines and link previews.
  const jsonLd = data
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: data.title,
        description: data.description,
        image: data.img ? [`/images/news/${data.img}`] : undefined,
        datePublished: data.date
          ? new Date(data.date).toISOString()
          : undefined,
        author: data.author
          ? [
              {
                // "Monark Team" / "Équipe Monark" is the organisation.
                "@type": /monark/i.test(data.author) ? "Organization" : "Person",
                name: data.author,
              },
            ]
          : undefined,
        publisher: { "@type": "Organization", name: "Monark" },
        inLanguage: locale,
      }
    : undefined;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <NewsArticleMdxContent
        contentPath={contentPathFor(locale, id)}
        id={id}
        locale={locale}
      />
    </>
  );
}
