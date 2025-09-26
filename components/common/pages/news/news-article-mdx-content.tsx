import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { components } from "@/mdx-components";
import { formatDuration, mapLocaleToDateFns } from "@/lib/time";
import { CalendarIcon, ChevronLeftIcon, ClockIcon, ExternalLinkIcon, MapPinIcon } from "lucide-react";
import { IconLabelAttribute } from "@/components/common/icon-label-attribute/IconLabelAttribute";
import NewsArticleCategories from "./NewsArticleCategories";
import WrappedImage from "../../wrapped-image.component";
import { NavLink } from "../../navlink/navlink";
import { format, parseISO } from "date-fns";
import { Locale } from "@/i18n.config";
import i18n from "./news-list.i18n";

interface NewsArticleMdxContentProps {
  contentPath: string;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  locale: Locale
}

export default async function NewsArticleMdxContent({
  contentPath,
  backHref,
  backLabel,
  children,
  locale,
}: NewsArticleMdxContentProps) {
  if (!fs.existsSync(contentPath)) {
    notFound();
  }
  const t = i18n[locale];
  const contentRaw = fs.readFileSync(contentPath, "utf-8");
  const { content, data } = matter(contentRaw);

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
        <h1>{data.title}</h1>
        <div className="lg:hidden flex flex-col gap-2 text-muted-foreground">
          <IconLabelAttribute
            Icon={CalendarIcon}
            label={t.date}
            value={format(parseISO(data.date.toISOString()), "PPP", {
              locale: mapLocaleToDateFns(locale),
            })}
          />
          <IconLabelAttribute
            Icon={ClockIcon}
            label={t.read_time}
            value={formatDuration(data.read_time_seconds, locale)}
          />
          <IconLabelAttribute
            Icon={MapPinIcon}
            label={t.city}
            value={data.city}
          />
          {data.original_src ?
            <IconLabelAttribute
              Icon={MapPinIcon}
              label={t.original_src}
              value={data.original_src}
            /> : null
          }
          <div className="flex gap-2 py-2"><NewsArticleCategories categories={data.tags.flat()} /></div>
        </div>
        <aside className="font-lg italic border-l-[4px] border-primary pl-6 mt-6 mr-0 mb-6 ml-6 text-muted-foreground">💡&nbsp;{data.description}</aside>
        <WrappedImage
          src={`/images/news/${data.img}`}
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
            <IconLabelAttribute
              Icon={CalendarIcon}
              label={t.date}
              value={format(parseISO(data.date.toISOString()), "PPP", {
                locale: mapLocaleToDateFns(locale),
              })}
            />
            <IconLabelAttribute
              Icon={ClockIcon}
              label={t.read_time}
              value={formatDuration(data.read_time_seconds, locale)}
            />
            <IconLabelAttribute
              Icon={MapPinIcon}
              label={t.city}
              value={data.city}
            />
            {data.original_src ?
              <IconLabelAttribute
                Icon={ExternalLinkIcon}
                label={t.original_src}
                value={t.original_src}
                href={data.original_src}
              /> : null
            }
            <div className="flex gap-2 py-2 flex-wrap"><NewsArticleCategories categories={data.tags.flat()} /></div>
          </div>
        </div>
      </div>
    </div>
  );
}










