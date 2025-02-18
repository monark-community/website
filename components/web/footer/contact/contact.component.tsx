import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Locale } from "@/i18n.config";
import * as i18n from "./contact.i18n";
import Logo from "@/components/shared/logo/logo.component";

type Props = {
  locale: Locale;
};

function Contact({ locale }: Props) {
  const t = i18n[locale];

  return (
    <div className="flex flex-col items-center justify-center gap-16 md:flex-row">
      <Logo formFactor="full" colorScheme="branded" width={350} height={350} />
      <div>
        <p className="text-tagline leading-none">{t.tagline}</p>
        <p className="text-headline leading-none">{t.title}</p>
        <Button size="lg">
          {t.action}&nbsp;
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}

export default Contact;
