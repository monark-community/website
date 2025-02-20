import React from "react";
import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import * as i18n from "./footer-links.i18n";
import Link from "next/link";
import Image from "next/image";

type Props = {
  locale: Locale;
};

function FooterLinks({ locale }: Props) {
  const t = i18n[locale].footer_links;
  return (
    <div className="footer-links my-8">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-end justify-between gap-4 lg:gap-8">
        <div className="flex flex-row flex-start gap-2">
          {t.primary.map((link, index) => (
            <Link
              key={`footer-primary-link-${index}`}
              href={link.disabled ? "" : link.href}
              className={`${link.disabled ? "pointer-events-none" : ""}`}
            >
              <Button variant="link" disabled={link.disabled}>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
        {/* Omitting noopener and noreferrer for The Graph (Trustworthy) */}
        <Link href="https://thegraph.com/" target="_blank">
          <Image
            src="/vectors/partners/building-on-the-graph.svg"
            alt="Building on The Graph"
            width={198}
            height={78}
          />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 my-8">
        <div className="flex flex-row flex-start gap-2">
          {t.secondary.left.map((link, index) => (
            <Link
              key={`footer-secondary-left-link-${index}`}
              href={link.disabled ? "" : link.href}
              className={`${link.disabled ? "pointer-events-none" : ""}`}
            >
              <Button variant="link" disabled={link.disabled}>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex flex-row flex-start gap-2">
          {t.secondary.right.map((link, index) => (
            <Link
              key={`footer-secondary-right-link-${index}`}
              href={link.disabled ? "" : link.href}
              className={`${link.disabled ? "pointer-events-none" : ""}`}
            >
              <Button variant="link" disabled={link.disabled}>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterLinks;
