import React from "react";
import { defaultLocale, Locale } from "@/i18n.config";
import StandardLayout from "@/components/web/web.layout";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return <StandardLayout locale={locale}>{children}</StandardLayout>;
}

export default Layout;
