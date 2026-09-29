import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import * as i18n from "@/components/pages/about/about.i18n";
import * as members from "@/components/pages/about/members-section/members.i18n";
import MembersSection from "@/components/pages/about/members-section/members-section.component";
import AuthorCard from "@/components/pages/about/author-card/author-card.component";
import AboutHero from "@/components/pages/about/sections/about-hero.component";
import AboutWhy from "@/components/pages/about/sections/about-why.component";
import AboutHow from "@/components/pages/about/sections/about-how.component";
import AboutPurpose from "@/components/pages/about/sections/about-purpose.component";
import AboutValues from "@/components/pages/about/sections/about-values.component";
import AboutCta from "@/components/pages/about/sections/about-cta.component";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = (i18n[locale] ?? i18n.en).about_page;
  const title = `${meta.title} • Monark`;
  // The site's shared Open Graph image (there is no About-specific one).
  const images = [`/${locale}/images/og/og-homepage-monark-decentralization.jpg`];
  return {
    title,
    description: meta.description,
    openGraph: { title, description: meta.description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = (i18n[locale] ?? i18n.en).about_page;

  // The first team member (the CEO) signs the About page: an author card in
  // a left column that stays in view (sticky) while the sections scroll on
  // large screens, and a compact block above the content on small ones.
  // Every section stays inside the right column, so the sticky card never
  // overlaps a full-width band.
  const team = (members[locale] ?? members.en).team;
  const author = team.members[0];

  return (
    <div className="pt-6 pb-8 md:pt-10">
      <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        {author && (
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AuthorCard member={author} label={team.author_label} />
          </div>
        )}
        <div className="min-w-0 space-y-16 md:space-y-24">
          <AboutHero t={t.hero} />
          <AboutWhy t={t.why} />
          <AboutHow t={t.how} />
          <AboutPurpose t={t.purpose} />
          <AboutValues t={t.values} />
          <AboutCta t={t.cta} />
        </div>
      </div>
      <MembersSection
        locale={locale}
        exclude={author ? [author.name] : []}
      />
    </div>
  );
}
