import React from "react";
import { DatedProjectMetadata } from "@/types/project.types";
import { Locale } from "@/i18n.config";
import ProjectTagLink from "./ProjectTagLink";
import { formatTemplate, projectListHref } from "./project-filters";
import i18n from "./projects-list.i18n";

type Props = {
    industryTags: DatedProjectMetadata["industry_tags"];
    locale: Locale;
};

function ProjectIndustryTags({ industryTags, locale }: Props) {
    const t = i18n[locale];
    const uniqueIndustryTags = [...new Set(industryTags)].sort((a, b) =>
        a.localeCompare(b)
    );

    return uniqueIndustryTags.map((tag) => (
        <ProjectTagLink
            key={tag}
            href={projectListHref(locale, { industry: tag })}
            label={formatTemplate(t.show_projects_in_industry, { tag })}
        >
            {tag}
        </ProjectTagLink>
    ));
}

export default ProjectIndustryTags;
