import React from "react";
import Image from "next/image";
import { I18n } from "../about.i18n";

type Props = { t: I18n["about_page"]["hero"] };

/** "What is Monark?": the page's H1, a one-line answer and who it is for. */
function AboutHero({ t }: Props) {
  return (
    <section aria-labelledby="about-title">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-[40rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="about-title">{t.title}</h1>
        </div>
        {/* Monark line art (flat strokes). */}
        <Image
          src="/vectors/decorative/network.svg"
          alt=""
          aria-hidden="true"
          width={268}
          height={317}
          priority
          className="hidden h-36 w-auto shrink-0 select-none sm:block lg:h-40"
        />
      </div>
      <p className="lead mt-5 max-w-[40rem]">{t.lead}</p>
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
