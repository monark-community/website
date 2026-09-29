import React from "react";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { I18n } from "../about.i18n";
import { AboutIcon, IconChip } from "../about-icon";
import SectionHeading from "./section-heading";

type Props = { t: I18n["about_page"]["why"] };

/**
 * "Why Monark" as problem → answer: each barrier (muted card) points to
 * Monark's answer (white card, orange icon). Column labels show once above
 * the rows on wide screens, and inside each card on small ones.
 */
function AboutWhy({ t }: Props) {
  return (
    <section aria-labelledby="about-why">
      <SectionHeading
        id="about-why"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />

      <div
        aria-hidden="true"
        className="mt-10 hidden grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] gap-4 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground md:grid"
      >
        <span>{t.problem_label}</span>
        <span />
        <span>{t.answer_label}</span>
      </div>

      <ol className="mt-6 list-none space-y-6 pl-0 md:mt-3 md:space-y-4">
        {t.barriers.map((barrier) => (
          <li
            key={barrier.problem}
            className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] md:gap-4"
          >
            <div className="flex gap-4 rounded-2xl border border-dashed border-input/60 bg-secondary/60 p-5">
              <AboutIcon
                name={barrier.icon}
                className="mt-0.5 size-6 shrink-0 text-muted-foreground"
              />
              <div className="min-w-0">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground md:sr-only">
                  {t.problem_label}
                </p>
                <p className="font-bold text-foreground">{barrier.problem}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {barrier.problem_detail}
                </p>
              </div>
            </div>

            <div aria-hidden="true" className="flex items-center justify-center">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground md:size-11">
                <ArrowDownIcon className="size-4 md:hidden" />
                <ArrowRightIcon className="hidden size-5 md:block" />
              </span>
            </div>

            <div className="flex gap-4 rounded-2xl border bg-card p-5">
              <IconChip name={barrier.answer_icon} />
              <div className="min-w-0">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.08em] text-primary-ink md:sr-only">
                  {t.answer_label}
                </p>
                <h3 className="text-lg">{barrier.answer}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {barrier.answer_detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-l-4 border-l-primary bg-card p-5 md:p-6">
        <h3 className="text-lg">{t.ownership_title}</h3>
        <p className="mt-2 text-muted-foreground">{t.ownership}</p>
      </div>
    </section>
  );
}

export default AboutWhy;
