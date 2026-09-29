import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/common/navlink/navlink";
import { I18n } from "../learn.i18n";

type Props = { t: I18n["learn_page"]["cta"] };

/** Closing call to action: the projects list, then the About page. */
function LearnCta({ t }: Props) {
  return (
    <section
      aria-labelledby="learn-cta"
      className="relative overflow-hidden rounded-3xl border bg-secondary/60 p-6 sm:p-8 md:p-10"
    >
      {/* Monark line art (flat strokes). */}
      <Image
        src="/vectors/decorative/modular.svg"
        alt=""
        aria-hidden="true"
        width={120}
        height={120}
        className="pointer-events-none absolute right-8 top-1/2 hidden h-28 w-auto -translate-y-1/2 select-none md:block"
      />
      <div className="max-w-[34rem]">
        <h2 id="learn-cta">{t.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.content}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <NavLink href={t.primary.href}>
              {t.primary.label}
              <ArrowRightIcon aria-hidden="true" />
            </NavLink>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full bg-card sm:w-auto"
          >
            <NavLink href={t.secondary.href}>{t.secondary.label}</NavLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LearnCta;
