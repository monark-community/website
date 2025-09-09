import React from "react";
import { Locale } from "@/i18n.config";
import Contact from "./contact/contact";
import FooterLinks from "./footer-links/footer-links";
import FooterEnd from "./footer-end/footer-end";
import TileablePattern from "./tileable-pattern";

type Props = {
  locale: Locale;
};

function Footer({ locale }: Props) {
  return (
    <div className="relative">
      <TileablePattern
        src="/vectors/decorative/butterfly-tileable-pattern.svg"
        className="absolute left-0 top-0 h-[610px] md:h-[500px] w-[100vw] z-[-1] opacity-10 bg-size-[200%]"
      />
      <footer className="max-w-[1200px] mx-auto px-4 py-8 md:px-12 md:py-16">
        <Contact locale={locale} />
        <FooterLinks locale={locale} />
        <FooterEnd locale={locale} />
      </footer>
    </div>
  );
}

export default Footer;
