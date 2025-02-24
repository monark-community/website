import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./hero-section.i18n";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavLink } from "@/components/shared/navlink/navlink";

type Props = {
  locale: Locale;
};

function HeroSection({ locale }: Props) {
  const t = i18n[locale].hero_section;
  return (
    <section className="hero-section relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="transition-all opacity-40 sm:opacity-100 absolute lg:top-32 lg:right-16 z-[-1] rounded-full bg-primary/10 h-[600px] w-[600px] max-w-[100vw] aspect-square flex items-center justify-center">
        <Image
          alt="Stylized line art of a Monarch butterfly"
          src="/vectors/decorative/monark-mesh.svg"
          width={550}
          height={550}
          className="hidden lg:block"
        />
      </div>
      <p className="text-tagline">{t.flavor}</p>
      <h1 className="max-w-[800px]">{t.headline}</h1>
      <p className="text-muted-foreground text-xl max-w-[500px] mt-4">
        {t.context}
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-8 max-w-[350px]">
        <Button>{t.primary_action}</Button>
        <NavLink href="/about/monark">
        <Button variant="outline">{t.secondary_action}</Button>
        </NavLink>
      </div>
    </section>
  );
}

export default HeroSection;
