import React from "react";
import { defaultLocale, Locale } from "@/i18n.config";
import WebLayout from "@/components/common/layout/web.layout";
import { cookies } from "next/headers";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return (
    <WebLayout locale={locale}>
      {children}
    </WebLayout>
  );
}

export default Layout;
