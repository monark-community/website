import React from "react";
import { Locale } from "@/i18n.config";
import Contact from "./contact/contact";
import FooterLinks from "./footer-links/footer-links";
import FooterEnd from "./footer-end/footer-end";

type Props = {
  locale: Locale;
};

/**
 * Site footer (2026 brand): a contact call-to-action card, then a links band
 * with the Monark logo and tagline, then the legal line with the socials.
 * The tiled butterfly pattern that sat behind this block was dropped: the
 * brand keeps it off anything with text on top.
 */
function Footer({ locale }: Props) {
  return (
    <footer className="mt-8 md:mt-16">
      <Contact locale={locale} />
      <div className="border-t">
        <FooterLinks locale={locale} />
      </div>
      <div className="border-t">
        <FooterEnd locale={locale} />
      </div>
    </footer>
  );
}

export default Footer;
