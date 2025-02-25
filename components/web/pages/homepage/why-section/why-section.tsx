import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./why-section.i18n";
import Image from "next/image";
import {
  BrandedCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "@/components/shared/navlink/navlink";

type Props = {
  locale: Locale;
};

function WhySection({ locale }: Props) {
  const t = i18n[locale].why;
  return (
    <section className="why-section mx-auto lg:max-w-[1440px] px-4 py-8 md:px-12 md:py-16 text-center">
      <span className="text-tagline">{t.flavor}</span>
      <h2 className="max-w-[680px] mx-auto">{t.title}</h2>
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-3">
          {t.perks.map((perk, index) => (
            <Perk key={index} perk={perk} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.audiences.map((audience, index) => (
            <Audience key={index} audience={audience} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PerkProps = {
  perk: i18n.WhyPerk;
};

function Perk({ perk }: PerkProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto relative w-[128px] h-[128px]">
        <Image
          src={`/vectors/decorative/${perk.icon}.svg`}
          alt={`${perk.title} icon`}
          width={96}
          height={96}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src={`/vectors/decorative/${perk.tile}.svg`}
          alt=""
          width={128}
          height={128}
        />
      </div>
      <h3 className="mt-8">{perk.title}</h3>
      <p className="text-lg text-muted-foreground max-w-[400px]">
        {perk.content}
      </p>
    </div>
  );
}

type AudienceProps = {
  audience: i18n.WhyAudience;
};

function Audience({ audience }: AudienceProps) {
  return (
    <BrandedCard className="relative text-left">
      <CardHeader className="pt-16">
        <CardTitle>{audience.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg">
          {audience.content}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <NavLink href={audience.href}>
          <Button size="icon" variant="ghost" className="text-primary">
            <ArrowRightIcon />
          </Button>
        </NavLink>
      </CardFooter>
    </BrandedCard>
  );
}

export default WhySection;
