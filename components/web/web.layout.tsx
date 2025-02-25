"use client";
import React from "react";
import Footer from "./footer/footer";
import { Locale } from "@/i18n.config";
import NavbarWrapper from "./navbar/navbar-wrapper";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

function WebLayout({ locale, children }: Props) {
  return (
    <>
      <NavbarWrapper locale={locale} />
      <main className="pt-[94px]">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export default WebLayout;
