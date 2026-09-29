import React from "react";
import { I18n } from "../about.i18n";
import { IconChip } from "../about-icon";
import SectionHeading from "./section-heading";

type Props = { t: I18n["about_page"]["how"] };

/**
 * "How Monark works": development and adoption plus the community approach,
 * as four numbered cards (platform, modules, education, governance).
 */
function AboutHow({ t }: Props) {
  return (
    <section aria-labelledby="about-how">
      <SectionHeading
        id="about-how"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <ol className="mt-10 grid list-none pl-0 grid-cols-1 gap-4 sm:grid-cols-2">
        {t.steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col rounded-3xl border bg-card p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <IconChip name={step.icon} />
              <span
                aria-hidden="true"
                className="text-3xl font-extrabold leading-none tracking-[-0.02em] text-primary-ink"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-xl">{step.title}</h3>
            <p className="mt-2 text-muted-foreground">{step.content}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default AboutHow;
