"use client";

import { useEffect, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "./analytics/google-analytics";
import LoadingProvider from "./loading.provider";
import { ThemeProvider } from "./theme.provider";
import { Toaster } from "@/components/ui/sonner"
import Loader from "../loader/loader";
import { WalletProvider } from "@/providers/wallet.provider";

type Props = {
  children: React.ReactNode;
};

export function WebClientProviders({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Fallback UI for SSR
    return <Loader />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>
        <TooltipProvider delayDuration={300}>
          <GoogleAnalytics />
          <LoadingProvider>{children}</LoadingProvider>
          <Toaster />
        </TooltipProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}
