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

/** Statuses people can try today: their cards show a "Try the demo" button. */
export const LIVE_STATUSES: string[] = [
  ProjectStatus.Production,
  ProjectStatus.MarketValidation,
  ProjectStatus.PrototypeAvailable,
];

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

export type ProjectCardVariant = "default" | "feature" | "tall" | "compact";

type Props = {
  project: DatedProjectMetadata;
  locale: Locale;
  /**
   * "feature": a section's lead project (large 16:9 cover, big name).
   * "tall": a side project that fills its share of the feature's height on
   *   wide screens (cover beside the text), cover on top on phones.
   * "compact": a thumbnail beside the name, line and status.
   * "default": a grid card (cover, name, line, badges, keyword chips).
   */
  variant?: ProjectCardVariant;
  /** Keyword chips (already ordered); "default" cards show at most two. */
  tags: { tag: string; href: string; active: boolean }[];
  sizes: string;
  priority?: boolean;
  adminMode?: boolean;
  /** Show the "Try the demo" button on live projects. Off in the filtered grid. */
  showDemo?: boolean;
  className?: string;
};

/**
 * Image-first project card, in the same family as the news cards. The name
 * link is stretched over the whole card (`card-hover-link`); the keyword chips
 * and the demo button sit above it (`relative z-10`) so no interactive element
 * is nested in another. Hover and focus come from the shared `card-hover`
 * primitive (app/globals.scss).
 */
function ProjectCard({
  project,
  locale,
  variant = "default",
  tags,
  sizes,
  priority = false,
  adminMode = false,
  showDemo = true,
  className,
}: Props) {
  const t = i18n[locale];
  const href = `/project/${project.id}`;
  const feature = variant === "feature";
  const tall = variant === "tall";
  const compact = variant === "compact";
  const demo = showDemo && LIVE_STATUSES.includes(project.status);
  const visibleTags = variant === "default" ? tags.slice(0, 2) : [];

  const demoLabel = formatTemplate(t.try_demo_label, { name: project.accronym });

  return (
    <div
      data-project-card=""
      className={cn(
        "card-hover flex h-full [--card-hover-inset:-0.5rem] [--card-hover-radius:1.5rem]",
        compact
          ? "grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-4"
          : "flex-col",
        tall &&
          "lg:grid lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-center lg:gap-6",
        className
      )}
    >
      <div
        className={cn(
          "card-hover-media relative w-full border bg-muted",
          tall
            ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[11rem]"
            : "aspect-video",
          feature ? "rounded-3xl" : compact ? "rounded-xl" : "rounded-2xl"
        )}
      >
        <Image
          src={`/images/project/${project.id}.jpg`}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          feature ? "pt-5 md:pt-6" : tall ? "pt-4 lg:pt-0" : compact ? "" : "pt-4"
        )}
      >
        <h3
          className={cn(
            "m-0 font-extrabold leading-tight tracking-[-0.015em]",
            feature
              ? "text-[1.625rem] sm:text-3xl"
              : compact
                ? "text-base sm:text-lg"
                : "text-xl"
          )}
        >
          <NavLink
            href={href}
            data-card-link=""
            className="card-hover-link text-foreground"
          >
            {project.accronym}
            <span className="sr-only">, {project.title}</span>
          </NavLink>
        </h3>
        <p
          className="mb-0 mt-0.5 text-xs font-semibold text-muted-foreground"
          aria-hidden="true"
        >
          {project.title}
        </p>
        <p
          className={cn(
            "mb-0 text-foreground/85",
            feature
              ? "mt-3 max-w-[36rem] text-lg leading-snug"
              : compact
                ? "mt-1.5 line-clamp-2 text-sm leading-snug"
                : "mt-2.5 text-[0.9375rem] leading-snug"
          )}
        >
          {projectCardLine(project)}
        </p>

        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5",
            compact ? "pt-3" : "mt-auto pt-4"
          )}
        >
          <ProjectStatusBadge status={project.status as ProjectStatus} locale={locale} />
          {!compact && (
            <ProjectOwnershipBadge ownership={project.ownership} locale={locale} compact />
          )}
          {demo && !compact && (
            <a
              href={projectDemoUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={demoLabel}
              className={cn(
                "relative z-10 inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground no-underline transition-colors duration-150 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                // Grid cards are narrow: the button wraps under the badges.
                variant !== "default" && "ml-auto"
              )}
            >
              {t.try_demo}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
          {demo && compact && (
            <a
              href={projectDemoUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={demoLabel}
              className="relative z-10 inline-flex min-h-8 items-center gap-1 rounded-full px-1.5 text-sm font-bold text-primary-ink no-underline underline-offset-4 hover:underline"
            >
              {t.try_demo}
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          )}
          {adminMode && (
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-ink">
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
