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
 * actions, the audiences and a few key facts, with a large photo of the
 * people the page is for. Phones: the photo runs edge to edge on top, text
 * below. From md: the photo fills the right half of the hero, full height,
 * up to the viewport edge, and fades in from the text column on its left
 * (`.photo-fade`); its other edges are hard. The text column stops before
 * the fade, so text always sits on the plain background. A full-width
 * bottom border closes the hero; the photo sits flush on it. Rendered full
 * width (outside .site-container).
 */
function ParticipateHero({ t, primary, howLabel, newTab, accent, photo, locale }: Props) {
  return (
    <section
      aria-labelledby="participate-title"
      className="relative isolate border-b md:flex md:min-h-[34rem] md:items-center lg:min-h-[38rem]"
    >
      <FadedPhoto
        photo={photo}
        locale={locale}
        priority
        sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
        className="-z-10 aspect-[16/10] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-1/2 lg:w-[55%]"
      />
      <div className="site-container py-10 md:py-16">
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

          <p id="participate-audiences" className="sr-only">
            {t.audiences_label}
          </p>
          <ul aria-labelledby="participate-audiences" className="mt-8 flex flex-wrap gap-2">
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

          {t.highlights && t.highlights.length > 0 && (
            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {t.highlights.map((highlight) => (
                // Accent rule on the left: border-current takes the accent
                // colour; dt and dd set their own text colours.
                <div
                  key={highlight.value}
                  className={`flex flex-col-reverse gap-0.5 border-l-2 border-current pl-3.5 ${accentClasses[accent].text}`}
                >
                  <dt className="text-sm text-muted-foreground">{highlight.label}</dt>
                  <dd className="text-lg font-extrabold leading-tight tracking-[-0.01em] text-foreground">
                    {highlight.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

export default ParticipateHero;
