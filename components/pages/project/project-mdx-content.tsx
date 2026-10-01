import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import { ArrowUpRightIcon, ChevronLeftIcon, CodeIcon, LinkIcon, icons, LucideProps } from "lucide-react";
import { articlePillClass } from "@/components/common/article-header/article-header";
import ProjectKeywordTags from "./ProjectKeywordTags";
import { NavLink } from "../../common/navlink/navlink";
import { Locale } from "@/i18n.config";
import { DatedProjectMetadata } from "@/types/project.types";
import i18n from "./project-page.i18n";
import listI18n from "./projects-list.i18n";
import path from "path";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ProjectOwnershipBadge from "./ProjectOwnershipBadge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ProjectIndustryTags from "./ProjectIndustryTags";
import GithubOrgMembers from "../homepage/why-section/github-org-members/GithubOrgMembers";
import ProjectTableOfContents from "./ProjectTableOfContents";
import { projectDemoUrl } from "./ProjectCard";
import { projectListHref, projectSectionId } from "./project-filters";
import NewsShare from "../news/news-share";
import { shareLabels } from "../news/news.i18n";
import ProjectImageCarousel from "./ProjectImageCarousel";
import ProjectRoadmap, { RoadmapMilestone } from "./ProjectRoadmap";
import { stageOf } from "./roadmap-stage";
import ProjectResources from "./ProjectResources";
import ProjectSupport from "./ProjectSupport";
import { ProjectImage, ProjectProductFrontmatter } from "@/types/project.types";

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

function AnchoredH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="group relative mb-6 mt-0 scroll-mt-24">
      <a href={`#${id}`} className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity no-underline text-muted-foreground hover:text-foreground" aria-label="Link to section">
        <LinkIcon className="size-4" />
      </a>
      {children}
    </h2>
  );
}

const h2WithId = ({ children }: React.ComponentPropsWithoutRef<"h2">) => (
  <AnchoredH2 id={slugify(getTextContent(children))}>{children}</AnchoredH2>
);

const componentsWithIds = { ...components, h2: h2WithId };

// In the kickstart dialog, the shared MDX files' H2s become sub-headings.
const kickstartComponents = {
  ...components,
  h2: ({ children }: React.ComponentPropsWithoutRef<"h2">) => <h3 className="mb-3 mt-0 text-lg">{children}</h3>,
  p: ({ children }: React.ComponentPropsWithoutRef<"p">) => <p className="m-0 mb-3 text-sm leading-relaxed text-muted-foreground">{children}</p>,
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => <ul className="m-0 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground" {...props} />,
};

const milestoneComponents = {
  ...components,
  p: ({ children }: React.ComponentPropsWithoutRef<"p">) => <p className="m-0">{children}</p>,
};

/** Lucide icon by kebab-case name ("shield-check"); falls back to a dot. */
function FeatureIcon({ name, ...props }: { name?: string } & LucideProps) {
  const key = (name ?? "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") as keyof typeof icons;
  const Icon = icons[key] ?? icons.Circle;
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}

function readMdx(filePath: string): string | null {
  return fs.existsSync(filePath) ? matter(fs.readFileSync(filePath, "utf-8")).content : null;
}

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
  const product = data as ProjectProductFrontmatter;

  const basePath = path.join(process.cwd(), "content", locale, "project");
  const devEnvContent = readMdx(path.join(basePath, "dev-env.mdx"));
  const requiredResourcesContent = readMdx(path.join(path.dirname(contentPath), "required-resources.mdx"));

  const milestonesDir = path.join(path.dirname(contentPath), "milestones");
  const milestones: RoadmapMilestone[] = fs.existsSync(milestonesDir)
    ? fs
      .readdirSync(milestonesDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort()
      .map((file) => {
        const { content: milestoneContent, data: milestoneData } = matter(
          fs.readFileSync(path.join(milestonesDir, file), "utf-8")
        );
        return {
          file,
          title: milestoneData.title,
          status: milestoneData.status,
          start: typeof milestoneData.start === "number" ? milestoneData.start : undefined,
          span: typeof milestoneData.span === "number" ? milestoneData.span : undefined,
          content: <MDXRemote source={milestoneContent} components={milestoneComponents} />,
        };
      })
    : [];
  const milestoneBadges = Object.fromEntries(
    milestones.map((m) => [m.file, <ProjectStatusBadge key={m.file} status={m.status as never} locale={locale} />])
  );
  const delivered = milestones.filter((m) => stageOf(m.status) === "done").length;

  const images: ProjectImage[] = product.images?.length
    ? product.images
    : [{ src: data.img, alt: data.img_alt }];
  const demoUrl = product.demo_url ?? projectDemoUrl(data as DatedProjectMetadata);
  const repositories = product.code_repositories ?? [];
  const investment =
    repositories.length > 0 && typeof product.monark_investment === "number"
      ? new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(product.monark_investment)
      : null;
  const features = product.features ?? [];
  const useCases = product.use_cases ?? [];
  const resources = product.resources ?? [];
  const hasKickstart = Boolean(devEnvContent || requiredResourcesContent);

  const ids = {
    overview: slugify(t.overview),
    features: slugify(t.key_features),
    useCases: slugify(t.use_cases),
    roadmap: slugify(t.roadmap),
    support: slugify(t.support),
    resources: slugify(t.resources),
  };

  const tocItems = [
    { text: t.overview, id: ids.overview },
    ...(features.length > 0 ? [{ text: t.key_features, id: ids.features }] : []),
    ...(useCases.length > 0 ? [{ text: t.use_cases, id: ids.useCases }] : []),
    ...extractH2Headings(content),
    ...(milestones.length > 0 ? [{ text: t.roadmap, id: ids.roadmap }] : []),
    { text: t.support, id: ids.support },
    ...(resources.length > 0 || hasKickstart ? [{ text: t.resources, id: ids.resources }] : []),
  ];

  const category = (data as DatedProjectMetadata).category ?? "other";

  const tags = (
    <>
      <Label className="mb-0 font-bold">{t.industries}</Label>
      <div className="flex gap-2 py-2 flex-wrap"><ProjectIndustryTags industryTags={data.industry_tags} locale={locale} /></div>
      <Label className="mb-0 mt-4 font-bold">{t.keywords}</Label>
      <div className="flex gap-2 py-2 flex-wrap"><ProjectKeywordTags keywordTags={data.keyword_tags} locale={locale} /></div>
    </>
  );

  return (
    // The whole page sits in <article> so the global prose styles it was designed with apply.
    <article className="pb-16 pt-6 lg:pt-10">
      {/* Hero: product name and promise beside the project's key numbers */}
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-12">
        <div className="flex min-w-0 flex-col gap-4">
          {backHref && backLabel && (
            <NavLink href={backHref} className="-ml-3 inline-flex h-9 w-fit items-center rounded-full px-3 text-sm font-semibold text-primary-ink no-underline transition-colors hover:bg-secondary [&_svg]:size-4">
              <ChevronLeftIcon aria-hidden="true" />{backLabel}
            </NavLink>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={data.status} locale={locale} />
            <ProjectOwnershipBadge ownership={data.ownership} locale={locale} compact />
            <NavLink
              href={`${projectListHref(locale)}#${projectSectionId(category)}`}
              className={`${articlePillClass} py-1 transition-colors duration-150 hover:border-primary/60 hover:text-foreground`}
            >
              {listI18n[locale].categories[category].title}
            </NavLink>
            {product.tagline && <span className="text-sm font-semibold text-muted-foreground">{data.title}</span>}
          </div>
          <h1 id="introduction" className="m-0 scroll-mt-24 text-balance">{data.accronym}</h1>
          <p className="m-0 max-w-[40rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {product.tagline ?? data.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                {t.hero.try_demo}<ArrowUpRightIcon aria-hidden="true" />
              </a>
            </Button>
            {repositories.length > 0 && (
              <Button asChild variant="outline">
                <a href={repositories[0]} target="_blank" rel="noopener noreferrer" className="no-underline">
                  <CodeIcon aria-hidden="true" />{t.hero.view_source}
                </a>
              </Button>
            )}
          </div>
          <NewsShare
            path={`/${locale}/project/${id}`}
            title={data.accronym ? `${data.accronym}: ${data.title}` : data.title}
            labels={shareLabels(locale)}
            className="mt-2"
          />
        </div>

        <dl className="m-0 flex flex-col divide-y rounded-3xl border bg-card">
          {investment && (
            <div className="p-5">
              <dt className="eyebrow !mb-1">{t.hero.invested_by_monark}</dt>
              <dd className="m-0 text-3xl font-extrabold tabular-nums tracking-display text-foreground">{investment}</dd>
            </div>
          )}
          {milestones.length > 0 && (
            <div className="p-5">
              <dt className="text-sm font-semibold text-muted-foreground">{t.hero.progress}</dt>
              <dd className="m-0 mt-2">
                <span aria-hidden="true" className="flex gap-1">
                  {milestones.map((m) => {
                    const stage = stageOf(m.status);
                    return (
                      <span
                        key={m.file}
                        className={`h-2 flex-1 rounded-full ${stage === "done" ? "bg-success" : stage === "current" ? "bg-warning" : "bg-foreground/15"}`}
                      />
                    );
                  })}
                </span>
                <span className="mt-2 block text-sm font-semibold text-foreground">
                  {t.hero.progress_value.replace("{done}", String(delivered)).replace("{total}", String(milestones.length))}
                </span>
              </dd>
            </div>
          )}
          <div className="p-5">
            <dt className="text-sm font-semibold text-muted-foreground">{t.hero.contributors}</dt>
            <dd className="m-0">
              {repositories.length > 0 ? (
                <GithubOrgMembers repo={repositories} />
              ) : (
                <span className="mt-2 block text-sm text-foreground">{t.hero.no_contributors}</span>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mt-10">
        <ProjectImageCarousel images={images} labels={t.carousel} />
      </div>

      <div className="mt-16 grid grid-cols-3 gap-8 lg:grid-cols-4 lg:gap-12">
        <div className="col-span-3 flex min-w-0 flex-col">
          <div className="mb-12 flex flex-col gap-2 text-muted-foreground lg:hidden">{tags}</div>

          <section aria-labelledby={ids.overview}>
            <AnchoredH2 id={ids.overview}>{t.overview}</AnchoredH2>
            {product.value_proposition ? (
              <div className="rounded-3xl bg-foreground p-6 sm:p-10">
                <p className="m-0 max-w-none text-2xl font-extrabold leading-tight tracking-display text-background sm:text-3xl">
                  {product.value_proposition.headline}
                </p>
                <p className="mb-0 mt-4 max-w-[42rem] text-lg leading-relaxed text-background/80">
                  {product.value_proposition.body}
                </p>
              </div>
            ) : (
              <p className="m-0 max-w-none rounded-2xl border bg-card p-5 text-lg leading-relaxed">{data.description}</p>
            )}
          </section>

          {features.length > 0 && (
            <section aria-labelledby={ids.features} className="mt-16">
              <AnchoredH2 id={ids.features}>{t.key_features}</AnchoredH2>
              <ul className="m-0 grid max-w-none list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {features.map((feature) => (
                  <li key={feature.title} className="m-0 rounded-2xl border bg-card p-5">
                    <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FeatureIcon name={feature.icon} className="size-6" />
                    </span>
                    <h3 className="mb-2 mt-4 text-lg">{feature.title}</h3>
                    <p className="m-0 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {useCases.length > 0 && (
            <section aria-labelledby={ids.useCases} className="mt-16">
              <AnchoredH2 id={ids.useCases}>{t.use_cases}</AnchoredH2>
              <dl className="m-0 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-3">
                {useCases.map((useCase) => (
                  <div key={useCase.title} className="bg-card p-5">
                    <dt className="font-bold text-foreground">{useCase.title}</dt>
                    <dd className="m-0 mt-2 text-sm leading-relaxed text-muted-foreground">{useCase.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {content.trim() && (
            <div className="mt-16 max-w-none [&>h2:first-child]:mt-0 [&_h2]:mt-16">
              <MDXRemote source={content} components={componentsWithIds} />
            </div>
          )}

          {milestones.length > 0 && (
            <section aria-labelledby={ids.roadmap} className="mt-16">
              <AnchoredH2 id={ids.roadmap}>{t.roadmap}</AnchoredH2>
              <ProjectRoadmap milestones={milestones} labels={t.roadmap_labels} badges={milestoneBadges} />
            </section>
          )}

          <section aria-labelledby={ids.support} className="mt-16">
            <AnchoredH2 id={ids.support}>{t.support_labels.title}</AnchoredH2>
            <ProjectSupport labels={t.support_labels} projectName={data.accronym} investment={investment} />
          </section>

          {(resources.length > 0 || hasKickstart) && (
            <section aria-labelledby={ids.resources} className="mt-16">
              <AnchoredH2 id={ids.resources}>{t.resources}</AnchoredH2>
              <ProjectResources
                projectId={data.id}
                resources={resources}
                labels={t.resources_labels}
                kickstart={
                  hasKickstart
                    ? {
                      intro: product.builders_intro ?? t.resources_labels.kickstart_default_intro,
                      content: (
                        <>
                          {devEnvContent && (
                            <div className="rounded-2xl border bg-background p-5">
                              <MDXRemote source={devEnvContent} components={kickstartComponents} />
                            </div>
                          )}
                          {requiredResourcesContent && (
                            <div className="rounded-2xl border bg-background p-5">
                              <MDXRemote source={requiredResourcesContent} components={kickstartComponents} />
                            </div>
                          )}
                        </>
                      ),
                    }
                    : undefined
                }
              />
            </section>
          )}
          {children}
        </div>

        <div className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-24">
            <ProjectTableOfContents items={tocItems} label={t.on_this_page} />
            <div className="mt-8 flex flex-col gap-2 text-muted-foreground">{tags}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
