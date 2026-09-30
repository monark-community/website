import React from "react";
import { NavLink } from "@/components/common/navlink/navlink";
import Image from "next/image";

import { Locale } from "@/i18n.config";
import * as i18n from "./footer-links.i18n";

type Props = {
  locale: Locale;
};

const linkClass =
  "inline-flex min-h-11 items-center text-sm font-semibold text-foreground underline-offset-4 hover:underline md:min-h-0";

function FooterLinks({ locale }: Props) {
  const t = i18n[locale].footer_links;
  const links = [...t.primary, ...t.secondary.left];
  return (
    <div className="site-container grid gap-8 py-10 md:grid-cols-[1.3fr_1fr] md:items-start">
      <div className="flex flex-col gap-3">
        <NavLink
          href="/"
          aria-label="Monark"
          className="w-fit rounded-md"
        >
          <Image
            src="/vectors/brand/horizontal/logo-branded-light-horizontal.svg"
            alt="Monark"
            width={136}
            height={42}
            className="h-[42px] w-auto dark:hidden"
          />
          <Image
            src="/vectors/brand/horizontal/logo-branded-dark-horizontal.svg"
            alt="Monark"
            width={136}
            height={42}
            className="hidden h-[42px] w-auto dark:block"
          />
        </NavLink>
        <p className="text-sm text-muted-foreground">{t.tagline}</p>
      </div>
      <div className="flex flex-col gap-6 md:items-end">
        <nav aria-label={t.label}>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
            {links.map((link) => (
              <li key={link.href}>
                {link.href.startsWith("/") ? (
                  <NavLink href={link.href} className={linkClass}>
                    {link.label}
                  </NavLink>
                ) : (
                  <a
                    href={link.href}
                    className={linkClass}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Omitting noopener and noreferrer for The Graph (Trustworthy) */}
        <a
          href="https://thegraph.com/"
          target="_blank"
          className="w-fit rounded-md"
        >
          <Image
            src="/vectors/partners/building-on-the-graph.svg"
            alt="Building on The Graph"
            className="h-12 w-auto invert dark:invert-0"
            width={122}
            height={48}
          />
        </a>
      </div>
    </div>
  );
}

export default FooterLinks;
