import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { WebClientProviders } from "@/components/common/layout/web.client.providers";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next"
import { headers } from "next/headers";
import { defaultLocale, isLocale, LOCALE_HEADER } from "@/i18n.config";
import "@xyflow/react/dist/style.css";
import "./theme.css";
import "./globals.scss";

const nunitoSans = Nunito_Sans({
  variable: "--nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fostering Collaboration within the Web3 Community • Monark",
  description:
    "We incubate the next generation of Web3 innovators, launching startups by students, recent graduates, and independent developers, aligned from day one with the ecosystems of our funding partners.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The middleware forwards the path locale (/en, /fr) so French pages announce French.
  const headerLocale = (await headers()).get(LOCALE_HEADER);
  const lang = isLocale(headerLocale) ? headerLocale : defaultLocale;
  return (
    <ViewTransitions>
      <html lang={lang}>
        <body className={`${nunitoSans.variable} antialiased`}>
          {/* Vercel Web Analytics only exists on Vercel; elsewhere its script 404s. */}
          {process.env.VERCEL && <Analytics />}
          <WebClientProviders>{children}</WebClientProviders>
        </body>
      </html>
    </ViewTransitions>
  );
}
