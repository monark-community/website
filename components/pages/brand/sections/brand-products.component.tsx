import React from "react";
import Image from "next/image";
import { DownloadIcon } from "lucide-react";
import SectionHeading from "@/components/pages/about/sections/section-heading";
import { I18n } from "../brand.i18n";
import { CREDIT_FILES, CreditId, creditPath } from "../brand-assets";
import { CroppedLogo, MARK_BOX, PREVIEW_BG, ThemedCroppedLogo } from "../brand-ui";

type Props = { t: I18n["brand_page"]["products"]; download: string };

const badges: { id: CreditId; lang: "en" | "fr"; mode: "light" | "dark" }[] = [
  { id: "en-on-light", lang: "en", mode: "light" },
  { id: "en-on-dark", lang: "en", mode: "dark" },
  { id: "fr-on-light", lang: "fr", mode: "light" },
  { id: "fr-on-dark", lang: "fr", mode: "dark" },
];

/**
 * How products carry the brand: Monark products pair the mark with their
 * name (the header lockup, shown live), independent ones keep a small
 * "Built with Monark" credit, with downloadable badges.
 */
function BrandProducts({ t, download }: Props) {
  return (
    <section id="products" aria-labelledby="brand-products">
      <SectionHeading id="brand-products" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />

      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col rounded-2xl border bg-card p-5 sm:p-6">
          <h3 className="text-lg">{t.family_title}</h3>
          {/* The header lockup at its real size: mark 28px, 10px gap, name 800 at 18px. */}
          <div className="mt-5 flex h-16 items-center rounded-xl border bg-background px-5">
            <span className="flex items-center gap-[10px]">
              <CroppedLogo id="mark-color" box={MARK_BOX} height={28} />
              <span className="text-[18px] font-extrabold leading-none tracking-[-0.02em] text-foreground">
                {t.example_product}
              </span>
            </span>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.specs.map((spec) => (
              <li
                key={spec}
                className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm font-semibold text-foreground"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                {spec}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-2xl border bg-card p-5 sm:p-6">
          <h3 className="text-lg">{t.credit_title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.credit_text}</p>
          {/* The credit as it sits in a footer: mono mark at 16px, muted 13px text. */}
          <div className="mt-5 flex h-16 items-center rounded-xl border bg-background px-5">
            <span className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
              <ThemedCroppedLogo
                light="mark-mono-on-light"
                dark="mark-mono-on-dark"
                box={MARK_BOX}
                height={16}
              />
              {t.credit_label}
            </span>
          </div>
          <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {t.badges_title}
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {badges.map((badge) => {
              const label = `${t.badges[badge.lang]}, ${t.badges[badge.mode]}`;
              return (
                <li key={badge.id}>
                  <a
                    href={creditPath(badge.id)}
                    download={`${CREDIT_FILES[badge.id]}.svg`}
                    className="group flex items-center justify-between gap-3 rounded-xl border p-2 pr-3 transition-colors duration-150 ease-out hover:border-primary"
                  >
                    <span
                      className="flex h-12 flex-1 items-center justify-center rounded-lg px-3"
                      style={{
                        backgroundColor:
                          badge.mode === "light" ? PREVIEW_BG.cream : PREVIEW_BG.espresso,
                      }}
                    >
                      <Image
                        src={creditPath(badge.id)}
                        alt=""
                        width={170}
                        height={32}
                        className="h-7 w-auto"
                      />
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <DownloadIcon aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">{download} </span>
                      {label}
                      <span className="sr-only"> (SVG)</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BrandProducts;
