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

type Variant = "default" | "feature" | "side";

type Props = {
  item: DatedNewsMetadata;
  locale: Locale;
  /**
   * "feature": the lead story (large 16:9 image, big title, excerpt).
   * "side": a secondary top story (image and title, no excerpt).
   * "default": a grid card (image, tag, date, title, short excerpt).
   */
  variant?: Variant;
  headingLevel?: "h2" | "h3";
  /** Load the image eagerly (above the fold). */
  priority?: boolean;
  className?: string;
};

const sizes: Record<Variant, string> = {
  feature: "(min-width: 1200px) 760px, (min-width: 1024px) 64vw, 100vw",
  side: "(min-width: 1200px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw",
  default: "(min-width: 1200px) 370px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
};

/**
 * An image-first news card: cover (16:9), one topic tag and the date, the
 * title and a summary cut to 20 words. The title link is stretched over the
 * whole card, so the card is one link for the keyboard and screen readers.
 * Hover lifts the card slightly and zooms the image (motion-safe only).
 * No hooks: renders on the server and inside the client news list alike.
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
  const feature = variant === "feature";
  const side = variant === "side";

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col transition-transform duration-200 ease-out motion-safe:hover:-translate-y-1",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden border bg-muted",
          feature ? "rounded-3xl" : "rounded-2xl"
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

      <div className={cn("flex flex-1 flex-col", feature ? "pt-5 md:pt-6" : "pt-4")}>
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
            feature
              ? "text-[1.625rem] sm:text-3xl lg:text-[2.25rem]"
              : side
                ? "text-lg"
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
        {!side && (
          <p
            className={cn(
              "m-0 mt-2 text-muted-foreground",
              feature ? "max-w-[40rem] text-lg leading-relaxed" : "text-[0.9375rem] leading-relaxed"
            )}
          >
            {excerpt(item.description, 20)}
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
