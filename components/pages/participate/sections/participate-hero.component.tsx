import React from "react";
import { ArrowDownIcon, SparklesIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";
import Photo from "@/components/common/photo/photo";
import { PhotoKey } from "@/components/common/photo/photos";
import { accentClasses } from "../participate-icon";
import {
  ParticipateAccent,
  ParticipateContent,
  ParticipateLink,
} from "../participate.types";
import ParticipateButton from "./participate-link";

type Props = {
  t: ParticipateContent["hero"];
  primary: ParticipateLink;
  howLabel: string;
  newTab: string;
  accent: ParticipateAccent;
  photo: { photo: PhotoKey; focus: string };
  locale: Locale;
};

/**
 * Magazine-lead hero (prototype), after the News page: eyebrow, headline,
 * one supporting line and the two actions, then one large photo of the
 * people the page is for (News feature-card radius and border, hard
 * edges), then the key figures as a row of big numbers.
 */
function ParticipateHero({ t, primary, howLabel, newTab, accent, photo, locale }: Props) {
  return (
    <section aria-labelledby="participate-title">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 id="participate-title" className="max-w-[44rem] text-balance">
        {t.title}
      </h1>
      <p className="lead mt-5 max-w-[40rem]">{t.lead}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ParticipateButton link={primary} newTab={newTab} className="w-full sm:w-auto" />
        {/* A plain <a> styled as a button, not <Button asChild>: when the
            server streams this child as a lazy reference, Radix Slot
            receives a non-element and silently renders nothing. */}
        <a
          href="#participate-how"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
        >
          {howLabel}
          <ArrowDownIcon aria-hidden="true" />
        </a>
      </div>

      {t.status && (
        <p className="mt-5 flex max-w-[40rem] items-start gap-2 text-sm font-semibold text-foreground">
          <SparklesIcon
            aria-hidden="true"
            className={`mt-0.5 size-4 shrink-0 ${accentClasses[accent].text}`}
          />
          {t.status}
        </p>
      )}

      <Photo
        photo={photo.photo}
        locale={locale}
        priority
        sizes="(min-width: 1200px) 1136px, 100vw"
        className="mt-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] md:mt-14"
        imgClassName={photo.focus}
      />

      {t.highlights && t.highlights.length > 0 && (
        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x">
          {t.highlights.map((highlight) => (
            <div
              key={highlight.value}
              className="flex flex-col-reverse gap-1 sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="text-sm text-muted-foreground sm:text-base">{highlight.label}</dt>
              <dd className="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-foreground md:text-3xl">
                {/* Small accent rule above the figure (decorative). */}
                <span
                  aria-hidden="true"
                  className={`mb-3 block h-1 w-8 rounded-full ${accentClasses[accent].fill}`}
                />
                {highlight.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export default ParticipateHero;
