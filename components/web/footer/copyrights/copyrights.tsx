import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./copyrights.i18n";

type Props = {
  company: string;
  locale: Locale;
};

function Copyrights({ company, locale }: Props) {
  const t = i18n[locale].copyrights;
  return (
    <span className="copyrights text-sm text-muted-foreground">
      © {new Date().getFullYear()} {company}, {t.all_rights_reserved}.
    </span>
  );
}

export default Copyrights;
