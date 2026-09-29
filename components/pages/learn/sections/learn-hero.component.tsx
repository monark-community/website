import React from "react";
import Image from "next/image";
import { I18n } from "../learn.i18n";

type Props = { t: I18n["learn_page"]["hero"] };

/** The page's H1 and one supporting line, beside Monark line art. */
function LearnHero({ t }: Props) {
  return (
    <section
      aria-labelledby="learn-title"
      className="flex items-center justify-between gap-8"
    >
      <div className="max-w-[44rem]">
        <h1 id="learn-title" className="text-headline">
          {t.title}
        </h1>
        <p className="lead mt-6 max-w-[36rem]">{t.lead}</p>
      </div>
      {/* Monark line art (flat strokes). */}
      <Image
        src="/vectors/decorative/roadmap.svg"
        alt=""
        aria-hidden="true"
        width={347}
        height={271}
        priority
        className="hidden h-40 w-auto shrink-0 select-none md:block lg:h-48"
      />
    </section>
  );
}

export default LearnHero;
