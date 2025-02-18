"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAnalytics from "./analytics/google-analytics.component";
import LoadingProvider from "../shared/loading.provider";

type Props = {
  children: React.ReactNode;
};

export function WebClientProviders({ children }: Props) {
  return (
    <TooltipProvider delayDuration={300}>
      <GoogleAnalytics />
      <LoadingProvider>{children}</LoadingProvider>
    </TooltipProvider>
  );
}
