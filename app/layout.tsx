import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { WebClientProviders } from "@/components/common/layout/web.client.providers";
import { ViewTransitions } from "next-view-transitions";
import "@xyflow/react/dist/style.css";
import "./globals.scss";

const nunitoSans = Nunito_Sans({
  variable: "--nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fostering Collaboration within the Web3 Community • Monark",
  description:
    "We incubate the next generation of Web3 innovators, launching startups by students, recent graduates, and independent developers, aligned from day one with the ecosystems of our funding partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`${nunitoSans.variable} antialiased`}>
          <WebClientProviders>{children}</WebClientProviders>
        </body>
      </html>
    </ViewTransitions>
  );
}
