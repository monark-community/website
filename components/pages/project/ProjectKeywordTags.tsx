import React from "react";
import { DatedProjectMetadata } from "@/types/project.types";
import { Locale } from "@/i18n.config";
import ProjectTagLink from "./ProjectTagLink";
import { formatTemplate, projectListHref } from "./project-filters";
import i18n from "./projects-list.i18n";

type Props = {
    keywordTags: DatedProjectMetadata["keyword_tags"];
    locale: Locale;
};

function ProjectKeywordTags({ keywordTags, locale }: Props) {
    const t = i18n[locale];
    const uniqueKeywordTags = [...new Set(keywordTags)].sort((a, b) =>
        a.localeCompare(b)
    );

    return uniqueKeywordTags.map((tag) => (
        <ProjectTagLink
            key={tag}
            href={projectListHref(locale, { keyword: tag })}
            label={formatTemplate(t.show_projects_with_keyword, { tag })}
        >
            {tag}
        </ProjectTagLink>
    ));
}

export default ProjectKeywordTags;
