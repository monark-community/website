import React from "react";
import {
  BookOpenIcon,
  CalendarRangeIcon,
  CodeIcon,
  DatabaseIcon,
  EyeIcon,
  FactoryIcon,
  FileTextIcon,
  FlaskConicalIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  KeyRoundIcon,
  LandmarkIcon,
  LightbulbIcon,
  ListChecksIcon,
  LucideProps,
  MapPinIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  PiggyBankIcon,
  PresentationIcon,
  PuzzleIcon,
  RepeatIcon,
  RocketIcon,
  RouteIcon,
  SchoolIcon,
  SproutIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react";
import { ParticipateAccent, ParticipateIconName } from "./participate.types";

const icons: Record<ParticipateIconName, React.ComponentType<LucideProps>> = {
  code: CodeIcon,
  users: UsersIcon,
  factory: FactoryIcon,
  "graduation-cap": GraduationCapIcon,
  "calendar-range": CalendarRangeIcon,
  repeat: RepeatIcon,
  "file-text": FileTextIcon,
  wrench: WrenchIcon,
  presentation: PresentationIcon,
  landmark: LandmarkIcon,
  "key-round": KeyRoundIcon,
  "piggy-bank": PiggyBankIcon,
  "user-plus": UserPlusIcon,
  "flask-conical": FlaskConicalIcon,
  eye: EyeIcon,
  route: RouteIcon,
  lightbulb: LightbulbIcon,
  "list-checks": ListChecksIcon,
  "book-open": BookOpenIcon,
  school: SchoolIcon,
  rocket: RocketIcon,
  megaphone: MegaphoneIcon,
  "map-pin": MapPinIcon,
  "heart-handshake": HeartHandshakeIcon,
  sprout: SproutIcon,
  database: DatabaseIcon,
  "message-square": MessageSquareIcon,
  puzzle: PuzzleIcon,
};

/** Decorative Lucide icon for the participate pages: always aria-hidden. */
export function ParticipateIcon({
  name,
  ...props
}: { name: ParticipateIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}

/**
 * Tailwind classes for each accent. Written out in full so Tailwind's
 * scanner keeps them. `text` is for icons and large numerals only, never
 * body text (red and green are not text colours on this site).
 */
export const accentClasses: Record<
  ParticipateAccent,
  { chip: string; text: string; fill: string; border: string }
> = {
  primary: {
    chip: "bg-primary/10 text-primary",
    text: "text-primary",
    fill: "bg-primary",
    border: "border-t-primary",
  },
  "chart-2": {
    chip: "bg-chart-2/10 text-chart-2",
    text: "text-chart-2",
    fill: "bg-chart-2",
    border: "border-t-chart-2",
  },
  "chart-3": {
    chip: "bg-chart-3/15 text-chart-3",
    text: "text-chart-3",
    fill: "bg-chart-3",
    border: "border-t-chart-3",
  },
  success: {
    chip: "bg-success/10 text-success",
    text: "text-success",
    fill: "bg-success",
    border: "border-t-success",
  },
};

/** Tinted square that holds an icon, in the page's accent. */
export function AccentChip({
  name,
  accent,
  className = "",
}: {
  name: ParticipateIconName;
  accent: ParticipateAccent;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent].chip} ${className}`}
    >
      <ParticipateIcon name={name} className="size-6" />
    </span>
  );
}
