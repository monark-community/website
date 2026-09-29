import React from "react";
import { Badge } from "@/components/ui/badge";
import { projectStatusBadgeI18n } from "./ProjectStatusBadge.i18n";
import { Locale } from "@/i18n.config";
import { CircleArrowOutUpRightIcon, CircleDollarSignIcon, CirclePauseIcon, CirclePlayIcon, LightbulbIcon, LoaderCircleIcon } from "lucide-react";
import { ProjectStatus } from "@/types/project.types";

type Status = `${ProjectStatus}`;

interface Props {
  status: Status | ProjectStatus;
  locale: Locale;
}

// Muted status tones, always paired with an icon and a text label (brand §3).
const statusStyles = {
  planned: "border-border bg-card text-foreground",
  prototype_available: "border-transparent bg-chart-3/15 text-chart-3",
  in_progress: "border-transparent bg-warning/15 text-warning",
  on_hold: "border-transparent bg-muted text-muted-foreground",
  market_validation: "border-transparent bg-primary/15 text-primary-ink",
  production: "border-transparent bg-success/15 text-success",
};

const iconMap = {
  planned: LightbulbIcon,
  prototype_available: CircleArrowOutUpRightIcon,
  in_progress: LoaderCircleIcon,
  on_hold: CirclePauseIcon,
  market_validation: CircleDollarSignIcon,
  production: CirclePlayIcon
};

function ProjectStatusBadge({ status, locale }: Props) {
  const Icon = iconMap[status as keyof typeof iconMap]
  const statusI18n = projectStatusBadgeI18n[locale] || projectStatusBadgeI18n["en"];
  const localizedLabel = statusI18n.status;
  const localizedStatus = statusI18n[status as keyof typeof statusI18n] || status;
  return (
    <Badge
      className={`${statusStyles[status as keyof typeof statusStyles]} w-fit shrink-0 cursor-default gap-1.5 px-2.5 py-1`}
      title={localizedLabel}
    >
      <Icon aria-hidden="true" className="size-3.5" strokeWidth={2} />{localizedStatus}
    </Badge>
  );
}

export default ProjectStatusBadge;
