import React from "react";
import { Badge } from "@/components/ui/badge";
import { projectStatusBadgeI18n } from "./ProjectStatusBadge.i18n";
import { Locale } from "@/i18n.config";

interface Props {
  status: string;
  locale: Locale;
}

const statusStyles = {
  idea: "bg-[hsl(var(--chart-1))] text-white hover:bg-[hsl(var(--chart-1))]",
  prototype_available:
    "bg-[hsl(var(--chart-2))] text-white hover:bg-[hsl(var(--chart-2))]",
  in_progress: "bg-[hsl(var(--chart-3))] text-white hover:bg-[hsl(var(--chart-3))]",
  market_validation:
    "bg-[hsl(var(--chart-4))] text-white hover:bg-[hsl(var(--chart-4))]",
  live: "bg-[hsl(var(--chart-5))] text-white hover:bg-[hsl(var(--chart-5))]",
};

function ProjectStatusBadge({ status, locale }: Props) {
  const statusI18n = projectStatusBadgeI18n[locale] || projectStatusBadgeI18n["en"];
  const localizedLabel = statusI18n.status;
  const localizedStatus = statusI18n[status as keyof typeof statusI18n] || status;
  return (
    <Badge
      className={`${statusStyles[status as keyof typeof statusStyles]} w-fit cursor-default`}
      title={localizedLabel}
    >
      {localizedStatus}
    </Badge>
  );
}

export default ProjectStatusBadge;
