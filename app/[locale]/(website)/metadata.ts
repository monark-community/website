import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import * as i18n from "./metadata.i18n";

type Params = Promise<{ locale: Locale }>;

export default async function metadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = i18n[locale].metadata;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      siteName: "Monark",
      type: "website",
      title: t.title,
      description: t.description,
      url: `https://monark.dominicfournier.com/${locale}/`,
      locale,
      images: [
        {
          // Facebook/LinkedIn OG
          url: `/en/images/og/og-homepage-monark-decentralization.jpg`,
          width: 1200,
          height: 630,
          alt: t.title,
          type: "image/jpg",
        },
      ],
    },
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://monark.dominicfournier.com"
    ),
  };
}
