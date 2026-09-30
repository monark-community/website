import React from "react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { accentClasses } from "../participate-icon";
import { ParticipateAccent, ParticipateContent } from "../participate.types";

type Props = {
  t: ParticipateContent["steps"];
  accent: ParticipateAccent;
};

/**
 * "How it works" as a numbered path: vertical on small screens, a row of
 * four on large ones, with a thin line joining the numbered rings. The list
 * is an <ol>, so the numbers in the rings are decorative.
 */
function ParticipateSteps({ t, accent }: Props) {
  const ring = accentClasses[accent];
  return (
    <section aria-labelledby="participate-how-title" id="participate-how" className="scroll-mt-24">
      <SectionHeading
        id="participate-how-title"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <ol className="mt-10 grid list-none grid-cols-1 gap-8 pl-0 lg:grid-cols-4 lg:gap-6">
        {t.items.map((step, index) => {
          const last = index === t.items.length - 1;
          return (
            <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
              {!last && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2rem] left-6 top-14 w-px bg-border lg:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-14 right-[-1.5rem] top-6 hidden h-px bg-border lg:block"
                  />
                </>
              )}
              <span
                aria-hidden="true"
                className={`relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-current bg-background ${ring.text}`}
              >
                <span className="text-lg font-extrabold text-foreground">
                  {index + 1}
                </span>
              </span>
              <div className="min-w-0 pt-2 lg:pt-5">
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.content}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default ParticipateSteps;
