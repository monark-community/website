import React from "react";
import { Badge } from "@/components/ui/badge";
import { projectStatusBadgeI18n } from "./ProjectStatusBadge.i18n";
import { Locale } from "@/i18n.config";
import { CircleArrowOutUpRightIcon, CircleDollarSignIcon, CirclePauseIcon, CirclePlayIcon, LightbulbIcon, LoaderCircleIcon } from "lucide-react";

interface Props {
  status: 'idea' | 'prototype_available' | 'in_progress' | 'on_hold' | 'market_validation' | 'production';
  locale: Locale;
}

const statusStyles = {
  idea: "bg-[hsl(var(--chart-1))] text-white hover:bg-[hsl(var(--chart-1))]",
  prototype_available:
    "bg-[hsl(var(--chart-2))] text-white hover:bg-[hsl(var(--chart-2))]",
  in_progress: "bg-[hsl(var(--chart-3))] text-white hover:bg-[hsl(var(--chart-3))]",
  on_hold: "bg-[hsl(var(--muted))] text-muted-foreground hover:bg-[hsl(var(--muted-3))]",
  market_validation:
    "bg-[hsl(var(--chart-4))] text-white hover:bg-[hsl(var(--chart-4))]",
  production: "bg-[hsl(var(--chart-5))] text-white hover:bg-[hsl(var(--chart-5))]",
};

const iconMap = {
  idea: LightbulbIcon,
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
      className={`${statusStyles[status as keyof typeof statusStyles]} w-fit cursor-default px-2`}
      title={localizedLabel}
    >
      <Icon className={`mr-2 ${status === "in_progress" ? "animate-spin" : ""}`} size={20} />{localizedStatus}
    </Badge>
  );
}

export default ProjectStatusBadge;
