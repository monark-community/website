import React from "react";
import SocialLinks from "@/components/common/socials/social-links";
import Copyrights from "../copyrights/copyrights";
import LocaleToggle from "@/components/common/locale-toggle/locale-toggle";
import { ThemeToggle } from "@/components/common/theme-toggle/theme-toggle.component";
import { Locale } from "@/i18n.config";

type Props = {
  locale: Locale;
};

function FooterEnd({ locale }: Props) {
  return (
    <div className="footer-end flex flex-col md:flex-row gap-4 justify-between items-center">
      <SocialLinks className="order-1" />
      <Copyrights
        company="Monark"
        locale={locale}
        className="order-3 md:order-2"
      />
      <div className="flex items-center justify-end gap-4 order-2 md:order-3">
        <LocaleToggle locale={locale} />
        <ThemeToggle locale={locale} />
      </div>
    </div>
  );
}

export default FooterEnd;
