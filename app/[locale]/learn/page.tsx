import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import * as i18n from "@/components/pages/learn/learn.i18n";
import { getNews, getNewsItem } from "@/components/pages/news/news-data";
import LearnHero from "@/components/pages/learn/sections/learn-hero.component";
import LearnPaths from "@/components/pages/learn/sections/learn-paths.component";
import LearnNews from "@/components/pages/learn/sections/learn-news.component";
import LearnDocs from "@/components/pages/learn/sections/learn-docs.component";
import LearnCommunity from "@/components/pages/learn/sections/learn-community.component";
import LearnCta from "@/components/pages/learn/sections/learn-cta.component";

type LearnPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = (i18n[locale] ?? i18n.en).learn_page;
  const title = `${meta.title} • Monark`;
  // The site's shared Open Graph image (there is no Learn-specific one).
  const images = [`/${locale}/images/og/og-homepage-monark-decentralization.jpg`];
  return {
    title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/learn`,
      languages: { en: "/en/learn", fr: "/fr/learn" },
    },
    openGraph: { title, description: meta.description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images,
    },
  };
}

/**
 * /learn: Monark's learning hub. Learning paths by audience, the latest
 * news, the docs, community channels and a closing call to action, from
 * typed en/fr content (components/pages/learn/learn.i18n.ts).
 */
export default async function LearnPage({ params }: LearnPageProps) {
  const { locale } = await params;
  const t = (i18n[locale] ?? i18n.en).learn_page;
  const latest = getNews(locale).slice(0, 3);
  const starters = Object.fromEntries(
    t.paths.items.map((path) => [
      path.starter_id,
      getNewsItem(locale, path.starter_id),
    ])
  );

  return (
    <div className="site-container space-y-20 pb-8 pt-10 md:space-y-28 md:pt-16">
      <LearnHero t={t.hero} />
      <LearnPaths t={t.paths} starters={starters} />
      <LearnNews t={t.news} items={latest} locale={locale} />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <LearnDocs t={t.docs} />
        <LearnCommunity t={t.community} />
      </div>
      <LearnCta t={t.cta} />
    </div>
  );
}
