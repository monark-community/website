import React from "react";
import {
  BookOpenIcon,
  CheckIcon,
  CodeIcon,
  FactoryIcon,
  GraduationCapIcon,
  LucideProps,
} from "lucide-react";
import { LearnIconName } from "./learn.i18n";

const icons: Record<LearnIconName, React.ComponentType<LucideProps>> = {
  "graduation-cap": GraduationCapIcon,
  code: CodeIcon,
  factory: FactoryIcon,
  "book-open": BookOpenIcon,
  check: CheckIcon,
};

/** Decorative Lucide icon for the Learn hub: always aria-hidden. */
export function LearnIcon({
  name,
  ...props
}: { name: LearnIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}

/**
 * Tinted square that holds an icon, in one of the theme's chart colours
 * (small accents only, never text), as on the About page.
 */
export type IconTone = "primary" | "chart-2" | "chart-3";

const toneClasses: Record<IconTone, string> = {
  primary: "bg-primary/10 text-primary",
  "chart-2": "bg-chart-2/10 text-chart-2",
  "chart-3": "bg-chart-3/15 text-chart-3",
};

export function LearnIconChip({
  name,
  tone = "primary",
}: {
  name: LearnIconName;
  tone?: IconTone;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}
    >
      <LearnIcon name={name} className="size-6" />
    </span>
  );
}
