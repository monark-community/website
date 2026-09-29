import React from "react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { accentClasses } from "../participate-icon";
import { ParticipateAccent, ParticipateContent } from "../participate.types";

type Props = {
  t: ParticipateContent["fit"];
  accent: ParticipateAccent;
};

/** "Who fits" and "What Monark expects", side by side on wide screens. */
function ParticipateFit({ t, accent }: Props) {
  return (
    <section aria-labelledby="participate-fit">
      <SectionHeading id="participate-fit" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6 md:p-8">
          <h3 className="text-lg">{t.who_title}</h3>
          <ul className="mt-5 space-y-4">
            {t.who.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${accentClasses[accent].chip}`}
                >
                  <CheckIcon className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-dashed border-input/60 bg-secondary/60 p-6 md:p-8">
          <h3 className="text-lg">{t.expect_title}</h3>
          <ul className="mt-5 space-y-4">
            {t.expect.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <ArrowRightIcon className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ParticipateFit;
