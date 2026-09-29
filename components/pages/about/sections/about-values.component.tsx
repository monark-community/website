import React from "react";
import { I18n } from "../about.i18n";
import { IconChip, IconTone } from "../about-icon";
import SectionHeading from "./section-heading";

type Props = { t: I18n["about_page"]["values"] };

// Icon accents cycle through the theme's chart colours.
const tones: IconTone[] = ["primary", "chart-2", "chart-3"];

// Five values: three then two on large screens (a six-column grid), two per
// row with the last one full width on tablets, one per row on phones.
const spans = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "sm:col-span-2 lg:col-span-3",
];

function AboutValues({ t }: Props) {
  return (
    <section aria-labelledby="about-values">
      <SectionHeading id="about-values" eyebrow={t.eyebrow} title={t.title} />
      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {t.items.map((value, index) => (
          <li
            key={value.title}
            className={`flex gap-4 rounded-2xl border bg-card p-5 ${spans[index] ?? "lg:col-span-2"}`}
          >
            <IconChip name={value.icon} tone={tones[index % tones.length]} />
            <div className="min-w-0">
              <h3 className="text-lg">{value.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {value.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AboutValues;
