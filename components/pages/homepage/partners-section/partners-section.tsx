import React from "react";
import Partners from "@/components/common/partners/partners.component";
import { Locale } from "@/i18n.config";
import { en, fr } from "./partners-section.i18n";

type Props = {
  locale: Locale;
};

const contentMap = {
  en: en.partners,
  fr: fr.partners,
};

function PartnersSection({ locale }: Props) {
  const t = contentMap[locale];

  return (
    <div className="site-container pb-12 md:pb-16">
      <div className="flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:gap-8">
        <p className="text-sm font-semibold text-muted-foreground">{t.trust}</p>
        <Partners />
      </div>
    </div>
  );
}

export default PartnersSection;
