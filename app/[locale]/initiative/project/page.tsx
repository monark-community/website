"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/shared/navlink/navlink";
import { Locale } from "@/i18n.config";
import * as i18n from "./projects-index.i18n";
import { en, fr } from "./projects.i18n";
import Image from "next/image";
import ProjectStatusBadge from "@/components/web/pages/project/ProjectStatusBadge";
import { DatedProjectMetadata } from "@/types/project.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Params = Promise<{ locale: Locale }>;

export default function ProjectPage({ params }: { params: Params }) {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<DatedProjectMetadata[]>([]);
  const [locale, setLocale] = useState<Locale | null>(null);
  const [i18nStrings, setI18nStrings] = useState(en);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("all");
  const [industryTags, setIndustryTags] = useState<Set<string>>(new Set());
  const [keywordTags, setKeywordTags] = useState<Set<string>>(new Set());
  const [topKeywordSuggestions, setTopKeywordSuggestions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const { locale } = await params;
      setLocale(locale);
      const projectData = i18n[locale];
      setProjects(projectData);
      setI18nStrings(locale === "fr" ? fr : en);

      // Build unique sets of tags
      const industries = new Set<string>();
      const keywords = new Set<string>();
      const keywordCounts = new Map<string, number>();
      
      projectData.forEach(project => {
        project.industry_tags.forEach(tag => industries.add(tag));
        project.keyword_tags.forEach(tag => {
          keywords.add(tag);
          keywordCounts.set(tag, (keywordCounts.get(tag) || 0) + 1);
        });
      });

      // Get top 5 most frequent keywords, sorted by count descending
      const topKeywords = Array.from(keywordCounts.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
        .slice(0, 5)
        .map(([tag]) => tag);

      setIndustryTags(industries);
      setKeywordTags(keywords);
      setTopKeywordSuggestions(topKeywords);
    }
    fetchProjects();
  }, [params]);

  const filteredProjects = projects.filter((project) => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(searchLower) ||
      project.keyword_tags.some(tag => tag.toLowerCase() === searchLower);
    const matchesIndustry = selectedIndustry === "all" || project.industry_tags.includes(selectedIndustry);
    const matchesKeyword = selectedKeyword === "all" || project.keyword_tags.includes(selectedKeyword);
    return matchesSearch && matchesIndustry && matchesKeyword;
  });

  // Sort tags alphabetically
  const sortedIndustryTags = Array.from(industryTags).sort((a, b) => a.localeCompare(b));
  const sortedKeywordTags = Array.from(keywordTags).sort((a, b) => a.localeCompare(b));

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">{i18nStrings.pageTitle}</h1>
      <p className="text-muted-foreground mb-8 max-w-[460px]">{i18nStrings.description}</p>
      <div className="flex flex-col sm:flex-row gap-4 mb-2">
        <Input
          placeholder={i18nStrings.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={i18nStrings.filterByIndustry} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{i18nStrings.allIndustries}</SelectItem>
            {sortedIndustryTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedKeyword} onValueChange={setSelectedKeyword}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={i18nStrings.filterByKeyword} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{i18nStrings.allKeywords}</SelectItem>
            {sortedKeywordTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 mb-8">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="h-full">
              <Card className="overflow-hidden h-full flex flex-col hover:border-primary transition-colors">
                <NavLink
                  href={`/${locale}/initiative/project/${project.id}`}
                  className="block h-full"
                >
                  <Image
                    src={`/images/project/${project.id}.jpg`}
                    alt={project.title}
                    width={500}
                    height={200}
                    className="w-full h-64 object-cover mb-4"
                  />
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <ProjectStatusBadge status={project.status} />
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <p>{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.keyword_tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </NavLink>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-lg">
            {i18nStrings.noProjectsFound}
          </p>
        )}
      </div>
      <div className="mt-8 text-center">
        <NavLink href="/">
          <Button>{i18nStrings.backHome}</Button>
        </NavLink>
      </div>
    </div>
  );
}
