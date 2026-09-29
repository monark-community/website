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
      {/* A darker band instead of a second rule, so the legal line reads as the end of the page. */}
      <div className="bg-secondary dark:bg-[oklch(from_var(--background)_calc(l-0.05)_c_h)]">
        <FooterEnd locale={locale} />
      </div>
    </footer>
  );
}

export default Footer;
