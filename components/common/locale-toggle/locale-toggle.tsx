"use client";

import React from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { Locale, locales } from "@/i18n.config";
import { cn } from "@/lib/utils";
import * as i18n from "./locale-toggle.i18n";

type Props = {
  locale: Locale;
  className?: string;
};

/** Swaps (or adds) the locale prefix of a path, keeping the rest of it. */
const switchLocalePath = (pathname: string, target: Locale) => {
  const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");
  return `/${target}${rest === "/" ? "" : rest}`;
};

/**
 * Standard Monark EN/FR switch (brand guidelines §10): a bordered pill with
 * one segment per locale, the active one inverted. It keeps the current page.
 */
function LocaleToggle({ locale, className }: Props) {
  const t = i18n[locale];
  const pathname = usePathname() ?? `/${locale}`;

  const onSelect = (
    event: React.MouseEvent<HTMLAnchorElement>,
    target: Locale,
    href: string
  ) => {
    event.preventDefault();
    if (target === locale) return;
    // The middleware redirects to the cookie locale, so update it first.
    Cookies.set("NEXT_LOCALE", target);
    window.location.assign(`${href}${window.location.search}${window.location.hash}`);
  };

  return (
    <nav
      aria-label={t.toggle}
      className={cn("flex items-center rounded-full border p-0.5", className)}
    >
      {locales.map((l) => {
        const active = l === locale;
        const href = switchLocalePath(pathname, l);
        return (
          <a
            key={l}
            href={href}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            aria-label={t[l]}
            onClick={(event) => onSelect(event, l, href)}
            className={cn(
              "inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}

export default LocaleToggle;
