import AboutSection from "@/components/web/pages/homepage/about-section/about-section";
import WhySection from "@/components/web/pages/homepage/why-section/why-section";
import FAQSection from "@/components/web/pages/homepage/faq-section/faq-section";
import { Locale } from "@/i18n.config";

type Params = Promise<{ locale: Locale }>;

export default async function Home({ params }: { params: Params }) {
  const { locale } = await params;
  return (
    <div>
      <AboutSection locale={locale} />
      <WhySection locale={locale} />
      <FAQSection locale={locale} />
    </div>
  );
}
