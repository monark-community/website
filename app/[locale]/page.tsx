import metadata from "./metadata";
import HeroSection from "@/components/common/pages/homepage/hero-section/hero-section";
import PartnersSection from "@/components/common/pages/homepage/partners-section/partners-section";
import AboutSection from "@/components/common/pages/homepage/about-section/about-section";
import WhySection from "@/components/common/pages/homepage/why-section/why-section";
import FAQSection from "@/components/common/pages/homepage/faq-section/faq-section";
import HistorySection from "@/components/common/pages/homepage/history-section/history-section";
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
        <PartnersSection locale={locale} />
        <AboutSection locale={locale} />
        <WhySection locale={locale} />
        <HistorySection locale={locale} />
        <FAQSection locale={locale} />
      </div>
    </div>
  );
}
