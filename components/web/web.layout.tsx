"use client";
import React from "react";
import Footer from "./footer/footer";
import { Locale } from "@/i18n.config";
import Navbar from "./navbar/navbar";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

function WebLayout({ locale, children }: Props) {
  return (
    <>
      <Navbar locale={locale} />
      <main className="mt-[94px]">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export default WebLayout;
