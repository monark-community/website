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
      <div className="fixed top-0 bottom-0 left-1/2 transform -translate-x-[632px] border-r border-primary z-50"></div>
      <div className="fixed top-0 bottom-0 left-1/2 transform translate-x-[632px] border-r border-primary z-50"></div>
      <ProgressBar />
      <NavbarWrapper locale={locale} />
      <main className="pt-[94px]">{children}</main>
      <Footer locale={locale} />
    </>
  );
}

export function WebLayoutCentered({ locale, children }: Props) {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-1/2 transform -translate-x-[632px] border-r border-primary z-50"></div>
      <div className="fixed top-0 bottom-0 left-1/2 transform translate-x-[632px] border-r border-primary z-50"></div>
      <ProgressBar />
      <NavbarWrapper locale={locale} />
      <main className="pt-[94px] max-w-[1200px] mx-auto">{children}</main>
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
