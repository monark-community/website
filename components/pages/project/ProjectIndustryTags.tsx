import React from "react";
import { Badge } from "@/components/ui/badge";
import { DatedProjectMetadata } from "@/types/project.types";

type Props = {
    industryTags: DatedProjectMetadata["industry_tags"];
};

function ProjectIndustryTags({ industryTags }: Props) {
    const uniqueIndustryTags = [...new Set(industryTags)].sort((a, b) =>
        a.localeCompare(b)
    );

    return uniqueIndustryTags.sort().map((industryTags, idx) => (
        <Badge key={idx} className="w-fit whitespace-nowrap pointer-events-none" variant="secondary">
            {industryTags}
        </Badge>
    ));
}

export default ProjectIndustryTags;