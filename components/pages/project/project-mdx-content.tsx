import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import { ChevronLeftIcon, GlobeIcon } from "lucide-react";
import { IconLabelAttribute } from "@/components/common/icon-label-attribute/IconLabelAttribute";
import ProjectKeywordTags from "./ProjectKeywordTags";
import WrappedImage from "../../common/wrapped-image.component";
import { NavLink } from "../../common/navlink/navlink";
import { Locale } from "@/i18n.config";
import i18n from "./projects-list.i18n";
import path from "path";
import ProjectStatusBadge from "./ProjectStatusBadge";
import { Label } from "@/components/ui/label";
import ProjectIndustryTags from "./ProjectIndustryTags";
import GithubOrgMembers from "../homepage/why-section/github-org-members/GithubOrgMembers";

interface ProjectMdxContentProps {
  contentPath: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  locale: Locale
}

export default async function ProjectMdxContent({
  contentPath,
  backHref,
  backLabel,
  children,
  locale,
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
  const monarkSupportContentRaw = fs.readFileSync(
    monarkSupportContentPath,
    "utf-8"
  );
  const devEnvContentRaw = fs.readFileSync(devEnvContentPath, "utf-8");
  const { content: monarkSupportContent } = matter(monarkSupportContentRaw);
  const { content: devEnvContent } = matter(devEnvContentRaw);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 lg:py-6 gap-8">
      <div className="col-span-3 flex flex-col gap-4">
        {backHref && backLabel && (
          <div className="block lg:hidden mt-8">
            <NavLink href={backHref} className="inline-flex items-center text-primary font-medium group no-underline rendered-content">
              <ChevronLeftIcon />&nbsp;{backLabel}
            </NavLink>
          </div>
        )}
        <h1 className="mb-0">{data.accronym}</h1>
        <p className="-mt-3">{data.title}</p>
        <div className="lg:hidden flex flex-col gap-2 text-muted-foreground">
          <ProjectStatusBadge status={data.status} locale={locale} />
          <IconLabelAttribute
            Icon={GlobeIcon}
            label={t.mockup}
            value={t.mockup}
            href={`https://${data.acronym}.monark.io`}
          />
          <Label className="mb-0 mt-4 font-bold">{t.industries}</Label>
          <div className="flex gap-2 py-2 flex-wrap"><ProjectIndustryTags industryTags={data.industry_tags} /></div>
          <Label className="mb-0 mt-4 font-bold">{t.keywords}</Label>
          <div className="flex gap-2 py-2 flex-wrap"><ProjectKeywordTags keywordTags={data.keyword_tags} /></div>
          <div className="mt-4">
            <Label className="mb-2 font-bold">{t.contributors}</Label>
            <GithubOrgMembers repo={data.code_repositories} />
          </div>
        </div>
        <aside className="font-lg italic border-l-[4px] border-primary pl-6 mt-6 mr-0 mb-6 ml-6 text-muted-foreground">💡&nbsp;{data.description}</aside>
        <WrappedImage
          src={`/images/project/${data.img}`}
          alt={data.img_alt}
          caption={data.img_alt}
          author={data.img_author}
          authorSrc={data.img_author_src}
          width={500}
          height={500}
          className="w-full rounded-3xl"
        />
        <div className="prose prose-lg dark:prose-invert max-w-none pt-4 pb-16">
          <MDXRemote source={content} components={components} />
          <MDXRemote source={devEnvContent} components={components} />
          <MDXRemote source={monarkSupportContent} components={components} />
        </div>
        {children}
      </div>
      <div className="hidden lg:block lg:col-span-1 pb-16">
        <div className="sticky top-24 pt-2">
          {backHref && backLabel && (
            <div className="mt-8">
              <NavLink href={backHref} className="inline-flex items-center text-primary font-medium group no-underline">
                <ChevronLeftIcon />&nbsp;{backLabel}
              </NavLink>
            </div>
          )}
          <div className="mt-8 flex flex-col gap-2 text-muted-foreground">
            <ProjectStatusBadge status={data.status} locale={locale} />
            <IconLabelAttribute
              Icon={GlobeIcon}
              label={t.mockup}
              value={t.mockup}
              href={`https://${data.accronym}.monark.io`}
            />
            <Label className="mb-0 mt-4 font-bold">{t.industries}</Label>
            <div className="flex gap-2 py-2 flex-wrap"><ProjectIndustryTags industryTags={data.industry_tags} /></div>
            <Label className="mb-0 mt-4 font-bold">{t.keywords}</Label>
            <div className="flex gap-2 py-2 flex-wrap"><ProjectKeywordTags keywordTags={data.keyword_tags} /></div>
            <div className="mt-4">
              <Label className="mb-2 font-bold">{t.contributors}</Label>
              <GithubOrgMembers repo={data.code_repositories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}










