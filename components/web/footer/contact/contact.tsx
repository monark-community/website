import React from "react";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Locale } from "@/i18n.config";
import * as i18n from "./contact.i18n";
import Logo from "@/components/shared/logo/logo";
import Link from "next/link";

type Props = {
  locale: Locale;
};

function Contact({ locale }: Props) {
  const t = i18n[locale].contact;

  return (
    <div className="contact flex flex-col items-start lg:items-center justify-start gap-0 lg:gap-16 lg:flex-row">
      <Logo formFactor="standalone" colorScheme="branded" width={350} height={350} className="-ml-12 lg:ml-0 mt-12 lg:mt-0" />
      <div>
        <p className="text-tagline leading-none">{t.tagline}</p>
        <p className="text-headline leading-none">{t.title}</p>
        <div className="mt-8">
          <Link href="/contact">
            <Button size="lg">
              {t.action}&nbsp;
              <SendIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
