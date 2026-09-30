import React from "react";
import Image from "next/image";
import { NavLink } from "@/components/common/navlink/navlink";
import { DatedNewsMetadata } from "@/types/news.types";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import {
  commonTags,
  excerpt,
  formatNewsDate,
  getNews,
  isoNewsDate,
  primaryTag,
} from "./news-data";

type Variant = "default" | "lead" | "feature" | "tall" | "compact";

type Props = {
  item: DatedNewsMetadata;
  locale: Locale;
  /**
   * "lead": the latest story, image and text side by side on wide screens.
   * "feature": a section's main story (large 16:9 image, big title, excerpt).
   * "tall": a side story that fills its share of the feature's height on
   *   wide screens (image beside the text), 16:10 image on top on phones.
   * "compact": a thumbnail beside the tag, date and title (no excerpt).
   * "default": a grid card (image, tag, date, title, short excerpt).
   */
  variant?: Variant;
  headingLevel?: "h2" | "h3";
  /** Load the image eagerly (above the fold). */
  priority?: boolean;
  className?: string;
};

const sizes: Record<Variant, string> = {
  lead: "(min-width: 1200px) 660px, (min-width: 1024px) 56vw, 100vw",
  feature: "(min-width: 1200px) 700px, (min-width: 1024px) 60vw, 100vw",
  tall: "(min-width: 1200px) 250px, (min-width: 1024px) 22vw, 100vw",
  compact: "(min-width: 1024px) 180px, 40vw",
  default:
    "(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
};

/**
 * An image-first news card: cover (16:9), one topic tag and the date, the
 * title and, except for "compact", a summary cut to 20 words. The title
 * link is stretched over the whole card, so the card is one link for the
 * keyboard and screen readers. Hover lifts the card slightly and zooms the
 * image (motion-safe only). No hooks: renders on the server and inside the
 * client news list alike.
 */
function NewsCard({
  item,
  locale,
  variant = "default",
  headingLevel: Heading = "h3",
  priority = false,
  className,
}: Props) {
  const tag = primaryTag(item, commonTags(getNews(locale)));
  const lead = variant === "lead";
  const feature = variant === "feature";
  const compact = variant === "compact";
  const tall = variant === "tall";
  const big = lead || feature;

  return (
    <div
      className={cn(
        "group relative flex h-full transition-transform duration-200 ease-out motion-safe:hover:-translate-y-1",
        compact
          ? "grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-4"
          : "flex-col",
        tall &&
          "lg:grid lg:h-full lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:items-center lg:gap-6",
        lead &&
          "lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-10",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden border bg-muted",
          tall ? "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[11rem]" : "aspect-video",
          big ? "rounded-3xl" : compact ? "rounded-xl" : "rounded-2xl"
        )}
      >
        <Image
          src={`/images/news/${item.img}`}
          alt=""
          fill
          priority={priority}
          sizes={sizes[variant]}
          className="object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.04]"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col",
          lead ? "pt-5 lg:pt-0" : tall ? "pt-4 lg:pt-0" : feature ? "pt-5 md:pt-6" : compact ? "" : "pt-4"
        )}
      >
        <p className="m-0 flex flex-wrap items-center gap-x-2 text-xs font-bold uppercase tracking-[0.08em]">
          {tag && <span className="text-primary-ink">{tag}</span>}
          {tag && (
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
          )}
          <time
            dateTime={isoNewsDate(item.date)}
            className="font-semibold normal-case tracking-normal text-muted-foreground"
          >
            {formatNewsDate(item.date, locale)}
          </time>
        </p>
        <Heading
          className={cn(
            "mt-2 font-extrabold leading-tight tracking-[-0.015em] text-foreground",
            lead
              ? "text-[1.75rem] sm:text-4xl lg:text-[2.75rem]"
              : feature
                ? "text-[1.625rem] sm:text-3xl"
                : compact
                  ? "text-base sm:text-lg"
                  : tall
                    ? "text-xl lg:text-lg xl:text-xl"
                    : "text-xl"
          )}
        >
          <NavLink
            href={`/learn/news/${item.id}`}
            className="no-underline decoration-primary decoration-2 underline-offset-[5px] after:absolute after:-inset-2 after:rounded-3xl after:content-[''] group-hover:underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {item.title}
          </NavLink>
        </Heading>
        {!compact && (
          <p
            className={cn(
              "m-0 mt-2 text-muted-foreground",
              big
                ? "max-w-[40rem] text-lg leading-relaxed"
                : "text-[0.9375rem] leading-relaxed"
            )}
          >
            {excerpt(item.description, tall ? 14 : 20)}
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
