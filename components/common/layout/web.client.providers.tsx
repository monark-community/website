"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "./analytics/google-analytics";
import LoadingProvider from "./loading.provider";
import { ThemeProvider } from "./theme.provider";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";

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
      <TooltipProvider delayDuration={300}>
        <GoogleAnalytics />
        <LoadingProvider>{children}</LoadingProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
