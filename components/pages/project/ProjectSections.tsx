"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { DatedProjectMetadata, ProjectCategory } from "@/types/project.types";
import ProjectCard, { ProjectCardVariant } from "./ProjectCard";
import i18n from "./projects-list.i18n";
import { projectSectionId } from "./project-filters";

/** Section order on the list; projects without a known category go last. */
export const PROJECT_CATEGORIES = [
  ProjectCategory.Payments,
  ProjectCategory.Holdings,
  ProjectCategory.Trust,
  ProjectCategory.Commerce,
  ProjectCategory.DeFi,
  ProjectCategory.Governance,
] as const;

export type ProjectSectionKey = `${ProjectCategory}` | "other";

export type ProjectSection = {
  category: ProjectSectionKey;
  items: DatedProjectMetadata[];
};

type CardTags = (project: DatedProjectMetadata) => {
  tag: string;
  href: string;
  active: boolean;
}[];

// Projects beside a section's feature; the rest go in a grid below.
const SIDE_COUNT = 3;
// The fixed site header (h-16).
const HEADER_HEIGHT = 64;
// Filter bar height before it is measured (search row + jump row).
const DEFAULT_BAR_HEIGHT = 106;

const SIZES: Record<ProjectCardVariant, string> = {
  feature: "(min-width: 1200px) 700px, (min-width: 1024px) 60vw, 100vw",
  tall: "(min-width: 1200px) 250px, (min-width: 1024px) 22vw, 100vw",
  compact: "(min-width: 1024px) 180px, 40vw",
  default:
    "(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Projects grouped by category (frontmatter `category`), in PROJECT_CATEGORIES
 * order, keeping the incoming order inside each group (the list sorts by
 * status first, so each group starts with its most advanced project).
 */
export function groupProjectSections(
  projects: DatedProjectMetadata[]
): ProjectSection[] {
  const groups = new Map<ProjectSectionKey, DatedProjectMetadata[]>();
  for (const project of projects) {
    const category: ProjectSectionKey =
      project.category &&
      (PROJECT_CATEGORIES as readonly string[]).includes(project.category)
        ? project.category
        : "other";
    groups.set(category, [...(groups.get(category) ?? []), project]);
  }
  return [...PROJECT_CATEGORIES, "other" as const]
    .filter((category) => groups.has(category))
    .map((category) => ({ category, items: groups.get(category)! }));
}

type SectionsProps = {
  sections: ProjectSection[];
  locale: Locale;
  cardTags: CardTags;
  adminMode: boolean;
  /** Height of the sticky filter bar, for the sections' scroll margin. */
  barHeight: number;
};

/**
 * The unfiltered list, like the news list: one section per category, each
 * with its most advanced project as a large 16:9 feature and the others
 * beside it, mirrored from one section to the next on wide screens (feature
 * left, then right, ...). Side projects by count: one gets a full card, two
 * get tall rows sharing the feature's height, three (or four, rather than
 * leave one alone below) get compact rows; extra projects continue in a grid. A section of exactly two shows two equal
 * cards.
 */
export function ProjectSections({
  sections,
  locale,
  cardTags,
  adminMode,
  barHeight,
}: SectionsProps) {
  const t = i18n[locale];
  return (
    <>
      {sections.map((section, index) => (
        <CategorySection
          key={section.category}
          section={section}
          mirrored={index % 2 === 1}
          first={index === 0}
          locale={locale}
          title={t.categories[section.category].title}
          line={t.categories[section.category].line}
          cardTags={cardTags}
          adminMode={adminMode}
          barHeight={barHeight}
        />
      ))}
    </>
  );
}

function CategorySection({
  section,
  mirrored,
  first,
  locale,
  title,
  line,
  cardTags,
  adminMode,
  barHeight,
}: {
  section: ProjectSection;
  mirrored: boolean;
  first: boolean;
  locale: Locale;
  title: string;
  line?: string;
  cardTags: CardTags;
  adminMode: boolean;
  barHeight: number;
}) {
  const id = projectSectionId(section.category);
  const pair = section.items.length === 2;
  const [feature, ...rest] = section.items;
  // Four others go in the side column rather than leave one alone in the grid.
  const sideCount = rest.length === SIDE_COUNT + 1 ? SIDE_COUNT + 1 : SIDE_COUNT;
  const side = pair ? [] : rest.slice(0, sideCount);
  const more = pair ? [] : rest.slice(sideCount);
  const sideVariant: ProjectCardVariant =
    side.length === 1 ? "default" : side.length === 2 ? "tall" : "compact";

  const card = (
    project: DatedProjectMetadata,
    variant: ProjectCardVariant,
    extra: { className?: string; priority?: boolean } = {}
  ) => (
    <ProjectCard
      project={project}
      locale={locale}
      variant={variant}
      tags={cardTags(project)}
      sizes={SIZES[variant]}
      adminMode={adminMode}
      {...extra}
    />
  );

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      // Lands with the section's top border tucked under the header and the
      // sticky filter bar (the global scroll-padding-top is 5rem); the first
      // section has no border, so it keeps the list's top spacing instead.
      style={{
        scrollMarginTop: `calc(${HEADER_HEIGHT + barHeight + (first ? 40 : -1)}px - 5rem)`,
      }}
      className={cn(
        "border-t pt-10 md:pt-14",
        first ? "mt-0 border-t-0 pt-0 md:pt-0" : "mt-14 md:mt-16"
      )}
    >
      <div className="max-w-[40rem]">
        <h2 id={`${id}-title`}>{title}</h2>
        {line && <p className="mt-2 text-muted-foreground">{line}</p>}
      </div>

      {pair ? (
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-x-10 gap-y-12 p-0 md:grid-cols-2">
          {section.items.map((project) => (
            <li key={project.id} className="m-0">
              {card(project, "feature", { priority: first })}
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={cn(
            "mt-8 grid grid-cols-1 gap-x-10 gap-y-8",
            side.length > 0
              ? sideVariant === "tall"
                ? "lg:grid-cols-2"
                : "lg:grid-cols-12"
              : "lg:grid-cols-12",
            sideVariant === "compact" && "lg:items-center"
          )}
        >
          {card(feature, "feature", {
            priority: first,
            className: cn(
              sideVariant !== "tall" && "lg:col-span-7",
              // Centred beside compact rows, not stretched to their height.
              sideVariant === "compact" && "lg:h-auto",
              mirrored && "lg:order-2"
            ),
          })}
          {side.length > 0 && (
            <ul
              className={cn(
                "m-0 flex list-none flex-col gap-6 p-0",
                sideVariant !== "tall" && "lg:col-span-5",
                sideVariant === "tall" && "gap-8 lg:h-full lg:gap-6",
                mirrored && "lg:order-1"
              )}
            >
              {side.map((project) => (
                <li
                  key={project.id}
                  className={cn("m-0", sideVariant === "tall" && "lg:min-h-0 lg:flex-1")}
                >
                  {card(project, sideVariant)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {more.length > 0 && (
        <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((project) => (
            <li key={project.id} className="m-0">
              {card(project, "default")}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type JumpNavProps = {
  sections: ProjectSection[];
  locale: Locale;
  active: string | null;
  onJump: (event: React.MouseEvent<HTMLAnchorElement>, category: string) => void;
};

/**
 * Category jump links, shown in the sticky filter bar while no filter is
 * active. Same pills as the news list; the current category stays in view in
 * the scrollable row (phones).
 */
export function ProjectCategoryNav({ sections, locale, active, onJump }: JumpNavProps) {
  const t = i18n[locale];
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const row = list.current;
    if (!row) return;
    const link = row.querySelector<HTMLElement>("[aria-current]");
    if (!link) {
      row.scrollTo({ left: 0 });
      return;
    }
    const left = link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left) });
  }, [active]);

  return (
    <nav aria-label={t.jump_label} className="min-w-0 flex-1 border-l pl-1.5">
      <ul
        ref={list}
        className="relative m-0 -my-1 flex list-none gap-1 overflow-x-auto p-0 py-1 [scrollbar-width:none]"
      >
        {sections.map(({ category }) => {
          const current = active === category;
          return (
            <li key={category} className="m-0 shrink-0">
              <a
                href={`#${projectSectionId(category)}`}
                onClick={(event) => onJump(event, category)}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "inline-flex h-8 items-center whitespace-nowrap rounded-full px-3.5 text-sm font-semibold no-underline transition-colors duration-150",
                  current
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                {t.categories[category as ProjectSectionKey].title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Smooth scroll to a category section (instant under reduced motion), with
 * the clicked category highlighted while the page scrolls past the others.
 * The hash is updated in place, keeping the filter query string.
 */
export function useCategoryJump(
  setActive: (category: string | null) => void,
  lockActive: (ms: number) => void
) {
  return useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, category: string) => {
      const target = document.getElementById(projectSectionId(category));
      if (!target) return;
      event.preventDefault();
      const reduced = prefersReducedMotion();
      lockActive(reduced ? 0 : 900);
      setActive(category);
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}#${projectSectionId(category)}`
      );
    },
    [lockActive, setActive]
  );
}

/**
 * The category section currently under the header and the filter bar.
 * `lock(ms)` freezes it for a while (during a smooth scroll to a clicked
 * category). Inactive (always null) when `sections` is empty.
 */
export function useActiveSection(
  sections: ProjectSection[],
  barHeight: number
): [string | null, (category: string | null) => void, (ms: number) => void] {
  const [active, setActive] = useState<string | null>(null);
  const lockedUntil = useRef(0);
  const lock = useCallback((ms: number) => {
    lockedUntil.current = Date.now() + ms;
  }, []);

  useEffect(() => {
    if (sections.length === 0) {
      setActive(null);
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const elements = sections
      .map(({ category }) => document.getElementById(projectSectionId(category)))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        if (Date.now() < lockedUntil.current) return;
        const first = elements.find((el) => visible.get(el.id));
        setActive(first ? first.id.replace(/^projects-/, "") : null);
      },
      // A band just under the header and the sticky filter bar.
      { rootMargin: `-${HEADER_HEIGHT + barHeight + 12}px 0px -55% 0px` }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections, barHeight]);

  return [active, setActive, lock];
}

/** Live height of an element (the sticky filter bar). */
export function useElementHeight() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState(DEFAULT_BAR_HEIGHT);
  useEffect(() => {
    if (!node) return;
    const update = () => setHeight(Math.round(node.getBoundingClientRect().height));
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);
  return { height, ref: setNode };
}
