import FAQSection from "@/components/web/pages/homepage/faq-section/faq-section";
import { Locale } from "@/i18n.config";

type Params = Promise<{ locale: Locale }>;

export default async function Home({ params }: { params: Params }) {
  const { locale } = await params;
  return (
    <div>
      <FAQSection locale={locale} />
    </div>
  );
}
