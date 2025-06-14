import React from "react";
import { Locale } from "@/i18n.config";
import * as i18n from "./about-section.i18n";
import {
  BrandedCard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  // CardFooter,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  locale: Locale;
};

function AboutSection({ locale }: Props) {
  const t = i18n[locale].about;
  return (
    <section className="about-section mx-auto lg:max-w-[1200px] px-4 py-8 md:px-12 md:py-16">
      <span className="text-tagline">{t.flavor}</span>
      <h2 className="max-w-[750px]">{t.title}</h2>
      <div className="flex flex-col items-start lg:items-center justify-center mt-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 w-full">
          {t.activities.map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ActivityProps = {
  activity: i18n.AboutActivity;
};

function Activity({ activity }: ActivityProps) {
  return (
    <BrandedCard className="relative overflow-hidden w-full h-full">
      <div className="absolute transition-all opacity-40 sm:opacity-100 z-0 right-0 sm:right-16 top-1/2 -translate-y-1/2 lg:top-0 lg:right-0 lg:-translate-y-14 lg:translate-x-4 rounded-full bg-primary/10 h-[256px] w-[256px] flex items-center justify-center">
        <Image
          src={`/vectors/decorative/${activity.icon}.svg`}
          alt={activity.title}
          width={196}
          height={196}
        />
      </div>
      <div className="relative z-1 h-full flex flex-col justify-between">
        <CardHeader className="lg:pt-36">
          <CardTitle className="text-4xl">{activity.title}</CardTitle>
        </CardHeader>
        <div className="flex flex-col justify-between flex-1 h-full">
          <CardContent>
            <CardDescription className="max-w-[300px] text-lg">
              {activity.content}
            </CardDescription>
          </CardContent>
          {/* <CardFooter>
            <Button variant="ghost" className="text-primary">
              {activity.action}&nbsp;
              <ArrowRightIcon />
            </Button>
          </CardFooter> */}
        </div>
      </div>
    </BrandedCard>
  );
}

export default AboutSection;
