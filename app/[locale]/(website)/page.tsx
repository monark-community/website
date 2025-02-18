import LocaleToggle from "@/components/shared/locale-toggle/locale-toggle.component";
import { ThemeToggle } from "@/components/shared/theme-toggle/theme-toggle.component";
import { Locale } from "@/i18n.config";

type Props = {
  params: {
    locale: Locale;
  };
};

export default function Home(props: Props) {
  const { locale } = props.params;
  return (
    <div>
      <ThemeToggle locale={locale} />
      <LocaleToggle locale={locale} />
    </div>
  );
}
