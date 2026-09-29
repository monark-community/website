import React from "react";
import {
  AccessibilityIcon,
  BlocksIcon,
  BookOpenIcon,
  CodeIcon,
  CoinsIcon,
  EyeIcon,
  GraduationCapIcon,
  HandshakeIcon,
  LayoutGridIcon,
  LeafIcon,
  LightbulbIcon,
  LucideProps,
  RouteIcon,
  SproutIcon,
  UniversityIcon,
  VoteIcon,
} from "lucide-react";
import { AboutIconName } from "./about.i18n";

const icons: Record<AboutIconName, React.ComponentType<LucideProps>> = {
  "graduation-cap": GraduationCapIcon,
  coins: CoinsIcon,
  route: RouteIcon,
  "book-open": BookOpenIcon,
  code: CodeIcon,
  sprout: SproutIcon,
  "layout-grid": LayoutGridIcon,
  blocks: BlocksIcon,
  university: UniversityIcon,
  vote: VoteIcon,
  accessibility: AccessibilityIcon,
  eye: EyeIcon,
  handshake: HandshakeIcon,
  leaf: LeafIcon,
  lightbulb: LightbulbIcon,
};

/** Decorative Lucide icon for the About page: always aria-hidden. */
export function AboutIcon({
  name,
  ...props
}: { name: AboutIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}

/**
 * Tinted square that holds an icon. Tones are the theme's chart colours,
 * used as small accents (brand guidelines §3): orange first, then red and
 * brown, never for text.
 */
export type IconTone = "primary" | "chart-2" | "chart-3" | "muted";

const toneClasses: Record<IconTone, string> = {
  primary: "bg-primary/10 text-primary",
  "chart-2": "bg-chart-2/10 text-chart-2",
  "chart-3": "bg-chart-3/15 text-chart-3",
  muted: "bg-secondary text-muted-foreground",
};

export function IconChip({
  name,
  tone = "primary",
  className = "",
}: {
  name: AboutIconName;
  tone?: IconTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]} ${className}`}
    >
      <AboutIcon name={name} className="size-6" />
    </span>
  );
}
