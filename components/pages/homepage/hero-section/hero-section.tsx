import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./hero-section.i18n";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavLink } from "@/components/common/navlink/navlink";
import { ArrowRightIcon } from "lucide-react";

type Props = {
  locale: Locale;
};

/**
 * Home hero. The mesh butterfly is the site's single signature image (brand
 * guidelines §6): large, partly cropped, flat orange lines, no tinted disc.
 */
function HeroSection({ locale }: Props) {
  const t = i18n[locale].hero_section;
  return (
    <section className="hero-section relative isolate overflow-hidden">
      {/* Espresso-only lighting: a faint warm vignette behind the hero (§5). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hidden dark:block"
        style={{
          background:
            "radial-gradient(60% 70% at 70% 40%, color-mix(in oklab, var(--primary) 6%, transparent), transparent 70%)",
        }}
      />
      <Image
        src="/vectors/decorative/monark-mesh.svg"
        alt=""
        aria-hidden="true"
        width={569}
        height={571}
        priority
        className="pointer-events-none absolute -z-10 select-none w-[340px] -right-24 -top-6 opacity-20 sm:w-[440px] sm:opacity-30 lg:w-[520px] lg:-right-24 lg:top-1/2 lg:-translate-y-1/2 lg:opacity-40 xl:w-[600px] xl:right-[calc(50%-700px)] xl:opacity-60 dark:xl:opacity-50"
      />
      <div className="site-container pt-16 pb-12 md:pt-24 lg:pt-32 lg:pb-20">
        <div className="max-w-[36rem] xl:max-w-[40rem]">
          <p className="eyebrow">{t.flavor}</p>
          <h1 className="text-headline">{t.headline}</h1>
          <p className="lead mt-6 max-w-[34rem]">{t.context}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <NavLink href="/project">
                {t.primary_action}
                <ArrowRightIcon aria-hidden="true" />
              </NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <NavLink href="/about">{t.secondary_action}</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
