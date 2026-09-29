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
}

const iconMap = {
  monark: BadgeCheckIcon,
  incubated: SproutIcon,
};

function ProjectOwnershipBadge({ ownership, locale }: Props) {
  // Ownership is optional frontmatter: render nothing for a missing or unknown value.
  const Icon = ownership ? iconMap[ownership as keyof typeof iconMap] : undefined;
  if (!Icon) return null;
  const ownershipI18n = projectOwnershipBadgeI18n[locale] || projectOwnershipBadgeI18n["en"];
  return (
    <Badge variant="outline" className="w-fit cursor-default px-2" title={ownershipI18n.ownership}>
      <Icon className="mr-2" size={20} />
      {ownershipI18n[ownership as keyof typeof iconMap]}
    </Badge>
  );
}

export default ProjectOwnershipBadge;
