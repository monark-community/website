import React from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Locale } from "@/i18n.config";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import Photo from "@/components/common/photo/photo";
import { PhotoKey } from "@/components/common/photo/photos";
import { I18n } from "../brand.i18n";

type Props = { t: I18n["brand_page"]["voice"]; locale: Locale };

// Three of the site's own photos: the kind of image the brand uses.
const examples: { photo: PhotoKey; focus: string }[] = [
  { photo: "students-lecture-hall", focus: "object-[50%_40%]" },
  { photo: "developers-pairing-workshop", focus: "object-[50%_40%]" },
  { photo: "community-meetup-discussion", focus: "object-[50%_45%]" },
];

function Mark({ ok }: { ok: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        ok
          ? "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-white dark:text-background"
          : "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
      }
    >
      {ok ? <CheckIcon className="size-3.5" strokeWidth={3} /> : <XIcon className="size-3.5" strokeWidth={3} />}
    </span>
  );
}

/** Voice as do/don't pairs, imagery as example photos and a list to avoid. */
function BrandVoice({ t, locale }: Props) {
  return (
    <section id="voice" aria-labelledby="brand-voice">
      <SectionHeading id="brand-voice" eyebrow={t.eyebrow} title={t.title} />

      <div className="mt-10">
        <h3 className="text-lg">{t.voice_title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.voice_intro}</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {t.pairs.map((pair) => (
            <li key={pair.principle} className="rounded-2xl border bg-card p-5">
              <p className="text-sm font-bold text-foreground">{pair.principle}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex gap-2.5">
                  <dt className="sr-only">{t.do_label}</dt>
                  <Mark ok />
                  <dd className="text-foreground">{pair.do}</dd>
                </div>
                <div className="flex gap-2.5">
                  <dt className="sr-only">{t.dont_label}</dt>
                  <Mark ok={false} />
                  <dd className="text-muted-foreground">{pair.dont}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-lg">{t.imagery_title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.imagery_intro}</p>
        <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
          {examples.map((example) => (
            <li key={example.photo}>
              <Photo
                photo={example.photo}
                locale={locale}
                sizes="(min-width: 1200px) 370px, 33vw"
                className="aspect-[4/5] rounded-2xl sm:aspect-[4/3]"
                imgClassName={example.focus}
              />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {t.avoid_label}
          </p>
          <ul className="flex flex-wrap gap-2">
            {t.avoid.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm font-semibold text-foreground"
              >
                <XIcon aria-hidden="true" className="size-3.5 text-destructive" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BrandVoice;
