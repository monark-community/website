import React from "react";
import { QuoteIcon } from "lucide-react";
import BrandedSeparator from "@/components/common/branded-separator/branded-separator";
import { AboutStatement, I18n } from "../about.i18n";

type Props = { t: I18n["about_page"]["purpose"] };

/**
 * Mission and vision as a standout pair on an inverted surface: espresso
 * with cream text in light mode, cream with espresso text in dark mode
 * (bg-foreground / text-background follow the theme on their own). Orange
 * is decorative only here, since orange text fails on the cream variant.
 */
function AboutPurpose({ t }: Props) {
  return (
    <section
      aria-labelledby="about-purpose"
      className="rounded-3xl bg-foreground p-6 text-background sm:p-8 md:p-10"
    >
      <h2
        id="about-purpose"
        className="text-sm font-bold uppercase tracking-[0.08em] text-background/75"
      >
        {t.title}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
        <Statement statement={t.mission} />
        <Statement
          statement={t.vision}
          className="border-t border-background/15 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        />
      </div>
      <BrandedSeparator width="100%" className="mt-10" />
      <p className="mt-6 text-balance text-center text-lg font-bold md:text-xl">
        {t.motto}
      </p>
    </section>
  );
}

function Statement({
  statement,
  className = "md:pr-10",
}: {
  statement: AboutStatement;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="flex items-center gap-3 text-2xl">
        <QuoteIcon
          aria-hidden="true"
          className="size-6 shrink-0 fill-primary text-primary"
          strokeWidth={1.5}
        />
        {statement.label}
      </h3>
      <p className="mt-4 text-xl font-bold leading-snug tracking-[-0.01em] md:text-[1.375rem]">
        {statement.quote}
      </p>
      <p className="mt-4 text-background/75">{statement.content}</p>
    </div>
  );
}

export default AboutPurpose;
