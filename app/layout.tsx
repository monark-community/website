import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { WebClientProviders } from "@/components/web/web.client.providers";
import '@xyflow/react/dist/style.css';
import "./globals.scss";

const nunitoSans = Nunito_Sans({
  variable: "--nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monark | Empowering Communities Through Decentralization",
  description:
    "We connect communities, developers, and local entities, by creating an accessible, efficient ecosystem where innovation thrives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <WebClientProviders>{children}</WebClientProviders>
      </body>
    </html>
  );
}
