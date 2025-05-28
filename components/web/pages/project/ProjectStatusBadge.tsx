import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

const statusStyles = {
  idea: "bg-yellow-500 text-white",
  prototype_available: "bg-blue-500 text-white",
  in_progress: "bg-orange-500 text-white",
  market_validation: "bg-purple-500 text-white",
  live: "bg-green-500 text-white",
};

function ProjectStatusBadge({ status }: Props) {
  return (
    <Badge
      className={`${statusStyles[status as keyof typeof statusStyles]} w-fit`}
    >
      Status:&nbsp;{status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default ProjectStatusBadge;
