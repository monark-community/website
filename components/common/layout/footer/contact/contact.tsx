import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Locale } from "@/i18n.config";
import * as i18n from "./contact.i18n";

type Props = {
  locale: Locale;
};

function Contact({ locale }: Props) {
  const t = i18n[locale].contact;

  return (
    <div className="site-container pb-16 md:pb-24">
      <div className="flex flex-col gap-6 rounded-2xl border bg-card p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">{t.tagline}</p>
          <h2 className="m-0">{t.title}</h2>
        </div>
        <Button asChild size="lg" className="w-fit shrink-0">
          <a href="mailto:contact@monark.io">
            {t.action}
            <SendIcon aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Contact;
