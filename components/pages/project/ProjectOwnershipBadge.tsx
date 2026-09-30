import React from "react";
import { Badge } from "@/components/ui/badge";
import { projectOwnershipBadgeI18n } from "./ProjectOwnershipBadge.i18n";
import { Locale } from "@/i18n.config";
import { BadgeCheckIcon, SproutIcon } from "lucide-react";
import { ProjectOwnership } from "@/types/project.types";

type Ownership = `${ProjectOwnership}`;

interface Props {
  ownership?: Ownership | ProjectOwnership | string | null;
  locale: Locale;
  /** Smaller variant matching the status badge, for the list cards. */
  compact?: boolean;
}

const iconMap = {
  monark: BadgeCheckIcon,
  incubated: SproutIcon,
};

function ProjectOwnershipBadge({ ownership, locale, compact = false }: Props) {
  // Ownership is optional frontmatter: render nothing for a missing or unknown value.
  const Icon = ownership ? iconMap[ownership as keyof typeof iconMap] : undefined;
  if (!Icon) return null;
  const ownershipI18n = projectOwnershipBadgeI18n[locale] || projectOwnershipBadgeI18n["en"];
  if (compact) {
    return (
      <Badge
        variant="outline"
        className="w-fit shrink-0 cursor-default gap-1.5 px-2.5 py-1"
        title={ownershipI18n[ownership as keyof typeof iconMap]}
      >
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={2} />
        <span aria-hidden="true">
          {ownershipI18n[`${ownership as keyof typeof iconMap}_short`]}
        </span>
        <span className="sr-only">{ownershipI18n[ownership as keyof typeof iconMap]}</span>
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="w-fit cursor-default px-2" title={ownershipI18n.ownership}>
      <Icon className="mr-2" size={20} />
      {ownershipI18n[ownership as keyof typeof iconMap]}
    </Badge>
  );
}

export default ProjectOwnershipBadge;
