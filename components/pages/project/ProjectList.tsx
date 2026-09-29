"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import enProjects from "@/content/en/project/index";
import frProjects from "@/content/fr/project/index";
import ProjectStatusBadge from "@/components/pages/project/ProjectStatusBadge";
import { DatedProjectMetadata, ProjectStatus } from "@/types/project.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { calculateProjectScore } from "@/lib/utils";
import i18n from "./projects-list.i18n";

interface ProjectListProps {
  locale: Locale;
}

const projectDataMap: Record<Locale, DatedProjectMetadata[]> = {
  en: enProjects,
  fr: frProjects,
};

const suggestionClass = (active: boolean) =>
  `inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border bg-card text-foreground hover:bg-secondary"
  }`;

const ProjectList: React.FC<ProjectListProps> = ({ locale }) => {
  const t = i18n[locale];
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<DatedProjectMetadata[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [industryTags, setIndustryTags] = useState<Set<string>>(new Set());
  const [keywordTags, setKeywordTags] = useState<Set<string>>(new Set());
  const [topKeywordSuggestions, setTopKeywordSuggestions] = useState<string[]>(
    []
  );
  const [initialized, setInitialized] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [sortMode, setSortMode] = useState<'acronym' | 'score'>("acronym");

  useEffect(() => {
    const projectData = projectDataMap[locale];
    setProjects(projectData);

    // Build unique sets of tags
    const industries = new Set<string>();
    const keywords = new Set<string>();
    const keywordCounts = new Map<string, number>();

    projectData.forEach((project) => {
      project.industry_tags.forEach((tag) => industries.add(tag));
      project.keyword_tags.forEach((tag) => {
        keywords.add(tag);
        keywordCounts.set(tag, (keywordCounts.get(tag) || 0) + 1);
      });
    });

    // Get top 5 most frequent keywords, sorted by count descending
    const topKeywords = Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);

    setIndustryTags(industries);
    setKeywordTags(keywords);
    setTopKeywordSuggestions(topKeywords);
    setInitialized(true);
  }, [locale]);

  // Hidden shortcut: press Ctrl+Shift+A to toggle admin mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        setAdminMode((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const STATUS_PRIORITY: Record<ProjectStatus, number> = {
    production: 0,
    market_validation: 1,
    in_progress: 2,
    prototype_available: 3,
    on_hold: 4,
    planned: 5,
  };

  const filteredProjects = projects
    .filter((project) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        project.accronym.toLowerCase().includes(searchLower) ||
        project.keyword_tags.some((tag) => tag.toLowerCase().includes(searchLower));
      const matchesIndustry =
        selectedIndustry === "all" ||
        project.industry_tags.includes(selectedIndustry);
      const matchesKeyword =
        selectedKeyword === "all" ||
        project.keyword_tags.includes(selectedKeyword);
      const matchesStatus =
        selectedStatus === "all" || project.status === selectedStatus;
      return matchesSearch && matchesIndustry && matchesKeyword && matchesStatus;
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

  // Sort tags alphabetically
  const sortedIndustryTags = Array.from(industryTags).sort((a, b) =>
    a.localeCompare(b)
  );
  const sortedKeywordTags = Array.from(keywordTags).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="site-container relative pt-12 pb-16 md:pt-16 md:pb-24">
      <h1>{t.page_title}</h1>
      <p className="lead mt-4 mb-10 max-w-[36rem]">
        {t.description}
      </p>
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
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
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
            <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px]" aria-label={t.filter_by_status}>
                <SelectValue placeholder={t.filter_by_status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all_statuses}</SelectItem>
                {Object.values(ProjectStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {t.statuses[status as keyof typeof t.statuses]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 mt-3">
          <div className="flex flex-wrap gap-2">
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
      {!initialized ? (
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
      ) : (
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
                      {project.keyword_tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
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
      )}
    </div>
  );
};

export default ProjectList;
