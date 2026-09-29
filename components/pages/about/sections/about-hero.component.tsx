import React from "react";
import { Locale } from "@/i18n.config";
import Photo from "@/components/common/photo/photo";
import { I18n } from "../about.i18n";

type Props = { t: I18n["about_page"]["hero"]; locale: Locale };

/**
 * "What is Monark?": the page's H1, a one-line answer and who it is for,
 * with a photo of people building together beside it (below the lead on
 * small screens).
 */
function AboutHero({ t, locale }: Props) {
  return (
    <section
      aria-labelledby="about-title"
      className="grid gap-8 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start xl:grid-cols-[minmax(0,1fr)_17rem]"
    >
      <Photo
        photo="students-around-laptop"
        locale={locale}
        priority
        sizes="(min-width: 1280px) 17rem, (min-width: 768px) 14rem, 100vw"
        className="order-last aspect-[16/10] md:mt-2 md:aspect-[4/5]"
        imgClassName="object-[62%_50%]"
      />
      <div className="min-w-0">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 id="about-title" className="max-w-[40rem]">{t.title}</h1>
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
      </div>
    </section>
  );
}

export default AboutHero;
