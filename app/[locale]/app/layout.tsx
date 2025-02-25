import React from "react";
import { cookies } from "next/headers";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { defaultLocale, Locale } from "@/i18n.config";
import AppLayout from "@/components/app/app.layout";
import ProtectedRoute from "@/components/app/protected-route";

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ||
    defaultLocale) as Locale;
  return (
    <UserProvider>
      <ProtectedRoute>
        <AppLayout locale={locale}>{children}</AppLayout>
      </ProtectedRoute>
    </UserProvider>
  );
}

export default Layout;
