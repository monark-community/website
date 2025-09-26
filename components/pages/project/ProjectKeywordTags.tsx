import React from "react";
import { Badge } from "@/components/ui/badge";
import { DatedProjectMetadata } from "@/types/project.types";

type Props = {
    keywordTags: DatedProjectMetadata["keyword_tags"];
};

function ProjectKeywordTags({ keywordTags }: Props) {
    const uniqueKeywordTags = [...new Set(keywordTags)].sort((a, b) =>
        a.localeCompare(b)
    );

    return uniqueKeywordTags.sort().map((keywordTags, idx) => (
        <Badge key={idx} className="w-fit whitespace-nowrap pointer-events-none" variant="secondary">
            {keywordTags}
        </Badge>
    ));
}

export default ProjectKeywordTags;