import React from "react";
import { ArrowDownIcon, SparklesIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n.config";
import FadedPhoto from "@/components/common/photo/faded-photo";
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
  photo: PhotoKey;
  locale: Locale;
};

/**
 * Hero: who the page is for, a one-line promise (H1), the lead, the
 * audiences and a few key facts. The photo of the people the page is for
 * is part of the hero, not a card: full width on top on phones; from md it
 * fills the right half up to the viewport edge, for the hero's full
 * height. It fades into the page on the text side and at the bottom, and
 * the text column never reaches past the fade, so text always sits on the
 * plain background. Rendered full width (outside .site-container).
 */
function ParticipateHero({ t, primary, howLabel, newTab, accent, photo, locale }: Props) {
  return (
    <section aria-labelledby="participate-title" className="relative isolate">
      <div className="relative md:flex md:min-h-[32rem] md:items-center lg:min-h-[36rem]">
        <FadedPhoto
          photo={photo}
          locale={locale}
          priority
          sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
          className="-z-10 h-64 w-full sm:h-80 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-1/2 lg:w-[55%]"
        />
        <div className="site-container mt-2 md:mt-0 md:py-16">
          <div className="min-w-0 md:max-w-[48%] lg:max-w-[46%]">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1 id="participate-title" className="max-w-[40rem] text-balance">
              {t.title}
            </h1>
            <p className="lead mt-5 max-w-[40rem]">{t.lead}</p>
  
            {t.status && (
              <p className="mt-5 flex max-w-[40rem] items-start gap-2.5 rounded-2xl border bg-card px-4 py-3 text-sm font-semibold text-foreground">
                <SparklesIcon
                  aria-hidden="true"
                  className={`mt-0.5 size-4 shrink-0 ${accentClasses[accent].text}`}
                />
                {t.status}
              </p>
            )}
  
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ParticipateButton
                link={primary}
                newTab={newTab}
                className="w-full sm:w-auto"
              />
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
          </div>
        </div>
      </div>

      <div className="site-container">
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <p id="participate-audiences" className="sr-only">
            {t.audiences_label}
          </p>
          <ul aria-labelledby="participate-audiences" className="flex flex-wrap gap-2">
            {t.audiences.map((audience) => (
              <li
                key={audience}
                className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground"
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${accentClasses[accent].fill}`}
                />
                {audience}
              </li>
            ))}
          </ul>
        </div>

        {t.highlights && t.highlights.length > 0 && (
          <dl className="mt-8 grid grid-cols-1 divide-y rounded-2xl border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {t.highlights.map((highlight) => (
              <div key={highlight.value} className="flex flex-col-reverse gap-1 p-5">
                <dt className="text-sm text-muted-foreground">{highlight.label}</dt>
                <dd className="text-xl font-extrabold leading-tight tracking-[-0.01em] text-foreground">
                  {highlight.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export default ParticipateHero;
