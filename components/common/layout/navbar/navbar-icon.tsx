import React from "react";
import { LucideProps } from "lucide-react";
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
};

function NavbarIcon({ icon }: Props) {
  const Icon = iconMap[icon];
  return (
    <div className="bg-card min-h-12 min-w-12 max-h-12 max-w-12 flex justify-center items-center rounded-md mr-4">
      <Icon height={24} width={24} />
    </div>
  );
}

export default NavbarIcon;
