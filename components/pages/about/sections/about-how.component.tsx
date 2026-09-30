import React from "react";
import { Locale } from "@/i18n.config";
import Photo from "@/components/common/photo/photo";
import { I18n } from "../about.i18n";
import { IconChip } from "../about-icon";
import SectionHeading from "./section-heading";

type Props = { t: I18n["about_page"]["how"]; locale: Locale };

/**
 * "How Monark works": development and adoption plus the community approach,
 * as four numbered cards (platform, modules, education, governance), under
 * a wide photo of people learning together.
 */
function AboutHow({ t, locale }: Props) {
  return (
    <section aria-labelledby="about-how">
      <SectionHeading
        id="about-how"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <Photo
        photo="friends-talking-cafe"
        locale={locale}
        sizes="(min-width: 1280px) 52rem, (min-width: 1024px) calc(100vw - 22rem), 100vw"
        className="mt-10 aspect-[16/10] sm:aspect-[21/9]"
        imgClassName="object-[50%_40%]"
      />
      <ol className="mt-4 grid list-none pl-0 grid-cols-1 gap-4 sm:grid-cols-2">
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
