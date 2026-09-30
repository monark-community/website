import React from "react";
import { I18n } from "../about.i18n";

type Props = { t: I18n["about_page"]["hero"] };

/**
 * "What is Monark?": the page's H1, a one-line answer and who it is for.
 * Text only: the column beside the sticky author card is narrow enough that
 * the heading and lead fill it on their own.
 */
function AboutHero({ t }: Props) {
  return (
    <section aria-labelledby="about-title" className="min-w-0">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 id="about-title" className="max-w-[48rem]">
        {t.title}
      </h1>
      <p className="lead mt-5 max-w-[46rem]">{t.lead}</p>
      <p className="mt-8 text-sm font-semibold text-foreground">
        {t.audiences_label}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {t.audiences.map((audience) => (
          <li
            key={audience}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-primary"
            />
            {audience}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AboutHero;
