import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  FactoryIcon,
  LinkIcon,
} from "lucide-react";
import {
  ArticleCover,
  articleBackLinkClass,
  articleMetaItemClass,
  articleMetaListClass,
  articlePillClass,
} from "@/components/common/article-header/article-header";
import ProjectKeywordTags from "./ProjectKeywordTags";
import { NavLink } from "../../common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { DatedProjectMetadata } from "@/types/project.types";
import i18n from "./projects-list.i18n";
import path from "path";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectOwnershipBadge from "./ProjectOwnershipBadge";
import { Label } from "@/components/ui/label";
import ProjectIndustryTags from "./ProjectIndustryTags";
import GithubOrgMembers from "../homepage/why-section/github-org-members/GithubOrgMembers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProjectTableOfContents from "./ProjectTableOfContents";
import { projectCardLine, projectDemoUrl } from "./ProjectCard";
import { projectListHref, projectSectionId } from "./project-filters";
import NewsShare from "../news/news-share";
import { shareLabels } from "../news/news.i18n";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-").trim();
}

function extractH2Headings(markdown: string): { text: string; id: string }[] {
  return markdown
    .split("\n")
    .filter((line) => /^## /.test(line))
    .map((line) => {
      const text = line.replace(/^## /, "").trim();
      return { text, id: slugify(text) };
    });
}

function getTextContent(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return (children as unknown[]).map(getTextContent).join("");
  if (children !== null && typeof children === "object" && "props" in (children as object)) {
    return getTextContent((children as { props: { children?: unknown } }).props.children);
  }
  return "";
}

const h2WithId = ({ children, ...props }: React.ComponentPropsWithoutRef<"h2">) => {
  const id = slugify(getTextContent(children));
  return (
    <h2 {...props} id={id} className="group relative mt-12 mb-4 scroll-mt-24">
      <a href={`#${id}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity no-underline text-muted-foreground hover:text-foreground" aria-label="Link to section">
        <LinkIcon className="size-4" />
      </a>
      {children}
    </h2>
  );
};

const componentsWithIds = { ...components, h2: h2WithId };

interface ProjectMdxContentProps {
  contentPath: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  locale: Locale;
  /** Project id (folder name), for the share links. */
  id: string;
}

export default async function ProjectMdxContent({
  contentPath,
  backHref,
  backLabel,
  children,
  locale,
  id,
}: ProjectMdxContentProps) {
  if (!fs.existsSync(contentPath)) {
    notFound();
  }
  const t = i18n[locale];
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { content, data } = matter(contentRaw);

  const basePath = path.join(process.cwd(), "content", locale, "project");
  const monarkSupportContentPath = path.join(basePath, "monark-support.mdx");
  const devEnvContentPath = path.join(basePath, "dev-env.mdx");
  const monarkSupportContentRaw = fs.readFileSync(monarkSupportContentPath, "utf-8");
  const devEnvContentRaw = fs.readFileSync(devEnvContentPath, "utf-8");
  const { content: monarkSupportContent } = matter(monarkSupportContentRaw);
  const { content: devEnvContent } = matter(devEnvContentRaw);

  const requiredResourcesPath = path.join(path.dirname(contentPath), "required-resources.mdx");
  const requiredResourcesContent = fs.existsSync(requiredResourcesPath)
    ? matter(fs.readFileSync(requiredResourcesPath, "utf-8")).content
    : null;

  const milestonesDir = path.join(path.dirname(contentPath), "milestones");
  const milestones = fs.existsSync(milestonesDir)
    ? fs
      .readdirSync(milestonesDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort()
      .map((file) => {
        const raw = fs.readFileSync(path.join(milestonesDir, file), "utf-8");
        const { content: milestoneContent, data: milestoneData } = matter(raw);
        return { content: milestoneContent, data: milestoneData, file };
      })
    : [];

  const tocItems = [
    { text: t.introduction, id: "introduction" },
    ...extractH2Headings(content),
    ...(milestones.length > 0 ? [{ text: t.milestones, id: slugify(t.milestones) }] : []),
    ...(requiredResourcesContent ? extractH2Headings(requiredResourcesContent) : []),
    ...extractH2Headings(devEnvContent),
    ...extractH2Headings(monarkSupportContent),
  ];

  const project = data as DatedProjectMetadata;
  const category = project.category ?? "other";
  const lead = projectCardLine(project);
  const demoUrl = projectDemoUrl(project);
  const industries = [...new Set(project.industry_tags ?? [])];

  const sidebarTags = (
    <>
      <Label className="mb-0 font-bold">{t.industries}</Label>
      <div className="flex gap-2 py-2 flex-wrap"><ProjectIndustryTags industryTags={data.industry_tags} locale={locale} /></div>
      <Label className="mb-0 mt-4 font-bold">{t.keywords}</Label>
      <div className="flex gap-2 py-2 flex-wrap"><ProjectKeywordTags keywordTags={data.keyword_tags} locale={locale} /></div>
      <div className="mt-4">
        <Label className="mb-2 font-bold">{t.contributors}</Label>
        <GithubOrgMembers repo={data.code_repositories} />
      </div>
    </>
  );

  return (
    <div className="pt-6 md:pt-10">
      {/* Same header as a news article (news-article-mdx-content.tsx). */}
      <div className="mx-auto max-w-3xl">
        {backHref && backLabel && (
          <NavLink href={backHref} className={articleBackLinkClass}>
            <ChevronLeftIcon aria-hidden="true" />
            {backLabel}
          </NavLink>
        )}

        <header className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-1.5">
            <ProjectStatusBadge status={data.status} locale={locale} />
            <ProjectOwnershipBadge ownership={data.ownership} locale={locale} compact />
            <NavLink
              href={`${projectListHref(locale)}#${projectSectionId(category)}`}
              className={`${articlePillClass} py-1 transition-colors duration-150 hover:border-primary/60 hover:text-foreground`}
            >
              {t.categories[category].title}
            </NavLink>
          </div>
          <h1 id="introduction" className="m-0 scroll-mt-24 text-balance">
            {data.accronym}
          </h1>
          <p className="m-0 mt-2 text-xl font-semibold text-muted-foreground">
            {data.title}
          </p>
          {lead && <p className="lead m-0 mt-5">{lead}</p>}
          <ul className={articleMetaListClass}>
            <li className={articleMetaItemClass}>
              <ExternalLinkIcon aria-hidden="true" className="size-4" />
              <span className="sr-only">{t.mockup}: </span>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground no-underline underline-offset-4 hover:underline"
              >
                {demoUrl.replace(/^https:\/\//, "")}
              </a>
            </li>
            {industries.length > 0 && (
              <li className={articleMetaItemClass}>
                <FactoryIcon aria-hidden="true" className="size-4" />
                <span className="sr-only">{t.industries}: </span>
                {industries.join(", ")}
              </li>
            )}
          </ul>
          <NewsShare
            path={`/${locale}/project/${id}`}
            title={data.accronym ? `${data.accronym}: ${data.title}` : data.title}
            labels={shareLabels(locale)}
            className="mt-6 border-t pt-6"
          />
        </header>
      </div>

      {data.img && (
        <ArticleCover
          src={`/images/project/${data.img}`}
          alt={data.img_alt}
          caption={data.img_alt}
          author={data.img_author}
          authorSrc={data.img_author_src}
        />
      )}

      {/* The global `article` prose styles apply to the body only. */}
      <article className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 md:mt-14 lg:grid-cols-4 lg:gap-12">
        <div className="flex min-w-0 flex-col gap-4 lg:col-span-3">
          <div className="lg:hidden flex flex-col gap-2 text-muted-foreground">
            {sidebarTags}
          </div>
          <aside className="my-4 rounded-lg border bg-card p-5 text-lg leading-relaxed text-foreground">{data.description}</aside>
          <div className="max-w-none pt-4 pb-16">
            <MDXRemote source={content} components={componentsWithIds} />
            {milestones.length > 0 && (
              <div className="pb-16">
                <h2 id={slugify(t.milestones)} className="group relative mt-12 mb-4 scroll-mt-24">
                  <a href={`#${slugify(t.milestones)}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity no-underline text-muted-foreground hover:text-foreground" aria-label="Link to section">
                    <LinkIcon className="size-4" />
                  </a>
                  {t.milestones}
                </h2>
                <Accordion type="multiple" className="overflow-hidden rounded-2xl border bg-card [&>div:last-child]:border-b-0">
                  {milestones.map(({ content: milestoneContent, data: milestoneData, file }) => (
                    <AccordionItem key={file} value={file}>
                      <AccordionTrigger>
                        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <ProjectStatusBadge status={milestoneData.status} locale={locale} />
                          <span>{milestoneData.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="max-w-none text-sm">
                          <MDXRemote source={milestoneContent} components={components} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {requiredResourcesContent && (
              <MDXRemote source={requiredResourcesContent} components={componentsWithIds} />
            )}
            <MDXRemote source={devEnvContent} components={componentsWithIds} />
            <MDXRemote source={monarkSupportContent} components={componentsWithIds} />
          </div>
          {children}
        </div>
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <ProjectTableOfContents items={tocItems} label={t.on_this_page} />
            <div className="mt-8 flex flex-col gap-2 text-muted-foreground">
              {sidebarTags}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
