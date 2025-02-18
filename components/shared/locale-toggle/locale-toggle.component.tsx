"use client";
import React from "react";
import Cookies from "js-cookie";
import { Locale, locales } from "@/i18n.config";
import * as i18n from "./locale-toggle.i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type Props = {
  locale: Locale;
};

function LocaleToggle({ locale }: Props) {
  const t = i18n[locale];

  const setLocale = (locale: Locale) => {
    Cookies.set("NEXT_LOCALE", locale);
    // Hack; Force reload and keep location.
    window.location.href = window.location.href;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {locale.toLocaleUpperCase()}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang: Locale) => (
          <DropdownMenuItem
            disabled={lang === locale}
            onClick={() => setLocale(lang)}
            key={lang}
          >
            {t[lang as keyof typeof t]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LocaleToggle;
