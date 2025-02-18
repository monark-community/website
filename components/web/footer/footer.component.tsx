import React from "react";
import { Locale } from "@/i18n.config";
import Contact from "./contact/contact.component";

type Props = {
  locale: Locale;
};

function Footer({ locale }: Props) {
//   const t = i18n[locale];

  return (
    <div>
      <Contact locale={locale} />
    </div>
  );
}

export default Footer;
