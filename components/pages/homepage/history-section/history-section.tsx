import React from "react";
import { Locale } from "@/i18n.config";
import { en, fr } from "./history.i18n";
import BrandedSeparator from "@/components/common/branded-separator/branded-separator";

type Props = {
  locale: Locale;
};

const contentMap = {
  en: en.history.content,
  fr: fr.history.content,
};

/** Mission statement between two branded separators (flat orange line). */
function HistorySection({ locale }: Props) {
  const content = contentMap[locale];

  return (
    <section className="site-container py-12 md:py-16">
      <BrandedSeparator circlePosition="both" width="100%" />
      <div
        className="mx-auto max-w-[46rem] py-12 text-center text-xl font-semibold leading-relaxed text-foreground md:py-16 md:text-2xl [&_p]:m-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <BrandedSeparator circlePosition="both" width="100%" />
    </section>
  );
}

export default HistorySection;
