import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Pieces of the long-form page header shared by news articles
 * (/learn/news/[id]) and project pages (/project/[id]): back link, meta
 * pills, byline list and the large 16:9 cover. Render them outside the
 * global `article` prose styles (app/globals.scss).
 */

/** "All news" / "Back to projects": a text link with a pill hover. */
export const articleBackLinkClass =
  "-ml-3 inline-flex h-10 items-center gap-1 rounded-full px-3 text-sm font-semibold text-primary-ink no-underline transition-colors duration-150 hover:bg-secondary [&_svg]:size-4";

/** Small outlined pill above the title (news tags, project category). */
export const articlePillClass =
  "m-0 inline-flex items-center rounded-full border bg-background px-2.5 py-0.5 text-xs font-semibold text-muted-foreground no-underline";

/** The icon + text byline under the lead. */
export const articleMetaListClass =
  "m-0 mt-6 flex list-none flex-wrap items-center gap-x-5 gap-y-2 p-0 text-sm text-muted-foreground";
export const articleMetaItemClass = "m-0 inline-flex items-center gap-1.5";

type CoverProps = {
  src: string;
  alt?: string;
  /** Shown under the cover (usually the alt text). */
  caption?: string;
  author?: string;
  authorSrc?: string;
  className?: string;
};

/** Large 16:9 cover (max-w-5xl) with an optional caption and photo credit. */
export function ArticleCover({
  src,
  alt,
  caption,
  author,
  authorSrc,
  className,
}: CoverProps) {
  return (
    <figure className={cn("mx-auto mt-10 max-w-5xl md:mt-12", className)}>
      <div className="relative aspect-video overflow-hidden rounded-3xl border bg-muted">
        <Image
          src={src}
          alt={alt || ""}
          fill
          priority
          sizes="(min-width: 1088px) 1024px, 100vw"
          className="object-cover"
        />
      </div>
      {(caption || author) && (
        <figcaption className="mx-auto mt-3 flex max-w-3xl flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:gap-4">
          {caption && <span>{caption}</span>}
          {author && (
            <span className="shrink-0">
              ©{" "}
              {authorSrc ? (
                <a
                  href={authorSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {author}
                </a>
              ) : (
                author
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
