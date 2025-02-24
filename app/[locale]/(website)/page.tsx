import metadata from "./metadata";
import HeroSection from "@/components/web/pages/homepage/hero-section/hero-section";
import AboutSection from "@/components/web/pages/homepage/about-section/about-section";
import WhySection from "@/components/web/pages/homepage/why-section/why-section";
import FAQSection from "@/components/web/pages/homepage/faq-section/faq-section";
import HistorySection from "@/components/web/pages/homepage/history-section/history-section";
import { Locale } from "@/i18n.config";

type Params = Promise<{ locale: Locale }>;

export async function generateMetadata() {
  return metadata;
}

export default async function Home({ params }: { params: Params }) {
  const { locale } = await params;
  return (
    <div className="relative">
      <div>
        <HeroSection locale={locale} />
        <AboutSection locale={locale} />
        <WhySection locale={locale} />
        <HistorySection locale={locale} />
        <FAQSection locale={locale} />
      </div>
    </div>
  );
}
