import React from "react";
import { Locale } from "@/i18n.config";
import Contact from "./contact/contact";
import Copyrights from "./copyrights/copyrights";
import Newsletter from "./newsletter/newsletter";
import FooterLinks from "./footer-links/footer-links";
import LocaleToggle from "@/components/shared/locale-toggle/locale-toggle";
import { ThemeToggle } from "@/components/shared/theme-toggle/theme-toggle.component";
import SocialLinks from "./socials/social-links";

type Props = {
  locale: Locale;
};

function Footer({ locale }: Props) {
  return (
    <footer className="max-w-[1440px] mx-auto px-4 py-8 md:px-12 md:py-16">
      <Contact locale={locale} />
      <Newsletter locale={locale} />
      <FooterLinks locale={locale} />
      <div className="flex justify-between items-center">
        <SocialLinks />
        <Copyrights company="Monark" locale={locale} />
        <div className="flex items-center justify-end gap-4">
          <LocaleToggle locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
