"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import enProjects from "@/content/en/project/index";
import frProjects from "@/content/fr/project/index";
import ProjectStatusBadge from "@/components/pages/project/ProjectStatusBadge";
import { DatedProjectMetadata } from "@/types/project.types";
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

const ProjectList: React.FC<ProjectListProps> = ({ locale }) => {
  const t = i18n[locale];
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<DatedProjectMetadata[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("all");
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

  const filteredProjects = projects.filter((project) => {
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
    return matchesSearch && matchesIndustry && matchesKeyword;
  })
    .sort((a, b) => {
      if (sortMode === "score") {
        const scoreDiff = calculateProjectScore(b) - calculateProjectScore(a);
        if (scoreDiff !== 0) return scoreDiff;
      }
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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <h1 className="mb-6">{t.page_title}</h1>
      <p className="text-muted-foreground mb-8 max-w-[460px]">
        {t.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <Input
          placeholder={t.search_placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-full sm:w-[200px]">
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
          <SelectTrigger className="w-full sm:w-[200px]">
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
      </div>
      <div className="hidden sm:flex items-center gap-2 mb-8">
        <div className="flex flex-wrap gap-2">
          {topKeywordSuggestions.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="outline"
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => setSearch(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-full">
              <Card className="overflow-hidden h-full flex flex-col transition-colors animate-pulse">
                <div className="w-full h-64 bg-muted mb-4" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div key={project.id} className="h-full">
                <Card className="overflow-hidden h-full flex flex-col transition-colors">
                  <NavLink href={`/project/${project.id}`} className="block">
                    <Image
                      src={`/images/project/${project.id}.jpg`}
                      alt={project.title}
                      width={500}
                      height={200}
                      className="w-full h-64 object-cover mb-4 hover:opacity-90 transition-opacity"
                    />
                  </NavLink>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center justify-between">
                      <NavLink
                        href={`/project/${project.id}`}
                        className="hover:underline"
                      >
                        {project.accronym}&nbsp;|&nbsp;{project.title}
                      </NavLink>
                      {adminMode && (
                        <Badge variant="outline" className="ml-2 text-xs bg-primary/10 border-primary/30 text-primary">
                          Score: {calculateProjectScore(project)}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <ProjectStatusBadge
                        status={project.status}
                        locale={locale}
                      />
                      <a
                        href={`https://${project.accronym}.monark.io`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Visit project website"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        <Globe className="mr-1" />
                      </a>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="mb-4">{project.description}</p>
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
