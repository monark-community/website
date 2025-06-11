"use client";
import React from "react";
import { Locale } from "@/i18n.config";
import NavbarWrapper from "@/components/common/layout/navbar/navbar-wrapper";
import Footer from "@/components/common/layout/footer/footer"; // Wrong. Footer isn't shared.

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

function AppLayout({ locale, children }: Props) {
  return (
    <>
      <NavbarWrapper locale={locale} />
      <main className="app-main">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export default AppLayout;
