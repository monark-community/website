import React from "react";
import SocialLinks from "@/components/common/socials/social-links";
import Copyrights from "../copyrights/copyrights";
import { Locale } from "@/i18n.config";
import * as i18n from "../footer-links/footer-links.i18n";

type Props = {
  locale: Locale;
};

function FooterEnd({ locale }: Props) {
  const t = i18n[locale].footer_links;
  return (
    <div className="site-container flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:flex-wrap md:items-center md:gap-x-4">
        <Copyrights company="Monark" locale={locale} className="text-xs" />
        {/* Legal pages are not published yet: shown as plain text, as before. */}
        {t.secondary.right.map((link) => (
          <span key={link.href} aria-disabled={link.disabled || undefined}>
            {link.label}
          </span>
        ))}
      </div>
      <SocialLinks className="-ml-3 md:ml-0 md:-mr-3" />
    </div>
  );
}

export default FooterEnd;
