"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import * as i18n from "./theme.toggle.i18n";

type Props = {
  locale: Locale;
  className?: string;
};

/**
 * Standard Monark theme toggle (brand guidelines §10): a 36px ghost icon
 * button, moon in light mode, sun in dark mode. Follows the system theme
 * until clicked. Icons swap with CSS, so there is no hydration flash.
 */
export function ThemeToggle({ locale, className }: Props) {
  const t = i18n[locale];
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t.theme_toggle.toggle}
      title={t.theme_toggle.toggle}
      className={cn("size-9", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="hidden !size-[18px] dark:block" aria-hidden="true" />
      <MoonIcon className="!size-[18px] dark:hidden" aria-hidden="true" />
    </Button>
  );
}
