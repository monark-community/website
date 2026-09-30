"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchX } from "lucide-react";
import enProjects from "@/content/en/project/index";
import frProjects from "@/content/fr/project/index";
import {
  DatedProjectMetadata,
  ProjectOwnership,
  ProjectStatus,
} from "@/types/project.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n.config";
import { calculateProjectScore } from "@/lib/utils";
import i18n from "./projects-list.i18n";
import {
  PROJECT_FILTER_PARAMS,
  ProjectListFilters,
  matchKnownValue,
  projectSectionId,
} from "./project-filters";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar, { FilterSelect } from "./ProjectFilterBar";
import {
  ProjectCategoryNav,
  ProjectSections,
  groupProjectSections,
  useActiveSection,
  useCategoryJump,
  useElementHeight,
} from "./ProjectSections";

interface ProjectListProps {
  locale: Locale;
}

const projectDataMap: Record<Locale, DatedProjectMetadata[]> = {
  en: enProjects,
  fr: frProjects,
};

const STATUS_VALUES: string[] = Object.values(ProjectStatus);
const OWNERSHIP_VALUES: string[] = Object.values(ProjectOwnership);

/** Most advanced first: what people can use today, then work under way. */
const STATUS_PRIORITY: Record<ProjectStatus, number> = {
  production: 0,
  market_validation: 1,
  prototype_available: 2,
  in_progress: 3,
  on_hold: 4,
  planned: 5,
};

/** Filter keys stored in the URL, all rewritten on every filter change. */
const FILTER_KEYS: (keyof ProjectListFilters)[] = [
  "industry",
  "keyword",
  "status",
  "ownership",
  "search",
];

const GRID_CLASS =
  "m-0 grid list-none grid-cols-1 gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
const GRID_SIZES = "(min-width: 1280px) 285px, (min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw";

/**
 * Builds the list URL for `filters`, keeping any unrelated query params
 * (e.g. campaign tags) that were already present.
 */
function buildListUrl(
  pathname: string,
  current: { toString(): string },
  filters: ProjectListFilters
): string {
  const params = new URLSearchParams(current.toString());
  for (const key of FILTER_KEYS) {
    const param = PROJECT_FILTER_PARAMS[key];
    const value = filters[key];
    if (value) params.set(param, value);
    else params.delete(param);
  }
  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function ProjectListHeader({ locale }: ProjectListProps) {
  const t = i18n[locale];
  return (
    <div className="site-container pb-8 pt-12 md:pb-10 md:pt-16">
      <h1>{t.page_title}</h1>
      <p className="lead mt-4 max-w-[36rem]">{t.description}</p>
    </div>
  );
}

/** Placeholder shown while the client list mounts (Suspense fallback). */
function ProjectCardsSkeleton() {
  return (
    <>
      <div className="border-y">
        <div className="site-container py-3">
          <div className="h-10 w-full rounded-full bg-muted motion-safe:animate-pulse" />
          <div className="mt-2 h-8 w-24 rounded-full bg-muted motion-safe:animate-pulse" />
        </div>
      </div>
      <div className="site-container pb-16 pt-10 md:pb-24">
        <div className={GRID_CLASS}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="motion-safe:animate-pulse">
              <div className="aspect-[16/9] w-full rounded-2xl bg-muted" />
              <div className="space-y-3 pt-4">
                <div className="h-5 w-1/2 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-6 w-24 rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Static fallback for the `<Suspense>` boundary around `ProjectList`
 * (`useSearchParams` opts the list out of prerendering).
 */
export function ProjectListFallback({ locale }: ProjectListProps) {
  return (
    <div className="relative">
      <ProjectListHeader locale={locale} />
      <ProjectCardsSkeleton />
    </div>
  );
}

const ProjectList: React.FC<ProjectListProps> = ({ locale }) => {
  const t = i18n[locale];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [adminMode, setAdminMode] = useState(false);
  const [sortMode, setSortMode] = useState<"acronym" | "score">("acronym");

  const projects = projectDataMap[locale];

  // Unique tag sets, derived from the locale's data.
  const { sortedIndustryTags, sortedKeywordTags } = useMemo(() => {
    const industries = new Set<string>();
    const keywords = new Set<string>();
    projects.forEach((project) => {
      project.industry_tags.forEach((tag) => industries.add(tag));
      project.keyword_tags.forEach((tag) => keywords.add(tag));
    });
    return {
      sortedIndustryTags: Array.from(industries).sort((a, b) => a.localeCompare(b)),
      sortedKeywordTags: Array.from(keywords).sort((a, b) => a.localeCompare(b)),
    };
  }, [projects]);

  // Select filters are derived from the URL, so back/forward and links restore
  // them. Unknown values are ignored (treated as "all").
  const selectedIndustry = matchKnownValue(
    searchParams.get(PROJECT_FILTER_PARAMS.industry),
    sortedIndustryTags
  );
  const selectedKeyword = matchKnownValue(
    searchParams.get(PROJECT_FILTER_PARAMS.keyword),
    sortedKeywordTags
  );
  const selectedStatus = matchKnownValue(
    searchParams.get(PROJECT_FILTER_PARAMS.status),
    STATUS_VALUES
  );
  const selectedOwnership = matchKnownValue(
    searchParams.get(PROJECT_FILTER_PARAMS.ownership),
    OWNERSHIP_VALUES
  );

  // The search box keeps local state so typing is never interrupted; the URL
  // follows it, and external URL changes (links, back/forward) flow back in.
  const searchParam = searchParams.get(PROJECT_FILTER_PARAMS.search) ?? "";
  const [search, setSearchState] = useState(searchParam);
  const lastWrittenSearch = useRef(searchParam);
  useEffect(() => {
    if (searchParam !== lastWrittenSearch.current) {
      lastWrittenSearch.current = searchParam;
      setSearchState(searchParam);
    }
  }, [searchParam]);

  const currentFilters: ProjectListFilters = {
    industry: selectedIndustry,
    keyword: selectedKeyword,
    status: selectedStatus,
    ownership: selectedOwnership,
    search: search || undefined,
  };

  // Replace (not push) the URL on filter changes: no history spam, no scroll
  // jump, no server round trip. Next syncs useSearchParams with the native
  // History API.
  const writeFilters = useCallback(
    (next: ProjectListFilters) => {
      lastWrittenSearch.current = next.search ?? "";
      window.history.replaceState(
        null,
        "",
        buildListUrl(pathname, new URLSearchParams(window.location.search), next)
      );
    },
    [pathname]
  );

  const setFilter = (key: keyof ProjectListFilters, value: string) => {
    writeFilters({
      ...currentFilters,
      [key]: value === "all" || value === "" ? undefined : value,
    });
  };

  const setSearch = (value: string) => {
    setSearchState(value);
    setFilter("search", value);
  };

  const hasActiveFilters = Boolean(
    selectedIndustry ||
      selectedKeyword ||
      selectedStatus ||
      selectedOwnership ||
      search
  );

  const clearFilters = () => {
    setSearchState("");
    writeFilters({});
  };

  // Hidden shortcut: press Ctrl+Alt+A to toggle admin mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        setAdminMode((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => {
          const searchLower = search.toLowerCase();
          const matchesSearch =
            project.title.toLowerCase().includes(searchLower) ||
            project.accronym.toLowerCase().includes(searchLower) ||
            (project.tagline ?? "").toLowerCase().includes(searchLower) ||
            project.keyword_tags.some((tag) => tag.toLowerCase().includes(searchLower));
          const matchesIndustry =
            !selectedIndustry || project.industry_tags.includes(selectedIndustry);
          const matchesKeyword =
            !selectedKeyword || project.keyword_tags.includes(selectedKeyword);
          const matchesStatus = !selectedStatus || project.status === selectedStatus;
          const matchesOwnership =
            !selectedOwnership || project.ownership === selectedOwnership;
          return (
            matchesSearch &&
            matchesIndustry &&
            matchesKeyword &&
            matchesStatus &&
            matchesOwnership
          );
        })
        .sort((a, b) => {
          // First, sort by status priority
          const statusDiff =
            (STATUS_PRIORITY[a.status as ProjectStatus] ?? 999) -
            (STATUS_PRIORITY[b.status as ProjectStatus] ?? 999);
          if (statusDiff !== 0) return statusDiff;

          // Then, optionally sort by project score if admin selected "score"
          if (sortMode === "score") {
            const scoreDiff = calculateProjectScore(b) - calculateProjectScore(a);
            if (scoreDiff !== 0) return scoreDiff;
          }

          // Finally, sort by acronym alphabetically
          return a.accronym.localeCompare(b.accronym);
        }),
    [
      projects,
      search,
      selectedIndustry,
      selectedKeyword,
      selectedStatus,
      selectedOwnership,
      sortMode,
    ]
  );

  // Unfiltered, the list is grouped in category sections (like the news
  // list); any filter or search falls back to one grid of results.
  const sections = useMemo(
    () => (hasActiveFilters ? [] : groupProjectSections(filteredProjects)),
    [hasActiveFilters, filteredProjects]
  );
  const bar = useElementHeight();
  const [activeSection, setActiveSection, lockActiveSection] = useActiveSection(
    sections,
    bar.height
  );
  const jumpTo = useCategoryJump(setActiveSection, lockActiveSection);

  // Open a shared #projects-<category> link at its section once it exists.
  const openedHash = useRef(false);
  useEffect(() => {
    if (openedHash.current || sections.length === 0) return;
    openedHash.current = true;
    const hash = window.location.hash.slice(1);
    if (!sections.some(({ category }) => projectSectionId(category) === hash)) return;
    document.getElementById(hash)?.scrollIntoView({ block: "start" });
  }, [sections]);

  // Keyword chips for a card: the active keyword first, then the others.
  const cardTags = (project: DatedProjectMetadata) =>
    Array.from(new Set(project.keyword_tags))
      .sort((a, b) => Number(b === selectedKeyword) - Number(a === selectedKeyword))
      .map((tag) => ({
        tag,
        active: tag === selectedKeyword,
        href: buildListUrl(pathname, searchParams, { ...currentFilters, keyword: tag }),
      }));

  const selects: FilterSelect[] = [
    {
      key: "industry",
      label: t.filter_by_industry,
      allLabel: t.all_industries,
      value: selectedIndustry,
      options: sortedIndustryTags.map((tag) => ({ value: tag, label: tag })),
    },
    {
      key: "keyword",
      label: t.filter_by_keyword,
      allLabel: t.all_keywords,
      value: selectedKeyword,
      options: sortedKeywordTags.map((tag) => ({ value: tag, label: tag })),
    },
    {
      key: "status",
      label: t.filter_by_status,
      allLabel: t.all_statuses,
      value: selectedStatus,
      options: STATUS_VALUES.map((status) => ({
        value: status,
        label: t.statuses[status as keyof typeof t.statuses],
      })),
    },
    {
      key: "ownership",
      label: t.filter_by_ownership,
      allLabel: t.all_ownerships,
      value: selectedOwnership,
      options: OWNERSHIP_VALUES.map((ownership) => ({
        value: ownership,
        label: t.ownerships[ownership as keyof typeof t.ownerships],
      })),
    },
  ];

  return (
    <div className="relative">
      <ProjectListHeader locale={locale} />
      <ProjectFilterBar
        locale={locale}
        search={search}
        onSearch={setSearch}
        selects={selects}
        onSelect={setFilter}
        onClear={clearFilters}
        resultCount={filteredProjects.length}
        barRef={bar.ref}
        categoryNav={
          sections.length > 1 ? (
            <ProjectCategoryNav
              sections={sections}
              locale={locale}
              active={activeSection}
              onJump={jumpTo}
            />
          ) : undefined
        }
      />
      {adminMode && (
        <div className="absolute right-4 top-4 z-50">
          <Select value={sortMode} onValueChange={(v) => setSortMode(v as "acronym" | "score")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {sortMode === "acronym" ? "Sort: Acronym (A-Z)" : "Sort: Project Score"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acronym">Sort: Acronym (A-Z)</SelectItem>
              <SelectItem value="score">Sort: Project Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="site-container pb-16 pt-10 md:pb-24">
        {sections.length > 0 ? (
          <ProjectSections
            sections={sections}
            locale={locale}
            cardTags={cardTags}
            adminMode={adminMode}
            barHeight={bar.height}
          />
        ) : filteredProjects.length > 0 ? (
          <section aria-labelledby="projects-grid">
            <h2 id="projects-grid" className="sr-only">
              {t.results_title}
            </h2>
            <ul role="list" className={GRID_CLASS}>
              {filteredProjects.map((project, index) => (
                <li key={project.id} className="m-0">
                  <ProjectCard
                    project={project}
                    locale={locale}
                    tags={cardTags(project)}
                    sizes={GRID_SIZES}
                    priority={index < 4}
                    adminMode={adminMode}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : (
            <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed px-6 py-14 text-center">
              <SearchX aria-hidden="true" className="size-8 text-muted-foreground" />
              <p className="mt-4 text-lg font-bold text-foreground">{t.empty_title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.empty_hint}</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex h-10 items-center rounded-full border border-input bg-card px-5 text-sm font-semibold text-foreground transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.clear_filters}
                </button>
              )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
