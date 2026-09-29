import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./about-section.i18n";
import {
  BrandedCard,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

type Props = {
  locale: Locale;
};

function AboutSection({ locale }: Props) {
  const t = i18n[locale].about;
  return (
    <section className="about-section site-container section">
      <span className="eyebrow">{t.flavor}</span>
      <h2 className="max-w-[40rem]">{t.title}</h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.activities.map((activity, index) => (
          <Activity key={index} activity={activity} />
        ))}
      </div>
    </section>
  );
}

type ActivityProps = {
  activity: i18n.AboutActivity;
};

function Activity({ activity }: ActivityProps) {
  return (
    <BrandedCard className="h-full">
      <CardHeader className="gap-5 space-y-0 pb-3">
        {/* Monark line art (flat strokes, glows removed). */}
        <Image
          src={`/vectors/decorative/${activity.icon}.svg`}
          alt=""
          aria-hidden="true"
          width={72}
          height={72}
          className="h-[72px] w-auto self-start"
        />
        <h3 className="text-2xl">{activity.title}</h3>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {activity.content}
        </CardDescription>
      </CardContent>
    </BrandedCard>
  );
}

export default AboutSection;
