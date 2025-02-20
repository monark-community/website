import FAQSection from "@/components/web/pages/homepage/faq-section/faq-section";
import { Locale } from "@/i18n.config";

type Props = {
  params: {
    locale: Locale;
  };
};

export default async function Home(props: Props) {
  const { locale } = await props.params;
  return (
    <div>
      <FAQSection locale={locale} />
    </div>
  );
}
