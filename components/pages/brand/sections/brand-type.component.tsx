import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { I18n } from "../brand.i18n";
import { ThemedCroppedLogo, WORDMARK_BOX } from "../brand-ui";

type Props = { t: I18n["brand_page"]["type"]; newTab: string };

const GOOGLE_FONTS = "https://fonts.google.com/specimen/Nunito+Sans";

const weights = [
  { weight: 400, name: "Regular", className: "font-normal" },
  { weight: 600, name: "SemiBold", className: "font-semibold" },
  { weight: 700, name: "Bold", className: "font-bold" },
  { weight: 800, name: "ExtraBold", className: "font-extrabold" },
];

/**
 * A Nunito Sans specimen set in the site's own (already loaded) font:
 * the weights in use and the web scale. No font files are offered: the
 * link goes to Google Fonts, and Trajan is only named, never provided.
 */
function BrandType({ t, newTab }: Props) {
  return (
    <section id="type" aria-labelledby="brand-type">
      <SectionHeading id="brand-type" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col rounded-2xl border bg-card p-6">
          <p
            aria-hidden="true"
            className="text-[6rem] font-extrabold leading-none tracking-[-0.04em] text-foreground sm:text-[8rem]"
          >
            Aa
          </p>
          <p className="mt-4 text-2xl font-extrabold tracking-[-0.02em] text-foreground">
            Nunito Sans
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{t.family_note}</p>
          <a
            href={GOOGLE_FONTS}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 w-full sm:w-fit")}
          >
            {t.google_fonts}
            <span className="sr-only"> {newTab}</span>
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg">{t.weights_title}</h3>
          <ul className="mt-4 divide-y">
            {weights.map((w) => (
              <li
                key={w.weight}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
              >
                <span className={cn("text-2xl text-foreground", w.className)}>{t.sample}</span>
                <span className="text-sm text-muted-foreground">
                  {w.weight} {w.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border bg-card p-6">
        <h3 className="text-lg">{t.scale_title}</h3>
        <ul className="mt-2 divide-y">
          {t.scale.map((row) => (
            <li
              key={row.role}
              className="grid gap-1 py-4 md:grid-cols-[minmax(0,1fr)_16rem] md:items-baseline md:gap-6"
            >
              <span className={cn("min-w-0 leading-tight text-foreground", row.className)}>
                {row.role}
              </span>
              <span className="text-sm text-muted-foreground md:text-right">{row.spec}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid items-center gap-6 rounded-2xl border bg-card p-6 md:grid-cols-[16rem_minmax(0,1fr)]">
        <ThemedCroppedLogo
          light="horizontal-color-on-light"
          dark="horizontal-color-on-dark"
          box={WORDMARK_BOX}
          width={240}
          className="max-w-full"
        />
        <div>
          <h3 className="text-lg">{t.trajan_title}</h3>
          <p className="mt-1 max-w-[40rem] text-sm text-muted-foreground">{t.trajan}</p>
        </div>
      </div>
    </section>
  );
}

export default BrandType;
