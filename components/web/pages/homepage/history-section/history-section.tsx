import React from "react";
import { Locale } from "@/i18n.config";
import { en, fr } from "./history.i18n";
import BrandedSeparator from "@/components/shared/branded-separator/branded-separator";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  locale: Locale;
};

const contentMap = {
  en: en.history.content,
  fr: fr.history.content,
};

function HistorySection({ locale }: Props) {
  const content = contentMap[locale];

  return (
    <div className="flex items-center justify-center space-x-6 my-24 max-w-[100vw] overflow-hidden">
      <BrandedSeparator
        className="hidden md:flex"
        orientation="horizontal"
        circlePosition="before"
        width="200px"
      />
      <Card className="min-w-[500px] border border-dashed max-w-2xl text-center !ml-0">
        <CardContent className="p-8 px-16">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </Card>
      <BrandedSeparator
        className="hidden md:flex"
        orientation="horizontal"
        circlePosition="after"
        width="200px"
      />
    </div>
  );
}

export default HistorySection;
