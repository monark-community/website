"use client";
import React from "react";
import Footer from "./footer/footer";
import { Locale } from "@/i18n.config";
import NavbarWrapper from "./navbar/navbar-wrapper";
import ProgressBar from "../shared/page-loader/page-loader";

type Props = {
  locale: Locale;
  children: React.ReactNode;
};

function WebLayout({ locale, children }: Props) {
  return (
    <>
      <ProgressBar />
      <NavbarWrapper locale={locale} />
      <main className="pt-[94px]">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export function RoadmapLayout({ locale, children }: Props) {
  return (
    <>
      <ProgressBar />
      <NavbarWrapper locale={locale} />
      <main className="pt-[94px] min-h-[100vh]">{children}</main>
    </>
  );
}

export default WebLayout;
