import React from "react";
import { defaultLocale, isLocale } from "@/i18n.config";
import WebLayout from "@/components/common/layout/web.layout";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

async function Layout({ children, params }: Props) {
  // The path segment is the source of truth (the middleware keeps the
  // NEXT_LOCALE cookie in sync with it, but the cookie is missing on a first visit).
  const { locale: segment } = await params;
  const locale = isLocale(segment) ? segment : defaultLocale;
  return <WebLayout locale={locale}>{children}</WebLayout>;
}

export default Layout;
