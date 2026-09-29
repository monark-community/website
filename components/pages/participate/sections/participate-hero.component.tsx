import React from "react";
import { ArrowDownIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticipateArt from "../participate-art";
import { accentClasses } from "../participate-icon";
import {
  ParticipateAccent,
  ParticipateContent,
  ParticipateIconName,
  ParticipateLink,
} from "../participate.types";
import ParticipateButton from "./participate-link";

type Props = {
  t: ParticipateContent["hero"];
  primary: ParticipateLink;
  howLabel: string;
  newTab: string;
  icon: ParticipateIconName;
  accent: ParticipateAccent;
};

/**
 * Hero: who the page is for, a one-line promise (H1), the lead, the
 * audiences and a few key facts, with the page's line art on the side.
 */
function ParticipateHero({ t, primary, howLabel, newTab, icon, accent }: Props) {
  return (
    <section aria-labelledby="participate-title">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <ParticipateArt
          icon={icon}
          accent={accent}
          className="w-32 sm:w-40 md:order-last md:w-full"
        />
        <div className="min-w-0">
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
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="#participate-how">
                {howLabel}
                <ArrowDownIcon aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p id="participate-audiences" className="shrink-0 text-sm font-semibold text-foreground">
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
    </section>
  );
}

export default ParticipateHero;
