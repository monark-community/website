import React from "react";
import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { I18n } from "../brand.i18n";

type Props = { t: I18n["brand_page"]["contact"]; newTab: string };

// The site's contact address (footer) and the community Discord.
const EMAIL = "mailto:contact@monark.io";
const DISCORD = "https://discord.gg/TvhrbFCp8T";

/** One line for press and partners, with the two ways to reach the team. */
function BrandContact({ t, newTab }: Props) {
  return (
    <section
      aria-labelledby="brand-contact"
      className="flex flex-col gap-5 rounded-2xl border bg-secondary/60 p-6 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h2 id="brand-contact" className="text-xl md:text-2xl">
          {t.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a href={EMAIL} className={cn(buttonVariants({ variant: "outline" }), "bg-card")}>
          <MailIcon aria-hidden="true" />
          {t.email}
        </a>
        <a
          href={DISCORD}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "bg-card")}
        >
          {t.discord}
          <span className="sr-only"> {newTab}</span>
          <ArrowUpRightIcon aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default BrandContact;
