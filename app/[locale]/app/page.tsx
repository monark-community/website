import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./page.i18n";

type Params = Promise<{ locale: Locale }>;

async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  const t = i18n[locale].app_dashboard;
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h2>{t.title}</h2>
      <p className="text-muted-foreground">{t.description}</p>
    </div>
  );
}

export default Page;
