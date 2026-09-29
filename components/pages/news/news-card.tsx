import React from "react";
import Image from "next/image";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { NavLink } from "@/components/common/navlink/navlink";
import { DatedNewsMetadata } from "@/types/news.types";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import i18n from "./news.i18n";
import { formatNewsDate, isoNewsDate, readMinutes } from "./news-data";
import NewsTags from "./news-tags";

type Props = {
  item: DatedNewsMetadata;
  locale: Locale;
  /** "featured" is the wide card for the latest item on the news list. */
  variant?: "default" | "featured";
  headingLevel?: "h2" | "h3";
  /** Load the image eagerly (first card above the fold). */
  priority?: boolean;
  className?: string;
};

/**
 * A news item as a card: cover image, tags, title, summary, date and reading
 * time. The title link is stretched over the whole card (one link per card
 * for screen readers and the keyboard); the tags sit above it visually only.
 * No hooks, so it renders on the server (Learn hub, article page) and inside
 * the client news list alike.
 */
function NewsCard({
  item,
  locale,
  variant = "default",
  headingLevel: Heading = "h3",
  priority = false,
  className,
}: Props) {
  const t = i18n[locale] ?? i18n.en;
  const featured = variant === "featured";
  const href = `/learn/news/${item.id}`;

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground transition-colors duration-150 focus-within:border-primary/70 hover:border-primary/60",
        featured && "md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden border-b bg-muted",
          featured && "md:aspect-auto md:min-h-[22rem] md:border-b-0 md:border-r"
        )}
      >
        <Image
          src={`/images/news/${item.img}`}
          alt=""
          fill
          priority={priority}
          sizes={
            featured
              ? "(min-width: 1200px) 660px, (min-width: 768px) 58vw, 100vw"
              : "(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02]"
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-5",
          featured && "gap-1 sm:p-6 md:justify-center md:p-8 lg:p-10"
        )}
      >
        {featured && (
          <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-primary-foreground">
            {t.list.featured_label}
          </p>
        )}
        <NewsTags tags={item.tags} className="mb-3" />
        <Heading
          className={cn(
            "font-bold leading-snug tracking-[-0.01em] text-foreground",
            featured ? "text-2xl md:text-[1.75rem]" : "text-lg"
          )}
        >
          <NavLink
            href={href}
            className="rounded-sm no-underline decoration-primary/60 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:underline focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
          >
            {item.title}
          </NavLink>
        </Heading>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed text-muted-foreground",
            featured ? "line-clamp-4 md:text-base" : "line-clamp-3"
          )}
        >
          {item.description}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon aria-hidden="true" className="size-4" />
            <time dateTime={isoNewsDate(item.date)}>
              {formatNewsDate(item.date, locale)}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon aria-hidden="true" className="size-4" />
            {t.card.min_read(readMinutes(item.read_time_seconds))}
          </span>
        </div>
        {featured && (
          <span
            aria-hidden="true"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary-ink"
          >
            {t.card.read_more}
            <ArrowRightIcon className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
