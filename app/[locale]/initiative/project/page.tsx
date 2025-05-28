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

type Params = Promise<{ locale: Locale }>;

export default function ProjectPage({ params }: { params: Params }) {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<DatedProjectMetadata[]>([]);
  const [locale, setLocale] = useState<Locale | null>(null);
  const [i18nStrings, setI18nStrings] = useState(en);

  useEffect(() => {
    async function fetchProjects() {
      const { locale } = await params;
      setLocale(locale);
      setProjects(i18n[locale]);
      setI18nStrings(locale === "fr" ? fr : en);
    }
    fetchProjects();
  }, [params]);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">🚀 {i18nStrings.pageTitle}</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder={i18nStrings.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <NavLink
              key={project.id}
              href={`/${locale}/initiative/project/${project.id}`}
              className="block h-full"
            >
              <Card className="overflow-hidden h-full flex flex-col">
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
              </Card>
            </NavLink>
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
