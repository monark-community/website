import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./hero-section.i18n";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavLink } from "@/components/common/navlink/navlink";

type Props = {
  locale: Locale;
};

function HeroSection({ locale }: Props) {
  const t = i18n[locale].hero_section;
  return (
    <section className="hero-section relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:py-40">
      <div className="transition-all opacity-40 sm:opacity-100 absolute lg:top-8 lg:right-8 z-[-1] rounded-full bg-primary/10 h-[600px] w-[600px] max-w-[100vw] aspect-square flex items-center justify-center">
        <Image
          alt="Stylized line art of a Monarch butterfly"
          src="/vectors/decorative/monark-mesh.svg"
          width={550}
          height={550}
          className="mt-32 ml-24 opacity-50 lg:opacity-100 lg:mt-0 lg:ml-0 lg:top-0"
        />
      </div>
      <p className="text-tagline">{t.flavor}</p>
      <h1 className="max-w-[500px]">{t.headline}</h1>
      <p className="text-muted-foreground text-md max-w-[500px] mt-4">
        {t.context}
      </p>
      <div className="flex flex-col justify-start md:flex-row gap-4 mt-8 max-w-[350px]">
        <NavLink href="/project">
          <Button>{t.primary_action}</Button>
        </NavLink>
        <NavLink href="/about">
          <Button variant="outline">{t.secondary_action}</Button>
        </NavLink>
      </div>
    </section>
  );
}

export default HeroSection;
