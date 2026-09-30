import React from "react";
import { FactoryIcon, LucideProps } from "lucide-react";
import {
  BinaryIcon,
  BlocksIcon,
  BookMarkedIcon,
  BookOpenIcon,
  CalendarPlus,
  CodeIcon,
  CoinsIcon,
  GraduationCapIcon,
  InfoIcon,
  LightbulbIcon,
  MedalIcon,
  NewspaperIcon,
  PlaySquareIcon,
  PodcastIcon,
  TestTubeDiagonalIcon,
  UniversityIcon,
  UsersIcon,
  VoteIcon,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  code: CodeIcon,
  lightbulb: LightbulbIcon,
  university: UniversityIcon,
  "graduation-cap": GraduationCapIcon,
  blocks: BlocksIcon,
  "book-marked": BookMarkedIcon,
  users: UsersIcon,
  "test-tube-diagonal": TestTubeDiagonalIcon,
  medal: MedalIcon,
  binary: BinaryIcon,
  "calendar-plus": CalendarPlus,
  "factory": FactoryIcon,
  info: InfoIcon,
  vote: VoteIcon,
  coins: CoinsIcon,
  "book-open": BookOpenIcon,
  newspaper: NewspaperIcon,
  "square-play": PlaySquareIcon,
  podcast: PodcastIcon,
};

type Props = {
  icon: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Decorative Lucide icon (always paired with a visible label). */
function NavbarIcon({ icon, size = 16, strokeWidth = 1.75, className }: Props) {
  const Icon = iconMap[icon];
  if (!Icon) return null;
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${className ?? ""}`} aria-hidden="true">
      <Icon height={size} width={size} strokeWidth={strokeWidth} />
    </span>
  );
}

export default NavbarIcon;
