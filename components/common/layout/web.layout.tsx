"use client";
import React from "react";
import Footer from "./footer/footer";
import { Locale } from "@/i18n.config";
import NavbarWrapper from "./navbar/navbar-wrapper";
import LoaderPage from "./loader-page/loader-page";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

const skipLabel: Record<Locale, string> = {
  en: "Skip to content",
  fr: "Aller au contenu",
};

function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
    >
      {skipLabel[locale] ?? skipLabel.en}
    </a>
  );
}

function WebLayout({ locale, children }: Props) {
  return (
    <>
      <SkipLink locale={locale} />
      <LoaderPage />
      <NavbarWrapper locale={locale} />
      <main id="main" className="pt-16">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function WebLayoutCentered({ locale, children }: Props) {
  return (
    <>
      <SkipLink locale={locale} />
      <LoaderPage />
      <NavbarWrapper locale={locale} />
      <main id="main" className="pt-16 max-w-[1200px] mx-auto">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}

export function RoadmapLayout({ locale, children }: Props) {
  return (
    <>
      <SkipLink locale={locale} />
      <LoaderPage />
      <NavbarWrapper locale={locale} />
      <main id="main" className="pt-16 min-h-[100vh]">
        {children}
      </main>
    </>
  );
}

export default WebLayout;
