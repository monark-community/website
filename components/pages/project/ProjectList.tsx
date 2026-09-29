"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import enProjects from "@/content/en/project/index";
import frProjects from "@/content/fr/project/index";
import ProjectStatusBadge from "@/components/pages/project/ProjectStatusBadge";
import { DatedProjectMetadata, ProjectOwnership, ProjectStatus } from "@/types/project.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, X } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { calculateProjectScore } from "@/lib/utils";
import i18n from "./projects-list.i18n";
import { projectTagLinkClass } from "./ProjectTagLink";
import {
  PROJECT_FILTER_PARAMS,
  ProjectListFilters,
  formatTemplate,
  matchKnownValue,
} from "./project-filters";

interface ProjectListProps {
  locale: Locale;
}

const projectDataMap: Record<Locale, DatedProjectMetadata[]> = {
  en: enProjects,
  fr: frProjects,
};

const STATUS_VALUES: string[] = Object.values(ProjectStatus);

const STATUS_PRIORITY: Record<ProjectStatus, number> = {
  production: 0,
  market_validation: 1,
  in_progress: 2,
  prototype_available: 3,
  on_hold: 4,
  planned: 5,
};

const suggestionClass = (active: boolean) =>
  `inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-card text-foreground hover:bg-secondary"
  }`;

/** Filter keys stored in the URL, all rewritten on every filter change. */
const FILTER_KEYS: (keyof ProjectListFilters)[] = [
  "industry",
  "keyword",
  "status",
  "ownership",
  "search",
];

const OWNERSHIP_VALUES: string[] = Object.values(ProjectOwnership);

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

/** Placeholder grid shown while the client list mounts (Suspense fallback). */
function ProjectCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-full">
          <Card className="overflow-hidden h-full flex flex-col motion-safe:animate-pulse">
            <div className="w-full aspect-[16/9] bg-muted" />
            <CardHeader>
              <div className="h-6 w-1/2 bg-muted rounded mb-2" />
              <div className="h-4 w-1/4 bg-muted rounded" />
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div className="h-4 w-full bg-muted rounded mb-2" />
              <div className="h-4 w-3/4 bg-muted rounded mb-4" />
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3)].map((_, j) => (
                  <span
                    key={j}
                    className="inline-block h-6 w-16 bg-muted rounded-full"
                  />
                ))}
              </div>
              <div className="mt-auto pt-2">
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

function ProjectListHeader({ locale }: ProjectListProps) {
  const t = i18n[locale];
  return (
    <>
      <h1>{t.page_title}</h1>
      <p className="lead mt-4 mb-10 max-w-[36rem]">{t.description}</p>
    </>
  );
}

/**
 * Static fallback for the `<Suspense>` boundary around `ProjectList`
 * (`useSearchParams` opts the list out of prerendering).
 */
export function ProjectListFallback({ locale }: ProjectListProps) {
  return (
    <div className="site-container relative pt-12 pb-16 md:pt-16 md:pb-24">
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
  const [sortMode, setSortMode] = useState<'acronym' | 'score'>("acronym");

  const projects = projectDataMap[locale];

  // Unique tag sets and the top 5 keywords, derived from the locale's data.
  const { sortedIndustryTags, sortedKeywordTags, topKeywordSuggestions } =
    useMemo(() => {
      const industries = new Set<string>();
      const keywordCounts = new Map<string, number>();
      projects.forEach((project) => {
        project.industry_tags.forEach((tag) => industries.add(tag));
        project.keyword_tags.forEach((tag) => {
          keywordCounts.set(tag, (keywordCounts.get(tag) || 0) + 1);
        });
      });
      return {
        sortedIndustryTags: Array.from(industries).sort((a, b) =>
          a.localeCompare(b)
        ),
        sortedKeywordTags: Array.from(keywordCounts.keys()).sort((a, b) =>
          a.localeCompare(b)
        ),
        topKeywordSuggestions: Array.from(keywordCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([tag]) => tag),
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

  const filteredProjects = projects
    .filter((project) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.accronym.toLowerCase().includes(searchLower) ||
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
    });

  return (
    <div className="site-container relative pt-12 pb-16 md:pt-16 md:pb-24">
      <ProjectListHeader locale={locale} />
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row gap-4">
          <Input
            placeholder={t.search_placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
            aria-label={t.search_placeholder}
          />
          <div className="flex lg:hidden items-center gap-2">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
              {topKeywordSuggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  aria-pressed={search === suggestion}
                  className={suggestionClass(search === suggestion)}
                  onClick={() => setSearch(search === suggestion ? "" : suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <Select
              value={selectedIndustry ?? "all"}
              onValueChange={(value) => setFilter("industry", value)}
            >
              <SelectTrigger className="w-full md:w-[200px]" aria-label={t.filter_by_industry}>
                <SelectValue placeholder={t.filter_by_industry} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all_industries}</SelectItem>
                {sortedIndustryTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedKeyword ?? "all"}
              onValueChange={(value) => setFilter("keyword", value)}
            >
              <SelectTrigger className="w-full md:w-[200px]" aria-label={t.filter_by_keyword}>
                <SelectValue placeholder={t.filter_by_keyword} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all_keywords}</SelectItem>
                {sortedKeywordTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedStatus ?? "all"}
              onValueChange={(value) => setFilter("status", value)}
            >
              <SelectTrigger className="w-full md:w-[200px]" aria-label={t.filter_by_status}>
                <SelectValue placeholder={t.filter_by_status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all_statuses}</SelectItem>
                {STATUS_VALUES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {t.statuses[status as keyof typeof t.statuses]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedOwnership ?? "all"}
              onValueChange={(value) => setFilter("ownership", value)}
            >
              <SelectTrigger className="w-full md:w-[200px]" aria-label={t.filter_by_ownership}>
                <SelectValue placeholder={t.filter_by_ownership} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all_ownerships}</SelectItem>
                {Object.values(ProjectOwnership).map((ownership) => (
                  <SelectItem key={ownership} value={ownership}>
                    {t.ownerships[ownership]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div
          className={`${hasActiveFilters ? "flex" : "hidden lg:flex"} mt-3 flex-wrap items-center gap-2`}
        >
          <div className="hidden lg:flex flex-wrap gap-2">
            {topKeywordSuggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                aria-pressed={search === suggestion}
                className={suggestionClass(search === suggestion)}
                onClick={() => setSearch(search === suggestion ? "" : suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex h-8 shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-3 text-xs font-semibold text-primary-ink transition-colors duration-150 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:ml-auto"
            >
              <X className="size-3.5" aria-hidden="true" />
              {t.clear_filters}
            </button>
          )}
        </div>
      </div>
      {adminMode && (
        <div className="absolute top-4 right-4 z-50">
          <Select value={sortMode} onValueChange={v => setSortMode(v as 'acronym' | 'score')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{sortMode === 'acronym' ? 'Sort: Acronym (A-Z)' : 'Sort: Project Score'}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acronym">Sort: Acronym (A-Z)</SelectItem>
              <SelectItem value="score">Sort: Project Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="h-full">
              <Card className="group overflow-hidden h-full flex flex-col transition-colors duration-150 hover:border-primary/60">
                <NavLink
                  href={`/project/${project.id}`}
                  className="block overflow-hidden border-b"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Image
                    src={`/images/project/${project.id}.jpg`}
                    alt=""
                    width={640}
                    height={360}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="w-full aspect-[16/9] object-cover transition-transform duration-200 motion-safe:group-hover:scale-[1.02]"
                  />
                </NavLink>
                <CardHeader className="space-y-0 pb-3">
                  <CardTitle className="items-center justify-between">
                    <h2 className="text-xl">
                      <NavLink
                        href={`/project/${project.id}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {project.accronym}
                      </NavLink>
                    </h2>
                    <p className="mt-1 text-sm font-normal text-muted-foreground">{project.title}</p>
                    {adminMode && (
                      <Badge variant="outline" className="ml-2 text-xs bg-primary/10 border-primary/30 text-primary-ink">
                        Score: {calculateProjectScore(project)}
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 pt-3">
                    <a
                      href={`https://${project.accronym}.monark.io`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${project.accronym}.monark.io`}
                      aria-label={`${project.accronym}.monark.io`}
                      className="-ml-1.5 inline-flex size-8 items-center justify-center rounded-full text-primary-ink transition-colors hover:bg-secondary"
                    >
                      <Globe className="size-4" aria-hidden="true" />
                    </a>
                    <ProjectStatusBadge
                      status={project.status as ProjectStatus}
                      locale={locale}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.keyword_tags.map((tag) => {
                      const active = tag === selectedKeyword;
                      return (
                        <Link
                          key={tag}
                          href={buildListUrl(pathname, searchParams, {
                            ...currentFilters,
                            keyword: tag,
                          })}
                          aria-label={formatTemplate(t.show_projects_with_keyword, { tag })}
                          aria-current={active ? "true" : undefined}
                          className={projectTagLinkClass(active)}
                        >
                          {tag}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-auto pt-2"></div>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-lg">
            {t.not_found}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
