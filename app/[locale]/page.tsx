import metadata from "./metadata";
import HeroSection from "@/components/pages/homepage/hero-section/hero-section";
import PartnersSection from "@/components/pages/homepage/partners-section/partners-section";
import AboutSection from "@/components/pages/homepage/about-section/about-section";
import WhySection from "@/components/pages/homepage/why-section/why-section";
import FAQSection from "@/components/pages/homepage/faq-section/faq-section";
import HistorySection from "@/components/pages/homepage/history-section/history-section";
import NewsletterPopup from "@/components/common/layout/footer/newsletter/newsletter-popup";
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
       <NewsletterPopup
          locale={locale}
          delay={8000}
        />
    </div>
  );
}
