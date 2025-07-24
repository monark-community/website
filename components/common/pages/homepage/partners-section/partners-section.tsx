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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <strong>{t.trust}</strong>
      <Partners />
    </div>
  );
}

export default PartnersSection;
