import React from "react";
import { defaultLocale, Locale } from "@/i18n.config";
import StandardLayout from "@/components/web/web.layout";
import { cookies } from "next/headers";
import ProgressBar from "@/components/shared/page-loader/page-loader";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return (
    <StandardLayout locale={locale}>
      <ProgressBar />
      <div className="fixed top-0 left-1/2 transform -translate-x-[740px] h-screen w-px bg-primary"></div>
      <div className="fixed top-0 left-1/2 transform translate-x-[740px] h-screen w-px bg-primary"></div>
      {children}
    </StandardLayout>
  );
}

export default Layout;
