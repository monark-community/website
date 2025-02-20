import { Locale } from "@/i18n.config";
import { Metadata } from "next";
import * as i18n from "./metadata.i18n";

export default function metadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  const locale = params.locale;
  const t = i18n[locale].metadata;
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      siteName: "Monark",
      type: "website",
      locale,
      title: t.title,
      description: t.description,
      images: [
        {
          // Facebook/LinkedIn OG
          url: `/${locale}/images/og/og-homepage-monark-decentralization.webp`,
          width: 1200,
          height: 630,
          alt: t.title,
          type: "image/webp",
        },
      ],
    },
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://monark.io"
    ),
  };
}
