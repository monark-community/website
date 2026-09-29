import React from "react";
import { CheckIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { AccentChip, accentClasses } from "../participate-icon";
import { ParticipateAccent, ParticipateContent } from "../participate.types";
import ParticipateButton from "./participate-link";

type Props = {
  t: ParticipateContent["offer"];
  accent: ParticipateAccent;
  newTab: string;
};

/**
 * "What you get": icon cards, or (university) tracks that each group a list
 * of offers, plus an optional emphasised note.
 */
function ParticipateOffer({ t, accent, newTab }: Props) {
  const items = t.items ?? [];
  const tracks = t.tracks ?? [];
  const itemCols = items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <section aria-labelledby="participate-offer">
      <SectionHeading
        id="participate-offer"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      {items.length > 0 && (
        <ul className={`mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 ${itemCols}`}>
          {items.map((item) => (
            <li key={item.title} className="flex flex-col rounded-3xl border bg-card p-6">
              <AccentChip name={item.icon} accent={accent} />
              <h3 className="mt-5 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.content}</p>
            </li>
          ))}
        </ul>
      )}

      {tracks.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {tracks.map((track) => (
            <li key={track.title} className="flex flex-col rounded-3xl border bg-card p-6">
              <AccentChip name={track.icon} accent={accent} />
              <h3 className="mt-5 text-xl">{track.title}</h3>
              <p className="mt-2 text-muted-foreground">{track.intro}</p>
              <ul className="mt-5 space-y-3 border-t pt-5">
                {track.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-foreground">
                    <CheckIcon
                      aria-hidden="true"
                      strokeWidth={2.25}
                      className={`mt-0.5 size-4 shrink-0 ${accentClasses[accent].text}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {track.link && (
                <div className="mt-auto pt-6">
                  <ParticipateButton
                    link={track.link}
                    newTab={newTab}
                    variant="outline"
                    size="sm"
                    className="whitespace-normal text-left"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {t.note && (
        <div className="mt-6 rounded-2xl border border-l-4 border-l-primary bg-card p-5 md:p-6">
          <h3 className="text-lg">{t.note.title}</h3>
          <p className="mt-2 text-muted-foreground">{t.note.content}</p>
        </div>
      )}
    </section>
  );
}

export default ParticipateOffer;
