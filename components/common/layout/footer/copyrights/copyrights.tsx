import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./copyrights.i18n";

type Props = {
  company: string;
  locale: Locale;
  className?: string;
};

function Copyrights({ company, locale, className }: Props) {
  const t = i18n[locale].copyrights;
  return (
    <span className={`copyrights text-sm text-muted-foreground ${className}`}>
      © {new Date().getFullYear()} {company}, {t.all_rights_reserved}.
    </span>
  );
}

export default Copyrights;
