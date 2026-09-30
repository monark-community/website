import { Metadata } from "next";
import { Locale } from "@/i18n.config";
import * as i18n from "@/components/pages/brand/brand.i18n";
import { KIT_BYTES } from "@/components/pages/brand/brand-kit.generated";
import BrandHero from "@/components/pages/brand/sections/brand-hero.component";
import BrandLogos from "@/components/pages/brand/sections/brand-logos.component";
import BrandRules from "@/components/pages/brand/sections/brand-rules.component";
import BrandColour from "@/components/pages/brand/sections/brand-colour.component";
import BrandType from "@/components/pages/brand/sections/brand-type.component";
import BrandProducts from "@/components/pages/brand/sections/brand-products.component";
import BrandVoice from "@/components/pages/brand/sections/brand-voice.component";
import BrandContact from "@/components/pages/brand/sections/brand-contact.component";

type BrandPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = (i18n[locale] ?? i18n.en).brand_page;
  const title = `${meta.title} • Monark`;
  // The site's shared Open Graph image (there is no brand-specific one).
  const images = [`/${locale}/images/og/og-homepage-monark-decentralization.jpg`];
  return {
    title,
    description: meta.description,
    alternates: { languages: { en: "/en/brand", fr: "/fr/brand" } },
    openGraph: { title, description: meta.description, images },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images,
    },
  };
}

/** "ZIP, 1.6 MB" in the page's locale (the size is written by the kit script). */
function kitSize(locale: Locale): string {
  const mb = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(
    KIT_BYTES / (1024 * 1024)
  );
  return `ZIP, ${mb} ${locale === "fr" ? "Mo" : "MB"}`;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { locale } = await params;
  const t = (i18n[locale] ?? i18n.en).brand_page;

  return (
    <div className="space-y-16 pb-8 pt-6 md:space-y-24 md:pt-10">
      <BrandHero t={t.hero} kitSize={kitSize(locale)} />
      <BrandLogos t={t.logos} />
      <BrandRules t={t.rules} />
      <BrandColour t={t.colour} download={t.logos.download} />
      <BrandType t={t.type} newTab={t.new_tab} />
      <BrandProducts t={t.products} download={t.logos.download} />
      <BrandVoice t={t.voice} locale={locale} />
      <BrandContact t={t.contact} newTab={t.new_tab} />
    </div>
  );
}
