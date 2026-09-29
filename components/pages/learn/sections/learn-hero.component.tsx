import React from "react";
import Image from "next/image";
import { I18n } from "../learn.i18n";

type Props = { t: I18n["learn_page"]["hero"] };

/** The page's H1, what learning with Monark means, and in-page jump links. */
function LearnHero({ t }: Props) {
  return (
    <section aria-labelledby="learn-title">
      <div className="flex items-start justify-between gap-8">
        <div className="max-w-[44rem]">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="learn-title" className="text-headline">
            {t.title}
          </h1>
          <p className="lead mt-6 max-w-[40rem]">{t.lead}</p>
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
      </div>
      <nav aria-labelledby="learn-jump" className="mt-8">
        <p id="learn-jump" className="sr-only">
          {t.jump_label}
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {t.jump.map((link) => (
            <li key={link.href} className="m-0">
              <a
                href={link.href}
                className="inline-flex h-10 items-center rounded-full border bg-card px-4 text-sm font-semibold text-foreground no-underline transition-colors duration-150 hover:bg-secondary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default LearnHero;
