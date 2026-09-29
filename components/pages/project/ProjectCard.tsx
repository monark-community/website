import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import { Badge } from "@/components/ui/badge";
import { Locale } from "@/i18n.config";
import { calculateProjectScore, cn } from "@/lib/utils";
import { DatedProjectMetadata, ProjectStatus } from "@/types/project.types";
import ProjectOwnershipBadge from "./ProjectOwnershipBadge";
import ProjectStatusBadge from "./ProjectStatusBadge";
import { projectTagLinkClass } from "./ProjectTagLink";
import { formatTemplate } from "./project-filters";
import i18n from "./projects-list.i18n";

/** Longest fallback shown when a project has no `tagline` yet. */
const FALLBACK_MAX_CHARS = 90;

/**
 * The card's one line: the project's `tagline`, or its description stripped of
 * Markdown links and cut at a word boundary.
 */
export function projectCardLine(project: DatedProjectMetadata): string {
  if (project.tagline) return project.tagline;
  const plain = project.description
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= FALLBACK_MAX_CHARS) return plain;
  const cut = plain.slice(0, FALLBACK_MAX_CHARS);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : FALLBACK_MAX_CHARS).replace(/[\s,.;:]+$/, "")}…`;
}

/** Public demo address of a project, e.g. https://taskflow.monark.io. */
export function projectDemoUrl(project: DatedProjectMetadata): string {
  return `https://${project.accronym.toLowerCase()}.monark.io`;
}

type Props = {
  project: DatedProjectMetadata;
  locale: Locale;
  /** Large card with a demo button, for the "Ready to try" row. */
  featured?: boolean;
  /** Keyword chips (already ordered); the card shows at most two. */
  tags: { tag: string; href: string; active: boolean }[];
  sizes: string;
  priority?: boolean;
  adminMode?: boolean;
};

/**
 * Gallery card. The whole card is one link (the name, stretched over the card
 * with `::after`); the keyword chips and the demo button sit above it
 * (`relative z-10`) so no interactive element is nested in another.
 */
function ProjectCard({
  project,
  locale,
  featured = false,
  tags,
  sizes,
  priority = false,
  adminMode = false,
}: Props) {
  const t = i18n[locale];
  const href = `/project/${project.id}`;
  // Featured cards are all "ready to try": they skip the status badge and
  // chips, and show the demo button instead.
  const visibleTags = featured ? [] : tags.slice(0, 2);

  return (
    <div
      data-project-card=""
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border bg-card transition-[transform,border-color] duration-200 ease-out",
        "hover:border-primary/60 motion-safe:hover:-translate-y-1",
        "has-[a[data-card-link]:focus-visible]:ring-2 has-[a[data-card-link]:focus-visible]:ring-ring has-[a[data-card-link]:focus-visible]:ring-offset-2 has-[a[data-card-link]:focus-visible]:ring-offset-background",
        featured ? "rounded-3xl" : "rounded-2xl"
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b bg-muted">
        <Image
          src={`/images/project/${project.id}.jpg`}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-6" : "p-5")}>
        <h3
          className={cn(
            "m-0 font-extrabold tracking-[-0.01em]",
            featured ? "text-2xl" : "text-xl"
          )}
        >
          <NavLink
            href={href}
            data-card-link=""
            className="text-foreground no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.accronym}
            <span className="sr-only">, {project.title}</span>
          </NavLink>
        </h3>
        <p className="mb-0 mt-0.5 text-xs font-semibold text-muted-foreground" aria-hidden="true">
          {project.title}
        </p>
        <p
          className={cn(
            "mb-0 mt-3 text-foreground/85",
            featured ? "text-lg leading-snug" : "text-[0.9375rem] leading-snug"
          )}
        >
          {projectCardLine(project)}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
          {!featured && (
            <ProjectStatusBadge status={project.status as ProjectStatus} locale={locale} />
          )}
          <ProjectOwnershipBadge ownership={project.ownership} locale={locale} compact />
          {featured && (
            <a
              href={projectDemoUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={formatTemplate(t.try_demo_label, { name: project.accronym })}
              className="relative z-10 ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground no-underline transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {t.try_demo}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
          {adminMode && (
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary-ink">
              Score: {calculateProjectScore(project)}
            </Badge>
          )}
        </div>

        {visibleTags.length > 0 && (
          <div className="relative z-10 mt-3 flex flex-wrap items-center gap-1.5">
            {visibleTags.map(({ tag, href: tagHref, active }) => (
              <Link
                key={tag}
                href={tagHref}
                aria-label={formatTemplate(t.show_projects_with_keyword, { tag })}
                aria-current={active ? "true" : undefined}
                className={projectTagLinkClass(active)}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
